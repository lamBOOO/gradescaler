import React, {Component, useState, useRef} from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import {Bar} from 'react-chartjs-2';

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
      gradeScheme: [1.0,1.3,1.7,2.0,2.3,2.7,3.0,3.3,3.7,4.0,5.0],
      gradeFrequency: null,
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
          points: [0,1,2,13,23,12,15,27,35,37,37,37,40,40,40,40,32,30,25,40,50,49,46,35],
          roof: 50,
          base: 25,
        },
        data: defaultData
      };
    }
  }

  calculateGrade = (pts) => {
    const grades = this.state.data.gradeScheme
    const diff = parseFloat(this.state.input.roof) - parseFloat(this.state.input.base)
    const ranges = [0].concat(
      [...Array(10).keys()].map(x => parseFloat(this.state.input.base) + 0.1*(x)*diff)
    )
    // console.log(pts)
    // console.log(ranges)
    for (var i = 0; i<ranges.length; i++) {
      if (pts >= ranges[ranges.length-i-1]) {
        return grades[i]
      }
    }
    return "error"
  }

  updateData() {
    // alert('hi')
    const gradeDict = this.state.input.points.map(pts => this.calculateGrade(pts))
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    const gradeFrequency = this.state.data.gradeScheme.map(gr => countOccurrences(gradeDict, gr))
    this.state.data.gradeFrequency = gradeFrequency;
    console.log(gradeFrequency)
  }

  render() {
    this.updateData()
    return (
      <BrowserRouter>
        <Header />
        <div>
          <div>
            <h5 className="m-2 text-center">Settings & Input</h5>
            <Container>
              <Row>
                <Col>
                <Container>
                <Row>
                  <InputGroup className="mb-1 p-0">
                    <InputGroup.Text id="basic-addon1">🥸 Roof</InputGroup.Text>
                    <FormControl
                      placeholder={this.state.input.roof}
                      onChange={event => {
                        this.setState({input: {...this.state.input, roof: event.target.value}})
                      }}
                    />
                  </InputGroup>
                  <InputGroup className="mb-1 p-0">
                    <InputGroup.Text id="basic-addon1">🥳 Base</InputGroup.Text>
                    <FormControl
                      placeholder={this.state.input.base}
                      onChange={event => {
                        this.setState({input: {...this.state.input, base: event.target.value}})
                      }}
                    />
                  </InputGroup>
                </Row>
                </Container>
                <div className="text-center">
                  <Button className="btn-sm m-1" variant="danger" onClick={() => {window.location.href = "/"}}>
                    Reset
                  </Button>
                  <CopyButtonWithOverlay copyUrl={window.location.host + '/input=' + JSON.stringify(this.state.input)}/>
                </div>
                </Col>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Input</InputGroup.Text>
                    <FormControl
                      as="textarea" rows="4" placeholder={this.state.input.points}
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
            <Alert className="m-2 w-50" key="warn" variant="danger">
              <Alert.Heading>🚨 Error in input field.</Alert.Heading>
              <p>
                <ul className="text-start">
                  <li>Only numeric values are allowed.</li>
                  <li>The list separator must be a whitespace, newline or a comma.</li>
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
          <h5 className="m-2 text-center">Results</h5>
          <Container>
            <Row>
              <Col>
                <h6 className="text-center">Graphical data</h6>
                <VerticalBar
                  labels={this.state.data.gradeScheme}
                  data={this.state.data.gradeFrequency}
                />
              </Col>
              <Col>
                <h6 className="text-center">Tabular data</h6>
                <DataTable points={this.state.input.points} gradeFunction={this.calculateGrade}/>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
      </BrowserRouter>
    )
  }

  handlePointsInput(inputString) {
    inputString = inputString.replaceAll(',', ' ')
    const pts = inputString.split(/\s+/)
    if (pts.some(isNaN)) {
      this.setState({data: {...this.state.data, showerror: true}})
    } else {
      this.setState({data: {...this.state.data, showerror: false}})
      this.setState({input: {...this.state.input, points: pts}})
    }
  }

  renderCopyMessage = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );
}

class VerticalBar extends React.Component {
  render() {
    const data = {
      labels:  this.props.labels,
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
      plugins: {
        legend: {
            display: false,
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      animation: true,
    };
    return (
      <Bar data={data} options={options} />
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
        setTimeout( () => {setShow(false); }, 2000);
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
        <p>Made by Lambert Theisen. 2021.</p>
      </div>
    )
  }
}

class DataTable extends Component {
  render() {
    const points = this.props.points;
    const grades = this.props.points;
    const tableBody = points.map(
      (e, i) => <tr><td>{i}</td><td>{e}</td><td>{this.props.gradeFunction(grades[i])}</td></tr>
    )
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Points</th>
              <th>Grade</th>
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
