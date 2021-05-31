import { useEffect } from 'react';
import '../styles/modal.css';
import PropTypes from 'prop-types';
import { closeAllModals } from '../slices/modalSlice';
import { useDispatch } from 'react-redux';
import { IoMdClose } from 'react-icons/io';

const Modal = (props) => {

  const { childComponent, modalClass } = props;

  const dispatch = useDispatch();

  const closeOnEsc = (e) => {
    if (e.keyCode === 27) {
      dispatch(closeAllModals());
    }
  };

  const closeOnOuterClock = (e) => {
    if (e.target.classList.contains('modal_overlay')) {
      dispatch(closeAllModals());
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeOnEsc);
    return () => {
      document.removeEventListener('keydown', closeOnEsc);
    };
  });

  return (
      <div className={'modal_overlay ' + modalClass}
           onClick={(e) => closeOnOuterClock(e)}>
        <div className='modal_window'>
          <div className='modal_close'
               onClick={() => dispatch(closeAllModals())}><IoMdClose
              size='1.3em'/></div>
          {childComponent}
        </div>
      </div>
  );
};

Modal.propTypes = {
  modalClass: PropTypes.string,
  childComponent: PropTypes.element.isRequired,
};

export default Modal;
