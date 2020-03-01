import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Search from "./pages/Search";
import './App.css';

import axios from "axios";
function App() {
  useEffect(() => {
    axios.get("/api/hello").then(result => {
      console.log(result.data);
    })
  }, [])

  return (
    <Router>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/search">
        <Search />
      </Route>
    </Router>

  );
}

export default App;
