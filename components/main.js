import React from 'react'
import { get } from 'dotty';
import classnames from 'classnames'
import "../styles/styles.scss"
import Header from './header'
import { scrollTo } from './utils'

const MENU = {
  ABOUT: 'About',
  PROGRAMS: 'Programs',
  CREDITS: 'Credits',
  WATCH_LIVE: 'Watch Live'
}

class Home extends React.Component {
  state = {
    highlight: MENU.WATCH_LIVE,
    streamWidth: 960
  }

  constructor({ activeSlug }) {
    super();
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.setState({ 
      TwitchEmbedVideo: require('react-twitch-embed-video'),
      streamWidth: window.innerWidth * 0.7
    })
    this.onScroll()
    window.addEventListener('resize', this.onWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize = () => {
    this.setState({ 
      streamWidth: window.innerWidth * 0.7
    })
  }

  onScroll = (e) => {
    console.log('onScroll', window.scrollY)
    let newHighlight = MENU.WATCH_LIVE
    if (this._aboutRef.getBoundingClientRect().top < 100) newHighlight = MENU.ABOUT
    if (this._programRef.getBoundingClientRect().top < 75) newHighlight = MENU.PROGRAMS
    if (this._creditsRef.getBoundingClientRect().top < 100) newHighlight = MENU.CREDITS
    if (newHighlight != this.state.highlight) {
      this.setState({ highlight: newHighlight })
    }
  }
  onAboutClick = (e) => {
    if (this._aboutRef) window.scrollTo(0, this._aboutRef.offsetTop + 120)
  }
  onProgramClick = (e) => {
    if (this._programRef) window.scrollTo(0, this._programRef.offsetTop + 150)
  }
  onCreditsClick = (e) => {
    if (this._creditsRef) window.scrollTo(0, this._creditsRef.offsetTop + 120)
  }
  onWlClick = (e) => {
    if (this._wlRef) window.scrollTo(0, 0)
  }
  render() {
    const { TwitchEmbedVideo, highlight, streamWidth } = this.state
    const { streamActive, channelName } = this.props
    return (
      <div className="container">
        <div className="bg-grid"></div>
        {/* <img className="about-image-fixed" src="/img/face.png"/> */}
        <div className="pre-header-padding"></div>
        <Header 
          highlight={highlight}
          onScroll={this.onScroll}
          onAboutClick={this.onAboutClick}
          onProgramClick={this.onProgramClick}
          onCreditsClick={this.onCreditsClick}
          onWlClick={this.onWlClick}
        />        
        <div className="content">
          { !streamActive && 
            <div className="twitch-stream-placeholder section section--no-margin-top" ref={p => this._wlRef = p}>
              <div className="placeholder-text section-item">
                <h2>
                  <span class="color--orange">Public access tv</span> 
                  <span> in</span> the age of <span className="color--green">social distancing</span> 
                  <span className="color--blue"> is this too much?</span> this is really just a 
                  <span className="color--yellow"> placeholder</span> for a <span className="color--orange">tagline</span>. 
                </h2>
              </div>
              <div className="placeholder-text section-item">
                <h2>
                  LIPP TV will be live<span class="color--yellow"> here </span>
                  as well as on <a class="color--yellow" href="https://www.twitch.tv/lipp_tv_" target="__blank">TWITCH</a>, <a class="color--yellow">FACEBOOK</a>
                  <span> &amp; </span><a class="color--yellow">VIMEO</a><br/>
                  <span class="color--orange">may 11, 2020 8:30 pm</span> eastern time. 
                </h2>
              </div>
              <div className="announcement section-item section-item--small-margin">
                <h4>Scroll down for more details about lipp tv</h4>
              </div>
              <a onClick={this.onAboutClick}><div className="arrow__down section-item"></div></a>
            </div>
          }
          { streamActive &&
            <div className="twitch-stream section section--no-margin-top" ref={p => this._wlRef = p}>
              { TwitchEmbedVideo && <TwitchEmbedVideo
                autoplay
                channel={channelName}
                height={streamWidth < 800 ? streamWidth : streamWidth * 9 / 16}
                muted={false}
                targetId="twitch-embed"
                width={streamWidth}
              /> }
              <div className="announcement section-item section-item--small-margin" style={{marginTop: 50}}>
                <h4>Scroll down for more details about lipp tv</h4>
              </div>
              <a onClick={this.onAboutClick}><div className="arrow__down section-item"></div></a>
            </div>          
          }
          {/* ABOUT */}
          <div className="section section--double section--transparent section--align-stretch" ref={p => this._aboutRef = p}>
            <div className="subsection subsection--dark subsection--text">
              <img className="fake-h1" src="img/about.svg"/>
              <h3 className="light">
              LIPP TV IS THE FINAL PERFORMANCE PROJECT OF THE LIVE IMAGE PROCESSING AND PERFORMANCE (LIPP) CLASS AT NYU’S ITP. <br/>

LIPP TV IS A CREATIVE RESPONSE TO HOW CODE, VIDEO NETWORKS, AND ART CAN BE USED TO CREATE A NEW EXPERIENCE IN LIVE PERFORMANCE. EACH STUDENT HAS CREATED THEIR OWN SHORT TV SHOW INFLUENCED BY VIDEO ART, EXPERIMENTAL ANIMATION, PUBLIC ACCESS TV, AND MORE. 
<br/>
THIS ENTIRE EVENT WAS CREATED REMOTELY AND IS PERFORMED REMOTELY, WITH STUDENTS CREATING THE WEBSITE, COMMERCIALS, MUSIC, AND ANIMATIONS.
<br/>
TUNE IN TO LIPP TV AND MAKE SURE TO JOIN THE CHAT AND TALK WITH OUR CREATORS AND PARTICIPATE IN THEIR SHOWS.
              </h3>
            </div>
            <div className="subsection subsection--image">   
              <img className="about-image" src="/img/char2.png"/>           
            </div>
          </div>

          {/* PROGRAM */}
          <div className="section section--double section--align-start" ref={p => this._programRef = p}>
            <div className="subsection">
              <img className="fake-h1" src="img/programs.svg"/>
              <h3 className="only-mobile" style={{marginBottom: 20}}>Starting monday, may 11 <br/>at 8:00 pm Eastern time</h3>

              <div className="program-section">
                <div className="program-section-item color--yellow type--bold">8:00 PM – 8:25 PM</div>
                <div className="program-section-item"> <span className="color--orange type--bold">Lightbox </span>Hosted by Mingna Li </div>
                <div className="program-section-item"> <span className="color--orange type--bold">Beyond Autopoiesis </span>Hosted by Morgan Mueller </div>
                <div className="program-section-item"> <span className="color--orange type--bold">Motor Y Cuerda </span>Hosted by David Azar </div>
              </div>

              <div className="program-section">
                <div className="program-section-item color--blue type--bold">INTERMISSION WITH LIPP TV HOST PROFESSOR LIPP</div>
              </div>

              <div className="program-section">
                <div className="program-section-item color--yellow type--bold">8:30 PM – 8:55 PM</div>
                <div className="program-section-item"> <span className="color--orange type--bold">Amago </span>Hosted by Marcela Mancino </div>
                <div className="program-section-item"> <span className="color--orange type--bold">Urban Dream </span>Hosted by Jingyi Wen </div>
                <div className="program-section-item"> <span className="color--orange type--bold">Dad Practice </span>Hosted by August Luhrs </div>
              </div>

              <div className="program-section">
                <div className="program-section-item color--blue type--bold">INTERMISSION WITH LIPP TV HOST PROFESSOR LIPP</div>
              </div>

              <div className="program-section">
                <div className="program-section-item color--yellow type--bold">9:00 PM – 9:25 PM</div>
                <div className="program-section-item"> <span className="color--orange type--bold">Lightbox </span>Hosted by Mingna Li </div>
                <div className="program-section-item"> <span className="color--orange type--bold">Beyond Autopoiesis </span>Hosted by Morgan Mueller </div>
                <div className="program-section-item"> <span className="color--orange type--bold">Motor Y Cuerda </span>Hosted by David Azar </div>
              </div>

              <div className="program-section">
                <div className="program-section-item color--blue type--bold">INTERMISSION WITH LIPP TV HOST PROFESSOR LIPP</div>
              </div>

            </div>
            <div className="subsection subsection--schedule-right">
              <h3 className="no-mobile">Starting monday, may 11 <br/>at 8:00 pm Eastern time</h3>
              <div className="program-section">
                <div className="program-section-item color--yellow type--bold">9:30 PM – 9:55 PM</div>
                <div className="program-section-item"> <span className="color--orange type--bold">Lightbox </span>Hosted by Mingna Li </div>
                <div className="program-section-item"> <span className="color--orange type--bold">Beyond Autopoiesis </span>Hosted by Morgan Mueller </div>
                <div className="program-section-item"> <span className="color--orange type--bold">Motor Y Cuerda </span>Hosted by David Azar </div>
              </div>

              <div className="program-section">
                <div className="program-section-item color--blue type--bold">INTERMISSION WITH LIPP TV HOST PROFESSOR LIPP</div>
              </div>

              <div className="program-section">
                <div className="program-section-item color--yellow type--bold">10:00 PM – 10:25 PM</div>
                <div className="program-section-item"> <span className="color--orange type--bold">Amago </span>Hosted by Marcela Mancino </div>
                <div className="program-section-item"> <span className="color--orange type--bold">Urban Dream </span>Hosted by Jingyi Wen </div>
                <div className="program-section-item"> <span className="color--orange type--bold">Dad Practice </span>Hosted by August Luhrs </div>
              </div>

              
              <div className="program-section">
                <div className="program-section-item color--blue type--bold">INTERMISSION WITH LIPP TV HOST PROFESSOR LIPP</div>
              </div>

              <div className="program-section">
                <div className="program-section-item color--yellow type--bold">10:30 PM – 10:55 PM</div>
                <div className="program-section-item"> <span className="color--orange type--bold">Lightbox </span>Hosted by Mingna Li </div>
                <div className="program-section-item"> <span className="color--orange type--bold">Beyond Autopoiesis </span>Hosted by Morgan Mueller </div>
                <div className="program-section-item"> <span className="color--orange type--bold">Motor Y Cuerda </span>Hosted by David Azar </div>
              </div>

              <div className="program-section">
                <div className="program-section-item color--blue type--bold">INTERMISSION WITH LIPP TV HOST PROFESSOR LIPP</div>
              </div>
            </div>
          </div>


          {/* CREDITS */}
          <div className="section section--double section--align-stretch" ref={p => this._creditsRef = p}>
            <div className="subsection">
              <img className="fake-h1" src="img/credits.svg"/>              
              <h3 className="only-mobile" style={{marginBottom: 20}}>MEET LIPP TV’S PRODUCTION TEAM<br/> WE’RE NOT JUST MATT ROMEINS</h3>

              <div className="program-section">
                <div style={{marginBottom: 0}} className="program-section-item color--blue type--bold">Matt Romein</div>
                <div className="program-section-item color--blue">EXECUTIVE PRODUCER, CEO & CCO & CFO</div>
              </div>

              <div className="program-section">
                <div style={{marginBottom: 0}} className="program-section-item color--green type--bold">Matt Romein</div>
                <div className="program-section-item color--green">EXECUTIVE PRODUCER, CEO & CCO & CFO</div>
              </div>

              <div className="program-section">
                <div style={{marginBottom: 0}} className="program-section-item color--blue type--bold">Matt Romein</div>
                <div className="program-section-item color--blue">EXECUTIVE PRODUCER, CEO & CCO & CFO</div>
              </div>

              <div className="program-section">
                <div style={{marginBottom: 0}} className="program-section-item color--green type--bold">Matt Romein</div>
                <div className="program-section-item color--green">EXECUTIVE PRODUCER, CEO & CCO & CFO</div>
              </div>

              <div className="program-section">
                <div style={{marginBottom: 0}} className="program-section-item color--blue type--bold">Matt Romein</div>
                <div className="program-section-item color--blue">EXECUTIVE PRODUCER, CEO & CCO & CFO</div>
              </div>

            </div>
            <div className="subsection subsection--schedule-right">   
              <h3 className="no-mobile" >MEET LIPP TV’S PRODUCTION TEAM<br/> WE’RE NOT JUST MATT ROMEINS</h3>
              <div className="program-section">
                <div style={{marginBottom: 0}} className="program-section-item color--green type--bold">Matt Romein</div>
                <div className="program-section-item color--green">EXECUTIVE PRODUCER, CEO & CCO & CFO</div>
              </div>

              <div className="program-section">
                <div style={{marginBottom: 0}} className="program-section-item color--blue type--bold">Matt Romein</div>
                <div className="program-section-item color--blue">EXECUTIVE PRODUCER, CEO & CCO & CFO</div>
              </div>

              <div className="program-section">
                <div style={{marginBottom: 0}} className="program-section-item color--green type--bold">Matt Romein</div>
                <div className="program-section-item color--green">EXECUTIVE PRODUCER, CEO & CCO & CFO</div>
              </div>

              <div className="program-section">
                <div style={{marginBottom: 0}} className="program-section-item color--blue type--bold">Matt Romein</div>
                <div className="program-section-item color--blue">EXECUTIVE PRODUCER, CEO & CCO & CFO</div>
              </div>

              <div className="program-section">
                <div style={{marginBottom: 0}} className="program-section-item color--green type--bold">Matt Romein</div>
                <div className="program-section-item color--green">EXECUTIVE PRODUCER, CEO & CCO & CFO</div>
              </div>

            </div>
          </div>

          <div className="section section--footer section--align-stretch">
            {/* <img src="/img/logo.png"/> */}
            <div style={{height: '75px'}}></div>
          </div>

        </div>
      </div>
    )
  }
}

Home.defaultProps = {
  streamActive: false,
  channelName: 'lipp_tv_'
}

export default Home