import React from 'react'
import "../styles/styles.scss";
import { withRouter } from 'next/router'
import ContextProvider from '../context/main'
import Main from '../components/main'
import sanityClient, { allProjectsQuery, creativeProjectsQuery, productionProjectsQuery, postProjectsQuery } from '../modules/sanity'
import { projects as mockProjects } from '../modules/mock.js'

const sleep = (s) => new Promise((res, rej) => setTimeout(res, s * 1000))

class Home extends React.Component {
  static async getInitialProps(ctx) {    
    const creative = await sanityClient.fetch(creativeProjectsQuery)
    const production = await sanityClient.fetch(productionProjectsQuery)
    const post = await sanityClient.fetch(postProjectsQuery)

    return {
      projects: {
        creative: creative.length ? creative[0].items : [],
        production: production.length ? production[0].items : [],
        post: post.length ? post[0].items : [],
      }
    }
  } 

  render() {    
    const { projects } = this.props
    console.log('sanity projects: ', projects)
    console.log('mock projects: ', mockProjects)
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