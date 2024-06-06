import React from 'react'
import { FaBookmark } from "react-icons/fa6";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { doc,deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase.config';
const Projectcard = ({project,index}) => {
    console.log(project?.user?.photoURL);
    const naviagte=useNavigate();
    const deletes=async()=>{
      try {
        const cards=doc(db,'Projects',project.id);
        await deleteDoc(cards);
        naviagte('/home/projects');     
        console.log("cards deleted successfully");
      } catch (error) {
        console.log("some error occured",error);
      }
    }
  return (
    <Link to={`/project/${project.id}`}>
<div className=' text-white p-2 w-full cursor-pointer md:w-[250px] h-[280px] bg-zinc-700 flex flex-col items-center justify-center'>
        <div className=' bg-white overflow-hidden' style={{overflow:'hidden',height:"100%"}}>
          <iframe className=' overflow-hidden p-1 overflow-y-hidden ' title='result' srcDoc={project.output} style={{border:'none',width:'100%',height:'100%'}}/>
        </div> 
        <div className=' flex items-center justify-between gap-3 w-full p-1'>
        <div className=' w-8 h-8 flex center items-center justify-center rounded-xl overflow-hidden'>
            {project?.user?.photoURL?(
              <img src={project?.user?.photoURL}  className='w-full h-full object-cover'/>
                ):(
                <p>
                    {project?.user?.email[0]}
                </p>
            )
            }
            
        </div>
        <div>
                <p className='text-white text-lg capitalize'>{project?.title}</p>
                <p className=' text-neutral-500 '>
                    {
                        project?.user?.displayName?
                        project?.user?.displayName:`${project?.user.email.split("@")[0]}`
                    }
                </p>
        </div>          
        <div className=' text-white  flex gap-1 items-baseline'>
            <FaBookmark className='hover:scale-90 ' />
            <MdDelete className='hover:scale-90 text-xl' onClick={deletes} />
        </div>

        </div>
    </div>
    </Link>
    
  )
}

export default Projectcard