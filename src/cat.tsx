import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { actions } from "./actions";
import './App.css';
import logo from './firefox-logo.svg';


function Cat() {
  const dispatch = useDispatch();
  const process = useSelector((state: any) =>{
    return state.rotation.process
  });

  function handleStop() {
    dispatch(actions.stop());
  }

  const imgStyle = process ? {animation: "App-logo-spin infinite 20s linear"} : {};

  return (
      <div style={{"width": "100%", "height": "100px", marginBottom: "50px"}} onClick={() => handleStop()}>
        <img src={logo} className="App-logo" alt="logo" style={imgStyle} />
      </div>
  );
}

export default Cat;
