import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateFeature, deleteFeature } from '../../actions/feature'
import styles, { colors } from '../../styles'
import Button from '../../components/Button'
import { Delete } from '../../components/Icons'
import Spec from '../Spec'
import SpecCreate from '../Spec/Create'

const propTypes = {
  projectKey: PropTypes.string.isRequired,
  featureKey: PropTypes.string.isRequired,
  feature: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  specs: PropTypes.object.isRequired,
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
    const { name } = this.state

    return (
      <h2 style={{ display: 'flex' }}>
        <input
          style={{ flex: 1, ...styles.input }}
          value={name}
          onChange={this.setName}
          onKeyPress={this.handleKeyPress}
        />

        <Button variant={{ flex: 'none' }} onClick={this.delete}>
          <Delete color={colors.silver} />
        </Button>
      </h2>
    )
  }

  specs = () => {
    const { projectKey, featureKey, specs } = this.props

    return (
      !!specs.order.length && (
        <section>
          {specs.order.map(key => (
            <Spec
              projectKey={projectKey}
              featureKey={featureKey}
              specKey={key}
              specs={specs}
              spec={specs.list[key]}
              key={key}
            />
          ))}
        </section>
      )
    )
  }

  render() {
    const { projectKey, featureKey } = this.props

    return (
      <article style={{ lineHeight: 1.75, marginBottom: '1rem' }}>
        {this.title()}
        {this.specs()}
        <SpecCreate projectKey={projectKey} featureKey={featureKey} />
      </article>
    )
  }
}

Feature.propTypes = propTypes

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateFeature, deleteFeature }, dispatch)

export default connect(null, mapDispatchToProps)(Feature)
