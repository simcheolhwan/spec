import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { match, getProject } from '../../utils'
import Page from '../Page'
import Feature from './Feature'
import FeatureCreate from './FeatureCreate'

const propTypes = {
  features: PropTypes.object.isRequired,
  specs: PropTypes.object.isRequired,
  projectKey: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired
}

const Features = ({ features, specs, projectKey, isOwner }) =>
  [
    { label: 'Features', data: 'order' },
    { label: 'Issues', data: 'issues' }
  ].map(item => (
    <Page
      title={item.label}
      actions={
        isOwner
          ? [
              <FeatureCreate
                isIssue={item.data === 'issues'}
                projectKey={projectKey}
                key="FeatureCreate"
              />
            ]
          : []
      }
      key={item.label}
    >
      {features[item.data].map(key => (
        <Feature
          projectKey={projectKey}
          featureKey={key}
          feature={features.list[key]}
          specs={{ list: specs.list, order: specs.orders[key] || [] }}
          isOwner={isOwner}
          key={key}
        />
      ))}
    </Page>
  ))

Features.propTypes = propTypes

const mapStateToProps = ({ auth, projects, features, specs }, ownProps) => ({
  ...getProject(ownProps)(projects),
  features,
  specs,
  isOwner: match(ownProps)(auth)
})

export default connect(mapStateToProps)(Features)
