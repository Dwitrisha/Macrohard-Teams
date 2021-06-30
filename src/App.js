import React, { Component } from 'react'
import Video from './Video'
import Home from './Home'
import Header from './Components/Header';
import Call from './Components/Pages/Call'
import Chat from './Components/Pages/Chat'
import Calendar from './Components/Pages/Calendar';
import {BrowserRouter as Router, 
  Switch, 
  Route,Link} from  "react-router-dom";
import Register from './Components/Pages/Register';
import Login from './Components/Pages/Login';


class App extends Component {
	render() {
		return (
			<div>
				
					<Router>
	   				<Switch>	
					<Route path="/" exact component={Login}/>
		
				
					<Route path="/register">
					<Register/>
					</Route>

					<Route path="/login">
					<Login/>
					</Route>
			  
			{/* <Route path="/" exact component={Home} /> */}
				

				
					<Route path="/chat">
					<Chat/>
					</Route>

					<Route path="/calendar">
					<Calendar/>
					</Route>

					<Route path="/home" component={Home} />
					<Route path="/:url" component={Video} />  
				  </Switch>
	              </Router>
			</div>
		)
	}
}

export default App;