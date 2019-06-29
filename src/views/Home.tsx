import React from 'react';
import { connect } from 'react-redux';

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
