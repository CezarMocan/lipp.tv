import React from 'react'
import Head from 'next/head'

export default class HeadComponent extends React.Component {
  render() {
    const { title } = this.props
    return (
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"/>
        <meta name="description" content="LIPP TV is the final performance project of the Live Image Processing and Performance (LIPP) class at NYU ITP.
LIPP TV is a creative response to how code, video networks, and art can be used to create a new experience in live performance. Each student has created their own short TV show influenced by video art, experimental animation, public access TV, and more."/>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
        <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
        <meta property="og:image" content="/img/logo-social.png"/>
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