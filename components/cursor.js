import classnames from 'classnames'
import { CUSTOM_CURSOR_STATES } from '../modules/constants'
import GlobalCursorManager from '../modules/cursor'

export default class Cursor extends React.Component {
  state = {
  }

  componentDidMount() {
    this._cursorManagerLUID = GlobalCursorManager.addListener(this.onGlobalMouseMove)
  }

  componentWillUnmount() {
    GlobalCursorManager.removeListener(this._cursorManagerLUID)
    this._cursorManagerLUID = null
  }

  onGlobalMouseMove = (x, y) => {
    if (!this._ref) return
    const { offsetX, offsetY } = this.props
    this._ref.style.transform = `translateX(${x + offsetX}px) translateY(${y + offsetY}px)`
  }

  getComponentForCursorState(state) {
    const { thumbnail } = this.props
    switch (state) {
      case CUSTOM_CURSOR_STATES.OPEN_PROJECT:
        return (
          <div class="custom-cursor__content">
            <img class="custom-cursor__content__image" src={thumbnail}/>
            <div class="custom-cursor__content__type"> <strong>INFO</strong> </div>
            <div class="custom-cursor__content__type arrow__down"></div>
          </div>
        )
        break
      case CUSTOM_CURSOR_STATES.CLOSE_PROJECT:
        return (
          <span class="custom-cursor__content"> <div class="arrow__up"></div> </span>
        )
        break      
    }
  }

  render() {
    const { cursorState, thumbnail } = this.props

    if (cursorState == CUSTOM_CURSOR_STATES.DISABLED) return null
    const cursorComponent = this.getComponentForCursorState(cursorState)

    return (
      <div 
        className="custom-cursor__container" 
        ref={e => this._ref = e}
      >
        { cursorComponent }
      </div>
    )
  }
}

Cursor.defaultProps = {
  thumbnail: null,
  cursorState: CUSTOM_CURSOR_STATES.DISABLED,
  offsetX: -12,
  offsetY: -12
}
