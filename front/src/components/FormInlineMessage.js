import React from 'react';
import PropTypes from 'prop-types';

const FormInlineMessege = ({ content, type }) => (
  <span style={{ color: type === 'error' ? '#9f3a38' : '6597a7' }}>
    {content}
  </span>
);

FormInlineMessege.defaultProps = {
  content: PropTypes.string,
  type: PropTypes.oneOf(['error', 'info']).isRequired,
};

FormInlineMessege.defaultProps = {
  content: '',
};

export default FormInlineMessege;
