import React from 'react'
import sanityClient, { queries } from '../modules/sanity'
import { projects } from '../modules/mock.js'

const sleep = (s) => new Promise((res, rej) => setTimeout(res, s * 1000))

const MainContext = React.createContext()

export default class MainContextProvider extends React.Component {
  state = {
    // projects: null
  }

  render() {
    const context = { ...this.state }
    const { children } = this.props

    return (
        <MainContext.Provider value={context}>
            { children }
        </MainContext.Provider>
    )
  }
}

export const withMainContext = (mapping) => Component => props => {
  return (
      <MainContext.Consumer>
          {(context) => <Component {...props} {...mapping(context, props)}/>}
      </MainContext.Consumer>
  )
}