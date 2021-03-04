import React from "react";

import Spinner from "../spinner-component/spinner.component";

const WithSpinner = (WrappedComponect) => ({ isLoading, ...otherProps }) => {
  return isLoading ? <Spinner /> : <WrappedComponect {...otherProps} />;
};

export default WithSpinner;
