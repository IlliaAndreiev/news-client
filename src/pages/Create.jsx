import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { addGame, toggleToastr } from '../redux/actions';
import { connect } from 'react-redux';
import MultiSelect from "react-multi-select-component";
import { Form, Col, Button, Card } from 'react-bootstrap';
import Manager from '../api/games/Manager';

const mapStateToProps = (state) => {
  return { platforms: state.platformsReducer.platforms };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addGame: game => dispatch(addGame(game)),
    toggleToastr: toastrData => dispatch(toggleToastr(toastrData))
  }
}

const Create = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [platform, setPlatform] = useState([]);
  const [releaseDate, setReleaseDate] = useState('');
  const [developer, setDeveloper] = useState('');
  const [genre, setGenre] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    const errors = {}

    e.preventDefault();
    
    // if (title <= 2) errors['title'] = true;
    // if (description <= 2) errors['description'] = true;
    // if (rating < 0 || rating > 100) errors['rating'] = true;
    // if (developer <= 2) errors['developer'] = true;
    // if (genre <= 2) errors['genre'] = true;

    // setErrors(errors);

    try {
      const { data, status } = await Manager.create({
        title,
        description,
        rating,
        platform: platform.map(p => p.value),
        releaseDate,
        developer,
        genre
      })

      if (status === 201) {
        const game = data.game;
  
        props.addGame(game);
  
        props.history.push('/')

        props.toggleToastr({
          show: true,
          color: 'green',
          status: 'Success',
          text: 'Game succesfully added'
        })    
      }
    } catch (e) {
      const responseErrors = [];
      const { data: {message, errors}, status } = e.response;

      if (status === 422) {
        for (const [key, value] of Object.entries(errors)) {
          responseErrors[key] = value['message'];
        }

        setErrors(responseErrors);
      }

      props.toggleToastr({
        show: true,
        color: 'red',
        status: 'Error',
        text: message
      })  
    }
  }

  return (
<Card style={{ margin: 'auto' }}>
  <Card.Body>
    <Card.Title>Add game</Card.Title>
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Row style={{justifyContent: 'center'}}>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Title</Form.Label>
          <Form.Control
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              isInvalid={errors.title}
            />
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
        <Form.Row style={{justifyContent: 'center'}}>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>description</Form.Label>
          <Form.Control
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              isInvalid={errors.description}
            />
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
        <Form.Row style={{justifyContent: 'center'}}>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>rating</Form.Label>
          <Form.Control
              type="number"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
              isInvalid={errors.rating}
            />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
        <Form.Row style={{justifyContent: 'center'}}>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>platform</Form.Label>
          <MultiSelect
            options={props.platforms}
            value={platform}
            onChange={setPlatform}
            labelledBy={"Select"}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row style={{justifyContent: 'center'}}>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>release date</Form.Label>
          <Form.Control
              type="date"
              value={releaseDate}
              onChange={(event) => setReleaseDate(event.target.value)}
              isInvalid={errors.releaseDate}
            />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
        <Form.Row style={{justifyContent: 'center'}}>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>developer</Form.Label>
          <Form.Control
              type="text"
              value={developer}
              onChange={(event) => setDeveloper(event.target.value)}
              isInvalid={errors.developer}
            />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
        <Form.Row style={{justifyContent: 'center'}}>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>genre</Form.Label>
          <Form.Control
              type="text"
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
              isInvalid={errors.genre}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create));