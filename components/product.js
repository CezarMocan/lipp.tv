import classnames from 'classnames'

export default class Product extends React.Component {
  state = {
    open: false
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  componentDidUpdate(oldProps, oldState) {
    const { open, anotherOpen } = this.props
    if (open != oldProps.open) {
      if (open) {
        // If the current accordion is opening, we update the state to open and scroll the element into view.
        this.setState({ open: true }, () => {
          if (this._ref) this._ref.scrollIntoView({ behavior: 'auto', block: 'start' })
        })
      } else {
        if (anotherOpen) {
          // If the current accordion is closing because another one has opened, 
          // we wait until after the other accordion has opened.
          setTimeout(() => {
            this.setState({ open: false })
          }, 500)  
        } else {
          // If the current accordion is closing because it has been clicked,
          // we close it directly.
          this.setState({ open: false })
        }
      }
    }
  }

  onClick = (e) => {
    const { onClick } = this.props
    if (onClick) onClick(e)
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
      <div ref={e => this._ref = e}>
        <div className={listItemCls} onClick={this.onClick}>
          <strong>{client}</strong> {title}
        </div>

        <div className={accordionCls}>

        </div>
      </div>
    )
  }
}

Product.defaultProps = {
  client: 'Client',
  title: 'Title',
  open: false,
  anotherOpen: false,
  onClick: null
}
