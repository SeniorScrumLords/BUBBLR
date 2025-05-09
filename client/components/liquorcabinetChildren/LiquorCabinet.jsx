

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styling/LiquorBottle.css';
import { Modal, Button, Card, Row, Col } from 'react-bootstrap';

const LiquorCabinet = () => {
  const navigate = useNavigate();
  const [liquor, setLiquor] = useState([]);
  const [show, setShow] = useState(false);
  const [showempty, setShowempty] = useState(false);


  useEffect(() => {
    axios.get('/api/liquor')
      .then((response) => {
        const liquorWithLevels = response.data.map(bottle => {
          console.log(bottle.date)
          return {
            ...bottle,
            fillLevel: bottle.amountLeft,
            date: new Date(bottle.date).toLocaleDateString('en-US') // Format the date
          }
        }
        );
        setLiquor(liquorWithLevels);
      })
      .catch((err) => {
        console.error("There was a problem fetching your Liquor Cabinet", err);
      });
  }, []);

  // Handle pour drink action
  const pourDrink = (id, currentFillLevel) => {
    const newFillLevel = Math.max(currentFillLevel - 6.25, 0); // Ensure it doesn't go negative

    // Update the UI first for instant feedback
    setLiquor((prevLiquor) =>
      prevLiquor.map((bottle) =>
        bottle.id === id ? { ...bottle, fillLevel: newFillLevel } : bottle
      )
    );

    // Send the PATCH request to update the fill level
    axios.patch(`/api/liquor/${id}`, { amountLeft: newFillLevel })
      .then(() => {

        if (newFillLevel === 25) {
          setShow(true); // Show alert at 25%
        }
        if (newFillLevel === 0) {
          setShowempty(true); // Show alert if empty
        }
      })
      .catch((error) => {
        console.error('Error during PATCH request:', error);
      });
  };

  // Handle delete bottle action
  const deleteBottle = (id) => {
    axios.delete(`/api/liquor/${id}`)
      .then(() => {
        setLiquor(prevLiquor => prevLiquor.filter(bottle => bottle.id !== id));
      })
      .catch((err) => {
        console.error("Error deleting bottle", err);
      });
  };
  const handleClose = () => setShow(false);
  const handleCloseEmpty = () => setShowempty(false);
  return (
    <div className="liquor-cabinet">
      {/* Alert for 25% fill level */}
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Down to 25%</Modal.Title>
          </Modal.Header>
          <Modal.Body>If you are enjoying this bottle, it might be time to reorder. </Modal.Body>
          <Modal.Footer>
            <Button bsPrefix="button" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      {/* Model for an empty bottle */}
      <>
        <Modal show={showempty} onHide={handleCloseEmpty}>
          <Modal.Header closeButton>
            <Modal.Title>Empty Bottle</Modal.Title>
          </Modal.Header>
          <Modal.Body>Time to Recycle!</Modal.Body>
          <Modal.Footer>
            <Button bsPrefix="button" onClick={handleCloseEmpty}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <h1>Your Virtual Liquor Cabinet</h1>
      <button className="button" onClick={() => navigate('/form')}>
        Create Bottle
      </button>

      <Row className="liquor-list">
        {liquor.map(
          ({ id, imageUrl, name, brand, ABV, typeLiquor, date, fillLevel }) => (



            <Col key={id} md={4} sm={6} xs={12} className="mb-4">
              <Card className="liquor-card bg-dark text-white">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    {/* Left: the graphic for the fill level */}
                    <div className="bottle mr-3">
                      <div className="liquid" style={{ height: `${fillLevel}%` }}

                      ></div>
                    </div>

                    {/* Right: the image of the liquor */}
                    <Card.Img

                      variant="top-right"
                      src={imageUrl}
                      alt={name}
                      className="float-end liquor-image img-fluid "
                      style={{ width: '100px', height: 'auto', marginLeft: '200px' }}
                    />
                  </div>

                  {/* Title and Details */}
                  <Card.Title >{name}</Card.Title>



                  <div className="info">
                    <strong>Brand:</strong> {brand}

                  </div>
                  <div className="info">
                    <strong>ABV:</strong> {ABV}%
                  </div>
                  <div className="info">
                    <strong>Type:</strong> {typeLiquor}
                  </div>
                  <div className="info">
                    <strong>Date Acquired:</strong> {date}
                  </div>
                  <div className="info">
                    <strong>Amount Left in Bottle:</strong> {fillLevel}%
                  </div>


                  {/* Buttons container */}
                  <div >
                    {/* Pour button */}
                    <button
                      className="button "

                      onClick={() => pourDrink(id, fillLevel)}
                      disabled={fillLevel <= 0}
                    >
                      Pour a Drink 🍷
                    </button>

                    {/* Delete button */}
                    <Button
                      variant="danger"
                      style={{ marginLeft: '200px' }}
                      onClick={() => deleteBottle(id)}>
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )
        )}
      </Row>
    </div>
  );
}

export default LiquorCabinet;