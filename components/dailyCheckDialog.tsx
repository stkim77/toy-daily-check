import React, { Component, useState } from 'react';
import { Button, Modal } from 'antd';
import { props } from 'ramda';

interface checkDialogType {
  setShowDialog : Function
}

// const handleOk = () => {
//   this.setState({ loading: true });
//   setTimeout(() => {
//     this.setState({ loading: false, visible: false });
//   }, 3000);
// };

function DailyCheckDialog ({setShowDialog} : checkDialogType) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Modal
      visible={true}
      title="Title"
      onOk={()=>{
        setLoading(true);
        setTimeout(()=>{
          setLoading(false);
          setShowDialog(false);
        }, 1000);
      }}
      onCancel={()=>{setShowDialog(false);}}
      footer={[
        <Button key="back" onClick={()=>{setShowDialog(false);}}>
          Return
        </Button>,
        <Button key="submit" type="primary" loading={loading}
          onClick={()=>{
            setLoading(true);
            setTimeout(()=>{
              setLoading(false);
              setShowDialog(false);
            }, 1000);
          }}
        >
          Submit
        </Button>,
      ]}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}

export default DailyCheckDialog;
