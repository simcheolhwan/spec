import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createFeature } from '../../actions/featureActions'

const propTypes = {
  isIssue: PropTypes.bool,
  projectKey: PropTypes.string.isRequired,
  createFeature: PropTypes.func.isRequired
}

const defaultProps = {
  isIssue: false
}

const FeatureCreate = ({ isIssue, projectKey, createFeature }) => {
  const create = () => {
    const _name = window.prompt('Type a feature name') || ''
    const name = _name.trim()
    const feature = Object.assign({ name }, isIssue && { issue: true })
    name && createFeature(projectKey, feature)
  }

  return <button onClick={create}>New feature</button>
}

FeatureCreate.propTypes = propTypes
FeatureCreate.defaultProps = defaultProps

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createFeature }, dispatch)

export default connect(null, mapDispatchToProps)(FeatureCreate)
