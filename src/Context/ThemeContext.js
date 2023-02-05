import React from 'react'

const ThemeContext = React.createContext({
  isDark: false,
  savedVidoes: [],
  changeTheme: () => {},
  addItemTosave: () => {},
})

export default ThemeContext
