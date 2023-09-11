import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { DropZoneFileUploader } from './FileUploaders/DropZoneFileLoader';
import { UserInfo } from './view/UserInfo';


function App() {
  return (
    <div className="container p-5">
      <h1>React File Uploader</h1>
      <div className="row">
        <div className="col-md-6">
          <UserInfo />
        </div>
        <div className="col-md-6">
          <div style={{ width: "500px" }}>
            <DropZoneFileUploader />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
