import compact from 'lodash/fp/compact'
import dotProp from 'dot-prop-immutable'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as specActions from '../../actions/specActions'
import { colors } from '../../styles'
import { Sub, File, Delete, Label, Shipping, Comment, Flag } from '../Icons'
import Priority from './Priority'
import Checkbox from './Checkbox'
import Name from './Name'
import Meta from './Meta'
import Menu from './Menu'
import Description from './Description'
import Status from './Status'
import Subspecs from './Subspecs'

const propTypes = {
  projectKey: PropTypes.string.isRequired,
  featureKey: PropTypes.string.isRequired,
  specKey: PropTypes.string.isRequired,
  spec: PropTypes.object.isRequired,
  specs: PropTypes.object.isRequired,
  isOwner: PropTypes.bool.isRequired,
  updateSpec: PropTypes.func.isRequired,
  deleteSpec: PropTypes.func.isRequired
}

const OPACITY = 0.5
const OUTLINE = `hsla(208, 100%, 43%, ${OPACITY})`

class Spec extends Component {
  state = {
    name: this.props.spec.name,
    hover: false,
    description: this.props.spec.description,
    showDescription: false,
    showStatus: false
  }

  /* Spec */
  isSyncing = () => this.props.spec.isSyncing

  update = updates => {
    const { projectKey, featureKey, specKey } = this.props
    const { updateSpec } = this.props
    !this.isSyncing() && updateSpec(projectKey, featureKey, specKey, updates)
  }

  delete = () => {
    const { projectKey, featureKey, specKey } = this.props
    const { spec, deleteSpec } = this.props
    const { isSubspec, parentKey, deleteSubspec } = this.props
    !this.isSyncing() &&
      window.confirm(`Delete '${spec.name}'?`) &&
      (isSubspec
        ? deleteSubspec(projectKey, parentKey, specKey)
        : deleteSpec(projectKey, featureKey, specKey))
  }

  confirmDeleteMeta = (message, updates) => {
    !this.isSyncing() &&
      window.confirm(`Delete ${message}?`) &&
      this.update(updates)
  }

  /* Spec: Completed */
  toggleCompleted = () => {
    const { spec } = this.props
    this.update({
      completed: !spec.completed,
      completedAt: spec.completed ? null : new Date()
    })
  }

  /* Spec: Priority */
  setPriority = priority => this.update({ priority })
  setPriorityHigh = () => this.setPriority(1)
  setPriorityLow = () => this.setPriority(-1)
  unsetPriority = () => this.setPriority(null)

  /* Spec: Name */
  setName = e => this.setState({ name: e.target.value })
  handleKeyPress = e => e.key === 'Enter' && this.updateName()
  updateName = () => this.update({ name: this.state.name.trim() })

  /* Spec: Subspec */
  createSubspec = () => {
    const { projectKey, specKey } = this.props
    const { createSubspec } = this.props
    const _name =
      (!this.isSyncing() && window.prompt('Type a name of subspec')) || ''
    const name = _name.trim()
    name && createSubspec(projectKey, specKey, { name })
  }

  /* Spec: Label */
  createLabel = () => {
    const { labels: _labels = [] } = this.props.spec
    const _label = (!this.isSyncing() && window.prompt('Type a label')) || ''
    const label = _label.trim()
    const labels = [..._labels, label].sort()
    label && this.update({ labels })
  }

  deleteLabel = index => {
    const { labels: _labels } = this.props.spec
    const labels = dotProp.delete(_labels, index)
    this.confirmDeleteMeta(_labels[index], { labels })
  }

  /* Spec: Filename and Version */
  updateFilename = () => this.prompt('filename')
  deleteFilename = filename =>
    this.confirmDeleteMeta(filename, { filename: null })
  updateVersion = () => this.prompt('version')
  deleteVersion = version => this.confirmDeleteMeta(version, { version: null })

  /* Spec: Description */
  toggleDescription = showDescription =>
    this.setState(prevState => ({
      showDescription:
        typeof showDescription === 'boolean'
          ? showDescription
          : !prevState.showDescription
    }))

  setDescription = e => this.setState({ description: e.target.value })
  handleKeyPressDescription = e =>
    e.metaKey && e.key === 'Enter' && this.updateDescription()

  updateDescription = () => this.update({ description: this.state.description })

  /* Spec: Status */
  toggleStatus = showStatus =>
    this.setState(prevState => ({
      showStatus:
        typeof showStatus === 'boolean' ? showStatus : !prevState.showStatus
    }))

  updateStatus = status =>
    this.update({ status: status === this.props.spec.status ? null : status })

  /* Utility Functions */
  prompt = string => {
    const _input =
      (!this.isSyncing() && window.prompt(`Type a ${string}`)) || ''
    const input = _input.trim()
    input && this.update({ [string]: input })
  }

  /* Layout: Toggle Menu */
  showMenu = () => this.setState({ hover: true })
  hideMenu = () => this.setState({ hover: false })
  handleMouseLeave = () => {
    this.toggleDescription(false)
    this.toggleStatus(false)
    this.hideMenu()
  }

  render() {
    const { spec, isOwner, isSubspec } = this.props
    const { name, hover, description, showDescription, showStatus } = this.state
    const { completed = false, priority, subspecs = [] } = spec
    const hasSubspecs = !!subspecs.length

    /* Style */
    const opacity = completed && 0.25
    const _style = Object.assign(
      { ...style },
      isOwner && hover && { outline: `2px solid ${OUTLINE}`, zIndex: 1 }
    )

    const props = {
      Line: {
        style: {
          display: 'flex',
          alignItems: 'center'
        },
        onMouseEnter: this.showMenu,
        onMouseLeave: this.handleMouseLeave
      },

      Priority: {
        priority,
        variant: { downward: { marginRight: '.5rem' } },
        onClickUpward: isOwner
          ? priority === 1
            ? this.unsetPriority
            : this.setPriorityHigh
          : undefined,
        onClickDownward: isOwner
          ? priority === -1
            ? this.unsetPriority
            : this.setPriorityLow
          : undefined
      },

      Checkbox: {
        checked: completed,
        status: spec.status,
        variant: isSubspec && { marginLeft: '1.5rem' },
        onClick: isOwner ? this.toggleCompleted : undefined
      },

      Name: {
        name,
        onChange: this.setName,
        onKeyPress: this.handleKeyPress,
        readOnly: !isOwner,
        variant: { flex: 1, opacity }
      },

      Meta: {
        labels: {
          list: spec.labels || [],
          onDelete: this.deleteLabel
        },
        filename: {
          filename: spec.filename,
          onDelete: this.deleteFilename
        },
        version: {
          v: spec.version,
          variant: { opacity },
          onDelete: this.deleteVersion
        }
      },

      Menu: {
        menu: compact([
          !isSubspec && {
            label: 'subspec',
            icon: <Sub color={colors.gray} />,
            action: this.createSubspec
          },
          {
            label: 'label',
            icon: <Label color={colors.gray} />,
            action: this.createLabel
          },
          {
            label: 'filename',
            icon: <File color={colors.gray} />,
            action: this.updateFilename
          },
          {
            label: 'version',
            icon: <Shipping color={colors.gray} />,
            action: this.updateVersion
          },
          {
            label: 'description',
            icon: <Comment color={colors.gray} />,
            action: this.toggleDescription
          },
          {
            label: 'status',
            icon: <Flag color={colors.gray} />,
            action: this.toggleStatus
          },
          {
            label: 'delete',
            icon: <Delete color={colors.gray} />,
            action: this.delete
          }
        ]),
        variant: { visibility: hover ? 'visible' : 'hidden' }
      },

      Description: {
        description,
        onChange: this.setDescription,
        onKeyPress: this.handleKeyPressDescription,
        readOnly: !isOwner
      },

      Status: {
        status: spec.status,
        onSelect: this.updateStatus
      }
    }

    return (
      <article style={_style}>
        <section {...props.Line}>
          <Priority {...props.Priority} />
          <Checkbox {...props.Checkbox} />
          <Name {...props.Name} />
          <Meta {...props.Meta} />
          {isOwner && <Menu {...props.Menu} />}
          {showDescription && <Description {...props.Description} />}
          {showStatus && <Status {...props.Status} />}
          {spec.description && <div style={style.descriptionIndicator} />}
        </section>

        {hasSubspecs && <Subspecs {...this.props} subspecs={subspecs} />}
      </article>
    )
  }
}

Spec.propTypes = propTypes

const INDICATOR = 3

const position = {
  position: 'absolute',
  top: 0,
  right: 0
}

const style = {
  position: 'relative',

  descriptionIndicator: {
    ...position,
    width: 2 * INDICATOR,
    height: 2 * INDICATOR,
    border: `${INDICATOR}px solid transparent`,
    borderTopColor: 'black',
    borderRightColor: 'black'
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(specActions, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Spec)
