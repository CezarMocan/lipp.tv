import React from 'react'
import { get } from 'dotty';
import classnames from 'classnames'
import "../styles/styles.scss"

const HEADER_TOP = 100
var LOGO_SIZE_MIN = 75
var LOGO_SIZE_MAX = 250
const MENU = {
  ABOUT: 'About',
  PROGRAMS: 'Programs',
  CREDITS: 'Credits',
  WATCH_LIVE: 'Watch Live'
}

class Header extends React.Component {
  state = {
  }

  constructor({ activeSlug }) {
    super();
  }

  onWindowScroll = (e) => {
    // Change logo size
    let factor = 0
    if (window.scrollY > HEADER_TOP) factor = 0
    else factor = (1 - window.scrollY / HEADER_TOP)

    let logoSize = factor * (LOGO_SIZE_MAX - LOGO_SIZE_MIN) + LOGO_SIZE_MIN

    if (this._imgRef) this._imgRef.style.height = `${logoSize}rem`

    let opacity = 1 - factor
    if (this._p1) this._p1.style.opacity = opacity
    if (this._p2) this._p2.style.opacity = opacity

    if (e && this.props.onScroll) this.props.onScroll(e)
  }

  calculateLogoSize = () => {
    LOGO_SIZE_MAX = 16
    LOGO_SIZE_MIN = 6
    if (window.innerWidth >= 2600) LOGO_SIZE_MAX = 14
    if (window.innerWidth >= 3200) LOGO_SIZE_MAX = 11
    if (window.innerWidth <= 1124) LOGO_SIZE_MAX = 14
    if (window.innerWidth <= 768) LOGO_SIZE_MAX = 11
    // if (window.innerWidth <= 464) { 
    //   LOGO_SIZE_MAX = 75
    //   LOGO_SIZE_MIN = 50
    // }
    this.onWindowScroll()
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onWindowScroll)
    window.addEventListener('resize', this.calculateLogoSize)
    this.calculateLogoSize()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onWindowScroll)
  }

  onAboutClick = (e) => {
    if (this.props.onAboutClick) this.props.onAboutClick()
  }
  onProgramClick = (e) => {
    if (this.props.onProgramClick) this.props.onProgramClick()
  }
  onCreditsClick = (e) => {
    if (this.props.onCreditsClick) this.props.onCreditsClick()
  }
  onWlClick = (e) => {
    if (this.props.onWlClick) this.props.onWlClick()
  }

  render() {
    const { highlight } = this.props
    let aboutCls = classnames({ highlight: (highlight == MENU.ABOUT) })
    let programsCls = classnames({ highlight: (highlight == MENU.PROGRAMS) })
    let creditsCls = classnames({ highlight: (highlight == MENU.CREDITS) })
    let wlCls = classnames({ highlight: (highlight == MENU.WATCH_LIVE) })
    return (
      <div className="header">
        <div className="header-padding" ref={p => this._p1 = p}></div>
        <div className="header-content">
          <div className="menu-item no-mobile"><a className={wlCls} onClick={this.onWlClick}>Watch</a></div>
          <div className="menu-item no-mobile"><a className={aboutCls} onClick={this.onAboutClick}>About</a></div>
          <div className="menu-item"><a className="no-hover" onClick={this.onWlClick}><img ref={p => this._imgRef = p} src="/img/logo.png"/></a></div>
          <div className="menu-item no-mobile"><a className={programsCls} onClick={this.onProgramClick}>Programs</a></div>
          <div className="menu-item no-mobile"><a className={creditsCls} onClick={this.onCreditsClick}>Credits</a></div>
        </div>
        <div className="header-padding" ref={p => this._p2 = p}></div>
      </div>
    )
  }
}

export default Header