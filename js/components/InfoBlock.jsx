import React from 'react';
import PropTypes from 'prop-types';
import InfoBlockItem from './InfoBlockItem';
import './InfoBlock.scss';

const InfoBlock = props => {
  // nothing to render
  if (props.items.length === 0) {
    return null;
  }

  return (
    <div className="InfoBlock">
      {props.items.map(data => (
        <InfoBlockItem
          key={data.label}
          label={data.label}
          value={data.value}
          link={data.link}
        />
      ))}
    </div>
  );
};

InfoBlock.defaultProps = {
  items: []
};

InfoBlock.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number,
      link: PropTypes.string
    })
  )
};

export default InfoBlock;
