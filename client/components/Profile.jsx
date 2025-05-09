/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import React from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

import OgDrink from './profileChildren/OgDrink.jsx';
import Concoction from './profileChildren/Concoction.jsx';
import UserSearch from './profileChildren/UserSearch.jsx';
import FriendItem from './profileChildren/FriendItem.jsx';
import AvatarUploader from './AvatarUploader.jsx';
import '../styling/Profile.css';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: 'User',
      createdAt: ' ',
      ogDrinks: [],
      concoctions: [],
      id: 1,
      friends: [],
      reviews: [],
    };

    // this.getUser = () => {
    //   const { id } = this.state;
    //   axios
    //     .get(`/profile/${id}`)
    //     .then((userResponse) => {
    //       const { displayName, createdAt } = userResponse.data;

    //       // need to update drinks/reviews this way as well
    //       this.setState({ displayName, createdAt, id });
    //       return axios.get(`/profile/friends/${id}`);
    //     })
    //     .then(({ data }) => {
    //       this.setState({ friends: data });
    //       return axios.get('/profile/concoctions');
    //     })
    //     .then(({ data }) => {
    //       this.setState({ concoctions: data });
    //     })
    //     .then(() => axios.get('/profile/estDrinks'))
    //     .then(({ data }) => this.setState({ ogDrinks: data }))
    //     .catch((err) => console.error('Failed getting user data', err));
    // };

    this.getUser = () => {
      const { id } = this.state;
      axios
        .get(`/profile/${id}`)
        .then((userResponse) => {
          const { displayName, createdAt, avatar } = userResponse.data;
          this.setState({
            displayName, createdAt, avatar, id,
          });
          return axios.get(`/profile/friends/${id}`);
        })
        .then(({ data }) => {
          this.setState({ friends: data });
          return axios.get('/profile/concoctions');
        })
        .then(({ data }) => {
          this.setState({ concoctions: data });
        })
        .then(() => axios.get('/profile/estDrinks'))
        .then(({ data }) => this.setState({ ogDrinks: data }))
        .catch((err) => console.error('Failed getting user data', err));
    };

    this.followUser = (idFollow) => {
      const { id } = this.state;
      axios
        .post('/profile/follow', { id, idFollow })
        .then(() => this.getUser())
        .catch((err) => console.error('failed following user: ', err));
    };

    this.unfollowUser = (idUnfollow) => {
      const { id } = this.state;
      axios
        .delete('/profile/unfollow', {
          data: { friend1Id: id, friend2Id: idUnfollow },
        })
        .then(() => {
          this.getUser();
        })
        .catch((err) => console.error('failed removing user: ', err));
    };

    this.handleClose = (scope) => scope(false);
    this.handleShow = (scope) => scope(true);

    this.handleSubmit = (scope) => {
      const {
        drinkName, drinkIngredients, id, drinkAddition,
      } = scope.state;
      if (drinkAddition) {
        drinkIngredients.push(drinkAddition);
      }
      axios
        .patch('/profile/updateConcoction', { id, drinkName, drinkIngredients: JSON.stringify(drinkIngredients) })
        .then(() => axios.get('/profile/concoctions'))
        .then(({ data }) => {
          // update concoction data
          this.setState({ concoctions: data });
          scope.setState({ drinkAddition: '' });
        });

      this.handleClose(scope.setShow);
    };

    // this function will need to make an axios request to update db
    this.removeDrink = (e) => {
      if (e.target.className.includes('ogDrink')) {
        axios.delete(`/profile/removeFavorite/${e.target.value}`)
          .then(() => axios.get('/profile/estDrinks'))
          .then(({ data }) => this.setState({ ogDrinks: data }))
          .catch((err) => console.error('Failed deleting favorite: ', err));
      }
      if (e.target.className.includes('concoction')) {
        axios
          .delete(`/profile/removeConcoction/${e.target.value}`)
          .then(() => axios.get('/profile/concoctions'))
          .then(({ data }) => this.setState({ concoctions: data }));
      }
    };
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    const {
      displayName,
      createdAt,
      ogDrinks,
      concoctions,
      friends,
      reviews,
    } = this.state;
    return (
      <>
        <UserSearch followUser={this.followUser} />
        <Card className='custom-card mt-4 mb-4'>
          <Card.Body className='custom-card-body' style={{ color: '#ffffff' }}>
            <Card.Title>Profile</Card.Title>
            <Card.Text>{displayName}</Card.Text>
            <Card.Text>{`You joined on: ${createdAt}`}</Card.Text>
            <Card>
              <Card.Body>
                <Card.Title>Your Friends</Card.Title>
                <ListGroup>
                  {friends.map((friend) => (
                    <FriendItem
                      friend={friend}
                      unfollowUser={this.unfollowUser}
                      key={`friend-${friend.id}`}
                    />
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>

        <Card className='custom-card mt-4 mb-4'>
  <Card.Body className='custom-card-body' style={{ color: '#ffffff' }}>
    <Card.Title>Avatar</Card.Title>
    <AvatarUploader
      user={{
        googleId: this.state.id,
        avatar: this.state.avatar || 'avatar.png',
      }}
      refreshUser={this.getUser}
    />
    <Card.Text>{this.state.displayName}</Card.Text>
  </Card.Body>
</Card>

        <Card className='custom-card mb-4'>
          <Card.Body className='custom-card-body' style={{ color: '#ffffff' }}>
            <Card.Title>Your Concoctions</Card.Title>
            <Container>
              <Row>
                {concoctions.map((drink, index) => (
                  <Concoction
                    handleClose={this.handleClose}
                    handleShow={this.handleShow}
                    handleSubmit={this.handleSubmit}
                    removeDrink={this.removeDrink}
                    drink={drink}
                    key={`conc-${drink.id}`}
                    index={index}
                  />
                ))}
              </Row>
            </Container>
          </Card.Body>
        </Card>
        <Card className='custom-card mb-4'>
          <Card.Body className='custom-card-body' style={{ color: '#ffffff' }}>
            <Card.Title>Your Favorite Originals</Card.Title>
            <Container>
              <Row>
                {ogDrinks.map((drink) => (
                  <OgDrink
                    removeDrink={this.removeDrink}
                    key={drink.drinkId}
                    drink={drink}
                  />
                ))}
              </Row>
            </Container>
          </Card.Body>
        </Card>
        <Card className='custom-card mb-4'>
          <Card.Body className='custom-card-body' style={{ color: '#ffffff' }}>
            <Card.Title>Your Reviews</Card.Title>
            <ListGroup>
              {reviews.map((review, index) => (
                <li key={index}>hello</li>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Profile;
