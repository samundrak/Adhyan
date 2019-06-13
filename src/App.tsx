import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Guest from './views/Guest';
import { StateInterface, UserInterface } from './interfaces';
import UserProvider from './providers/UserProvider';
import Adhyan from './core/Adhyan';
import { ClickParam } from 'antd/lib/menu';
import { SIGN_OUT } from './consts';

type PropsType = {
  user: UserInterface;
  app: Adhyan;
};
class App extends React.Component<PropsType> {
  handleLayoutClick = (type: string) => {
    return (event: ClickParam) => {
      if (event.key === SIGN_OUT) {
        this.props.app.auth.signout();
      }
    };
  };
  render() {
    return (
      <div className="App">
        <Layout user={this.props.user} onClick={this.handleLayoutClick}>
          <Switch>
            <Route to="/" exact component={Guest} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state: StateInterface) => ({
  user: state.user,
});
export default connect(mapStateToProps)(App);
