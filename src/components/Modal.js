import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ title, content, actions, onDismiss }) => {
  const modal = (
    <div onClick={onDismiss} className='ui dimmer modals visible active'>
      <div
        onClick={e => e.stopPropagation()}
        className='ui standard modal visible active'
      >
        <div className='header'>{title}</div>
        <div className='content'>{content}</div>
        <div className='actions'>{actions}</div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(modal, document.getElementById('modal'));
};

export default Modal;
