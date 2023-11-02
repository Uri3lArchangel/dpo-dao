import React from 'react'

function ModalComponent({refresh}:{refresh:any}) {
  return (
    <div className='space-y-4 text-center'><h1 className='text-xl'>You are on the wrong Network</h1> <button onClick={refresh} className='block bg-gray-800 text-white px-6 py-2 rounded-lg mx-auto'>Switch back to Aritrium One</button></div>
  )
}

export default ModalComponent