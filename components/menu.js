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
    const { about } = this.props
    const { isVisible, isShowing } = this.state
    const containerCls = classnames({
      "main-menu": true,
      "visible": isVisible
    })
    let mailToLink = `mailto:${about.contactEmail}`
    let instagramLink = `https://www.instagram.com/${about.instagramHandle}`

    if (!isShowing) return null
    return (
      <div className={containerCls}>
        <div className="main-menu__content-area">
          <div className="main-menu__content-area__links color--light">
            <a href="#team"><h2 className="menu-link">TEAM</h2></a>
            <a href={mailToLink}><h2 className="menu-link">CONTACT US</h2></a>
          </div>

          <div className="main-menu__content-area__description color--light">
            <p> { about.about } </p>
          </div>

          <div className="main-menu__content-area__social color--light">
            <p className="small"><a href={instagramLink} target="__blank"><img src="/icons/instagram.svg" className="social-icon instagram"></img>&ensp;@{about.instagramHandle}</a></p>
            <p className="small"><a href={mailToLink}><img src="/icons/email.svg" className="social-icon email"></img>&ensp;{about.contactEmail}</a></p>
          </div>
        </div>
      </div>
    )
  }
}

Menu.defaultProps = {
  isOpen: false
}