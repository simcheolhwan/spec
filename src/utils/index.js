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

export const getProject = props => ({ list }) => {
  const projectKey = findKey(['slug', props.match.params.project])(list)
  return { project: list[projectKey], projectKey }
}
