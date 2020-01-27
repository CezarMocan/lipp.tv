import React from 'react'
import sanityClient, { queries } from '../modules/sanity'
import { projects } from '../modules/mock.js'

const sleep = (s) => new Promise((res, rej) => setTimeout(res, s * 1000))

const MainContext = React.createContext()

export default class MainContextProvider extends React.Component {
  state = {
    // projects: null
  }

  // fetchProjects = async () => {
  //   await sleep(1)
  //   this.setState({ projects })
  // }
}

export const withMainContext = (mapping) => Component => props => {
  return (
      <MainContext.Consumer>
          {(context) => <Component {...props} {...mapping(context, props)}/>}
      </MainContext.Consumer>
  )
}