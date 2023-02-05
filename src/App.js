import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute/index'
import ThemeContext from './Context/ThemeContext'
import Login from './components/Login/index'
import Home from './components/Home/index'
import Trending from './components/Trending/index'
import Gaming from './components/Gaming/index'
import VideoDetails from './components/VideoDetails/index'
import './App.css'

class App extends Component {
  state = {isDark: false, savedVidoes: []}

  changeTheme = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  addItemTosave = obj => {
    console.loh(obj)
  }

  render() {
    const {isDark, savedVidoes} = this.state
    console.log(isDark)
    return (
      <BrowserRouter>
        <Switch>
          <ThemeContext.Provider
            value={{
              isDark,
              savedVidoes,
              changeTheme: this.changeTheme,
              addItemTosave: this.addItemTosave,
            }}
          >
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute exact path="/video/:id" component={VideoDetails} />
          </ThemeContext.Provider>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
