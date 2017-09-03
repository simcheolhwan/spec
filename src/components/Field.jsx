import React from 'react'
import PropTypes from 'prop-types'
import { slugify } from '../helpers/utils'

const propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    checked: PropTypes.bool
  }).isRequired,
  meta: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool
}

const defaultProps = {
  autoFocus: false
}

const Field = ({ label, input, meta, ...rest }) => (
  <div>
    <label htmlFor={input.name} style={{ display: 'block' }}>
      {label}
    </label>

    <input {...input} {...rest} id={input.name} />
    {input.name === 'slug' && <code>{slugify(input.value)}</code>}
  </div>
)

Field.propTypes = propTypes
Field.defaultProps = defaultProps

export default Field
