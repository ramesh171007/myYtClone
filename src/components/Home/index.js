import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header/index'
import SideBar from '../SideBar/index'
import VideoItem from '../VideoItem/index'
import ThemeContext from '../../Context/ThemeContext'

import './index.css'

class Home extends Component {
  state = {adState: true, searchVal: '', videoList: []}

  componentDidMount() {
    this.getVideoApi()
  }

  getVideoApi = async () => {
    const {searchVal} = this.state
    const videoApi = `https://apis.ccbp.in/videos/all?search=${searchVal}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(videoApi, options)
    const data = await response.json()
    const video = data.videos

    const newVideo = video.map(each => ({
      channel: each.channel,
      id: each.id,
      publishedAt: each.published_at,
      thumbNail: each.thumbnail_url,
      title: each.title,
      viewCount: each.view_count,
    }))
    this.setState({videoList: newVideo})
  }

  closeAd = () => {
    const {adState} = this.state
    this.setState({adState: false})
  }

  renderAd = () => {
    const {adState} = this.state
    return (
      <div className="ad-contaniner">
        <div className="heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="ad-logo-style"
          />
          <AiOutlineClose className="ad-close-btn" onClick={this.closeAd} />
        </div>
        <div className="ad-text-content">
          <h1>Buy Nxt watch premium prepaid plans with upi</h1>
          <button type="button" className="get-btn">
            Get Now
          </button>
        </div>
      </div>
    )
  }

  onChangeSearch = e => {
    this.setState({searchVal: e.target.value})
  }

  onClickSearchButton = () => {
    this.getVideoApi()
  }

  renderHomeCard = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const {adState, searchVal, videoList} = this.state
        const changeVideoWith = adState ? 'small' : 'large'
        const homeBg = isDark ? 'home-dark' : 'home-light'
        return (
          <>
            <div className={`video-home-card-container ${homeBg}`}>
              {adState ? this.renderAd() : null}
              <div className="display-video-container">
                <div className="search-container">
                  <input
                    type="search"
                    className={`input-search-style ${homeBg}`}
                    placeholder="Search"
                    onChange={this.onChangeSearch}
                    value={searchVal}
                  />
                  <button
                    type="button"
                    className="search-icon-btn"
                    onClick={this.onClickSearchButton}
                  >
                    <AiOutlineSearch />
                  </button>
                </div>
                <div className={`video-ul-container ${changeVideoWith}`}>
                  {videoList.map(eachVideo => (
                    <VideoItem key={eachVideo.id} videoDetail={eachVideo} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    const {adState, searchVal, videoList} = this.state

    console.log(videoList)

    return (
      <div className="home-container">
        <Header />
        <div className="card-home-container">
          <div className="side-container">
            <SideBar />
          </div>
          {this.renderHomeCard()}
        </div>
      </div>
    )
  }
}

export default Home
