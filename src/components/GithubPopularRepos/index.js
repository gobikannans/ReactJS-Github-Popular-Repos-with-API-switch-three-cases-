import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoryData: [],
    activeTab: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeTab} = this.state

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `https://apis.ccbp.in/popular-repos?language=${activeTab}`
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      console.log(data)

      const fetchedData = data.popular_repos.map(eachItem => ({
        name: eachItem.name,
        imgUrl: eachItem.avatar_url,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
      }))
      this.setState({
        repositoryData: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickBtn = id => {
    this.setState({activeTab: id}, this.getRepositories)
  }

  renderRepositoryItemsSuccess = () => {
    const {repositoryData} = this.state

    return (
      <ul className="repository-list-container">
        {repositoryData.map(eachItem => (
          <RepositoryItem details={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderRepositoryLoading = () => (
    <div>
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositoryFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt=" failure view"
        className="img-failure"
      />
    </div>
  )

  renderRepositoryStatusWithItems = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryItemsSuccess()

      case apiStatusConstants.failure:
        return this.renderRepositoryFailure()
      case apiStatusConstants.inProgress:
        return this.renderRepositoryLoading()
      default:
        return null
    }
  }

  render() {
    const {activeTab} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Popular</h1>
        <ul className="language-list-container">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              details={eachLanguage}
              key={eachLanguage.id}
              onClickBtn={this.onClickBtn}
              isActive={activeTab === eachLanguage.id}
            />
          ))}
        </ul>
        {this.renderRepositoryStatusWithItems()}
      </div>
    )
  }
}

export default GithubPopularRepos
