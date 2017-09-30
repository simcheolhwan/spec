import React from 'react'
import PropTypes from 'prop-types'
import Spec from '../../containers/Spec'

const propTypes = {
  subspecs: PropTypes.array.isRequired,
  specs: PropTypes.object.isRequired
}

const Subspecs = ({ subspecs, specs }) =>
  subspecs.map(key => <Spec spec={specs[key]} specs={specs} key={key} />)

Subspecs.propTypes = propTypes

export default Subspecs
