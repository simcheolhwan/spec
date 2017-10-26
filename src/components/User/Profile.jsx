import React from 'react'
import PropTypes from 'prop-types'

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
        <h3>{name}</h3>
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

export default Profile
