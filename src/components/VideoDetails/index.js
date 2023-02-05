import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike} from 'react-icons/bi'
import {HiSave} from 'react-icons/hi'
import Header from '../Header/index'
import SideBar from '../SideBar/index'
import ThemeContext from '../../Context/ThemeContext'
import './index.css'

class VideoDetails extends Component {
  state = {like: false, dislike: false, videoDetailObj: {}, channelDetail: {}}

  componentDidMount() {
    this.getVideoDetail()
  }

  getVideoDetail = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const videoDetailApi = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(videoDetailApi, options)
    const data = await response.json()
    const videoDetail = data.video_details
    const newVideoDetail = {
      channel: videoDetail.channel,
      description: videoDetail.description,
      publishedAt: videoDetail.published_at,
      thumbNail: videoDetail.thumbnail_url,
      title: videoDetail.title,
      videoURL: videoDetail.video_url,
      viewCount: videoDetail.view_count,
    }
    const channelLi = newVideoDetail.channel

    const newChannel = {
      name: channelLi.name,
      profileImg: channelLi.profile_image_url,
      subCount: channelLi.subscriber_count,
    }

    this.setState({videoDetailObj: newVideoDetail, channelDetail: newChannel})
  }

  onLike = () => {
    this.setState({like: true, dislike: false})
  }

  onDisLike = () => {
    this.setState({like: false, dislike: true})
  }

  renderVideoDetailView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {videoDetailObj, channelDetail, like, dislike} = this.state
        const {
          videoURL,
          title,
          channel,
          publishedAt,
          viewCount,
          description,
        } = videoDetailObj
        const {name, profileImg, subCount} = channelDetail
        const likeActive = like ? 'like-act' : ''
        const dislikeActive = dislike ? 'dis-act' : ''
        const {isDark, addItemTosave} = value

        const onAddVideoToSave = () => {
          console.log('kkk')
        }
        const videobg = isDark ? 'video-detail-dark' : 'video-detail-light'
        const btnbg = isDark ? 'btn-dark' : 'btn-light'

        return (
          <div className="video-item-detail-container">
            <Header />
            <div className="video-item-container-card">
              <div className="video-item-card-side-container">
                <SideBar />
              </div>
              <div className={`video-item-display-container ${videobg}`}>
                <ReactPlayer
                  url={videoURL}
                  controls
                  width="100%"
                  height="80%"
                />
                <div className="video-detail-text-container">
                  <h1>{title}</h1>
                  <div className="like-dislike-container">
                    <div className="view-container">
                      <p>{viewCount} Views</p>
                      <p>{publishedAt}</p>
                    </div>
                    <div className={`like-dis-small-container ${btnbg}`}>
                      <button
                        className={`like-btn  ${likeActive}`}
                        type="button"
                        onClick={this.onLike}
                      >
                        <BiLike className="like-icons-style" /> Like
                      </button>
                      <button
                        className={`like-btn  ${dislikeActive}`}
                        type="button"
                        onClick={this.onDisLike}
                      >
                        <BiDislike className="like-icons-style" />
                        Dislike
                      </button>
                      <button
                        className="like-btn"
                        type="button"
                        onClick={this.onAddVideoToSave}
                      >
                        <HiSave className="like-icons-style" /> Saved
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className="each-channel-details">
                    <img
                      src={profileImg}
                      alt="channel logo"
                      className="channel-logo-img-style"
                    />
                    <div className="video-detail-channel-name-sub">
                      <h1>{name}</h1>
                      <p>{subCount} subscribers</p>
                      <p>{description}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`video-item-container-display-sm ${videobg}`}>
                <ReactPlayer
                  url={videoURL}
                  controls
                  width="100%"
                  height="200px"
                />
                <div className="video-item-display-sm">
                  <h1>{title}</h1>
                </div>
                <div className="video-detail-text-sm">
                  <p>{viewCount} views</p>
                  <p>{publishedAt}</p>
                </div>
                <div className="like-dislike-sm-container">
                  <button
                    className={`like-btn-sm ${likeActive}`}
                    type="button"
                    onClick={this.onLike}
                  >
                    <BiLike className="like-icons-style-sm" /> Like
                  </button>
                  <button
                    className={`like-btn-sm ${dislikeActive}`}
                    type="button"
                    onClick={this.onDisLike}
                  >
                    <BiDislike className="like-icons-style-sm" /> Dislike
                  </button>
                  <button
                    className="like-btn-sm"
                    type="button"
                    onClick={this.onSaveVideo}
                  >
                    <HiSave className="like-icons-style-sm" /> Saved
                  </button>
                </div>
                <hr />
                <div className="video-item-sm-detail">
                  <img
                    src={profileImg}
                    className="profile-img-sm"
                    alt="profile"
                  />
                  <div className="heading-txt-sm">
                    <h1>{name}</h1>
                    <p>{subCount} subscribers</p>
                  </div>
                </div>
                <p className="sm-desc">{description}</p>
              </div>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    const {videoDetailObj, channelDetail, like, dislike} = this.state
    const {
      videoURL,
      title,
      channel,
      publishedAt,
      viewCount,
      description,
    } = videoDetailObj
    const {name, profileImg, subCount} = channelDetail

    const likeActive = like ? 'like-act' : ''
    const dislikeActive = dislike ? 'dis-act' : ''

    return <div>{this.renderVideoDetailView()}</div>
  }
}

export default VideoDetails
