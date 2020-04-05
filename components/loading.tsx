import React from 'react';
import { Spin } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';


const Loading = () => (
  <React.Fragment>
    <div className="spin-bg-div">
      <div className='spin-div'>
        <Spin indicator={<Loading3QuartersOutlined style={{ fontSize: 86, color: '#fff' }} spin />} />
      </div>
    </div>
  <style jsx>{`
    .spin-bg-div {
      background: rgba(0, 0, 0, 0.65);
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
      left: 50%;
      top: 50%;
      margin-top: -43px;
      margin-left: -43px;
    }
  `}</style>
  </React.Fragment>
);

export default Loading;