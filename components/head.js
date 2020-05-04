import React from 'react'
import Head from 'next/head'

export default class HeadComponent extends React.Component {
  render() {
    const { title } = this.props
    return (
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"/>
        <meta name="description" content="LIPP TV IS THE FINAL PERFORMANCE PROJECT OF THE LIVE IMAGE PROCESSING AND PERFORMANCE (LIPP) CLASS AT NYU’S ITP.
LIPP TV IS A CREATIVE RESPONSE TO HOW CODE, VIDEO NETWORKS, AND ART CAN BE USED TO CREATE A NEW EXPERIENCE IN LIVE PERFORMANCE. EACH STUDENT HAS CREATED THEIR OWN SHORT TV SHOW INFLUENCED BY VIDEO ART, EXPERIMENTAL ANIMATION, PUBLIC ACCESS TV, AND MORE."/>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
        <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
        <meta property="og:image" content="/img/logo.png"/>
        <meta property="og:image:type" content="image/png"/>
        <meta property="og:image:width" content="2416"/>
        <meta property="og:image:height" content="1332"/>
        <script src="https://embed.twitch.tv/embed/v1.js"></script>
      </Head>
    )
  }
}

HeadComponent.defaultProps = {
  title: 'LIPP.TV'
}