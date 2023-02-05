import {Link} from 'react-router-dom'
import ThemeContext from '../../Context/ThemeContext'
import './index.css'

const GameVideo = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark} = value
      const {gameVideoDetail} = props
      const {
        id,
        title,
        thumbNail,
        viewCount,
        publishedAt,
        channel,
      } = gameVideoDetail
      const gameH = isDark ? 'game-heading-dark' : 'game-heading-light'

      return (
        <Link className="gameVideo-container" to={`/video/${id}`}>
          <div>
            <img src={thumbNail} alt={title} className="game-video-item" />
            <div className="game-card-text">
              <h1 className={gameH}>{title}</h1>
              <p>{viewCount} Watching</p>
              <p className="worldwide-style">Worldwide</p>
            </div>
          </div>
        </Link>
      )
    }}
  </ThemeContext.Consumer>
)

export default GameVideo
