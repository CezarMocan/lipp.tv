import classnames from 'classnames'
import { Player, ControlBar, BigPlayButton } from 'video-react'
import { CSSTransition } from 'react-transition-group'
import { CUSTOM_CURSOR_STATES } from '../modules/constants'
import { transitionClassnames } from '../modules/cssTransitionHelper'
import Cursor from './cursor'

export default class Product extends React.Component {
  state = {
    open: false,
    headerHovered: false,
    overlayOpen: false,
    defaultCursorClass: 'cursor--default',
    customCursorState: CUSTOM_CURSOR_STATES.DISABLED
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  componentDidUpdate(oldProps, oldState) {
    const { open, anotherOpen } = this.props
    if (open != oldProps.open) {
      if (open) {
        // If the current accordion is opening, we update the state to open and scroll the element into view.
        this.setState({ open: true }, () => {
          if (this._ref) this._ref.scrollIntoView({ behavior: 'auto', block: 'start' })
          if (this._player) this._player.play()
        })
      } else {
        if (this._player) this._player.pause()
        if (anotherOpen) {
          // If the current accordion is closing because another one has opened, 
          // we wait until after the other accordion has opened.
          this.setState({ overlayOpen: false })
          setTimeout(() => {
            this.setState({ open: false })
          }, 500)  
        } else {
          // If the current accordion is closing because it has been clicked,
          // we close it directly.
          this.setState({ open: false, overlayOpen: false })
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

  onAccordionClick = (e) => {
    e.stopPropagation();
    const { overlayOpen } = this.state
    if (overlayOpen) {
      if (this._player && !this._player.ended) this._player.play()
    } else {
      if (this._player) this._player.pause()
    }
    this.setState({
      overlayOpen: !overlayOpen
    })
  }

  handleVideoPlayerStateChange = (state, prevState) => {
    if (state.ended && !prevState.ended) {
      this.setState({ overlayOpen: true })
    }
  }

  render() {
    const { client, title, thumbnail, video } = this.props
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

    const videoPlayerCls = classnames({
      'video-player': true,
      'hidden': !open 
    })

    const overlayCls = classnames({
      'module__accordion-container__description-overlay': true,
      hidden: !overlayOpen
    })

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
        >
          { video &&
            <Player ref={(p) => {
                this._player = p
                if (this._player)
                  this._player.subscribeToStateChange(this.handleVideoPlayerStateChange)
              }} 
              preload='auto'
              playsInline 
              src={video}
              fluid={false}
              width="100%"
              height="100%"
              className={videoPlayerCls}
            >
              <ControlBar disableCompletely={true}/>
              <BigPlayButton position="center" style={{display: 'none'}}/>
            </Player>
          }
          <CSSTransition in={overlayOpen} timeout={250} classNames={transitionClassnames("module__accordion-container__description-overlay")}>
            <div className="module__accordion-container__description-overlay">
              {/* <CSSTransition> */}
                <p> A mista loba loba</p>
              {/* </CSSTransition> */}
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
  video: null,
  open: false,
  anotherOpen: false,
  onClick: null
}
