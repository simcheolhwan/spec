import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const propTypes = {
  name: PropTypes.string,
  slug: PropTypes.string.isRequired
}

const defaultProps = {
  name: ''
}

const Profile = ({ name, slug }) => (
  <article>
    {name ? (
      <header>
        <h1>{name}</h1>
        <p>
          <code>{slug}</code>
        </p>
      </header>
    ) : (
      <header>
        <h1>{slug}</h1>
      </header>
    )}
  </article>
)

Profile.propTypes = propTypes
Profile.defaultProps = defaultProps

const mapStateToProps = ({ user }) => user.user

export default connect(mapStateToProps)(Profile)
