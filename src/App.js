import React from 'react';
import { hot } from 'react-hot-loader';

import Hello from './components/Hello';
import styles from './scss/App.scss'; //moduluar css

// import './scss/App.scss'; //regular css
// <div className="App">

class App extends React.Component {
  render() {
    return (
      <div className={styles.App}>
        <Hello hello={'Hello, world! And the people of the world!'} />
      </div>
    );
  }
}

export default hot(module)(App);
