import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import DeckHome from './components/DeckList'
import CardHome from './components/CardList'
import Bar from './components/navbar'
import HomePage from './components/HomePage'
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <Bar />
          </nav>
          <header className="bg">
            <div id="wrapper">
              <Switch>
                <Route path="/card" component={CardHome} />
                <Route path="/deck">
                  <DeckHome />
                </Route>
                <Route path="/">
                  <HomePage />
                </Route>
              </Switch>
            </div>
          </header>
        </div>
      </Router>
    </div>
  );
}

export default App;
