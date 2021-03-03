import React from "react";
import { useQuery } from "@apollo/client";
import { connect } from "react-redux"; // Higher order component, allow modify component to acces redux stuff
import { createStructuredSelector } from "reselect";

import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../redux/user/user.selectror";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import { GET_CART_HIDDEN } from "../../graphql/queries";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles";

const Header = ({ currentUser }) => {
  // const { data } = useQuery(GET_CART_HIDDEN);
  const { data } = useQuery(GET_CART_HIDDEN);

  const { cartHidden } = data;

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo"></Logo>
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/shop">CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink as="div" onClick={() => auth.signOut()}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to="/signin">SIGN IN</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {cartHidden ? null : <CartDropdown />}
    </HeaderContainer>
  );
};

// createStructuredSelector pass de state to the selector
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

// Higher order component (like connect) takes a component as an argument
export default connect(mapStateToProps)(Header);
