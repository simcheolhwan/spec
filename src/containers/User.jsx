import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { database } from '../constants/firebase'

class User extends Component {
  constructor(props) {
    super(props)
    this.state = { user: {}, projects: {}, status: '', error: {} }
  }

  componentWillMount() {
    const slug = this.props.match.params.user
    this.getUser(slug)
  }

  getUser(slug) {
    database
      .ref('/users')
      .once('value', snap => {
        const users = snap.val()
        const uid = _.findKey(users, ['slug', slug])
        const user = { ...users[uid], uid }

        uid
          ? this.setState({ user }, () => this.getProjects())
          : this.setState({ status: 'done' })
      })
      .catch(error => this.setState({ error, status: 'error' }))
  }

  getProjects() {
    const { user } = this.state
    database
      .ref(`/projects/${user.uid}`)
      .once('value', snap =>
        this.setState({ projects: snap.val(), status: 'done' })
      )
      .catch(error => this.setState({ error, status: 'error' }))
  }

  renderProjects() {
    const { user, projects } = this.state

    return (
      <ul>
        {projects.order.map(key => (
          <li key={key}>
            <Link to={`/${user.slug}/${projects.list[key].slug}`}>
              {projects.list[key].title}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const { user, projects, status, error } = this.state

    return status
      ? error.message ||
        (user.uid ? (
          <article>
            <h1>{user.name}</h1>
            {projects.order ? this.renderProjects() : <p>No Projects</p>}
          </article>
        ) : (
          <article>
            <h1>Not Found</h1>
          </article>
        ))
      : null
  }
}

export default User
