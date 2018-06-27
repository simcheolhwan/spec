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

const data = { order: 'Features', issues: 'Issues' }

const Features = ({ showTitle, features, specs, projectKey, isOwner }) => {
  const renderColumn = key => {
    const create = { projectKey, isIssue: key === 'issues', key: 'Create' }
    const actions = isOwner ? [<FeatureCreate {...create} />] : []

    return (
      <Page title={showTitle && data[key]} actions={actions} key={key}>
        {features[key].map(renderFeature)}
      </Page>
    )
  }

  const renderFeature = key => {
    const feature = {
      projectKey,
      featureKey: key,
      feature: features.list[key],
      specs: { list: specs.list, order: specs.orders[key] || [] },
      isOwner,
      key
    }

    return <Feature {...feature} />
  }

  return Object.keys(data).map(renderColumn)
}

Features.propTypes = propTypes

const mapStateToProps = (
  { app, auth, projects, features, specs },
  ownProps
) => ({
  showTitle: !app.fullscreen,
  ...getProject(ownProps)(projects),
  features,
  specs,
  isOwner: match(ownProps)(auth)
})

export default connect(mapStateToProps)(Features)
