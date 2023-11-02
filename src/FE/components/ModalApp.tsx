'use client'
import React, { ReactNode, useEffect, useState } from 'react';
import { Button, Modal } from 'antd';

const ModalApp = ({modalState,component,set}:{modalState:boolean;component:ReactNode;set:any}) => {


  return (
    <>
    
      <Modal title={<h1 className='text-red-500'>WRONG NETWORK</h1>} open={modalState} okButtonProps={undefined}  onCancel={()=>{set(false)}} >
     {component}
      </Modal>
    </>
  );
};

export default ModalApp;