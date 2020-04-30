import React from 'react'
import { get } from 'dotty';
import classnames from 'classnames'
import "../styles/styles.scss"

class Header extends React.Component {
  state = {
  }

  constructor({ activeSlug }) {
    super();
  }

  render() {
    return (
      <div className="header">
        <div></div>
        <div><h2>LIPP.TV</h2></div>
        <div className="logo-container">
        </div>
      </div>
    )
  }
}

export default Header