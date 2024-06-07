// import { FaGithub } from "react-icons/fa";
import { LiaGithub } from "react-icons/lia";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from 'react'
// import userauth  from '../components/userauth'  
import { MdEmail } from "react-icons/md";
import { Userauths } from '../components/Userauths'
import { RiLockPasswordFill } from "react-icons/ri";
import { signINWithGithub, signINWithGoogle } from "../utils/helper";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { auth } from "../config/firebase.config";
export const SignUp = () => {
  const [Email,SetEmail]=useState("");
  const [Password,SetPassword]=useState("");
  const [islogin,setislogin]=useState(false);
  const [getEmailValidationStatus,SetgetEmailValidationStatus]=useState(true);
  const [erroroccured,seterroroccured]=useState();

  const createNewUser= async()=>{
    console.log("this is in create new user")
      console.log(Email);
    if(getEmailValidationStatus){
        await createUserWithEmailAndPassword(auth,Email,Password)
          .then((userCred)=>{
            if(userCred){
              console.log(userCred);  
            }
          })
          .catch((error)=>{
            console.log(error)
          })
    }
  };
  const loginwithEmailPassword= async()=>{
    console.log("this is in logging new password")
      console.log(Email);
    if(getEmailValidationStatus){
      await signInWithEmailAndPassword(auth,Email,Password)
          .then((userCred)=>{
            if(userCred){
              console.log(userCred);  
            }
          })
          .catch((error)=>{
            console.log(error)
            seterroroccured(error.message)
          })
    }
  };

  console.log("this is above duc")
console.log(Email)
console.log(Password)

  return (
    <div className='  '>
      <span className=' text-center font-extrabold text-gray-400  mx-auto text-3xl'> WebForge</span>
      <div className=' flex flex-col  w-[30%] mx-auto   '>
        <span className=' text-gray-500 text-center mt-6'> Join WebForge!!!  </span>
        <div className=' rounded-lg bg-zinc-600 p-2 text-white'>
          {/* email input */}
          {/* <userauth/> */}
          <Userauths label="Email" placeholder="Email here..." ispass={false} key="Email" setStateFunction={SetEmail} Icons={MdEmail}/>
          
          <Userauths label="Password" placeholder="Enter Password" ispass={true} key="Password" setStateFunction={SetPassword} Icons={RiLockPasswordFill}/>

          {!islogin ?(
            <div onClick={createNewUser}  className=' cursor-pointer bg-emerald-400 text-white overflow-hidden rounded-md p-2 text-center hover:scale-95 transition-all duration-100 w-[95%] mx-auto mt-2'> SignUp </div>
          ):(
            <div onClick={loginwithEmailPassword} className=' bg-emerald-400 text-white overflow-hidden rounded-md p-2 text-center w-[95%] mx-auto hover:scale-95 transition-all duration-100 mt-2'> Login </div>   
          )}

          {!islogin ?(
            <div className=' text-center mt-3'>

            <div className="text-sm"> Already have an account? <span className=' text-emerald-400 text-sm cursor-pointer ' onClick={()=>setislogin(!islogin)}> Login Here</span> </div>
            </div>
          ):(
            <div className=' text-center mt-3'>
            <div className="text-sm"> Doesn't have an account? <span className=' text-emerald-400 text-sm cursor-pointer' onClick={()=>setislogin(!islogin)}> SignUp Here</span> </div>
            </div>            
          )}  

          {
            erroroccured && (
              <Popup trigger=
                {<button> Click to see error</button>} 
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                                {erroroccured.message}
                            </div>
                            <div>
                                <button className=" border p-2" onClick=
                                    {() => close()}>
                                        Close modal
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
            )
          }

          {/* line box and or box */}
          <div className=' flex justify-center items-center gap-1'>
            <div className='h-[2px] bg-slate-300 w-[40%]'></div>
            <span>or</span>
            <div className='h-[2px] bg-slate-300 w-[40%]'></div>
          </div>

          <div onClick={signINWithGoogle} className=' cursor-pointer overflow-hidden flex justify-center items-center bg-white rounded-lg w-[88%] hover:scale-95 transition-all duration-100  mx-auto gap-2 p-2 text-gray-400 text-sm '>
          <FcGoogle />
          <span>Sign in with Google</span>
          </div>

          {/* line box and or box */}
          <div className=' flex justify-center items-center gap-1 '>
            <div className='h-[2px] bg-slate-300 w-[40%]'></div>
            <span>or</span>
            <div className='h-[2px] bg-slate-300 w-[40%]'></div>
          </div>

          <div onClick={signINWithGithub} className=' cursor-pointer  mb-2 mt-2 flex overflow-hidden justify-center items-center bg-white rounded-lg w-[88%] hover:scale-95 transition-all duration-100 mx-auto gap-2 p-2 text-gray-400 text-sm '>
          <LiaGithub />
          <span>Sign in with Github</span>
          </div>

        </div>
      </div>
    
      
    </div>
  )
}
