import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
  //gapi.auth2.getAuthInstance().currentUser.get().getId()
  componentDidMount() {
    //initialize the google-api library
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '1006215838713-5soqukff8rb745b3q9o2kjes39ks26nl.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      const userId = this.auth.currentUser.get().getId();

      this.props.signIn(userId);
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className='ui red google button'>
          <i className='google icon' />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className='ui red google button'>
          <i className='google icon' />
          Sign In With Google
        </button>
      );
    }
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  {
    signIn,
    signOut
  }
)(GoogleAuth);
