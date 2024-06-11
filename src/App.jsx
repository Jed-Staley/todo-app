import React from 'react';
import './App.scss';

import Header from './Components/Header/index';
import Todo from './Components/Todo';
import Footer from './Components/Footer';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Todo />
        <Footer />
      </>
    );
  }
}
