import * as React from 'react';

import CallIcon from 'material-ui-icons/Call';
import CloseIcon from 'material-ui-icons/Clear';
import './Dialler.scss';

const Dialler = (props) => {
    return (
      <div className="dialler-container">
        <div className="dialler-container__input">
            <p id="phone-number">{props.phoneNumber}</p>
             <span className="cursor">|</span>
          <div className="dialler-container__close__modal" onClick={props.handleCloseModal}>
            <CloseIcon />
          </div>
        </div>
        <div className="dialler-container__numbers">
          <div className="dialler-btn">
            <div className="dialler-btn__circle" onClick={e => props.handleNumberClick(e, '1')} >
              <span>1</span>
            </div>
          </div>
          <div className="dialler-btn">
            <div className="dialler-btn__circle" onClick={e => props.handleNumberClick(e, '2')}>
              <span>2</span>
            </div>
          </div>
          <div className="dialler-btn">
            <div className="dialler-btn__circle" onClick={e => props.handleNumberClick(e, '3')}>
              <span>3</span>
            </div>
          </div>
          <div className="dialler-btn">
            <div className="dialler-btn__circle" onClick={e => props.handleNumberClick(e, '4')}>
              <span>4</span>
            </div>
          </div>
          <div className="dialler-btn">
            <div className="dialler-btn__circle" onClick={e => props.handleNumberClick(e, '5')}>
              <span>5</span>
            </div>
          </div>
          <div className="dialler-btn">
            <div className="dialler-btn__circle" onClick={e => props.handleNumberClick(e, '6')}>
              <span>6</span>
            </div>
          </div>
          <div className="dialler-btn">
            <div className="dialler-btn__circle" onClick={e => props.handleNumberClick(e, '7')}>
              <span>7</span>
            </div>
          </div>
          <div className="dialler-btn">
            <div className="dialler-btn__circle" onClick={e => props.handleNumberClick(e, '8')}>
              <span>8</span>
            </div>
          </div>
          <div className="dialler-btn">
            <div className="dialler-btn__circle" onClick={e => props.handleNumberClick(e, '9')}>
              <span>9</span>
            </div>
          </div>
          <div className="dialler-btn">
            <div className="dialler-btn__circle" onClick={e => props.handleNumberClick(e, '0')}>
              <span>0</span>
            </div>
          </div>
          <div className="bottom">
            <div className="dialler-btn">
              <div className="dialler-btn__circle line-height" onClick={e => props.handleNumberClick(e, '*')}>
                <span>*</span>
              </div>
            </div>
            <div className="dialler-btn">
              <div className="dialler-btn__circle" onClick={e => props.handleNumberClick(e, '+')}>
                <span>+</span>
              </div>
            </div>
            <div className="dialler-btn">
              <div className="dialler-btn__circle" onClick={e => props.handleNumberClick(e, '#')}>
                <span>#</span>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="dialler-btn" id="button-call">
              <div className="dialler-btn__circle__blue">
                <CallIcon onClick={props.handleCallClick}/>
              </div>
            </div>
            {/* <div className="dialler-btn hide" id="button-hangup">
              <div className="dialler-btn__circle__red">
                <CallIcon />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
};

export default Dialler;
