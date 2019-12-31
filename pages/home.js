import Router from 'next/router';
import { get } from 'dotty';
import "../styles/styles.scss";

export default class Home extends React.Component {

  constructor({ activeSlug }) {
    super();
    this.state = {}
  }

  static async getInitialProps({ req }) {
    return {}
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="">
        <div className="module">
          <div className="hero__image" />
          <div className="hero__footer">
            Creative - production - post -studio
          </div>
        </div>
        <div className="module">
          <div className="module__header-lg">
            Creative
          </div>
          <div className="module__product-list">
            <div className="module__product-list__item">
              <strong>Burger King</strong> 12 Days of Cheesemas
            </div>
            <div className="module__product-list__item">
              <strong>Frida Baby</strong> Trust us your vagina will thank you
            </div>
            <div className="module__product-list__item">
              <strong>Nike</strong> Pool Party
            </div>
          </div>
        </div>
        <div className="module">
          <div className="module__header-lg">
            Production
          </div>
          <div className="module__product-list">
            <div className="module__product-list__item">
              <strong>New York Times</strong> Oh Blah
            </div>
            <div className="module__product-list__item">
              <strong>Daft Punk</strong> Reh Reh Reh
            </div>
          </div>
        </div>
        <div className="module">
          <div className="module__header-lg">
            Post
          </div>
          <div className="module__product-list">
            <div className="module__product-list__item">
              <strong>Burger King</strong> 12 Days of Cheesemas
            </div>
            <div className="module__product-list__item">
              <strong>Frida Baby</strong> Trust us your vagina will thank you
            </div>
            <div className="module__product-list__item">
              <strong>Nike</strong> Pool Party
            </div>
          </div>
        </div>
      </div>
    )
  }
}
