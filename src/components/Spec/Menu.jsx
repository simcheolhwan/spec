import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'

const propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      action: PropTypes.func.isRequired
    })
  ).isRequired,
  variant: PropTypes.object
}

const defaultProps = {
  variant: {}
}

const Menu = ({ menu, variant }) => (
  <aside style={{ ...style, ...variant }}>
    {menu.map(({ icon, label, action }) => (
      <Button onClick={action} key={label}>
        {icon}
      </Button>
    ))}
  </aside>
)

Menu.propTypes = propTypes
Menu.defaultProps = defaultProps

const style = {
  display: 'flex',
  alignSelf: 'stretch'
}

export default Menu
