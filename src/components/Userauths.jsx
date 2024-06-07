import React, { useState } from 'react'
import { GoEyeClosed } from "react-icons/go";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
export const Userauths = ({
  label,
  placeholder,
  key,
  setStateFunction,
  Icon,
  ispass

}) => {
  const [value,Setvalue]=useState("");
  const [showpass,Setshowpass]=useState(false);
  // const [isemailvalid,setemailvalid]=useState(false);
  

  const handleonChange=(e)=>{
      Setvalue(e.target.value)
      console.log(value)
      setStateFunction(e.target.value)
      
  }
  
  return (
    <div className=' p-2 '>
      <label className=' text-sm text-gray-400 '> {label}</label>
      <div className=' flex justify-around items-center gap-2 bg-gray-500 p-2 rounded-lg contain'>
        {label==='Email'?<MdEmail/>:<RiLockPasswordFill/>}
        <input type={ispass && showpass?'password':'email'} className=' bg-transparent outline-none text-white text-center ' placeholder={placeholder} value={value} onChange={handleonChange} />
        {ispass && (
          <div className='' onClick={()=>Setshowpass(!showpass)}>
          {showpass?<FaEye/>:<GoEyeClosed />}
          </div>
        )}                                        

      </div>
    </div>
  )
  
}
