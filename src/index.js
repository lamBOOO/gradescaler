import React, {Component, useState, useRef} from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

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

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' render={(props) => <App {...props} />} />
      <Route path='/data=:data' render={(props) => <App {...props} />} />
    </Switch>
  </BrowserRouter>
);

class App extends Component {
  constructor(props) {
    super(props);
    const { data } = props.match.params;
    if (data != null) {
      this.state = JSON.parse(data);
    } else {
      // default
      this.state = {
        points: [1,2,3],
        maxpts: 50,
        roof: 50,
        base: 25,
        showerror: false,
      };
    }
  }

  calculateGrade = (pts) => {
    const grades = [1.0,1.3,1.7,2.0,2.3,2.7,3.0,3.3,3.7,4.0,5.0]
    const diff = parseFloat(this.state.roof) - parseFloat(this.state.base)
    const ranges = [0].concat(
      [...Array(10).keys()].map(x => parseFloat(this.state.base) + 0.1*(x)*diff)
    )
    console.log(pts)
    console.log(ranges)
    for (var i = 0; i<ranges.length; i++) {
      if (pts >= ranges[ranges.length-i-1]) {
        return grades[i]
      }
    }
    return "error"
  }

  handleCallback = (childData) =>{
    let tmpData = this.state
    tmpData["points"] = childData
    this.setState({data: {tmpData}})
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <div>
          <div>
            <h4 className="m-2">Settings & Input</h4>
            <Container>
              <Row>
                <Col>
                <Container>
                <Row>
                  <InputGroup className="mb-1 p-0">
                    <InputGroup.Text id="basic-addon1">💯 Max. points</InputGroup.Text>
                    <FormControl
                      placeholder={this.state.maxpts}
                      onChange={event => {
                        this.setState({maxpts : event.target.value});
                      }}
                    />
                  </InputGroup>
                  <InputGroup className="mb-1 p-0">
                    <InputGroup.Text id="basic-addon1">🥸 Roof</InputGroup.Text>
                    <FormControl
                      placeholder={this.state.roof}
                      onChange={event => {
                        this.setState({roof : event.target.value});
                      }}
                    />
                  </InputGroup>
                  <InputGroup className="mb-1 p-0">
                    <InputGroup.Text id="basic-addon1">🥳 Base</InputGroup.Text>
                    <FormControl
                      placeholder={this.state.base}
                      onChange={event => {
                        this.setState({base : event.target.value});
                      }}
                    />
                  </InputGroup>
                </Row>
                </Container>
                <div className="text-center">
                  <Button className="m-1" variant="danger" onClick={() => {window.location.href = "/"}}>
                    Reset
                  </Button>
                  <CopyButtonWithOverlay copyUrl={window.location.host + '/data=' + JSON.stringify(this.state)}/>
                </div>
                </Col>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Input</InputGroup.Text>
                    <FormControl
                      as="textarea" rows="7" placeholder={this.state.points}
                      onChange={event => {
                        this.handlePointsInput(event.target.value)
                      }}
                    />
                  </InputGroup>
                </Col>
              </Row>
          </Container>
          {
          this.state.showerror
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
          <h4 className="m-2">Results</h4>
          <DataTable points={this.state.points} gradeFunction={this.calculateGrade}/>
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
      this.setState({showerror: true})
    } else {
      this.setState({showerror: false})
      this.setState({points: pts})
    }
  }

  renderCopyMessage = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );
}

function CopyButtonWithOverlay(props) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <Button className="m-1 w-50" variant="primary" ref={target} onClick={() => {
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
