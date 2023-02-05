import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    isCheck: true,
    username: '',
    password: '',
    inputType: 'password',
    showError: false,
  }

  onChangeUserName = e => {
    this.setState({username: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  onChangeCheckBox = () => {
    const {isCheck} = this.state
    if (isCheck === true) {
      this.setState({inputType: 'text', isCheck: false})
    } else {
      this.setState({inputType: 'password', isCheck: true})
    }
  }

  onSubmitSuccess = jwtToken => {
    this.setState({showError: false})
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmitFailure = () => {
    this.setState({showError: true})
  }

  onLoginSubmit = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, inputType, showError} = this.state
    console.log(inputType)
    return (
      <div className="login-container">
        <div className="main-form-container">
          <div className="login-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
              className="login-image-style"
            />
          </div>
          <div className="form-container">
            <form onSubmit={this.onLoginSubmit} className="form-style">
              <label htmlFor="USERNAME" className="label-style">
                USERNAME
              </label>
              <input
                id="USERNAME"
                className="input-style"
                type="text"
                placeholder="Username"
                onChange={this.onChangeUserName}
              />
              <label htmlFor="PASSWORD" className="label-style">
                PASSWORD
              </label>
              <input
                id="PASSWORD"
                className="input-style"
                type={inputType}
                placeholder="Password"
                onChange={this.onChangePassword}
              />
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="SHOW"
                  className="input-check-style"
                  onChange={this.onChangeCheckBox}
                />
                <label htmlFor="show" className="label-check-style">
                  Show Password
                </label>
              </div>
              {showError && (
                <p className="error-style">Username is not found</p>
              )}
              <button className="login-btn-style" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
