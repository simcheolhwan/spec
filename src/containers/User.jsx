import _ from 'lodash'
import React, { Component } from 'react'
import { database } from '../constants/firebase'

class User extends Component {
  constructor(props) {
    super(props)
    this.state = { key: '', name: '' }
  }

  componentWillMount() {
    const slug = this.props.match.params.user

    database
      .ref('/users')
      .once('value', snap => {
        const users = snap.val()
        const key = _.findKey(users, ['slug', slug])
        const user = users[key]
        this.setState({ key, ...user })
      })
      .catch(error => console.log(error))
  }

  render() {
    const { name } = this.state
    return <h1>{name}</h1>
  }
}

export default User
