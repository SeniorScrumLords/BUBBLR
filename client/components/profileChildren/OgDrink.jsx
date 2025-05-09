/* eslint-disable jsx-quotes */
import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

function OgDrink({ drink }) {
  // eslint-disable-next-line no-nested-ternary
  const ingredients = typeof drink.drinkIngredients === 'string'
    ? JSON.parse(drink.drinkIngredients || '[]')
    : Array.isArray(drink.drinkIngredients)
      ? drink.drinkIngredients
      : [];

  const {
    drinkId, drinkImage, drinkName, drinkCategory,
  } = drink;

  return (
    <Col>
      <Card>
        <Card.Body>
          <Link to={`/estDrink/${drinkId}`}>
            <Button size="sm">Go To</Button>
          </Link>
          <Card.Img variant="top" src={drinkImage} />
          <Accordion>
            <Accordion.Header>
              <Card.Title>{drinkName}</Card.Title>
            </Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  <Card.Title>{drinkCategory}</Card.Title>
                  <Card.Text>Ingredients: </Card.Text>
                  {ingredients.length > 0 ? (
                    ingredients.map((item, index) => (
                      <Card.Text key={`${drinkId}-${index}`}>
                        {`${item.ingredient}: ${item.measurement}`}
                      </Card.Text>
                    ))
                  ) : (
                    <Card.Text>No ingredients available</Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion>
        </Card.Body>
      </Card>
    </Col>
  );
}

OgDrink.propTypes = {
  drink: PropTypes.shape({
    drinkId: PropTypes.number.isRequired,
    drinkImage: PropTypes.string.isRequired,
    drinkName: PropTypes.string.isRequired,
    drinkCategory: PropTypes.string.isRequired,
    drinkIngredients: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  }).isRequired,
};

export default OgDrink;
