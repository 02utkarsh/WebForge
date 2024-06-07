import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Projectcard from '../components/Projectcard';
// import { Link, Navigate } from 'react-router-dom';

export const Projects = () => {
  const projects=useSelector((state)=>state.projects?.projects);
  const searchTerm=useSelector((state)=>state.searchTerm?.searchTerm?state.searchTerm?.searchTerm:"");
  console.log(projects);
  const [filtered,setfiltered]=useState(null);
  useEffect(()=>{
    if(searchTerm?.length>0){
      setfiltered(projects.filter((project)=>{
        const lowerCaseItem=project?.title.toLowerCase();
        return searchTerm
          .split("")
          .every((letter)=> lowerCaseItem.includes(letter));
      }))
    }
    else{
      setfiltered(null);
    }
  },[searchTerm]);
  return (
    <div className=' flex items-center justify-center gap-6 flex-wrap '>
    {/* hello ji */}
    {/* <Projectcard/> */}
    {filtered?<>
      {
      filtered &&
        filtered.map((project,index)=>(
          <Projectcard key={project.id} project={project} index={index}/>
        ))
    }
    </>
    :
    <>
    {
      projects &&
        projects.map((project,index)=>(
          <div  >
          <Projectcard key={project.id} project={project} />
          </div>
        ))
    }
    </>
    }
    </div>
  );
};



