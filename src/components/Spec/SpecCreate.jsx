import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createSpec } from '../../actions/specActions'
import Name from './Name'

const propTypes = {
  projectKey: PropTypes.string.isRequired,
  featureKey: PropTypes.string.isRequired,
  createSpec: PropTypes.func.isRequired
}

class SpecCreate extends Component {
  state = { name: '' }

  handleKeyPress = e => {
    e.key === 'Enter' && this.create()
  }

  setName = e => {
    this.setState({ name: e.target.value })
  }

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
      <Name
        name={name}
        variant={{ paddingLeft: '1.5rem', display: 'block', width: '100%' }}
        onChange={this.setName}
        onKeyPress={this.handleKeyPress}
      />
    )
  }
}

SpecCreate.propTypes = propTypes

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createSpec }, dispatch)

export default connect(null, mapDispatchToProps)(SpecCreate)
