import {Link} from 'react-router-dom'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {HiSave, HiOutlineSun} from 'react-icons/hi'
import ThemeContext from '../../Context/ThemeContext'
import './index.css'

const SideBar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark} = value
      const sideBg = isDark ? 'sideDark' : 'sideLight'
      const sideLink = isDark ? 'sideLinkDark' : 'sideLineDark'
      return (
        <div className={`sidebar-container ${sideBg}`}>
          <ul className="ham-option-container">
            <Link className={`link-style-side ${sideLink}`} to="/">
              <li className="li-container-ham-side">
                <AiFillHome className="home-style" />
                <p>Home</p>
              </li>
            </Link>
            <Link className={`link-style-side ${sideLink}`} to="/trending">
              <li className="li-container-ham-side">
                <AiFillFire className="home-style" />
                <p>Trending</p>
              </li>
            </Link>
            <Link className={`link-style-side ${sideLink}`} to="/gaming">
              <li className="li-container-ham-side">
                <SiYoutubegaming className="home-style" />
                <p>Gaming</p>
              </li>
            </Link>
            <Link className={`link-style-side ${sideLink}`} to="/saved">
              <li className="li-container-ham-side">
                <HiSave className="home-style" />
                <p>Saved Videos</p>
              </li>
            </Link>
          </ul>
          <div className={`contact-us-container ${sideLink}`}>
            <h1>Contact Us</h1>
            <ul className="social-media-container">
              <li className="li-container-social">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
                  alt="facebook logo"
                  className="social-media-image-style"
                />
              </li>
              <li className="li-container-social">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                  alt="twitter logo"
                  className="social-media-image-style"
                />
              </li>
              <li className="li-container-social">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
                  alt="linked in logo"
                  className="social-media-image-style"
                />
              </li>
            </ul>
            <p>Enjoy! Now to see channels and recommendation</p>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default SideBar
