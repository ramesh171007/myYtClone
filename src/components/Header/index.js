import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, Redirect, withRouter} from 'react-router-dom'
import {RiMoonFill} from 'react-icons/ri'
import Popup from 'reactjs-popup'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {HiSave, HiOutlineSun} from 'react-icons/hi'
import ThemeContext from '../../Context/ThemeContext'

import './index.css'

class Header extends Component {
  state = {ishamberClicked: false}

  onClickHamberMenu = () => {
    const {ishamberClicked} = this.state
    this.setState(prevState => ({ishamberClicked: !prevState.ishamberClicked}))
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark, changeTheme} = value
          const {ishamberClicked} = this.state

          const onClickChangeTheme = () => {
            changeTheme()
          }

          const navBg = isDark ? 'toDark' : 'toLight'
          const webImage = isDark ? 'dark' : 'light'
          const iconsTheme = isDark ? 'dark' : 'light'

          const renderHamOption = () => {
            if (ishamberClicked === true) {
              return (
                <ul className={`ham-option-container ${navBg}`}>
                  <Link className="link-style" to="/">
                    <li className={`li-container-ham ${iconsTheme}`}>
                      <AiFillHome className="home-style" />
                      <p>Home</p>
                    </li>
                  </Link>
                  <Link className="link-style" to="/trending">
                    <li className={`li-container-ham ${iconsTheme}`}>
                      <AiFillFire className="home-style" />
                      <p>Trending</p>
                    </li>
                  </Link>
                  <Link className="link-style" to="/gaming">
                    <li className={`li-container-ham ${iconsTheme}`}>
                      <SiYoutubegaming className="home-style" />
                      <p>Gaming</p>
                    </li>
                  </Link>
                  <Link className="link-style" to="/saved">
                    <li className={`li-container-ham ${iconsTheme}`}>
                      <HiSave className="home-style" />
                      <p>Saved Videos</p>
                    </li>
                  </Link>
                </ul>
              )
            }
            return null
          }

          const userLogOut = () => {
            const {history} = this.props
            Cookies.remove('jwt_token')
            history.replace('/login')
          }

          return (
            <>
              <div className="small-nav">
                <nav className={`nav-style ${navBg}`}>
                  <div className="header-image">
                    <img
                      src={`https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-${webImage}-theme-img.png`}
                      className="nav-image-style"
                      alt="website logo"
                    />
                  </div>
                  <ul className="list-icons-container">
                    <li className="li-container">
                      {isDark ? (
                        <HiOutlineSun
                          className="sun-icon-style"
                          onClick={onClickChangeTheme}
                        />
                      ) : (
                        <RiMoonFill
                          className="icon-style"
                          onClick={onClickChangeTheme}
                        />
                      )}
                    </li>
                    <li className="li-container">
                      <GiHamburgerMenu
                        className={`icon-style ${iconsTheme}`}
                        onClick={this.onClickHamberMenu}
                      />
                    </li>
                    <li className="li-container">
                      <div className="popup-container">
                        <Popup
                          modal
                          trigger={
                            <button type="button" className="trigger-button">
                              <FiLogOut
                                className={`icon-style ${iconsTheme}`}
                              />
                            </button>
                          }
                        >
                          {close => (
                            <>
                              <div
                                className={`confirm-container ${navBg} ${iconsTheme}`}
                              >
                                <p>Are you sure you want to logout</p>
                                <div className="logout-btn-container">
                                  <button
                                    type="button"
                                    className="close-btn"
                                    onClick={() => close()}
                                  >
                                    Close
                                  </button>
                                  <button
                                    className="confirm-btn-style"
                                    onClick={userLogOut}
                                  >
                                    Confirm
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </Popup>
                      </div>
                    </li>
                  </ul>
                </nav>
                {renderHamOption()}
              </div>
              <nav className={`nav-style-lg ${navBg}`}>
                <div className="header-image-lg">
                  <img
                    src={`https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-${webImage}-theme-img.png`}
                    className="nav-image-style"
                    alt="website logo"
                  />
                </div>
                <ul className="list-icons-container">
                  <li className="li-container">
                    {isDark ? (
                      <HiOutlineSun
                        className="sun-icon-style"
                        onClick={onClickChangeTheme}
                      />
                    ) : (
                      <RiMoonFill
                        className="icon-style"
                        onClick={onClickChangeTheme}
                      />
                    )}
                  </li>
                  <li className="li-container-img">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                      className="profile-img-style"
                      alt="profile"
                    />
                  </li>
                  <li className="li-container">
                    <div className="popup-container">
                      <Popup
                        modal
                        trigger={
                          <button type="button" className="logout-btn-style">
                            Logout
                          </button>
                        }
                      >
                        {close => (
                          <>
                            <div
                              className={`confirm-container ${navBg} ${iconsTheme}`}
                            >
                              <p>Are you sure you want to logout</p>
                              <div className="logout-btn-container">
                                <button
                                  type="button"
                                  className="close-btn"
                                  onClick={() => close()}
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  className="confirm-btn-style"
                                  onClick={userLogOut}
                                >
                                  Confirm
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </Popup>
                    </div>
                  </li>
                </ul>
              </nav>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withRouter(Header)
