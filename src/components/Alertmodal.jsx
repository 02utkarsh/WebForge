import React from 'react'

const Alertmodal = ({status,alertmessage}) => {
  return (
    <div className=' '>
        {status==="Success" &&(
            <div className=' border p-1 px-4 bg-green-500  text-white rounded-lg font-light'>
               <p className='  text-lg'> {alertmessage}</p>
            </div>
        )}
        {status==="Warning" &&(
            <div className=' border p-2 bg-yellow-500  text-white'>
               <p className=' text-lg'> {alertmessage}</p>
            </div>
        )}
        {status===  "Danger" &&(
            <div className=' border p-2 bg-red-500  text-white'>
               <p className=' text-lg'> {alertmessage}</p>
            </div>
        )}
    </div>
  )
}

export default Alertmodal;