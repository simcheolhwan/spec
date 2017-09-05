import React from 'react'
import PropTypes from 'prop-types'
import { slugify } from '../helpers/utils'
import { BOLD } from '../styles'

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

  const labelContainerStyle = isCheckbox
    ? style.labelContainer.checkbox
    : style.labelContainer

  const inputProps = {
    ...input,
    ...rest,
    type,
    id: name,
    style: isCheckbox ? style.input.checkbox : style.input
  }

  const component = <input {...inputProps} />

  return (
    <div style={{ marginBottom: '1rem' }}>
      <section style={labelContainerStyle}>
        {isCheckbox && component}
        <label htmlFor={name} style={style.label}>
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

const style = {
  labelContainer: {
    marginBottom: '.25rem',
    checkbox: { display: 'flex', alignItems: 'center' }
  },

  label: {
    fontWeight: BOLD,
    userSelect: 'none'
  },

  input: {
    width: '15rem',
    checkbox: { marginRight: '.5rem' }
  }
}

export default Field
