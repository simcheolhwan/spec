import _ from 'lodash'

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

export const getProject = ({ auth, projects, user }, props) => {
  const { user: slug, project } = props.match.params
  const isOwned = slug === auth.user.slug
  const { list } = isOwned ? projects : user.projects
  const projectKey = _.findKey(list, ['slug', project])
  const { user: _user } = isOwned ? auth : user
  return { project: list[projectKey], projectKey, isOwned, user: _user }
}
