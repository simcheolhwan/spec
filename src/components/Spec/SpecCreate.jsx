import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createSpec } from '../../actions/specActions'
import Name from './Name'
import Checkbox from './Checkbox'

const propTypes = {
  projectKey: PropTypes.string.isRequired,
  featureKey: PropTypes.string.isRequired,
  createSpec: PropTypes.func.isRequired
}

class SpecCreate extends Component {
  state = { name: '' }

  handleKeyPress = e => e.key === 'Enter' && this.create()
  setName = e => this.setState({ name: e.target.value })

  create = () => {
    const { projectKey, featureKey, createSpec } = this.props
    const { name: _name } = this.state
    const name = _name.trim()
    name && createSpec(projectKey, featureKey, { name })
    this.setState({ name: '' })
  }

  render() {
    const { name } = this.state

    return (
      <section style={{ display: 'flex', paddingLeft: '2.5rem' }}>
        <Checkbox variant={{ opacity: !name && 0 }} />
        <Name
          name={name}
          onChange={this.setName}
          onKeyPress={this.handleKeyPress}
        />
      </section>
    )
  }
}

SpecCreate.propTypes = propTypes

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createSpec }, dispatch)

export default connect(null, mapDispatchToProps)(SpecCreate)
