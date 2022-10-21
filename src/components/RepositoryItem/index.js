import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {name, imgUrl, starsCount, issuesCount, forksCount} = details

  return (
    <li className="list-res-container">
      <div className="res-container">
        <img src={imgUrl} alt={name} className="res-img" />
        <h1 className="res-heading">{name}</h1>
      </div>
      <div className="star-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stars"
        />
        <p className="res-para">{starsCount} stars</p>
      </div>
      <div className="star-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="stars"
        />
        <p className="res-para">{forksCount} forks</p>
      </div>
      <div className="star-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="stars"
        />
        <p className="res-para">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
