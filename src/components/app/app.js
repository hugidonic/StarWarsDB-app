import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';

import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import { SwapiServiceProvider } from '../swapi-service-context';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import './app.css';
import { StarshipDetails } from '../sw-components';
import { 
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  LoginPage,
  SecretPage
} from '../pages';


export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false,
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ?
                        DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      };
    });
  };

  render() {

    const { isLoggedIn } = this.state

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService} >
        
          <Router>

            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />

              <RandomPlanet />

              {/* <PeoplePage />
              <PlanetsPage />
              <StarshipsPage /> */}
              <Switch>

                <Route path='/' exact render={() => (<h2 className="text-center">Welcome to StarWars Database</h2>)} />

                <Route path='/people/:id?' exact component={PeoplePage}/>
                <Route path='/planets/' exact component={PlanetsPage}/>
                <Route path='/starships/' exact component={StarshipsPage}/>

                <Route 
                  path='/login/' 
                  exact render={() => {
                    return <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin}/>
                  }} 
                />
                <Route 
                  path='/secret/' 
                  exact render={() => {
                    return <SecretPage isLoggedIn={isLoggedIn}/>
                  }}
                />

                <Route 
                  path='/starships/:id' 
                  render={({match}) => {
                    const { id } = match.params
                    return <StarshipDetails itemId={id}/>
                  }}
                />
                {/* <Redirect to='/' /> */}

                <Route render={() => (<h2>404 Page not found</h2>)} />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
