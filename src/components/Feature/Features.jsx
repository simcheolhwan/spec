import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProject } from '../../utils'
import Page from '../Page'
import Feature from './Feature'
import FeatureCreate from './FeatureCreate'

const propTypes = {
  features: PropTypes.object.isRequired,
  specs: PropTypes.object.isRequired,
  projectKey: PropTypes.string.isRequired
}

const Features = ({ features, specs, projectKey }) => (
  <Page
    title="Features"
    actions={[<FeatureCreate projectKey={projectKey} key="Featurecreate" />]}
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

Features.propTypes = propTypes

const mapStateToProps = ({ projects, features, specs }, ownProps) => ({
  ...getProject(ownProps)(projects),
  features,
  specs
})

export default connect(mapStateToProps)(Features)
