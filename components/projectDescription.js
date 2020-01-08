import classnames from 'classnames'

export default class ProjectDescription extends React.Component {
  state = {
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const { text } = this.props
    return (
      <div className="project-description__container">
        <p>{text}</p>
      </div>
    )
  }
}

ProjectDescription.defaultProps = {
    text: ''
}
