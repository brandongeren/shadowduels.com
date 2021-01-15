import React from 'react';

import Chat from './components/Chat';
import Join from './components/Join';
import {CardTest} from './components/Card';

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={CardTest} />
      <Route path="/chat" component={Chat} />
      <Route path="/card" component={CardTest}/>
    </Router>
  );
}

export default App;