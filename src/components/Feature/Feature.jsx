import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateFeature, deleteFeature } from '../../actions/featureActions'
import styles, { colors } from '../../styles'
import { Delete, File } from '../Icons'
import Spec from '../Spec/Spec'
import SpecCreate from '../Spec/SpecCreate'
import Menu from '../Spec/Menu'

const propTypes = {
  projectKey: PropTypes.string.isRequired,
  featureKey: PropTypes.string.isRequired,
  feature: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  specs: PropTypes.object.isRequired,
  isOwner: PropTypes.bool.isRequired,
  updateFeature: PropTypes.func.isRequired,
  deleteFeature: PropTypes.func.isRequired
}

class Feature extends Component {
  state = { name: this.props.feature.name }

  handleKeyPress = e => {
    e.key === 'Enter' && this.updateName()
  }

  setName = e => {
    this.setState({ name: e.target.value })
  }

  updateName = () => {
    const { name: _name } = this.state
    const name = _name.trim()
    name && this.update({ name })
  }

  update = updates => {
    const { projectKey, featureKey, updateFeature } = this.props
    updateFeature(projectKey, featureKey, updates)
  }

  delete = () => {
    const { projectKey, featureKey, deleteFeature } = this.props
    const { feature: { name } } = this.props
    window.confirm(`Delete '${name}'?`) && deleteFeature(projectKey, featureKey)
  }

  title = () => {
    const { isOwner } = this.props
    const { name } = this.state

    return (
      <input
        style={{ flex: 1, ...styles.input }}
        value={name}
        readOnly={!isOwner}
        onChange={this.setName}
        onKeyPress={this.handleKeyPress}
      />
    )
  }

  menu = () => {
    const props = {
      menu: [
        {
          label: 'filename',
          icon: <File color={colors.gray} />,
          action: () => undefined
        },
        {
          label: 'delete',
          icon: <Delete color={colors.gray} />,
          action: this.delete
        }
      ],
      variant: { visibility: true ? 'visible' : 'hidden' }
    }

    return <Menu {...props} />
  }

  specs = key => {
    const { projectKey, featureKey, specs, isOwner } = this.props

    return (
      <Spec
        projectKey={projectKey}
        featureKey={featureKey}
        specKey={key}
        specs={specs}
        spec={specs.list[key]}
        isOwner={isOwner}
        key={key}
      />
    )
  }

  render() {
    const { projectKey, featureKey, specs, isOwner } = this.props
    const style = { lineHeight: 1.75, marginBottom: isOwner ? '1rem' : '2rem' }

    return (
      <article style={style}>
        <h2 style={{ display: 'flex' }}>
          {this.title()}
          {isOwner && this.menu()}
        </h2>

        {!!specs.order.length && (
          <section>{specs.order.map(this.specs)}</section>
        )}

        {isOwner && (
          <SpecCreate projectKey={projectKey} featureKey={featureKey} />
        )}
      </article>
    )
  }
}

Feature.propTypes = propTypes

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateFeature, deleteFeature }, dispatch)

export default connect(null, mapDispatchToProps)(Feature)
