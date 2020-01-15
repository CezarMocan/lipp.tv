import Router from 'next/router';
import { get } from 'dotty';
import "../styles/styles.scss";

import Creative from '../components/svg/creative.svg';
import Production from '../components/svg/production.svg';
import Post from '../components/svg/post.svg';
import Product from '../components/product'

import { projects } from '../modules/mock.js'
import GlobalCursorManager from '../modules/cursor'

export default class Home extends React.Component {
  state = {
    currentlyOpenItem: null,
    windowHeight: 0,
    listItemHeight: -1
  }

  constructor({ activeSlug }) {
    super();
  }

  static async getInitialProps({ req }) {
    return { projects }
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

  setListItemHeight = (ref) => {
    if (!this.hasListItemHeight) {
      console.log('ref is: ', ref, ref._ref.clientHeight)
      this.hasListItemHeight = true
      this.setState({ listItemHeight: ref._ref.clientHeight })
    }
  }

  getProductComponent(p, index, type, contentHeight) {
    const { currentlyOpenItem } = this.state
    
    return (
      <Product 
        key={`project-${type}-${index}`}
        ref={r => this.setListItemHeight(r)}
        client={p.client} 
        title={p.title}
        thumbnail={p.thumbnail}
        assets={p.assets}
        description={p.description}
        onClick={this.onItemClick(p.id)}
        open={p.id == currentlyOpenItem}
        contentHeight={contentHeight}
        anotherOpen={p.id != currentlyOpenItem && currentlyOpenItem != null}
      />
    )
  }

  render() {
    const { projects } = this.props 
    const { windowHeight, listItemHeight } = this.state

    const contentHeights = {
      creative: windowHeight - listItemHeight * projects.creative.length,
      production: windowHeight - listItemHeight * projects.production.length,
      post: windowHeight - listItemHeight * projects.post.length,
    }
    
    return (
      <div className="container">
        <div className="module">
          <div className="hero__image" />
          <div className="hero__footer">
            Creative - production - post - studio
          </div>
        </div>
        <div className="module">
          <div className="module__header-lg creative" style={{ height: contentHeights.creative }}>
          </div>
          <div className="module__product-list">
            { projects.creative && projects.creative.map((p, index) => this.getProductComponent(p, index, 'creative', contentHeights.creative))}
          </div>
        </div>
        <div className="module">
          <div className="module__header-lg production" style={{ height: contentHeights.production }}>
          </div>
          <div className="module__product-list">
            { projects.production && projects.production.map((p, index) => this.getProductComponent(p, index, 'production', contentHeights.production))}
          </div>
        </div>
        <div className="module">
          <div className="module__header-lg post" style={{ height: contentHeights.post }}>
          </div>
          <div className="module__product-list">
            { projects.post && projects.post.map((p, index) => this.getProductComponent(p, index, 'post', contentHeights.post))}
          </div>
        </div>

        <div className="module"></div>
      </div>
    )
  }
}
