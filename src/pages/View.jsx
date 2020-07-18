import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  return { games: state.gamesReducer.games };
}

const View = (props) => {
  const gameId = props.match.params.id;

  const [game, setGame] = useState({});

  useEffect(() => {
    const games = props.games

    const game = games.find(game => gameId === game._id)

    if (game) { setGame(game); }
  }, [props.games])

  const { title, description, platform, releaseDate, developer, genre } = game;

  return (
    <div className="order-md-1">
      <h3 className="pb-4 mb-4 font-italic border-bottom">{title}</h3>

      <div className="blog-post"><p>{description}</p></div>

      <div><p>Platform: {platform}</p></div>
      <div><p>Release Date: {releaseDate}</p></div>
      <div><p>Developer: {developer}</p></div>
      <div><p>Genre(s): {genre}</p></div>

    </div>
  )
}

export default connect(mapStateToProps)(withRouter(View));