import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux"; // Higher order component, allow modify component to acces redux stuff

import { auth } from "../../firebase/firebase.utils";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import "./header.styles.scss";

const Header = ({ currentUser }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo"></Logo>
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

// This function allows to get the state (root reducer)
// state=root-reducr, user=user-reducer
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

// Higher order component (like connect) takes a component as an argument
export default connect(mapStateToProps)(Header);
