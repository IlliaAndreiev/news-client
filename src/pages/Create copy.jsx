import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { addGame } from '../redux/actions';
import { connect } from 'react-redux';
import MultiSelect from "react-multi-select-component";
import options from '../data/platforms';

function mapDispatchToProps(dispatch) {
  return {
    addGame: game => dispatch(addGame(game))
  }
}

class Create extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      rating: Number(),
      platform: [],
      releaseDate: Date(),
      developer: '',
      genre: '',
      titleError: '',
      descriptionError: '',
      ratingError: '',
      platformError: '',
      releaseDateError: '',
      developerError: '',
      genreError: '',
      // author_id: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
    const title = this.state.title;
    const description = this.state.description;
    const rating = this.state.rating;
    const platform = this.state.platform;
    const releaseDate = this.state.releaseDate;
    const developer = this.state.developer;
    const genre = this.state.genre;

    if (title.length < 2) {
      this.setState({
        titleError: 'Required title min 2 symbols'
      });
    } else {
      this.setState({
        titleError: ''
      });
    }

    if (description.length < 10) {
      this.setState({
        descriptionError: 'Required description min 10 symbols'
      });
    } else {
      this.setState({
        descriptionError: ''
      });
    }

    if (rating < 0 || rating > 100) {
      this.setState({
        ratingError: 'Required rating: 0 - 100'
      });
    } else {
      this.setState({
        ratingError: ''
      });
    }

    if (platform.length < 2) {
      this.setState({
        platformError: 'Required platform min 2 symbols'
      });
    } else {
      this.setState({
        platformError: ''
      });
    }

    if (!releaseDate) {
      this.setState({
        releaseDateError: 'Required release date'
      });
    } else {
      this.setState({
        releaseDateError: ''
      });
    }

    if (developer.length < 2) {
      this.setState({
        developerError: 'Required developer min 2 symbols'
      });
    } else {
      this.setState({
        developerError: ''
      });
    }

    if (genre.length < 3) {
      this.setState({
        genreError: 'Required genre min 3 symbols'
      });
    } else {
      this.setState({
        genreError: ''
      });
    }

    if (title.length >= 2 && description.length >= 10 && rating >= 0 && rating <= 100 && platform.length >= 2 && releaseDate && developer.length >= 2 && genre.length >= 3) {
      axios({
        method: 'post',
        url: 'http://localhost:8000/api/create-game',
        data: {
          title,
          description,
          rating,
          platform,
          releaseDate,
          developer,
          genre,
          //  author_id
        }
      }).then((res) => {
        const game = res.data.game;

        this.props.addGame(game);

        this.props.history.push('/')
      }).catch(error => {
        console.log(error)
      });
    }

  }

  render() {
    const { titleError, descriptionError, ratingError, platformError, releaseDateError, developerError, genreError } = this.state

    return (
      <div className="order-md-1">
        <h4 className="mb-3">Game</h4>
        <form className="needs-validation" noValidate="" />
        <label for="title">Game's title</label>
        <input type="text" className="form-control" placeholder="Title..." name="title" value={this.state.title} onChange={this.handleChange} />
        {
          (titleError) ?
            <div className="invalid-feedback" style={{ 'display': 'block' }}>
              {titleError}
            </div>
            :
            ''
        }


        <div className="mb-3">
          <label for="description">Game's description</label>
          <input type="text" className="form-control" placeholder="Text..." name="description" value={this.state.description} onChange={this.handleChange} />
          {
            (descriptionError) ?
              <div className="invalid-feedback" style={{ 'display': 'block' }}>
                {descriptionError}
              </div>
              : ''
          }


          <label for="title">Game's rating</label>
          <input type="number" className="form-control" placeholder="Number: 0 - 100" name="rating" value={this.state.rating} onChange={this.handleChange} />
          {
            (ratingError) ?
              <div className="invalid-feedback" style={{ 'display': 'block' }}>
                {ratingError}
              </div>
              :
              ''
          }


          <label for="platform">Game's platform</label>
          <MultiSelect
            options={options}
            value={this.state.platform}
            onChange={(value) => {
              this.setState({'platform': value})
            }}
            labelledBy={"Select"}
          />
          {
            (platformError) ?
              <div className="invalid-feedback" style={{ 'display': 'block' }}>
                {platformError}
              </div>
              : ''
          }


          <label for="releaseDate">Game's release date</label>
          <input type="date" className="form-control" placeholder="Date..." name="releaseDate" value={this.state.releaseDate} onChange={this.handleChange} />
          {
            (releaseDateError) ?
              <div className="invalid-feedback" style={{ 'display': 'block' }}>
                {releaseDateError}
              </div>
              :
              ''
          }


          <label for="developer">Game's developer</label>
          <input type="text" className="form-control" placeholder="Text..." name="developer" value={this.state.developer} onChange={this.handleChange} />
          {
            (developerError) ?
              <div className="invalid-feedback" style={{ 'display': 'block' }}>
                {developerError}
              </div>
              : ''
          }


          <label for="genre">Game's genre</label>
          <input type="text" className="form-control" placeholder="Text..." name="genre" value={this.state.genre} onChange={this.handleChange} />
          {
            (genreError) ?
              <div className="invalid-feedback" style={{ 'display': 'block' }}>
                {genreError}
              </div>
              :
              ''
          }

        </div>

        <hr className="mb-4" />
        <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={this.handleSubmit}>Create</button>
      </div>

    )
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Create));