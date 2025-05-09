import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CanvasJSReact from '@canvasjs/react-charts';
import HangoverForm from './HangoverForm.jsx';

// const Canvas = CanvasJSReact.CanvasJS;
const CanvasChart = CanvasJSReact.CanvasJSChart;

const Hangovers = () => {
  const [hangData, setHangData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editArr, setEditArr] = useState([]);

  const getAllHangoverInfo = () => {
    axios
      .get('api/hangover')
      .then(({ data }) => {
        const fullData = [];
        data[0].forEach((set) => {
          const someData = [];
          someData.push(set);
          data[1].forEach((element) => {
            if (element.HangoverId === set.id) {
              someData.push(element);
            }
          });
          data[2].forEach((element) => {
            if (element.HangoverId === set.id) {
              someData.push(element);
            }
          });
          data[3].forEach((element) => {
            if (element.HangoverId === set.id) {
              someData.push(element);
            }
          });
          fullData.push(someData);
        });
        console.log('fullData');
        console.log(fullData);
        setHangData(fullData);
      })
      .catch((err) => console.error(err));
  };

  const sortToSpecificHangover = (matrix, title) => {
    const rightSet = [];
    for (let i = 0; i < matrix.length; i += 1) {
      if (matrix[i][0].hangoverName === title) {
        console.log('matrix stuff');
        console.log(matrix[i]);
        const [hang, symptom, drink, food] = matrix[i];
        rightSet.push(hang, symptom, drink, food);
        break;
      }
    }
    setEditArr(rightSet);
    setEditMode(true);
  };

  const setOfHangovers = [];
  hangData.forEach((group) => {
    setOfHangovers.push(group[0]);
  });
  useEffect(() => {
    getAllHangoverInfo();
  }, []);
  const createLineChartInfo = (arr) => {
    const lineChartHangoverArray = [];
    const lineChartSymptomArray = [];
    arr.forEach((nest) => {
      lineChartHangoverArray.push(nest[0]);
      lineChartSymptomArray.push(nest[1]);
    });
    return lineChartHangoverArray.map((item, i) => {
      console.log('checking symptom');
      console.log(lineChartSymptomArray[i]);
      const lineYear = +item.hangoverDate.toString().substring(0, 4);
      const lineMonth = +item.hangoverDate.toString().substring(5, 7);
      const lineDay = +item.hangoverDate.toString().substring(8, 10);

      return {
        x: new Date(lineYear, lineMonth, lineDay),
        y: lineChartSymptomArray[i].SymptomDuration,
      };
    });
  };

  const createBarChartInfo = (arr) => {
    console.log('the arr');
    console.log(arr);
    const barChartDrinkNamesAndValues = [];
    const drinksArray = [];
    arr.forEach((nest) => {
      drinksArray.push(nest[2]);
    });
    drinksArray.forEach((drinkObj) => {
      let tempArray = [];
      if (
        barChartDrinkNamesAndValues.every(
          (tuple) => !tuple.includes(drinkObj.drink),
        )
      ) {
        tempArray.push(drinkObj.drink, 1);
        barChartDrinkNamesAndValues.push(tempArray);
        tempArray = [];
      } else {
        for (let i = 0; i < barChartDrinkNamesAndValues.length; i += 1) {
          if (barChartDrinkNamesAndValues[i].includes(drinkObj.drink)) {
            barChartDrinkNamesAndValues[i][1] += 1;
            break;
          }
        }
      }
    });
    return barChartDrinkNamesAndValues.map((set) => {
      // {label: 'drink', y: <frequency>}
      console.log('');
      return {
        label: set[0],
        y: set[1],
      };
    });
  };

  const lineOptions = {
    animationEnabled: true,
    backgroundColor: 'dark grey',
    width: 420,
    height: 300,
    title: {
      text: 'Hangovers over time',
      fontColor: 'white',
      fontFamily: 'comic sans',
    },
    axisX: {
      valueFormatString: 'DD',
      labelFontColor: 'white',
      labelFontFamily: 'comic sans',
    },
    axisY: {
      title: 'timeSpan of symptoms',
      titleFontColor: 'white',
      titleFontSize: 20,
      titleFontFamily: 'comic sans',

      suffix: ' hrs',
    },
    data: [
      {
        yValueFormatString: '## hrs',
        xValueFormatString: 'DD/MM/Y',
        type: 'spline',
        dataPoints: createLineChartInfo(hangData),
      },
    ],
  };

  const barOptions = {
    backgroundColor: 'dark grey',
    width: 420,
    height: 300,
    title: {
      text: 'Hangover Frequency By Drink',
      fontColor: 'white',
      titleFontSize: 20,
      fontFamily: 'comic sans',
    },
    axisX: {
      labelFontColor: 'white',
      labelFontSize: 20,
      labelFontFamily: 'comic sans',
    },
    data: [
      {
        // (for each drink) dataPoints.push({label: drink, y: number})
        type: 'column',
        dataPoints: createBarChartInfo(hangData),
      },
    ],
  };
  const closeForm = () => {
    // this is where I close the accordion and reset the form data visually.
  };
  return (
    <Container>
      <Row>
        <Col>
          <CanvasChart options={lineOptions} />
        </Col>
        <Col>
          <div>
            <CanvasChart options={barOptions} />
          </div>
        </Col>
      </Row>
      <HangoverForm
        getAllHangoverInfo={getAllHangoverInfo}
        editMode={editMode}
        setEditMode={setEditMode}
        editArr={editArr}
        setEditArr={setEditArr}
      />
      <Row>
        <ul>
          {setOfHangovers.map((hangover) => (
            <Col key={hangover.id}>
              <li>
                {hangover.hangoverName}
                <Button
                  onClick={() => {
                    sortToSpecificHangover(hangData, hangover.hangoverName);
                  }}
                >Edit hangover info</Button>
              </li>
            </Col>
          ))}
        </ul>
      </Row>
    </Container>
  );
};

export default Hangovers;
