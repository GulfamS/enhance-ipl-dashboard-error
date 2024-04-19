import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {withRouter} from 'react-router-dom'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/'

class TeamMatches extends Component {
  state = {
    matchDetails: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMathes()
  }

  getTeamMathes = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`${teamMatchesApiUrl}${id}`)
    const fetchData = await response.json()
    const newData = {
      teamBannerUrl: fetchData.team_banner_url,
      latestMatchDetails: fetchData.latest_match_details,
      recentMatches: fetchData.recent_matches,
    }
    const {latestMatchDetails} = newData
    const newLatestDetails = {
      date: latestMatchDetails.date,
      venue: latestMatchDetails.venue,
      result: latestMatchDetails.result,
      umpires: latestMatchDetails.umpires,
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      firstInnings: latestMatchDetails.first_innings,
      secondInnings: latestMatchDetails.second_innings,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
    }
    const {recentMatches} = newData
    const newRecentMatches = recentMatches.map(eachValue => ({
      id: eachValue.id,
      competingTeam: eachValue.competing_team,
      competingTeamLogo: eachValue.competing_team_logo,
      result: eachValue.result,
      matchStatus: eachValue.match_status,
    }))
    newData.recentMatches = newRecentMatches
    newData.latestMatchDetails = newLatestDetails
    this.setState({matchDetails: newData, isLoading: false})
  }

  handleBack = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    const {matchDetails, isLoading} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    const {teamBannerUrl, latestMatchDetails, recentMatches} = matchDetails

    return (
      <>
        <div className={`bg-container ${id}`}>
          {isLoading && (
            <div data-testid="loader">
              <Loader type="Oval" color="#ffffff" height={50} weight={50} />
            </div>
          )}
          {!isLoading && (
            <>
              <img
                src={teamBannerUrl}
                className="banner-img"
                alt="team banner"
              />
              <h1 className="latest-team">Latest Matches</h1>
              <button
                type="button"
                className="back-btn"
                onClick={this.handleBack}
              >
                Back
              </button>
              <LatestMatch
                key={latestMatchDetails.id}
                latesMatchData={latestMatchDetails}
              />
              <ul className="recent-list">
                {recentMatches.map(eachValue => (
                  <MatchCard key={eachValue.id} matchDetails={eachValue} />
                ))}
              </ul>
            </>
          )}
        </div>
      </>
    )
  }
}
export default withRouter(TeamMatches)
