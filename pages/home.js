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
    currentlyOpenItem: null
  }

  constructor({ activeSlug }) {
    super();
  }

  static async getInitialProps({ req }) {
    return { projects }
  }

  componentDidMount() {
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

  getProductComponent(p, index, type) {
    const { currentlyOpenItem } = this.state
    
    return (
      <Product 
        key={`project-${type}-${index}`} 
        client={p.client} 
        title={p.title}
        thumbnail={p.thumbnail}
        video={p.video}
        onClick={this.onItemClick(p.id)}
        open={p.id == currentlyOpenItem}
        anotherOpen={p.id != currentlyOpenItem && currentlyOpenItem != null}
      />
    )
  }

  render() {
    const { projects } = this.props 
    
    return (
      <div className="container">
        <div className="module">
          <div className="hero__image" />
          <div className="hero__footer">
            Creative - production - post - studio
          </div>
        </div>
        <div className="module">
          <div className="module__header-lg">
            <Creative />
          </div>
          <div className="module__product-list">
            { projects.creative && projects.creative.map((p, index) => this.getProductComponent(p, index, 'creative'))}
          </div>
        </div>
        <div className="module">
          <div className="module__header-lg">
            <Production />
          </div>
          <div className="module__product-list">
            { projects.production && projects.production.map((p, index) => this.getProductComponent(p, index, 'production'))}
          </div>
        </div>
        <div className="module">
          <div className="module__header-lg">
            <Post />
          </div>
          <div className="module__product-list">
            { projects.post && projects.post.map((p, index) => this.getProductComponent(p, index, 'post'))}
          </div>
        </div>

        <div className="module"></div>
      </div>
    )
  }
}
