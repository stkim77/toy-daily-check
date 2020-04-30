import React, { Component, useState } from 'react';

function DailyCheckDialog () {
  return (
    <React.Fragment>
      <div className="spin-bg-div">
        <div className='spin-div'>
          Dialog
        </div>
      </div>
      <style jsx>{`
        .spin-bg-div {
          background: rgba(0, 0, 0, 0.2);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          z-index: 1001;
        }
        .spin-div {
          position: absolute;
          background-color: #FFF;
          left: 50%;
          top: 50%;
          margin-top: -43px;
          margin-left: -43px;
        }
      `}</style>
    </React.Fragment>
  );
}

export default DailyCheckDialog;
