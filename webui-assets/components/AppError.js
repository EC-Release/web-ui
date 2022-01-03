import React from 'react';

/* istanbul ignore next */
const ErrorComponent = () => {
  return <h1>Something went wrong</h1>;
};

export class AppError extends React.Component {
  /* istanbul ignore next */
  state = {
    hasError: false,
  };

  /* istanbul ignore next */
  static getDerivedStateFromError = error => {
    return { hasError: true };
  };

  /* istanbul ignore next */
  componentDidCatch = (error, info) => {
    this.setState({ error, info });
  };

  /* istanbul ignore next */
  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    /* jshint ignore:start */
    /* istanbul ignore next */
    return hasError ? <ErrorComponent /> : children;
    /* jshint ignore:end */
  }
}