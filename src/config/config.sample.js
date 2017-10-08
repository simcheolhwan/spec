const dev = {}
const production = {}

export default (process.env.REACT_APP_ENV !== 'production' ? dev : production)
