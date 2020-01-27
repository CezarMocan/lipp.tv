import "../styles/styles.scss";
import { withRouter } from 'next/router'
import ContextProvider from '../context/main'
import Main from '../components/main'
import sanityClient, { queries } from '../modules/sanity'
import { projects } from '../modules/mock.js'

const sleep = (s) => new Promise((res, rej) => setTimeout(res, s * 1000))

class Home extends React.Component {
  static async getInitialProps(ctx) {
    await sleep(1)
    const sanityProjects = await sanityClient.fetch(queries.allProjects)
    return { projects }
  } 

  render() {    
    return (
      <ContextProvider 
        url={this.props.router.query.id} 
        router={this.props.router}
      >
        <Main projects={projects}/>
      </ContextProvider>
    )
  }
}

export default withRouter(Home)