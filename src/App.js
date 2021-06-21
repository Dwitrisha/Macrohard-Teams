import React, { Component } from 'react';
import Header from './Components/Header';
import Call from './Components/Pages/Call'
import Chat from './Components/Pages/Chat'
import Calendar from './Components/Pages/Calendar';
import {BrowserRouter as Router, 
  Switch, 
  Route} from  "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header/>

     <Router>
       <Switch>
         <Route exact path="/">
         <Call/> 
         </Route>

          <Route path="/chat">
           <Chat/>
          </Route>

         <Route path="/calendar">
           <Calendar/>
         </Route>

       </Switch>
     </Router>
    </div>
  );
 }
export default App;
