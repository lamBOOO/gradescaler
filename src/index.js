import React, {Component, useState} from 'react'
import ReactDOM from 'react-dom'
// import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  BrowserRouter,
  Redirect,
  useParams
} from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Fade from 'react-bootstrap/Fade';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/calendar">
        <div>
          <div>
            <h1 className="fs-1 fw-bold border-bottom pb-2 text-center">Grade Schemer <Badge bg="primary">v1</Badge></h1>
            <h4 className="m-2">Settings & Input</h4>
            <Container>
              <Row>
                <Col>
                <Container>
                <Row>
                  <InputGroup className="mb-1 p-0">
                    <InputGroup.Text id="basic-addon1">Max. points</InputGroup.Text>
                    <FormControl placeholder="50"/>
                  </InputGroup>
                  <InputGroup className="mb-1 p-0">
                    <InputGroup.Text id="basic-addon1">Top</InputGroup.Text>
                    <FormControl placeholder="50"/>
                    <Form.Range placeholder="10" />
                  </InputGroup>
                  <InputGroup className="mb-1 p-0">
                    <InputGroup.Text id="basic-addon1">Roof</InputGroup.Text>
                    <FormControl placeholder="50"/>
                    <Form.Range />
                  </InputGroup>
                </Row>
                </Container>
                </Col>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Input</InputGroup.Text>
                    <FormControl as="textarea" placeholder="1 2 3.5 15 30 50.0" aria-label="With textarea" />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <div className="text-center">
                  <Button className="mb-1 w-25" variant="primary">Update</Button>{' '}
                  <Button className="mb-1 w-25" variant="danger">Reset</Button>{' '}
                </div>
              </Row>
          </Container>
          <Alert className="m-2" key="warn" variant="danger">
            Please check input!
          </Alert>
          <h4 className="m-2">Results</h4>
      </div>
      {/* <Alert bsStyle="warning" className="error-container">
        <div className="error-msg">Test</div>
      </Alert>
      <Badge bg="primary">Primary</Badge>
      <Button variant="primary">
        Profile <Badge bg="secondary">9</Badge>
        <span className="visually-hidden">unread messages</span>
      </Button>
        <Link to="/today"/>
        <h1>Hellso, Reactssssssssss! </h1>
          <Route path="/pts=:pts" children={<Child />} />
        <Alert key="ag" variant="danger">
          This is a  alert—check it out!
        </Alert>
        <Button variant="flat" size="xxl">
          flat button
        </Button>
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary">Left</Button>
          <Button variant="secondary">Middle</Button>
          <Button variant="secondary">Right</Button>
        </ButtonGroup>
        <Container>
          <Row>
            <Col>
            <Alert variant="success">
              <Alert.Heading>Hey, nice to see you</Alert.Heading>
              <p>
                Aww yeah, you successfully read this important alert message. This example
                text is going to run a bit longer so that you can see how spacing within an
                alert works with this kind of content.
              </p>
              <hr />
              <p className="mb-0">
                Whenever you need to, be sure to use margin utilities to keep things nice
                and tidy.
              </p>
            </Alert>
            </Col>
            <Col>2 of 2</Col>
          </Row>
          <Row>
            <Col>1 of 3</Col>
            <Col>2 of 3</Col>
            <Col>3 of 3</Col>
          </Row>
        </Container>
        <Example /> */}
      </div>
      </BrowserRouter>
    )
  }
}

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-fade-text"
        aria-expanded={open}
      >
        Toggle text
      </Button>
      <Fade in={open}>
        <div id="example-fade-text">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
          terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
          labore wes anderson cred nesciunt sapiente ea proident.
        </div>
      </Fade>
    </>
  );
}

const SomeComponent = () => (
  <Route path="/" render={(props) => <ButtonToNavigate {...props} title="Update" />} />
)

const ButtonToNavigate = ({ title, history }) => (
  <Button
    type="button"
    variant="danger"
    onClick={() => history.push('/my-new-location')}
  >
    {title}
  </Button>
);

class Textareademo extends Component {

  constructor() {
    super();
    this.state = {
      textAreaValue: "asgsag"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ textAreaValue: event.target.value });
  }

  render() {
    return (
      <div>
        <label>Points </label>
        <br></br>
        <textarea
          value={this.state.textAreaValue}
          onChange={this.handleChange}
        />
        <br></br>
        <SomeComponent />
      </div>
    );
  }
}

// function PointsList(props) {
//   return (
//     <div>
//       {props.items.map((item, index) => (
//         <Item key={index} item={item} />
//       ))}
//     </div>
//   );
// }



function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { pts } = useParams();
  const points = JSON.parse(pts);
  console.log(points)
  const listItems = points.map((number) =>  <li key={number}>{number}</li>);

  return (
    <div>
      <h3>Pts: {pts}</h3>
      <ul>{listItems}</ul>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Points</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan="2">Larry the Bird</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'))
