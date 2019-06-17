import React from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Guest from './views/Guest';
import { StateInterface, UserInterface } from './interfaces';
import Adhyan from './core/Adhyan';
import { ClickParam } from 'antd/lib/menu';
import { SIGN_OUT } from './consts';
import AppProvider from './providers/AppProvider';
import Home from './views/Home';
import Upload from './views/Upload';

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
        <Spin loading={true}>
          <AppProvider app={this.props.app}>
            <Layout user={this.props.user} onClick={this.handleLayoutClick}>
              {!this.props.user.uid ? (
                <Guest />
              ) : (
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/upload" exact component={Upload} />
                </Switch>
              )}
            </Layout>
          </AppProvider>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = (state: StateInterface) => ({
  user: state.user,
});
export default connect(mapStateToProps)(App);
