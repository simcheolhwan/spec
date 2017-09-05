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

const Field = ({ label, input, meta, type, ...rest }) => {
  const { name, value } = input
  const isCheckbox = type === 'checkbox'
  const isSlug = name === 'slug'
  const component = (
    <input
      {...input}
      {...rest}
      type={type}
      id={name}
      style={isCheckbox ? { marginRight: '.5rem' } : { width: '15rem' }}
    />
  )

  return (
    <div style={{ marginBottom: '1rem' }}>
      <section
        style={
          isCheckbox ? (
            { display: 'flex', alignItems: 'center' }
          ) : (
            { marginBottom: '.25rem' }
          )
        }
      >
        {isCheckbox && component}
        <label htmlFor={name} style={{ fontWeight: 600, userSelect: 'none' }}>
          {label}
        </label>
      </section>

      <section>
        {!isCheckbox && component}
        {isSlug && <code>{slugify(value)}</code>}
      </section>
    </div>
  )
}

Field.propTypes = propTypes
Field.defaultProps = defaultProps

export default Field
