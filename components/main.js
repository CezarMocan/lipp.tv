import React from 'react'
import { get } from 'dotty';
import classnames from 'classnames'
import "../styles/styles.scss"
import Header from './header'
import { scrollTo } from './utils'

const IS_STREAM_ACTIVE = false
const MENU = {
  ABOUT: 'About',
  PROGRAMS: 'Programs',
  CREDITS: 'Credits',
  WATCH_LIVE: 'Watch Live'
}

class Home extends React.Component {
  state = {
    highlight: MENU.WATCH_LIVE
  }

  constructor({ activeSlug }) {
    super();
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.setState({ 
      TwitchEmbedVideo: require('react-twitch-embed-video')
    })
    this.onScroll()
  }

  componentWillUnmount() {
  }

  onScroll = (e) => {
    console.log('onScroll', window.scrollY)
    let newHighlight = MENU.WATCH_LIVE
    if (this._aboutRef.getBoundingClientRect().top < 60) newHighlight = MENU.ABOUT
    if (this._programRef.getBoundingClientRect().top < 50) newHighlight = MENU.PROGRAMS
    if (this._creditsRef.getBoundingClientRect().top < 60) newHighlight = MENU.CREDITS
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
    const { TwitchEmbedVideo, highlight } = this.state
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
          { !IS_STREAM_ACTIVE && 
            <div className="twitch-stream-placeholder section" ref={p => this._wlRef = p}>
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
                  as well as on <a class="color--yellow">TWITCH</a>, <a class="color--yellow">FACEBOOK</a>
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
          { IS_STREAM_ACTIVE &&
            <div className="twitch-stream section" ref={p => this._wlRef = p}>
              { TwitchEmbedVideo && <TwitchEmbedVideo
                autoplay
                channel="mattromein"
                height="480"
                muted={false}
                targetId="twitch-embed"
                width="940"
              /> }
            </div>          
          }
          {/* ABOUT */}
          <div className="section section--wide" ref={p => this._aboutRef = p}>
            <div className="subsection subsection--dark subsection--text">
              <img className="fake-h1" src="img/about.svg"/>
              <h3 className="large">
                LIPP TV is Oreped unt etumquu ntectet quis eatem essit velia comniatios dest optas reperestiae exceria nimuscia voluptatur aut aut rem volupta quosae eaquam, consequature cotem quia. Incius et res deniet aligenissi volupta ium nimusam expe si iuri quae nesto tem quam repro blaborpos magnam fugias inissequam quosanditis maxim nobitem et explitium aditio. 
              </h3>
            </div>
            <div className="subsection subsection--image">   
              <img className="about-image" src="/img/face.png"/>           
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
          <div className="section section--wide section--align-stretch" ref={p => this._creditsRef = p}>
            <div className="subsection subsection--dark subsection--text">
              <img className="fake-h1" src="img/credits.svg"/>              
              <h3>MEET LIPP TV’S PRODUCTION TEAM<br/> WE’RE NOT JUST MATT ROMEINS</h3>
            </div>
            <div className="subsection subsection--dark subsection--credits">   
            <div className="program-section">
                <h3 style={{marginBottom: 0}} className="program-section-item color--blue">Matt Romein</h3>
                <div className="program-section-item color--blue type--bold">EXECUTIVE PRODUCER, CEO & CCO & CFO</div>
              </div>

              <div className="program-section">
                <h3 style={{marginBottom: 0}} className="program-section-item color--green">Matt Romein</h3>
                <div className="program-section-item color--green type--bold">EXECUTIVE PRODUCER, CEO & CCO & CFO</div>
              </div>

              <div className="program-section">
                <h3 style={{marginBottom: 0}} className="program-section-item color--blue">Matt Romein</h3>
                <div className="program-section-item color--blue type--bold">EXECUTIVE PRODUCER, CEO & CCO & CFO</div>
              </div>

              <div className="program-section">
                <h3 style={{marginBottom: 0}} className="program-section-item color--green">Matt Romein</h3>
                <div className="program-section-item color--green type--bold">EXECUTIVE PRODUCER, CEO & CCO & CFO</div>
              </div>

              <div className="program-section">
                <h3 style={{marginBottom: 0}} className="program-section-item color--blue">Matt Romein</h3>
                <div className="program-section-item color--blue type--bold">EXECUTIVE PRODUCER, CEO & CCO & CFO</div>
              </div>                     
              <div className="program-section">
                <h3 style={{marginBottom: 0}} className="program-section-item color--green">Matt Romein</h3>
                <div className="program-section-item color--green type--bold">EXECUTIVE PRODUCER, CEO & CCO & CFO</div>
              </div>

              <div className="program-section">
                <h3 style={{marginBottom: 0}} className="program-section-item color--blue">Matt Romein</h3>
                <div className="program-section-item color--blue type--bold">EXECUTIVE PRODUCER, CEO & CCO & CFO</div>
              </div>

              <div className="program-section">
                <h3 style={{marginBottom: 0}} className="program-section-item color--green">Matt Romein</h3>
                <div className="program-section-item color--green type--bold">EXECUTIVE PRODUCER, CEO & CCO & CFO</div>
              </div>

              <div className="program-section">
                <h3 style={{marginBottom: 0}} className="program-section-item color--blue">Matt Romein</h3>
                <div className="program-section-item color--blue type--bold">EXECUTIVE PRODUCER, CEO & CCO & CFO</div>
              </div>

              <div className="program-section">
                <h3 style={{marginBottom: 0}} className="program-section-item color--green">Matt Romein</h3>
                <div className="program-section-item color--green type--bold">EXECUTIVE PRODUCER, CEO & CCO & CFO</div>
              </div>

            </div>
          </div>

          <div className="section section--footer section--align-stretch">
            <img src="/img/logo.png"/>
          </div>

        </div>
      </div>
    )
  }
}

export default Home