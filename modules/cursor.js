class GlobalCursorManager {
    constructor() {
      this._luid = 0
      this._onMouseMove = this._onMouseMove.bind(this)
      this._mouseX = this._mouseY = 0
      this._listeners = {}
    }
    register() {
      window.addEventListener('mousemove', this._onMouseMove)
    }
    shutdown() {
      this._listeners = []
      window.removeEventListener('mousemove', this._onMouseMove)
    }
    _onMouseMove(e) {
      this._mouseX = e.clientX
      this._mouseY = e.clientY
      Object.values(this._listeners).forEach(l => l(this._mouseX, this._mouseY))
    }
    addListener(f) {
      this._listeners[++this._luid] = f
      return this._luid
    }
    removeListener(luid) {      
      if (this._listeners[luid]) delete this._listeners[luid]
    }
}

export default new GlobalCursorManager()