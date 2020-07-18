import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import MultiSelect from "react-multi-select-component";
import options from '../data/platforms';
import { Form, Col, Button, Card } from 'react-bootstrap';
import Manager from '../api/games/Manager';
import { updateGame, deleteGame } from '../redux/actions';

const mapStateToProps = (state) => {
  return { games: state.gamesReducer.games };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateGame: game => dispatch(updateGame(game)),
    deleteGame: id => dispatch(deleteGame(id))
  }
}

const Update = (props) => {
  const gameId = props.match.params.id;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [platform, setPlatform] = useState([]);
  const [releaseDate, setReleaseDate] = useState(Date());
  const [developer, setDeveloper] = useState('');
  const [genre, setGenre] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const games = props.games

    const game = games.find(game => gameId === game._id)

    if (game) {
      setTitle(game.title);
      setDescription(game.description);
      setRating(game.rating);
      setPlatform(game.platform);
      setReleaseDate(game.releaseDate);
      setDeveloper(game.developer);
      setGenre(game.genre);
    }
  }, [props.game])

  const handleSubmit = async (e) => {
    const errors = {}

    e.preventDefault();
    if (title <= 2) errors['title'] = true;
    if (description <= 2) errors['description'] = true;
    if (rating < 0 || rating > 100) errors['rating'] = true;
    if (developer <= 2) errors['developer'] = true;
    if (genre <= 2) errors['genre'] = true;

    setErrors(errors);

    try {
      const { data, status } = await Manager.update({
        title,
        description,
        rating,
        platform: platform.map(p => p.value),
        releaseDate,
        developer,
        genre
      }, gameId)

      if (status === 200) {
        props.updateGame(data.game);
        props.history.push('/')
      }
    } catch (e) {
      console.error('e', e)
    }
  }

  const handleDelete = async () => {
    try{
      await Manager.delete(gameId);
      props.deleteGame(gameId)
      props.history.push('/')
    } catch (e) {
      console.error('e', e)
    }
  }

  return (
    <Card style={{ margin: 'auto' }}>
      <Card.Body>
        <Card.Title>Edit game</Card.Title>
        <Button variant="danger" style={{'right': '18px',
    'position': 'absolute', top: '12px'}} onClick={handleDelete}>DELETE</Button>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row style={{ justifyContent: 'center' }}>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                isInvalid={errors.title}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row style={{ justifyContent: 'center' }}>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                isInvalid={errors.description}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row style={{ justifyContent: 'center' }}>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>rating</Form.Label>
              <Form.Control
                type="number"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row style={{ justifyContent: 'center' }}>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>platform</Form.Label>
              <MultiSelect
                options={options}
                value={platform}
                onChange={setPlatform}
                labelledBy={"Select"}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row style={{ justifyContent: 'center' }}>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>release date</Form.Label>
              <Form.Control
                type="date"
                value={releaseDate}
                onChange={(event) => setReleaseDate(event.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row style={{ justifyContent: 'center' }}>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>developer</Form.Label>
              <Form.Control
                type="text"
                value={developer}
                onChange={(event) => setDeveloper(event.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row style={{ justifyContent: 'center' }}>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>genre</Form.Label>
              <Form.Control
                type="text"
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Button type="submit">Submit</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Update));