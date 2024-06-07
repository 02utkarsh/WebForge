import React, { useState } from 'react'
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineSearch } from "react-icons/md";
import { HiHome } from "react-icons/hi2";
import { Projects } from './Projects';
import { SignUp } from './SignUp';
// import { Player } from 'video-react';
// import Web from "../Assets/Web.mp4";
import { Link, Route, Routes } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Menus, signOutAction } from '../utils/helper';
import { SET_SEARCH_TERM } from '../context/actions/searchAction';
import Loadpage from './Loadpage';
export const Home = () => {
  const [isSideMenu,setisSideMenu]=useState(false);
  const [isstate,setisstate]=useState(false);
  // const [user,setuser]=useState(null);
  const user= useSelector((state)=>state.user?.user)
  const searchTerm=useSelector((state)=>state.searchTerm?.searchTerm?state.searchTerm?.searchTerm:"");

  console.log("this is the home jsx testing the state")
  console.log(user?.photoURL)
  const dispatch=useDispatch();
  return (
    <div className='flex'>
        <div className={`w-2 ${ isSideMenu? "w-2":" w-[20%]" } min-h-screen max-h-screen relative bg-zinc-700 flex flex-col transition-all duration-150 ease-in-out`}>
       
        {/* making the anchor tag  */}
        
        <div className=' w-8 h-8 group bg-zinc-700  absolute rounded-lg flex items-center justify-center -right-6 p-1 top-3' >
        {isSideMenu ? <MdOutlineKeyboardDoubleArrowRight  onClick={() => { setisSideMenu(!isSideMenu) }} className=' group-hover:scale-75  w-full h-full' color='white' /> : <MdKeyboardDoubleArrowLeft  onClick={() => { setisSideMenu(!isSideMenu) }} className=' group-hover:scale-75 w-full h-full' color='white'/>}
            {/* <MdKeyboardDoubleArrowLeft height={20} width={20}  onClick={()=>{setisSideMenu(!isSideMenu)}} /> */}
        </div>

        {/* making the sidebar column */}
        <div className=' overflow-hidden flex flex-col w-full p-2'>
            {/* logo wla part */}
            <div className='w-[100%] mx-auto  pl-5'>
            <Link to={"/home"}>
              <span className=' text-center font-extrabold text-gray-400  mx-auto text-3xl'>WebForge</span>
            </Link>
            
              {/* <video src={Web} className=' bg-transparent'></video> */}
            </div>
            {/* only bottom line */}
            <div className='h-1 w-[80%] mx-auto border-b border-gray-400 mt-3'>
            </div>
            {/* buttons*/}
            <div className='w-[80%] cursor-pointer hover:scale-90  mx-auto border transition-all duration-100 border-gray-300 p-2 text-white flex items-center justify-center rounded-lg mt-5 '>
              <Link to={'/newprojectmake'} className=' w-full mx-auto pl-6 '>
                  New Project
              </Link>
            </div>

            {user &&(
              <Link to={'/home/projects'} className=' flex justify-center items-center gap-3 mt-3 text-white text-lg'>
                <HiHome />
                  <div>
                    Home
                  </div>
              </Link>
            )}

        </div>

        </div>
        {/* right section */}
        <div className=" flex flex-col overflow-y-scroll items-start justify-start px-4 md:px-12 py-4 md:py-12 w-full ">
            
          <div className=' w-full flex items-center justify-between p-4 gap-2'>
            {/* search bar  */}
            <div className=' flex items-center justify-evenly gap-3 w-full bg-zinc-700 px-2 rounded-md'>
              <MdOutlineSearch  className=' text-white'/>

              <input type='text' value={searchTerm} onChange={(e)=>dispatch(SET_SEARCH_TERM(e.target.value))} placeholder='Search Here...' className=' text-lg flex-1 bg-transparent outline-1 placeholder-slate-200 p-1 px-5 rounded-md outline-none text-white'></input>
            </div>
           {
            !user&&(
              <div className=' p-1 text-white bg-green-700 rounded-md font-semibold cursor-pointer hover:scale-90 transition-all duration-100'>
                <Link to={'/home/auth'} className=' cursor-pointer hover:scale-90'>Signup</Link>
              </div>
            )
           }
           {
            user&&(
              
              <div className=' relative flex gap-2 text-gray-500 justify-center items-center w-[10%] cursor-pointer'>
                <div className=' bg-emerald-400  rounded-lg w-[38%] text-center hover:scale-90 duration-150 transition-all' >
                  {user?.photoURL ? (
                    <img src={user?.photoURL} alt={user?.displayName} className='w-full h-full rounded-md '/>
                    
                  ):
                   <span className=' text-white'>{user?.email[0]}</span>
                  }
                </div> 
                <div onClick={()=>setisstate(!isstate)} className=' bg-slate-800 p-2 rounded-lg hover:scale-90 duration-150 transition-all '>
                  <FaChevronDown/>
                </div>
                {
                  isstate && 
                  <div  className=' bg-slate-600 absolute text-whit top-10 right-0 px-4 py-4 rounded-xl text-slate-400 shadow-md z-10 flex flex-col items-start justify-start gap-4 min-w-[165px]'>
                  {Menus && Menus.map(menu=>(
                  <Link className=' hover:bg-[rgba(256,256,256,0.05)] px-2 w-full rounded-md' to={menu.uri} key={menu.id}>{menu.name}</Link>
                  ))
                  }
                  <div onClick={signOutAction} className='  hover:bg-[rgba(256,256,256,0.05)] px-2 w-full rounded-md hover:scale-90 transition-all duration-100'>
                    Sign out
                  </div>
                </div>
                }  
              </div>
            )
           }

          </div>

          <div className=' w-full '>
           <Routes>
            <Route path='/*' element={<Projects/>}/>
            <Route path='/auth' element={<SignUp/>}/>
            <Route path='/Loadpage' element={<Loadpage/>}/>

            {/* <Route path='/newproject' element={<Newprojects/>}/>   */}
           </Routes>
          </div>

        </div>

    </div>
  )
}
