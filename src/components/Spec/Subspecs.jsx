import React from 'react'
import PropTypes from 'prop-types'
import Spec from './Spec'

const propTypes = {
  subspecs: PropTypes.array.isRequired,
  specs: PropTypes.object.isRequired
}

const Subspecs = ({ subspecs, ...props }) =>
  subspecs.map(key => (
    <Spec
      {...props}
      isSubspec={true}
      parentKey={props.specKey}
      specKey={key}
      spec={props.specs.list[key]}
      variant={{ paddingLeft: '1.5rem' }}
      key={key}
    />
  ))

Subspecs.propTypes = propTypes

export default Subspecs
