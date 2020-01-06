import classnames from 'classnames'
import { Player, ControlBar, BigPlayButton } from 'video-react'
import { CUSTOM_CURSOR_STATES } from '../modules/constants'
import Cursor from './cursor'

export default class Product extends React.Component {
  state = {
    open: false,
    headerHovered: false,
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
          setTimeout(() => {
            this.setState({ open: false })
          }, 500)  
        } else {
          // If the current accordion is closing because it has been clicked,
          // we close it directly.
          this.setState({ open: false })
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

  render() {
    const { client, title, thumbnail } = this.props
    const { open, customCursorState } = this.state
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

        <div className={accordionCls}>
          {/* <video autoplay loop className={videoPlayerCls}
            poster=""
            muted playsInline>
            <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              type="video/mp4"/>
          </video> */}

          <Player ref={(p) => this._player = p } 
            preload='auto'
            playsInline 
            src="http://media.w3.org/2010/05/bunny/movie.mp4"
            // src="http://www.w3schools.com/html/mov_bbb.mp4"
            fluid={false}
            width="100%"
            height="100%"
            className={videoPlayerCls}

          >
            <ControlBar disableCompletely={true}/>
            <BigPlayButton position="center" style={{display: 'none'}}/>
          </Player>
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
  open: false,
  anotherOpen: false,
  onClick: null
}
