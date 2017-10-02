import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createFeature } from '../../actions/featureActions'

const propTypes = {
  projectKey: PropTypes.string.isRequired,
  createFeature: PropTypes.func.isRequired
}

const Create = ({ projectKey, createFeature }) => {
  const create = () => {
    const _name = window.prompt('Type a feature name') || ''
    const name = _name.trim()
    name && createFeature(projectKey, { name })
  }

  return <button onClick={create}>New feature</button>
}

Create.propTypes = propTypes

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createFeature }, dispatch)

export default connect(null, mapDispatchToProps)(Create)
