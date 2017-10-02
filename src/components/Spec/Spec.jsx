import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateSpec, deleteSpec } from 'actions/spec'
import { colors } from 'styles'
import { File, Delete } from 'Icons'
import Checkbox from './Checkbox'
import Name from './Name'
import Meta from './Meta'
import Menu from './Menu'
import Subspecs from './Subspecs'

const propTypes = {
  projectKey: PropTypes.string.isRequired,
  featureKey: PropTypes.string.isRequired,
  specKey: PropTypes.string.isRequired,
  spec: PropTypes.object.isRequired,
  specs: PropTypes.object.isRequired,
  updateSpec: PropTypes.func.isRequired,
  deleteSpec: PropTypes.func.isRequired
}

class Spec extends Component {
  state = { name: this.props.spec.name, hover: false }

  handleKeyPress = e => {
    e.key === 'Enter' && this.updateName()
  }

  showMenu = () => {
    this.setState({ hover: true })
  }

  hideMenu = () => {
    this.setState({ hover: false })
  }

  toggleCompleted = () => {
    const { spec: { completed } } = this.props
    this.update({ completed: !completed })
  }

  setName = e => {
    this.setState({ name: e.target.value })
  }

  updateName = () => {
    const { name } = this.state
    this.update({ name: name.trim() })
  }

  updateFilename = () => {
    const { spec: { isSyncing } } = this.props
    const _filename = (!isSyncing && window.prompt('Type a filename')) || ''
    const filename = _filename.trim()
    filename && this.update({ filename })
  }

  update = updates => {
    const { projectKey, featureKey, specKey } = this.props
    const { spec: { isSyncing }, updateSpec } = this.props
    !isSyncing && updateSpec(projectKey, featureKey, specKey, updates)
  }

  delete = () => {
    const { projectKey, featureKey, specKey } = this.props
    const { spec: { name, isSyncing }, deleteSpec } = this.props
    !isSyncing &&
      window.confirm(`Delete '${name}'?`) &&
      deleteSpec(projectKey, featureKey, specKey)
  }

  render() {
    const { spec, specs } = this.props
    const { name, hover } = this.state
    const { completed = false, subspecs = [] } = spec
    const hasSubspecs = !!subspecs.length

    const props = {
      Line: {
        style: {
          display: 'flex',
          alignItems: 'center',
          opacity: completed && 0.25
        },
        onMouseEnter: this.showMenu,
        onMouseLeave: this.hideMenu
      },

      Checkbox: {
        checked: completed,
        onClick: this.toggleCompleted
      },

      Name: {
        name,
        onChange: this.setName,
        onKeyPress: this.handleKeyPress,
        variant: { flex: 1 }
      },

      Meta: {
        labels: spec.labels,
        filename: spec.filename
      },

      Menu: {
        menu: [
          {
            label: 'filename',
            icon: <File color={colors.gray} />,
            action: this.updateFilename
          },
          {
            label: 'delete',
            icon: <Delete color={colors.gray} />,
            action: this.delete
          }
        ],
        variant: { visibility: hover ? 'visible' : 'hidden' }
      }
    }

    return (
      <article>
        <section {...props.Line}>
          <Checkbox {...props.Checkbox} />
          <Name {...props.Name} />
          <Meta {...props.Meta} />
          <Menu {...props.Menu} />
        </section>

        {hasSubspecs && <Subspecs subspecs={subspecs} specs={specs} />}
      </article>
    )
  }
}

Spec.propTypes = propTypes

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateSpec, deleteSpec }, dispatch)

export default connect(null, mapDispatchToProps)(Spec)
