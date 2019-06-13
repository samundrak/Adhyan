import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Guest from './views/Guest';

class App extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route to="/" exact component={Guest} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
