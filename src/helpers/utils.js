export const slugify = (string = '') =>
  string
    .trim()
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/:|\/|\?|#|\[|\]|@|!|\$|&|'|\(|\)|\*|\+|,|;|=|%|\./g, '-')
    .replace(/--+/g, '-')

export const sanitize = ({ title = '', slug = '', ...rest }) => ({
  title: title.trim(),
  slug: slugify(slug),
  ...rest
})
