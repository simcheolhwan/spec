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
