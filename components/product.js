import classnames from 'classnames'
import { Player, ControlBar, BigPlayButton } from 'video-react'
import { CSSTransition } from 'react-transition-group'
import AwesomeSlider from 'react-awesome-slider'
import { CUSTOM_CURSOR_STATES, CAROUSEL_NAV_SCREEN_PCT } from '../modules/constants'
import { transitionClassnames } from '../modules/cssTransitionHelper'
import GlobalCursorManager from '../modules/cursor'
import Cursor from './cursor'
import ProjectDescription from './projectDescription'

export default class Product extends React.Component {
  state = {
    open: false,
    headerHovered: false,
    accordionHovered: false,
    overlayOpen: false,
    defaultCursorClass: 'cursor--default',
    customCursorState: CUSTOM_CURSOR_STATES.DISABLED
  }

  constructor(props) {
    super(props)
    this._players = {}
    this._lastMouseXPct = 0
  }

  inNavigationArea = (pct) => (this.inNavigationAreaLeft(pct) || this.inNavigationAreaRight(pct))
  inNavigationAreaLeft = (pct) => (pct < CAROUSEL_NAV_SCREEN_PCT)
  inNavigationAreaRight = (pct) => (pct > 100 - CAROUSEL_NAV_SCREEN_PCT)

  onGlobalMouseMove = (clientX, clientY) => {
    const { open, headerHovered, accordionHovered, customCursorState, overlayOpen } = this.state
    if (!open || headerHovered || !accordionHovered) return

    const pct = (clientX / window.innerWidth) * 100
    this._lastMouseXPct = pct

    if (overlayOpen) {
      // We're in the project description window;
      if (customCursorState == CUSTOM_CURSOR_STATES.CLOSE_DESCRIPTION) return
      this.setState({ customCursorState: CUSTOM_CURSOR_STATES.CLOSE_DESCRIPTION })
    } else if (this.inNavigationAreaLeft(pct)) {
      // Mouse is in the navigation area, on the left
      if (customCursorState == CUSTOM_CURSOR_STATES.PREV_PROJECT) return
      this.setState({ customCursorState: CUSTOM_CURSOR_STATES.PREV_PROJECT })
    } else if (this.inNavigationAreaRight(pct)) {
      // Mouse is in the navigation area, on the right
      if (customCursorState == CUSTOM_CURSOR_STATES.NEXT_PROJECT) return
      this.setState({ customCursorState: CUSTOM_CURSOR_STATES.NEXT_PROJECT })
    } else {
      // Mouse is in the show info area
      if (customCursorState == CUSTOM_CURSOR_STATES.SHOW_INFO) return
      this.setState({ customCursorState: CUSTOM_CURSOR_STATES.SHOW_INFO })
    }
  }

  componentDidMount() {
    this._cursorManagerLUID = GlobalCursorManager.addListener(this.onGlobalMouseMove)
  }

  componentWillUnmount() {
    GlobalCursorManager.removeListener(this._cursorManagerLUID)
    this._cursorManagerLUID = null
  }

  componentDidUpdate(oldProps, oldState) {
    const { open, anotherOpen, containerRef } = this.props
    if (open != oldProps.open) {
      if (open) {
        // If the current accordion is opening, we update the state to open and scroll the element into view.
        this.setState({ open: true, customCursorState: CUSTOM_CURSOR_STATES.CLOSE_PROJECT }, () => {
          if (this._players[0]) this._players[0].play()  
          setTimeout(() => {
            if (containerRef) containerRef.scrollIntoView({ behavior: 'auto', block: 'start' })
          }, 500)  
        })  
      } else {
        if (this._players[0]) this._players[0].pause()
        if (anotherOpen) {
          // If the current accordion is closing because another one has opened, 
          // we wait until after the other accordion has opened.
          this.setState({ overlayOpen: false, open: false, customCursorState: CUSTOM_CURSOR_STATES.DISABLED })
        } else {
          // If the current accordion is closing because it has been clicked,
          // we close it directly.
          this.setState({ open: false, overlayOpen: false, customCursorState: CUSTOM_CURSOR_STATES.OPEN_PROJECT })
        }
      }
    }
  }

  onHeaderClick = (e) => {
    const { onClick } = this.props
    if (onClick) onClick(e)
  } 

  onHeaderMouseEnter = (e) => {
    const { open } = this.state
    this.setState({ 
      headerHovered: true,
      customCursorState: open ? CUSTOM_CURSOR_STATES.CLOSE_PROJECT : CUSTOM_CURSOR_STATES.OPEN_PROJECT
    })
  }

  onHeaderMouseLeave = (e) => {
    this.setState({ 
      headerHovered: false,
      customCursorState: CUSTOM_CURSOR_STATES.DISABLED
    })
  }

  onAccordionMouseEnter = (e) => {
    this.setState({ accordionHovered: true })
  }

  onAccordionMouseLeave = (e) => {
    this.setState({ accordionHovered: false })
  }

  onAccordionClick = (e) => {
    e.stopPropagation();
    const { overlayOpen } = this.state
    if (overlayOpen) {
      if (this._players[0] && !this._players[0].ended) this._players[0].play()
    } else {
      if (this._players[0]) this._players[0].pause()
    }

    if (this.inNavigationArea(this._lastMouseXPct) && !overlayOpen) return

    this.setState({
      overlayOpen: !overlayOpen,
      customCursorState: overlayOpen ? CUSTOM_CURSOR_STATES.SHOW_INFO : CUSTOM_CURSOR_STATES.CLOSE_DESCRIPTION
    })
  }

  handleVideoPlayerStateChange = (index) => (state, prevState) => {
    if (state.ended && !prevState.ended) {
      this.setState({ overlayOpen: true })
    }
  }

  renderVideo = (src, index) => {
    const { open } = this.state
    const videoPlayerCls = classnames({
      'video-player': true,
      'hidden': !open 
    })

    return (
      <Player ref={(p) => {
          this._players[index] = p
          if (this._players[index])
            this._players[index].subscribeToStateChange(this.handleVideoPlayerStateChange(index))
        }} 
        key={`player-${index}`}
        preload='auto'
        playsInline 
        src={src}
        fluid={false}
        width="100%"
        height="100%"
        className={videoPlayerCls}
      >
        <ControlBar disableCompletely={true}/>
      </Player> 
    )
  }

  renderImage = (src, index) => {
    const { open } = this.state
    const imageCls = classnames({
      'image-player': true,
      'hidden': !open 
    })

    return (
      <img 
        key={`image-${index}`}
        src={src}
        height="100%"
        className={imageCls}
      />
    )
  }

  render() {
    const { client, title, thumbnail, assets, description, contentHeight } = this.props
    const { open, overlayOpen, customCursorState } = this.state
    const hasCustomCursor = (customCursorState != CUSTOM_CURSOR_STATES.DISABLED)

    const listItemCls = classnames({
      'module__product-list__item': true,
      'open': open,
      'with-custom-cursor': hasCustomCursor
    })

    const accordionCls = classnames({
      'module__accordion-container': true,
      'open': open
    })
    let accordionHeight = open ? contentHeight : 0

    return (
      <div ref={e => this._ref = e}
      >
        <div 
          className={listItemCls} 
          onClick={this.onHeaderClick}
          onMouseEnter={this.onHeaderMouseEnter}
          onMouseLeave={this.onHeaderMouseLeave}  
        >
          <strong>{client}</strong> {title}
        </div>

        <div 
          className={accordionCls}
          onClick={this.onAccordionClick}
          onMouseEnter={this.onAccordionMouseEnter}
          onMouseLeave={this.onAccordionMouseLeave}
          style={{height: accordionHeight}}
        >
          <AwesomeSlider fillParent bullets={false} organicArrows={false}>
            {assets && assets.map((p, index) => {
              return (
                <div className="media-container full-width-height aws-btn">
                  { p.type == 'video' && this.renderVideo(p.url, index)}
                  { p.type == 'image' && this.renderImage(p.url, index)}
                </div>
              )
            })}
          </AwesomeSlider>
          <CSSTransition in={overlayOpen} timeout={250} classNames={transitionClassnames("module__accordion-container__description-overlay")}>
            <div className="module__accordion-container__description-overlay">
              <ProjectDescription text={description}/>
            </div>
          </CSSTransition>
        </div>
        { hasCustomCursor && <Cursor thumbnail={thumbnail} cursorState={customCursorState} /> }
      </div>
    )
  }
}

Product.defaultProps = {
  client: 'Client',
  title: 'Title',
  thumbnail: null,
  description: '',
  assets: [],
  open: false,
  anotherOpen: false,
  contentHeight: 0,
  onClick: null
}
