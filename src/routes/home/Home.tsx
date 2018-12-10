import React, { Component } from 'react';
import s from './Home.scss';

class Home extends Component {
  public render() {
    return (
      <section className={s.root}>
        home
        <div className={s.logo} />
      </section>
    );
  }
}

export default Home;
