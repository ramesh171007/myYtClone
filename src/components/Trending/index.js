import {Component} from 'react'
import {AiFillFire} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Header from '../Header/index'
import SideBar from '../SideBar/index'
import ThemeContext from '../../Context/ThemeContext'
import CategoryVideoItem from '../CategoryVideoItem/index'

import './index.css'

class Trending extends Component {
  state = {trendingList: []}

  componentDidMount() {
    this.getTrendingVideo()
  }

  getTrendingVideo = async () => {
    const trendingApi = 'https://apis.ccbp.in/videos/trending'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(trendingApi, options)
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
    this.setState({trendingList: newVideo})
  }

  render() {
    const {trendingList} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const trendbg = isDark ? 'trend-dark' : 'trend-light'
          const trendHead = isDark ? 'trend-head-dark' : 'trend-head-light'
          return (
            <div className="trending-container">
              <Header />
              <div className="trending-card">
                <div className="trending-side-container">
                  <SideBar />
                </div>
                <div className="trending-video">
                  <div className={`trending-heading ${trendHead}`}>
                    <div className="trending-icons">
                      <AiFillFire />
                    </div>
                    <h1>Trending</h1>
                  </div>
                  <div className={`trending-video-display ${trendbg}`}>
                    {trendingList.map(eachTrending => (
                      <CategoryVideoItem
                        key={eachTrending.id}
                        categoryVideoDetail={eachTrending}
                      />
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

export default Trending
