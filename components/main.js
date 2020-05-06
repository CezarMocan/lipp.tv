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
                  <span class="color--yellow">Network(ed) television</span> 
                  <span> in</span> the age of <span className="color--green">social distancing.</span> 
                </h2>
              </div>
              <div className="placeholder-text section-item">
                <h2>
                  WATCH LIPP TV LIVE<span class="color--orange"> on monday may 11th, 2020 7:30 pm – 10:00 pm</span> eastern time.
                  TUNE IN TO <span class="color--blue">THIS WEBSITE</span> or watch at <a class="color--yellow" href="https://www.twitch.tv/lipp_tv_" target="__blank">TWITCH</a> and <a className="color--yellow" href="https://www.google.com/url?q=https://www.youtube.com/channel/UCPWF2lJ4E_qVG7HrWRiGnhA/live&sa=D&ust=1588548850999000&usg=AFQjCNE1W4LnlR_wGPZAJq3jqMjSG7dIIw" target="__blank">Youtube</a>.                  
                </h2>
              </div>
              <div className="placeholder-text section-item">
                <h2>
                <span class="color--yellow">PARTICIPATE LIVE</span> IN THE <span class="color--blue">LIPP TV CHAT</span> BY LOGGING INTO YOUR <span class="color--orange">TWITCH ACCOUNT</span>. IF YOU DON’T HAVE A TWITCH ACCOUNT YOU CAN MAKE ONE <a className="color--yellow" href="https://www.twitch.com">HERE</a> BEFORE THE SHOW.
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
              <h3 className="light spaced-br">
              LIPP TV IS THE FINAL PERFORMANCE PROJECT OF THE LIVE IMAGE PROCESSING AND PERFORMANCE (LIPP) CLASS AT NYU’S ITP.
              </h3>
              <h3 className="light spaced-br">
              LIPP TV IS A CREATIVE RESPONSE TO HOW CODE, VIDEO NETWORKS, AND ART CAN BE USED TO CREATE A NEW EXPERIENCE IN LIVE PERFORMANCE. EACH STUDENT HAS CREATED THEIR OWN SHORT TV SHOW INFLUENCED BY VIDEO ART, EXPERIMENTAL ANIMATION, PUBLIC ACCESS TV, AND MORE. 
              </h3>
              <h3 className="light spaced-br">THIS ENTIRE EVENT WAS CREATED REMOTELY AND IS PERFORMED REMOTELY, WITH STUDENTS CREATING THE WEBSITE, COMMERCIALS, MUSIC, AND ANIMATIONS.</h3>
              <h3 className="light spaced-br">TUNE IN TO LIPP TV AND MAKE SURE TO JOIN THE CHAT AND TALK WITH OUR CREATORS AND PARTICIPATE IN THEIR SHOWS.</h3>              
            </div>
            <div className="subsection subsection--image">   
              <img className="about-image" src="/img/char2.png"/>           
            </div>
          </div>

          {/* PROGRAM */}
          <div className="section section--double section--align-start" ref={p => this._programRef = p}>
            <div className="subsection">
              <img className="fake-h1" src="img/programs.svg"/>
              <h3 className="only-mobile" style={{marginBottom: 20}}>Starting monday, may 11 <br/>at 7:30 pm Eastern time</h3>

              <div className="program-section">
                <div className="program-section-item color--yellow type--bold">7:30 PM – 8:00 PM</div>
              </div>
              <div className="program-section">
                <div className="program-section-item color--blue type--bold">INTRODUCTION WITH LIPP TV HOST PROFESSOR LIPP</div>
              </div>
              <div className="program-section">
                <div className="program-section-item"> <span className="color--orange type--bold">STEVE MCQUEEN’S GAME SHOW EXTRAVAGANZA </span>HOSTED BY <a href="http://nickbgrant.com/" className="color--yellow" target="__blank">STEVE MCQUEEN</a></div>
                <div className="program-section-item"> <span className="color--orange type--bold">MTV JAMS </span>Hosted by <a href="https://www.instagram.com/nkumarcreate/" target="__blank" className="color--yellow">NIKHIL KUMAR</a> </div>
                <div className="program-section-item"> <span className="color--orange type--bold">NO RESEARCH NATURE </span>Hosted by <span className="color--yellow">BEN MOLL</span> </div>
              </div>

              <div className="program-section">
                <div className="program-section-item color--yellow type--bold">8:00 PM – 8:30 PM</div>
              </div>
              <div className="program-section">
                <div className="program-section-item color--blue type--bold">SPECIAL GUEST INTERVIEWED BY PROFESSOR LIPP</div>
              </div>
              <div className="program-section">
                <div className="program-section-item"> <span className="color--orange type--bold">STREAM FIGHTER </span>HOSTED BY <a href="http://www.cdacanay.com/" target="__blank" className="color--yellow">Christina Dacanay</a> and <a href="http://cy-kim.com" target="__blank" className="color--yellow">Cy Kim</a> </div>
                <div className="program-section-item"> <span className="color--orange type--bold">OFFICE OLYMPICS </span>Hosted by <a href="https://www.instagram.com/cezarmocan/" target="__blank" className="color--yellow">Cezar Mocan</a> </div>
                <div className="program-section-item"> <span className="color--orange type--bold">RANDOM ACCESS MEMORIES </span>Hosted by <a href="https://www.instagram.com/sohailamosbeh/" target="__blank" className="color--yellow">SOHAILA MOSBEH</a> and <a href="https://www.instagram.com/yumminny/" target="__blank" className="color--yellow">YOUNG MIN CHOI</a> </div>
              </div>

              <div className="program-section">
                <div className="program-section-item color--yellow type--bold">8:30 PM – 9:00 PM</div>
              </div>
              <div className="program-section">
                <div className="program-section-item color--blue type--bold">SPECIAL GUEST INTERVIEWED BY PROFESSOR LIPP</div>
              </div>
              <div className="program-section">
                <div className="program-section-item"> <span className="color--orange type--bold">LIPP MUSIC STATION (LIPP C.A.R.E.) </span>HOSTED BY <a href="https://www.facebook.com/sachiko.nakajima.376" target="__blank" className="color--yellow">SACHIKO NAKAJIMA</a></div>
                <div className="program-section-item"> <span className="color--orange type--bold">MONDOFACTS </span>Hosted by <a href="https://squidgetx.github.io/" target="__blank" className="color--yellow">SYLVAN ZHENG</a> </div>
                <div className="program-section-item"> <span className="color--orange type--bold">VJ HALFTONE </span>Hosted by <a href="https://www.aidanlincoln.com/" target="__blank" className="color--yellow">AIDAN FOWLER</a></div>
              </div>

            </div>
            <div className="subsection subsection--schedule-right">
              <h3 className="no-mobile">Starting monday, may 11 <br/>at 7:30 pm Eastern time</h3>

              <div className="program-section">
                <div className="program-section-item color--yellow type--bold">9:00 PM – 9:30 PM</div>
              </div>
              <div className="program-section">
                <div className="program-section-item color--blue type--bold">SPECIAL GUEST INTERVIEWED BY PROFESSOR LIPP</div>
              </div>
              <div className="program-section">
                <div className="program-section-item"> <span className="color--orange type--bold">EASY LEARN MANDARIN </span>HOSTED BY <a href="https://www.instagram.com/wenandkuan/" target="__blank" className="color--yellow">WEN CHEN</a></div>
                <div className="program-section-item"> <span className="color--orange type--bold">LIFE CHANGING MANDARIN NAME </span>Hosted by <a href="https://www.vinceshao.com" target="__blank" className="color--yellow">VINCE MINGPU SHAO</a> </div>
                <div className="program-section-item"> <span className="color--orange type--bold">SHOWBIZ! </span>Hosted by <a href="https://www.instagram.com/stacyyyyuan/" target="__blank" className="color--yellow">STACY YUAN</a> </div>
              </div>

              <div className="program-section">
                <div className="program-section-item color--yellow type--bold">9:30 PM – 10:00 PM</div>
              </div>
              <div className="program-section">
                <div className="program-section-item color--blue type--bold">SPECIAL GUEST INTERVIEWED BY PROFESSOR LIPP</div>
              </div>
              <div className="program-section">
                <div className="program-section-item"> <span className="color--orange type--bold">IN THE MOMENT </span>HOSTED BY <a href="https://www.instagram.com/nailahfdavis/" target="__blank" className="color--yellow">NAILAH “LAYO” DAVIS</a></div>
                <div className="program-section-item"> <span className="color--orange type--bold">PURE MOODS </span>Hosted by <a href="https://www.instagram.com/octonomy/" target="__blank" className="color--yellow">OCTONOMY</a> and <a href="https://www.instagram.com/nic.cab/" target="__blank" className="color--yellow">NIC.CAB</a> </div>
                <div className="program-section-item"> <span className="color--orange type--bold">TOGETHER IN SYNTHETIC GARDENS </span>Hosted by <a href="https://www.instagram.com/carebearye/" target="__blank" className="color--yellow">CAREN YE</a> </div>
              </div>

              <div className="program-section">
                <div className="program-section-item color--blue type--bold">Thanks and wrap-up with PROFESSOR LIPP</div>
              </div>

            </div>
          </div>


          {/* CREDITS */}
          <div className="section section--double section--align-stretch" ref={p => this._creditsRef = p}>
            <div className="subsection">
              <img className="fake-h1" src="img/credits.svg"/>              
              <h3 className="only-mobile" style={{marginBottom: 20}}>MEET LIPP TV’S PRODUCTION TEAM<br/> THIS PROJECT WAS MADE POSSIBLE BY THE FOLLOWING PEOPLE</h3>

              <div className="program-section">
                <div style={{marginBottom: 0}} className="program-section-item color--blue type--bold"><a href="https://matt-romein.com/" target="__blank" className="color--blue">Matt Romein</a></div>
                <div className="program-section-item color--blue">EXECUTIVE PRODUCER & HOST</div>
              </div>

              <div className="program-section">
                <div style={{marginBottom: 0}} className="program-section-item color--green type--bold"><a href="https://carriesijiawang.com/" target="__blank" className="color--green">Carrie Wang</a></div>
                <div className="program-section-item color--green">CREATIVE DIRECTOR</div>
              </div>

              <div className="program-section">
                <div style={{marginBottom: 0}} className="program-section-item color--blue type--bold"><a href="https://cezar.io" target="__blank" className="color--blue">Cezar Mocan</a></div>
                <div className="program-section-item color--blue">WEB DEVELOPER</div>
              </div>

              <div className="program-section">
                <div style={{marginBottom: 0}} className="program-section-item color--green type--bold"><a href="https://cdacanay.com" target="__blank" className="color--green">CHRISTINA DACANAY</a></div>
                <div className="program-section-item color--green">Graphics and animation</div>
              </div>

              <div className="program-section">
                <div style={{marginBottom: 0}} className="program-section-item color--blue type--bold"><a href="https://www.instagram.com/carebearye/" target="__blank" className="color--blue">Caren Ye</a></div>
                <div className="program-section-item color--blue">GRAPHICS & ANIMATION</div>
              </div>

            </div>
            <div className="subsection subsection--credits-right">   
              <h3 className="no-mobile" >MEET LIPP TV’S PRODUCTION TEAM<br/> THIS PROJECT WAS MADE POSSIBLE BY THE FOLLOWING PEOPLE</h3>
              <div className="program-section">
                <div style={{marginBottom: 0}} className="program-section-item color--green type--bold"><a href="https://www.aidanlincoln.com/" target="__blank" className="color--green">Aidan Fowler</a></div>
                <div className="program-section-item color--green">GRAPHICS & ANIMATION</div>
              </div>

              <div className="program-section">
                <div style={{marginBottom: 0}} className="program-section-item color--blue type--bold"><a href="https://www.instagram.com/nkumarcreate/" target="__blank" className="color--blue">Nikhil Kumar</a></div>
                <div className="program-section-item color--blue">Music</div>
              </div>

              <div className="program-section">
                <div style={{marginBottom: 0}} className="program-section-item color--green type--bold"><a href="https://squidgetx.github.io/" target="__blank" className="color--green">SYLVAN ZHENG</a></div>
                <div className="program-section-item color--green">Music</div>
              </div>

              <div className="program-section">
                <div style={{marginBottom: 0}} className="program-section-item color--blue type--bold"><a href="https://www.bront.rodeo/index.html" target="__blank" className="color--blue">BRENT BAILEY</a></div>
                <div className="program-section-item color--blue">Head of advertising</div>
              </div>

              <h3 className="light" style={{marginTop: '25px'}}>LIPP TV is presented in collaboration with <a className="color--yellow" href="https://culturehub.org" target="__blank">CultureHub</a>.</h3>
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