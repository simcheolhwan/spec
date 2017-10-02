import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signout } from 'actions/authActions'

const propTypes = {
  signout: PropTypes.func.isRequired
}

class Signout extends Component {
  componentWillMount() {
    this.props.signout()
  }

  render() {
    return <Redirect to="/" />
  }
}

Signout.propTypes = propTypes

const mapDispatchToProps = dispatch => bindActionCreators({ signout }, dispatch)

export default connect(null, mapDispatchToProps)(Signout)
