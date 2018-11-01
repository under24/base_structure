import React from 'react';
import PropTypes from 'prop-types';
// import './DynamicImage.scss';

const InfoBlockItem = props => (
  <div className="PersonInfoBlock__item">
    <span className="PersonInfoBlock__item-value">{props.value}</span>
    <span className="PersonInfoBlock__item-label">{props.label}</span>
  </div>
);

InfoBlockItem.defaultProps = {
  value: 0,
  label: ''
};

InfoBlockItem.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string
};

export default InfoBlockItem;
