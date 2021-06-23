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


class App extends Component {
	render() {
		return (
			<div>
				 <Header/>
				<Router>
					<Switch>
				
					<Route path="/" exact component={Home} />

          <Route path="/chat">
           <Chat/>
          </Route>

         <Route path="/calendar">
           <Calendar/>
         </Route>

		 <Route path="/call" exact component={Home} />

						<Route path="/:url" component={Video} />
					</Switch>
				</Router>
			</div>
		)
	}
}

export default App;