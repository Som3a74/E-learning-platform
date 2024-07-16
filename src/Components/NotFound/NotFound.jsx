import React from 'react'
import styleNotFound from '../../Img/Not Found/error.png'

export default function NotFound() {
  return <>

    <div className='d-flex justify-content-center align-items-center'>
      <img className='mt-5 pt-5 mb-5' loading='lazy' src={styleNotFound} />
    </div>

  </>
}
