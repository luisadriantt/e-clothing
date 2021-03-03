import React from "react";

import { addItem } from "../../graphql/cart.actions";

import CustomButton from "../custom-button/custom-button.component";

import "./collection-item.styles.scss";

// Funtion wrapped with {} means
// rendering multiple js out of this function
const CollectionItem = ({ item }) => {
  const { name, price, imageUrl } = item;

  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton
        className="custom-button"
        onClick={() => addItem(item)}
        inverted
      >
        Add to cart
      </CustomButton>
    </div>
  );
};

export default CollectionItem;
