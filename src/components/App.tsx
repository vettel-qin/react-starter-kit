import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

class App extends React.Component {
  public props: any;
  public render() {
    return(
      this.props.children
    );
  }
}

export default hot(module)(App);
