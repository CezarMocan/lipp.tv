import classnames from 'classnames'
import React from 'react'

export default class Menu extends React.Component {
  state = {
    isVisible: false,
    isShowing: false
  }

  componentDidMount() {
    this.setState({
      isVisible: this.props.isOpen,
      isShowing: this.state.isOpen
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps: ', nextProps)
    if (nextProps.isOpen && !this.props.isOpen) {
      this.setState({ isShowing: true, isVisible: false }, () => {
        setTimeout(() => {this.setState({ isVisible: true })}, 10)
      })
    } else if (!nextProps.isOpen && this.props.isOpen) {
      this.setState({ isVisible: false }, () => {
        setTimeout(() => { this.setState({ isShowing: false })}, 500)
      })
    }
  }

  render() {
    const { isVisible, isShowing } = this.state
    const containerCls = classnames({
      "main-menu": true,
      "visible": isVisible
    })
    if (!isShowing) return null
    return (
      <div className={containerCls}>
        <div className="main-menu__content-area">

        </div>
      </div>
    )
  }
}

Menu.defaultProps = {
  isOpen: false
}