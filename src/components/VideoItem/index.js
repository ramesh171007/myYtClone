import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import ThemeContext from '../../Context/ThemeContext'
import './index.css'

const VideoItem = props => (
  <ThemeContext>
    {value => {
      const {isDark} = value
      const {videoDetail} = props
      const {
        id,
        channel,
        title,
        publishedAt,
        thumbNail,
        viewCount,
      } = videoDetail
      const newChannel = {
        profileImg: channel.profile_image_url,
        name: channel.name,
      }
      const {profileImg, name} = newChannel
      const upPubDate = formatDistanceToNow(new Date(publishedAt))

      const videoItemBg = isDark ? 'video-item-dark' : 'video-item-light'
      return (
        <Link className="link-style" to={`/video/${id}`}>
          <div className={`video-item-container ${videoItemBg}`}>
            <img
              src={thumbNail}
              alt={title}
              className="thumbnail-image-style"
            />
            <div className="video-title-container">
              <img
                src={profileImg}
                className="video-profile-img-style"
                alt={name}
              />
              <h1>{title}</h1>
            </div>
            <h1 className="channel-name">{name}</h1>
            <div className="video-item-views-container">
              <p>{viewCount} Views</p>
              <p>{upPubDate}</p>
            </div>
          </div>
        </Link>
      )
    }}
  </ThemeContext>
)

export default VideoItem
