import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import "../App.css";
import { Button, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import Manager from '../api/games/Manager';
import { setGames, deleteGame } from '../redux/actions';
import platforms from '../data/platforms';

const mapStateToProps = (state) => {
  return { games: state.gamesReducer.games };
}

function mapDispatchToProps(dispatch) {
  return {
    setGames: games => dispatch(setGames(games)), 
    deleteGame: id => dispatch(deleteGame(id))
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      games: this.props.games,
      sortedByName: '', // asc, desc,
      soretedPlatform: '',
      searchText: '',
    };

  }

  componentWillReceiveProps({ games }) {
    this.setState({ games })
  }

  sortByDate = () => {
    // TODO: not finished
    let sortedGames = this.state.games.sort((a, b) => {
      return new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    });


    this.setState({ games: sortedGames })
  }

  sortByName = () => {

    if (this.state.sortByName === 'asc') {
      const sortedGames = this.state.games
        .sort(function (a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          return 0;
        })

      this.setState({ games: sortedGames, sortByName: 'desc' })
    } else {
      const sortedGames = this.state.games
        .sort(function (a, b) {
          if (b.title.toLowerCase() < a.title.toLowerCase()) return -1;
          if (b.title.toLowerCase() > a.title.toLowerCase()) return 1;
          return 0;
        })

      this.setState({ games: sortedGames, sortByName: 'asc' })
    }
  }

  redirectToViewPage(id) {
    this.props.history.push(`/view/${id}`)
  }

  redirectToUpdatePage(id) {
    this.props.history.push(`/update/${id}`)
  }

  handleSearch = (event) => {
    const value = event.target.value;
    this.setState({'searchText': value});

    Manager.search(value)
      .then(response => {
        let games = response.data.games;
        this.props.setGames(games);
      }).catch(e => {
        console.log('e', e)
      });
  }

  handleDelete = async (id) => {
    try{
      await Manager.delete(id);
      this.props.deleteGame(id)
    } catch (e) {
      console.error('e', e)
    }
  }

  render() {
    const { games, sortedPlatfrom, searchText } = this.state;

    return (
      <div>
        <div className="rounded_field mb-3">
          <input type="text" placeholder="search..." className="field" value={searchText} onChange={this.handleSearch} />
          {/* <Button variant="secondary">Search by developer</Button> */}
        </div>
        <div className="mb-3">
          <Button variant="dark" onClick={this.sortByDate}>Sort by date</Button>
          <Button variant="dark" className="ml-3" onClick={this.sortByName}>Sort by name A <i className={this.state.sortByName === 'asc' ? 'arrow right' : 'arrow left'}></i> Z</Button>

          <Dropdown style={{'display': 'inline-block'}}>
            <Dropdown.Toggle className="ml-3"  variant="dark" id="dropdown-basic">
            Sort by platform
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <Dropdown.Item onClick={() => this.setState({sortedPlatfrom: ''})}>All games</Dropdown.Item>

            {platforms.map((platform, key) => 
              <Dropdown.Item className={platform.className} key={key} onClick={() => this.setState({sortedPlatfrom: platform.value})}>{platform.label}</Dropdown.Item>
            )} 
            
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="row">

          {games.map((game, key) => {
            let ratingBackground = {
              backgroundColor: 'white',
            }
            if (game.rating >= 70) {
              ratingBackground = {
                backgroundColor: '#6c3',
              }
            }
            else if (game.rating < 70 && game.rating > 30) {
              ratingBackground = {
                backgroundColor: '#fc3',
              }
            }
            else if (game.rating <= 40) {
              ratingBackground = {
                backgroundColor: '#f00',
              }
            }
            else {
              ratingBackground = {
                backgroundColor: 'white',
              }
            }

            return !sortedPlatfrom || game.platform.includes(sortedPlatfrom) ? <div className="col-md-4" key={key}>
              <div className="card mb-4 shadow-sm">
                {/* <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> */}
                <div className="card-body">
                  <p className="card-text">{game.title}</p>
                  <p className="card-text">{game.developer}</p>
                  <small className="text-muted">Platform: {game.platform.map((p, key) => <span key={key}>{p} </span> )}</small>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => this.redirectToViewPage(game._id)}>View</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => this.redirectToUpdatePage(game._id)}>Edit</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => this.handleDelete(game._id)}>DELETE</button>
                    </div>

                    <div className="game-rating" style={ratingBackground}>{game.rating}</div>
                  </div>
                </div>
              </div>
            </div> : ''
          })}
        
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));