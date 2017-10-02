import findKey from 'lodash/fp/findKey'

export const slugify = (string = '') =>
  string
    .trim()
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/:|\/|\?|#|\[|\]|@|!|\$|&|'|\(|\)|\*|\+|,|;|=|%|\./g, '-')
    .replace(/--+/g, '-')

export const sanitize = values => {
  const { email, title, name, slug } = values

  return Object.assign(
    values,
    email && { email: email.trim() },
    title && { title: title.trim() },
    name && { name: name.trim() },
    slug && { slug: slugify(slug) }
  )
}

export const match = props => ({ user }) =>
  props.match.params.user === user.slug

export const getProject = ({ auth, projects, user }, props) => {
  const { list } = projects
  const { project } = props.match.params
  const projectKey = findKey(['slug', project])(list)
  const isOwned = match(props)(auth)
  const { user: _user } = isOwned ? auth : user
  return { project: list[projectKey], projectKey, isOwned, user: _user }
}
