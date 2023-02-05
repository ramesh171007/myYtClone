import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import ThemeContext from '../../Context/ThemeContext'
import './index.css'

const CategoryVideoItem = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark} = value
      const {categoryVideoDetail} = props
      const {
        id,
        channel,
        title,
        publishedAt,
        thumbNail,
        viewCount,
      } = categoryVideoDetail

      const newChannel = {
        profileImg: channel.profile_image_url,
        name: channel.name,
      }
      const {profileImg, name} = newChannel
      const upPubDate = formatDistanceToNow(new Date(publishedAt))

      const trendingBg = isDark ? 'trending-dark' : 'trending-light'
      const trendTitle = isDark ? 'trending-dark-h1' : 'trending-light-h1'

      return (
        <Link className="link-style" to={`/video/${id}`}>
          <div className={`cat-div ${trendingBg}`}>
            <img
              src={thumbNail}
              alt="trending"
              className="trending-image-style"
            />

            <div className="trending-text">
              <h1 className={trendTitle}>{title}</h1>
              <div className="trending-video-de">
                <img
                  src={profileImg}
                  className="trending-profile-img"
                  alt={name}
                />
                <p className="trending-name">{name}</p>
                <div className="trending-views-container">
                  <p>{viewCount} Views</p>
                  <p>{upPubDate}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )
    }}
  </ThemeContext.Consumer>
)
export default CategoryVideoItem
