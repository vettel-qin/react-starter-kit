import React, { Component } from 'react';
import s from './Home.scss';

class Home extends Component {

  public componentWillMount() {
  }

  public render() {
    return (
      <div className={s.main}>
        react-typescript-starter
      </div>
    );
  }
}
export default Home;
