import React from 'react';
import PropTypes from 'prop-types';

const InfoBlockItem = props => {
  // do not show if empty
  if (props.value === 0) {
    return null;
  }

  if (props.link) {
    return (
      <a href={props.link} className="InfoBlock__item">
        <span className="InfoBlock__item-value">{props.value}</span>
        <span className="InfoBlock__item-label">{props.label}</span>
      </a>
    );
  }

  return (
    <div className="InfoBlock__item">
      <span className="InfoBlock__item-value">{props.value}</span>
      <span className="InfoBlock__item-label">{props.label}</span>
    </div>
  );
};

InfoBlockItem.defaultProps = {
  value: 0,
  label: '',
  link: ''
};

InfoBlockItem.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string,
  link: PropTypes.string
};

export default InfoBlockItem;
