import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  gql,
} from "@apollo/client";
import { cache } from "./graphql/cache";

import { store, persistor } from "./redux/store";

import "./index.css";
import App from "./App";

const httpLink = createHttpLink({
  uri: "https://crwn-clothing.com",
});

export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }
  extend type Query {
    cartHidden: Boolean!
    isLoggedIn: Boolean!
    cartItems: [Item]!
    cartItemsCount: Int!
  }
`;

const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
