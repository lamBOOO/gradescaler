import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  BrowserRouter,
  Redirect,
  useParams
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/calendar">
      <div>
        <h2>tessssssasfsaasfasaft</h2>
        <Link to="/today"/>
        {/* <Redirect to="/your-new-location" push /> */}
        <h1>Hellso, Reactssssssss! </h1>
        {/* <Switch> */}
          <Route path="/pts=:pts" children={<Child />} />
        {/* </Switch> */}
        <Textareademo />
      </div>
      </BrowserRouter>
    )
  }
}

const SomeComponent = () => (
  <Route path="/" render={(props) => <ButtonToNavigate {...props} title="Update" />} />
)

const ButtonToNavigate = ({ title, history }) => (
  <button
    type="button"
    onClick={() => history.push('/my-new-location')}
  >
    {title}
  </button>
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
  const numbers = JSON.parse(pts);
  console.log(numbers)
  const listItems = numbers.map((number) =>  <li key={number}>{number}</li>);

  return (
    <div>
      <h3>Pts: {pts}</h3>
      <ul>{listItems}</ul>,
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'))
