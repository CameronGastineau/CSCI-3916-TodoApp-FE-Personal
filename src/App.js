import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './stores/store';

import './App.css';
import TodoHeader from "./components/TodoHeader/TodoHeader";
import BaseRouter from "./routes/baserouter";

function App() {
  return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <div>
              <TodoHeader/>
              <BaseRouter/>
            </div>
          </Router>
        </Provider>
      </div>
  );
}

export default App;
