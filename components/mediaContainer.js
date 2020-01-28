import React from 'react'
import classnames from 'classnames'
import { Player, ControlBar, BigPlayButton } from 'video-react'
import imageUrlBuilder from '@sanity/image-url'
import sanityClient from '../modules/sanity'

const imageBuilder = imageUrlBuilder(sanityClient)
const imageUrlFor = (asset) => imageBuilder.image(asset)

export default class MediaContainer extends React.Component {
  state = {
    src: ''
  }

  renderVideo = (asset, index) => {
    const { open, videoRefHandler } = this.props
    const { src } = this.state

    const videoPlayerCls = classnames({
      'video-player': true,
      'hidden': !open 
    })

    // console.log('Video asset: ', asset)

    return (
      <Player ref={ (p) => { if (videoRefHandler) videoRefHandler(p) } } 
        key={`player-${index}`}
        preload='auto'
        playsInline 
        src={src}
        fluid={false}
        width="100%"
        height="100%"
        className={videoPlayerCls}
      >
        <ControlBar disableCompletely={true}/>
      </Player> 
    )
  }

  renderImage = (asset, index) => {
    const { open, windowWidth } = this.props
    const { src } = this.state

    const imageCls = classnames({
      'image-player': true,
      'hidden': !open 
    })

    return (
      <img 
        key={`image-${index}`}
        src={src}
        height="100%"
        className={imageCls}
      />
    )
  }

  componentDidUpdate(oldProps) {
    if (oldProps.windowWidth != this.props.windowWidth || oldProps.asset != this.props.asset) {
      let src
      const { asset, windowWidth } = this.props
      if (asset.video) {
        src = "https://cez-file-hosting.s3.amazonaws.com/BurgerKing12DaysofCheesemas030.mp4"
      } else if (asset.image) {
        src = imageUrlFor(asset.image.asset).width(windowWidth).url()
      }      
      this.setState({ src })
    }
  }

  componentDidMount() {
    const { asset, windowWidth } = this.props

    let src    
    if (asset.video) {
      src = "https://cez-file-hosting.s3.amazonaws.com/BurgerKing12DaysofCheesemas030.mp4"
    } else if (asset.image) {
      src = imageUrlFor(asset.image.asset).width(windowWidth).url()
    }
    this.setState({ src })
  }

  render() {
    const { asset, index } = this.props
    if (!asset) return null
    if (asset.video) return this.renderVideo(asset, index)
    if (asset.image) return this.renderImage(asset, index)
  }
}

MediaContainer.defaultProps = {
  index: -1,
  asset: null,
  open: false,
  videoRefHandler: null
}