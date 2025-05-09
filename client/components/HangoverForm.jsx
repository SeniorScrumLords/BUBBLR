import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Form,
  ListGroup,
  Button,
  Accordion,
  Container,
  Col,
  Row,
} from 'react-bootstrap';

const HangoverForm = ({
  getAllHangoverInfo,
  editMode,
  setEditMode,
  editArr,
  setEditArr,
}) => {
  // set state for all table variables
  const [hangoverName, setHangoverName] = useState('');
  const [hangoverDate, setHangoverDate] = useState(0);
  const [hangoverAddSub, setHangoverAddSub] = useState(false);
  const [hangoverNote, setHangoverNote] = useState('');
  const [symptomName, setSymptomName] = useState('');
  const [symptomSeverity, setSymptomSeverity] = useState(0);
  const [symptomDuration, setSymptomDuration] = useState(0);
  const [pastDrink, setPastDrink] = useState('');
  const [pastShot, setPastShot] = useState(0);
  const [timespan, setTimespan] = useState(0);
  const [pastFood, setPastFood] = useState('');

  const handleInputChange = (key, event) => key(event.target.value);
  const resetStateAndForm = () => {
    setHangoverName('');
    setHangoverDate(0);
    setHangoverAddSub(false);
    setHangoverNote('');
    setSymptomName('');
    setSymptomSeverity(0);
    setSymptomDuration(0);
    setPastDrink('');
    setPastShot(0);
    setTimespan('');
    setPastFood('');
  };
  useEffect(() => {
    if (editMode) {
      setHangoverName(editArr[0].hangoverName || '');
      setHangoverDate(editArr[0].hangoverDate);
      setHangoverAddSub(editArr[0].addSub);
      setHangoverNote(editArr[0].hangoverNote || '');
      setSymptomName(editArr[1].SymptomName);
      setSymptomSeverity(editArr[1].symptomSeverity);
      setSymptomDuration(editArr[1].SymptomDuration);
      setPastDrink(editArr[2].drink);
      setPastShot(editArr[2].shot);
      setTimespan(editArr[2].timespan);
      setPastFood(editArr[3].food || '');
    }
  }, []);

  const postForm = () => {
    const info = {
      info: {
        hangoverName,
        hangoverDate,
        addSub: hangoverAddSub === 'on',
        hangoverNote,
        SymptomName: symptomName,
        symptomSeverity,
        SymptomDuration: symptomDuration,
        drink: pastDrink,
        shot: pastShot,
        timeSpan: timespan,
        food: pastFood,
      },
    };
    axios
      .post('api/hangover', info)
      .then(() => resetStateAndForm())
      .then(() => getAllHangoverInfo())
      .catch((err) => console.error('unable to post form', err));
  };

  const patchForm = () => {
    const patchInfo = {
      hangInfo: {
        hangoverName,
        hangoverDate,
        addSub: hangoverAddSub === 'on',
        hangoverNote,
      },
      symInfo: {
        SymptomName: symptomName,
        symptomSeverity,
        SymptomDuration: symptomDuration,
      },
      drinkInfo: {
        drink: pastDrink,
        shot: pastShot,
        timeSpan: timespan,
      },
      foodInfo: {
        food: pastFood || '',
      },
    };
    Promise.all([
      axios.patch(`/api/hangover/hangover/${editArr[0].id}`, patchInfo),
      axios.patch(`/api/hangover/symptom/${editArr[1].id}`, patchInfo),
      axios.patch(`/api/hangover/drink/${editArr[2].id}`, patchInfo),
      axios.patch(`/api/hangover/food/${editArr[3].id}`, patchInfo),
    ])
      .then(() => {
        setEditMode(false);
        setEditArr([]);
        resetStateAndForm();
        getAllHangoverInfo();
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container>
      <Accordion className='hangover_accordion' data-bs-theme='dark'>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>Accordion Form Test</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group className='mb-3' controlId='hangoverInfo'>
                <Row className='mb-3'>
                  <Form.Label>Hangover Assessment</Form.Label>
                  <Col>
                    <Form.Control
                      type='text'
                      value={hangoverName}
                      placeholder='what did this to you'
                      onChange={(event) =>
                        handleInputChange(setHangoverName, event)
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type='date'
                      value={hangoverDate}
                      name='date'
                      placeholder='2/25/25'
                      onChange={(event) =>
                        handleInputChange(setHangoverDate, event)
                      }
                    />
                  </Col>
                  <Col>
                    <div>other substances? click below</div>
                    <Form.Control
                      type='radio'
                      onChange={(event) =>
                        handleInputChange(setHangoverAddSub, event)
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type='text'
                      value={hangoverNote}
                      placeholder='what substances'
                      onChange={(event) =>
                        handleInputChange(setHangoverNote, event)
                      }
                    />
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col>
                    <div>Worst symptom</div>
                    <Form.Control
                      type='text'
                      value={symptomName}
                      placeholder='Symptom'
                      onChange={(event) =>
                        handleInputChange(setSymptomName, event)
                      }
                    />
                  </Col>
                  <Col>
                    <div>1-10</div>
                    <Form.Control
                      type='number'
                      value={symptomSeverity}
                      placeholder='How bad'
                      onChange={(event) =>
                        handleInputChange(setSymptomSeverity, event)
                      }
                    />
                  </Col>
                  <Col>
                    <div>How long did it last</div>
                    <Form.Control
                      type='number'
                      value={symptomDuration}
                      placeholder=''
                      onChange={(event) =>
                        handleInputChange(setSymptomDuration, event)
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>Main drink</div>
                    <Form.Control
                      type='text'
                      value={pastDrink}
                      placeholder=''
                      onChange={(event) =>
                        handleInputChange(setPastDrink, event)
                      }
                    />
                  </Col>
                  <Col>
                    <div>How many</div>
                    <Form.Control
                      type='number'
                      value={pastShot}
                      // placeholder='3'
                      onChange={(event) =>
                        handleInputChange(setPastShot, event)
                      }
                    />
                  </Col>
                  <Col>
                    <div>Over how long</div>
                    <Form.Control
                      type='number'
                      value={timespan}
                      placeholder='in hours'
                      onChange={(event) =>
                        handleInputChange(setTimespan, event)
                      }
                    />
                  </Col>
                </Row>
                <div>Did you eat anything?</div>
                <Form.Control
                  type='text'
                  value={pastFood}
                  placeholder='tacos'
                  onChange={(event) => handleInputChange(setPastFood, event)}
                />
              </Form.Group>
              <Form.Group
                className='mb-3'
              ></Form.Group>
              <Button onClick={postForm}>Submit</Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default HangoverForm;
