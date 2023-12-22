import React from 'react';
import PropTypes from 'prop-types';
import { downloadImage } from '../utils';
import './Card.css'
const Card = ({ _id, name, prompt, photo }) => (
  <div className="custom-card">
    <img
      className="custom-card-image"
      src={photo}
      alt={prompt}
    />
    <div className="custom-card-details">
      <p className="custom-card-prompt">{prompt}</p>

      <div className="custom-card-footer">
        <div className="custom-card-author">
          <div className="custom-card-author-avatar">{name[0]}</div>
          <p className="custom-card-author-name">{name}</p>
        </div>
        <button
          type="button"
          onClick={() => downloadImage(_id, photo)}
          className="custom-card-download-button"
        >
          Download
        </button>
      </div>
    </div>
  </div>
);

Card.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

export default Card;
