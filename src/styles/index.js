export const BOLD = 600

const gray = number => `hsl(0, 0%, ${number}%)`

export const colors = {
  line: gray(90),

  aqua: '#7FDBFF',
  blue: '#0074D9',
  navy: '#001F3F',
  teal: '#39CCCC',
  green: '#2ECC40',
  olive: '#3D9970',
  lime: '#01FF70',

  yellow: '#FFDC00',
  orange: '#FF851B',
  red: '#FF4136',
  fuchsia: '#F012BE',
  purple: '#B10DC9',
  maroon: '#85144B',

  white: '#FFFFFF',
  silver: '#DDDDDD',
  gray: '#AAAAAA',
  black: '#111111'
}

export default {
  input: {
    border: 0,
    padding: 0,
    width: '100%'
  },

  button: {
    backgroundColor: 'transparent',
    border: 0,
    borderRadius: 0,
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    icon: {
      width: '1.5rem'
    }
  }
}
