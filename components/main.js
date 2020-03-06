import { get } from 'dotty';
import classnames from 'classnames'
import "../styles/styles.scss"
import { withMainContext } from '../context/main'
import Product from '../components/product'
import Menu from '../components/Menu'
import GlobalCursorManager from '../modules/cursor'

class Home extends React.Component {
  state = {
    currentlyOpenItem: null,
    windowHeight: 0,
    listItemHeight: -1,
    menuOpen: false
  }

  constructor({ activeSlug }) {
    super();
    this.creativeContainerRef = React.createRef()
    this.productionContainerRef = React.createRef()
    this.postContainerRef = React.createRef()
  }

  componentWillMount() {
    // this.setState({ windowHeight: window.innerHeight })
  }

  componentDidMount() {
    this.setState({ windowHeight: window.innerHeight })
    GlobalCursorManager.register()
  }

  componentWillUnmount() {
    GlobalCursorManager.shutdown()
  }

  onItemClick = (id) => (e) => {
    const { currentlyOpenItem } = this.state
    if (currentlyOpenItem == id) {
      this.setState({ currentlyOpenItem: null })
    } else {
      this.setState({ currentlyOpenItem: id })
    }
  }

  onHamburgerClick = () => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  setListItemHeight = (ref) => {
    if (!this.hasListItemHeight) {
      this.hasListItemHeight = true
      this.setState({ listItemHeight: ref._ref.clientHeight - 1 })
    }
  }

  getProductComponent(p, index, type, contentHeight, containerRef) {
    const { currentlyOpenItem } = this.state

    return (
      <Product
        key={`project-${type}-${index}`}
        ref={r => this.setListItemHeight(r)}
        client={p.client}
        title={p.title}
        thumbnail={p.thumbnail}
        images={p.images}
        description={p.description}
        onClick={this.onItemClick(p.id)}
        open={p.id == currentlyOpenItem}
        contentHeight={contentHeight}
        containerRef={containerRef}
        anotherOpen={p.id != currentlyOpenItem && currentlyOpenItem != null}
      />
    )
  }

  render() {
    const { projects, about } = this.props
    const { windowHeight, listItemHeight, menuOpen } = this.state

    const contentHeights = {
      creative: windowHeight - listItemHeight * projects.creative.length,
      production: windowHeight - listItemHeight * projects.production.length,
      post: windowHeight - listItemHeight * projects.post.length,
    }

    const hamburgerStyle = classnames({
      'hamburger': true,
      'hamburger--squeeze': true,
      "is-active": menuOpen
    })

    return (
      <div className="container">
        <div className="module">
          <div className="hero__image">
            <img src="/img/header-film-strip.png" className="hero__image__component film"/>
            <img src="/img/header-thinker.png" className="hero__image__component thinker"/>
            <img src="/img/header-eye3.png" className="hero__image__component eye"/>
            <img src="/img/header-rose.png" className="hero__image__component rose"/>
            <a href="/"><img src="/img/logo.png" className="hero__image__component logo"/></a>
            <div className="hero__image__component script">a creative production studio</div>

            <div className="hero__image__component footer">
              <a href="#creative">creative</a> - <a href="#production">production</a> - <a href="#post">post</a> - <a href="#studio">studio</a>
            </div>
          </div>
        </div>
        <div className="module" ref={this.creativeContainerRef}>
          <div className="module__header-lg creative" style={{ height: contentHeights.creative }}></div>
          <div className="module__header-lg creative-img" style={{ height: contentHeights.creative }}></div>
          <div className="module__product-list">
            { projects.creative && projects.creative.map((p, index) => this.getProductComponent(p, index, 'creative', contentHeights.creative, this.creativeContainerRef))}
          </div>
        </div>
        <div className="module" ref={this.productionContainerRef}>
          <div className="module__header-lg production" style={{ height: contentHeights.production }}></div>
          <div className="module__header-lg production-img" style={{ height: contentHeights.production }}></div>
          <div className="module__product-list">
            { projects.production && projects.production.map((p, index) => this.getProductComponent(p, index, 'production', contentHeights.production, this.productionContainerRef))}
          </div>
        </div>
        <div className="module" ref={this.postContainerRef}>
          <div className="module__header-lg post" style={{ height: contentHeights.post }}></div>
          <div className="module__header-lg post-img" style={{ height: contentHeights.post }}></div>
          <div className="module__product-list">
            { projects.post && projects.post.map((p, index) => this.getProductComponent(p, index, 'post', contentHeights.post, this.postContainerRef))}
          </div>
        </div>

        <div className="module"></div>

        <Menu isOpen={menuOpen} about={about}/>

        <div className="header">
          <div></div>
          <div></div>
          <div className="hamburger-container">
            <button class={hamburgerStyle} type="button" onClick={this.onHamburgerClick}>
              <span class="hamburger-box">
                <span class="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default withMainContext((context, props) => ({
  // about: context.about,
  // projects: context.projects,

  // toggleMouseTracker: context.action.toggleMouseTracker,
}))(Home)