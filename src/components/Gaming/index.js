import {Component} from 'react'
import {SiYoutubegaming} from 'react-icons/si'
import Cookies from 'js-cookie'
import SideBar from '../SideBar/index'
import Header from '../Header/index'
import GameVideo from '../GameVideo'
import ThemeContext from '../../Context/ThemeContext'
import './index.css'

class Gaming extends Component {
  state = {gameList: []}

  componentDidMount() {
    this.getGamingVideo()
  }

  getGamingVideo = async () => {
    const gameApi = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(gameApi, options)
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

    this.setState({gameList: newVideo})
  }

  render() {
    const {gameList} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const gameBg = isDark ? 'game-dark' : 'game-light'
          const gameHead = isDark ? 'game-head-dark' : 'game-head-light'
          return (
            <div className="game-container">
              <Header />
              <div className="game-card">
                <div className="gaming-side-bar">
                  <SideBar />
                </div>
                <div className="game-video-container">
                  <div className={`game-heading ${gameHead}`}>
                    <div className="game-heading-icon">
                      <SiYoutubegaming />
                    </div>
                    <h1>Gaming</h1>
                  </div>
                  <div className={`display-game-video ${gameBg}`}>
                    {gameList.map(eachGame => (
                      <GameVideo key={eachGame.id} gameVideoDetail={eachGame} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
