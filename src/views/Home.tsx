import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Breadcrumb } from 'antd';
import { StateInterface, UserInterface } from '../interfaces';
import Guest from './Guest';

const { Header, Content, Footer } = Layout;

type PropsType = {
  user: UserInterface;
};
class Home extends React.Component<PropsType> {
  render() {
    return (
      <div>
        {' '}
        <div>Home</div>
      </div>
    );
  }
}
const mapStateToProps = (state: StateInterface) => ({
  user: state.user,
});
export default connect(mapStateToProps)(Home);
