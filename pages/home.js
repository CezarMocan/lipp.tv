import Router from 'next/router';
import { get } from 'dotty';
import "../styles/styles.scss";

import Creative from '../components/svg/creative.svg';
import Production from '../components/svg/production.svg';
import Post from '../components/svg/post.svg';
import Product from '../components/product'

import { projects } from '../modules/mock.js'

export default class Home extends React.Component {

  constructor({ activeSlug }) {
    super();
    this.state = {}
  }

  static async getInitialProps({ req }) {
    return { projects }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const { projects } = this.props 
    console.log('Projects: ', projects)
    return (
      <div className="">
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
            { projects.creative && projects.creative.map((p, index) => (
              <Product key={`project-creative-${index}`} client={p.client} title={p.title}/>
            ))}
          </div>
        </div>
        <div className="module">
          <div className="module__header-lg">
            <Production />
          </div>
          <div className="module__product-list">
            { projects.production && projects.production.map((p, index) => (
              <Product key={`project-production-${index}`} client={p.client} title={p.title}/>
            ))}
          </div>
        </div>
        <div className="module">
          <div className="module__header-lg">
            <Post />
          </div>
          <div className="module__product-list">
          <div className="module__product-list">
            { projects.post && projects.post.map((p, index) => (
              <Product key={`project-post-${index}`} client={p.client} title={p.title}/>
            ))}
          </div>
          </div>
        </div>
      </div>
    )
  }
}
