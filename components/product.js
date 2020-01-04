import classnames from 'classnames'

export default class Product extends React.Component {
  state = {
    open: false
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  onClick = (e) => {
    const { open } = this.state
    this.setState({ open: !open }, () => {
      if (open || !this._ref) return
      this._ref.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  } 

  render() {
    const { client, title } = this.props
    const { open } = this.state

    const listItemCls = classnames({
      'module__product-list__item': true,
      'open': open
    })

    const accordionCls = classnames({
      'module__accordion-container': true,
      'open': open
    })

    return (
      <>
        <div ref={e => this._ref = e} className={listItemCls} onClick={this.onClick}>
          <strong>{client}</strong> {title}
        </div>

        <div className={accordionCls}>

        </div>
      </>
    )
  }
}

Product.defaultProps = {
  client: 'Client',
  title: 'Title'
}
