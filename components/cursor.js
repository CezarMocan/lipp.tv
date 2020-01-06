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
  }

  onGlobalMouseMove = (x, y) => {
    if (!this._ref) return
    const { offsetX, offsetY } = this.props
    this._ref.style.transform = `translateX(${x + offsetX}px) translateY(${y + offsetY}px)`
  }

  render() {
    const { cursorState, thumbnail } = this.props

    if (cursorState == CUSTOM_CURSOR_STATES.DISABLED) return null

    return (
      <div 
        className="custom-cursor__container" 
        ref={e => this._ref = e}
        onMouseOver={e => e.preventDefault()}
        onMouseOut={e => e.preventDefault()}
      >
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
