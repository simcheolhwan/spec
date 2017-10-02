import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProject } from '../../utils'
import { fetchFeatures } from '../../actions/feature'
import { fetchSpecs } from '../../actions/spec'
import Page from '../Page'
import Feature from './Feature'
import FeatureCreate from './FeatureCreate'

const propTypes = {
  features: PropTypes.object.isRequired,
  specs: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  projectKey: PropTypes.string.isRequired,
  fetchFeatures: PropTypes.func.isRequired,
  fetchSpecs: PropTypes.func.isRequired
}

class Features extends Component {
  componentWillMount() {
    const { user: { uid }, projectKey, fetchFeatures, fetchSpecs } = this.props
    fetchFeatures(uid, projectKey)
    fetchSpecs(uid, projectKey)
  }

  render() {
    const { features, specs, projectKey } = this.props

    return (
      <Page
        title="Features"
        actions={[
          <FeatureCreate projectKey={projectKey} key="Featurecreate" />
        ]}
      >
        {features.order.map(key => (
          <Feature
            projectKey={projectKey}
            featureKey={key}
            feature={features.list[key]}
            specs={{ list: specs.list, order: specs.orders[key] || [] }}
            key={key}
          />
        ))}
      </Page>
    )
  }
}

Features.propTypes = propTypes

const mapStateToProps = (state, ownProps) => ({
  ...getProject(state, ownProps),
  features: state.features,
  specs: state.specs
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchFeatures, fetchSpecs }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Features)
