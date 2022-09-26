import React from 'react';
import PropTypes from 'prop-types';

import './global.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

App.propTypes = {
  Component: PropTypes.node.isRequired,
  pageProps: PropTypes.array.isRequired,
};
