import React, { Component, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { Bar, Line } from 'react-chartjs-2';

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import Popover from 'react-bootstrap/Popover';

import 'bootstrap/dist/css/bootstrap.min.css';
const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' render={(props) => <App {...props} />} />
      <Route path='/input=:input' render={(props) => <App {...props} />} />
    </Switch>
  </BrowserRouter>
);

class App extends Component {
  constructor(props) {
    super(props);
    const defaultData = {
      showerror: false,
      gradeScheme: [1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0, 5.0],
      gradeFrequency: null,
      gradeRanges: null,
      average: null,
    }
    const { input } = props.match.params;
    if (input != null) {
      this.state = {
        input: JSON.parse(input),
        data: defaultData
      }
    } else {
      // default
      this.state = {
        input: {
          points: [0, 1, 2, 13, 23, 12, 15, 27, 35, 37, 37, 37, 40, 40, 40, 40, 32, 30, 25, 40, 50, 49, 46, 35, 38, 38, 38, 38, 38, 38, 43, 43, 43, 33, 33, 33, 28, 28,26],
          maxpts: 50,
          roof: 50,
          base: 25,
        },
        data: defaultData
      };
    }
  }

  calculateGrade = (pts) => {
    const grades = this.state.data.gradeScheme
    const ranges = this.state.data.gradeRanges
    for (var i = 0; i < ranges.length; i++) {
      if (pts >= ranges[ranges.length - i - 1]) {
        return grades[i]
      }
    }
    return "error"
  }

  updateData() {
    // grade ranges
    const diff = parseFloat(this.state.input.roof) - parseFloat(this.state.input.base)
    const gradeRanges = [0].concat(
      [...Array(10).keys()].map(x => parseFloat(this.state.input.base) + 0.1 * (x) * diff)
    )
    this.state.data.gradeRanges = gradeRanges;

    // grade frequcencies
    const gradeDict = this.state.input.points.map(pts => this.calculateGrade(pts))
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    const gradeFrequency = this.state.data.gradeScheme.map(gr => countOccurrences(gradeDict, gr))
    this.state.data.gradeFrequency = gradeFrequency;
    console.log(gradeFrequency)

    // average
    const weightedSumArray = this.state.data.gradeFrequency.map(
      (e,i) => this.state.data.gradeScheme[i] * e
    );
    const numParticipants = this.state.data.gradeFrequency.reduce((a, b) => a + b, 0)
    const weightedSum = weightedSumArray.reduce((a, b) => a + b, 0)
    const average = weightedSum / numParticipants;
    this.state.data.average = average.toPrecision(3);
  }

  render() {
    this.updateData()
    return (
      <BrowserRouter>
        <Header />
        <div>
          <div className="">
            <h5 className="fw-bold m-2 text-center">Settings & Input</h5>
            <Container>
              <Row>
                <Col>
                  <Container>
                    <Row>
                      <InputGroup className="mb-1 p-0">
                        <InputGroup.Text id="basic-addon1">💯 Max.</InputGroup.Text>
                        <FormControl
                          placeholder={this.state.input.maxpts}
                          onChange={event => {
                            this.setState({ input: { ...this.state.input, maxpts: event.target.value } })
                          }}
                        />
                      </InputGroup>
                      <InputGroup className="mb-1 p-0">
                        <InputGroup.Text id="basic-addon1">🥸 Roof</InputGroup.Text>
                        <FormControl
                          placeholder={this.state.input.roof}
                          onChange={event => {
                            this.setState({ input: { ...this.state.input, roof: event.target.value } })
                          }}
                        />
                      </InputGroup>
                      <InputGroup className="mb-1 p-0">
                        <InputGroup.Text id="basic-addon1">🥳 Base</InputGroup.Text>
                        <FormControl
                          placeholder={this.state.input.base}
                          onChange={event => {
                            this.setState({ input: { ...this.state.input, base: event.target.value } })
                          }}
                        />
                      </InputGroup>
                    </Row>
                  </Container>
                  <div className="text-center">
                    <Button className="btn-sm m-1" variant="danger" onClick={() => { window.location.href = "/" }}>
                      Reset
                    </Button>
                    <CopyButtonWithOverlay copyUrl={window.location.host + '/input=' + JSON.stringify(this.state.input)} />
                  </div>
                </Col>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Input</InputGroup.Text>
                    <FormControl
                      as="textarea"
                      style={{ height: '150px' }}
                      placeholder={this.state.input.points.join("\n")}
                      onChange={event => {
                        this.handlePointsInput(event.target.value)
                      }}
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Container>
            {
              this.state.data.showerror
                ?
                <div className="text-center d-flex justify-content-center">
                  <Alert className="m-2" key="warn" variant="danger">
                    <Alert.Heading>🚨 Error in input field.</Alert.Heading>
                    <p>
                      <ul className="text-start">
                        <li>Only numeric values are allowed.</li>
                        <li>Decimal separator can be point or comma.</li>
                        <li>The list separator must be any whitespace or a newline.</li>
                      </ul>
                    </p>
                    <hr />
                    <p className="mb-0">
                      ➡️ If you don't know how to fix it, reset the whole app and start again.
                    </p>
                  </Alert>
                </div>
                :
                ''
            }
          </div>
          <div className="">
            <h5 className="fw-bold m-2 text-center">Results</h5>
            <Container>
              <Row>
                <Col>
                  <h6 className="text-center">Graphical data</h6>
                  <i className="bi bi-cart-fill"></i>
                  <GradeFreqBarChart
                    labels={this.state.data.gradeScheme}
                    data={this.state.data.gradeFrequency}
                  />
                  <GradeRangesLineChart
                    gradeRange={this.state.data.gradeRanges}
                    gradeScheme={this.state.data.gradeScheme}
                    maxpts={this.state.input.maxpts}
                  />
                </Col>
                <Col>
                  <h6 className="text-center">Indicators</h6>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Average</th>
                        <th>Failing Rate</th>
                        <th>Percentage to pass</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{this.state.data.average}</td>
                        <td>{
                          Math.round(100*this.state.data.gradeFrequency[this.state.data.gradeFrequency.length-1] / this.state.data.gradeFrequency.reduce((a, b) => a + b, 0))
                        } %</td>
                        <td>{Math.round(100*this.state.data.gradeRanges[1]/this.state.input.maxpts)} %</td>
                      </tr>
                    </tbody>
                  </Table>
                  <h6 className="text-center">Tabular data</h6>
                  <DataTable gradeScheme={this.state.data.gradeScheme} gradeRanges={this.state.data.gradeRanges} gradeFrequencies={this.state.data.gradeFrequency} />
                </Col>
              </Row>
            </Container>
          </div>
          <div className="m-3">
            <h5 className="fw-bold m-2 text-center">About</h5>
            <div>
              Grade Schemer calculates grading schemes with adaptive failing and passing rates and presents graphical exam statistics. Since exams change from semester to semester, the grading scheme sometimes has to be adapted to account for, e.g., overly hard exam questions. Grade Schemer transforms a list of exam points into a corresponding grade mapping by applying a variables exam passing rate (<i>Base</i>) and a variable best grade rate (<i>Roof</i>).
            </div>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    )
  }

  handlePointsInput(inputString) {
    inputString = inputString.replaceAll(',', '.')
    const pts = inputString.split(/\s+/)
    if (pts.some(isNaN)) {
      this.setState({ data: { ...this.state.data, showerror: true } })
    } else {
      this.setState({ data: { ...this.state.data, showerror: false } })
      this.setState({ input: { ...this.state.input, points: pts } })
    }
  }

  renderCopyMessage = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );
}

class GradeFreqBarChart extends React.Component {
  render() {
    const data = {
      labels: this.props.labels,
      datasets: [
        {
          // label: 'Grade Distribution',
          data: this.props.data,
          backgroundColor: [
            '#0d6efd'
          ],
          borderColor: [
            'rgba(0, 0, 0)',
          ],
          borderWidth: 1,
        },
      ],
    };
    const options = {
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Points',
          }
        },
        y: {
          title: {
            display: true,
            text: 'Grade',
          },
          ticks: {
            beginAtZero: true,
          },
        },
      },
      animation: true,
    };
    return (
      <Bar data={data} options={options} />
    )
  }
}

class GradeRangesLineChart extends React.Component {
  render() {
    const plotData = this.props.gradeRange.map(
      (e, i) => {
        return ({ "x": e, "y": this.props.gradeScheme[this.props.gradeScheme.length - 1 - i] });
      }
    ).concat({ "x": this.props.maxpts, "y": 1 })
    console.log(plotData)
    const data = {
      datasets: [
        {
          data: plotData,
          stepped: true,
          backgroundColor: [
            '#0d6efd'
          ],
          borderColor: [
            'rgba(0, 0, 0)',
          ],
          borderWidth: 1,
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },

      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          display: true,
          title: {
            display: true,
            text: 'Points',
          }
        },
        y: {
          title: {
            display: true,
            text: 'Grade',
          }
        }
      },
      animation: true,
    };
    return (
      <Line data={data} options={options} />
    )
  }
}

function CopyButtonWithOverlay(props) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <Button className="m-1 btn-sm w-50" variant="primary" ref={target} onClick={() => {
        navigator.clipboard.writeText(props.copyUrl)
        setShow(true)
        setTimeout(() => { setShow(false); }, 2000);
      }
      }>
        Copy link
      </Button>
      <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            ✉️ Copied link into clipboard!
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

class Header extends Component {
  render() {
    return (
      <h1 className="fs-1 fw-bold border-bottom pb-2 text-center">
        ✍️ Grade Schemer <Badge bg="primary">v1</Badge>
      </h1>
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <div className="text-center border-top">
        <div className="">🇩🇪 Made in Germany by Lambert Theisen</div>
        <div className="">🇪🇺 100% EU GDPR compliant (serverless)</div>
        <Example />
      </div>
    )
  }
}

function Example() {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <div ref={ref}>
      <Button className="btn-sm" onClick={handleClick}>
        🧑‍⚖️ Legal info / Impressum
      </Button>
      <Overlay
        show={show}
        target={target}
        placement="top"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Header as="h3">
            Legal info
          </Popover.Header>
          <Popover.Body>
            <strong>
              Impressum
            </strong>
            <br></br>
            Lambert Theisen<br></br>
            Hochbrück 4<br></br>
            D-52070 Aachen<br></br>
            Germany<br></br>
            poldi.icq(at)arcor.de<br></br>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}

class DataTable extends Component {
  render() {
    const gradeScheme = this.props.gradeScheme;
    const gradeRanges = this.props.gradeRanges;
    const gradeFrequencies = this.props.gradeFrequencies;
    const totalParticipants = gradeFrequencies.reduce((a, b) => a + b, 0)
    const tableBody = gradeScheme.map(
      (e, i) => <tr>
        <td>{e}</td>
        <td>{gradeRanges[gradeRanges.length-1-i]}</td>
        <td>{gradeRanges[gradeRanges.length-i]}</td>
        <td>{gradeFrequencies[i]}</td>
        <td>{Math.round(100 * gradeFrequencies[i] / totalParticipants)} %</td>
      </tr>
    )
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Grade</th>
              <th>≥</th>
              <th>&lt;</th>
              <th colSpan="2">Frequency</th>
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </Table>
      </div>
    );
  }
}

ReactDOM.render(<AppRouter />, document.getElementById('root'))
