import React from 'react';
import PropTypes from 'prop-types';

class Hello extends React.Component {
  render(props) {
    return (
      <div>
        <h1> {this.props.hello + '!!'}</h1>
      </div>
    );
  }
}

Hello.propTypes = {
  hello: PropTypes.string
};

export default Hello;
