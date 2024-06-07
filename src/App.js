import './App.css';
import './index.css';
import { Routes,Route, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { useEffect, useState } from 'react';
import { auth,db } from './config/firebase.config';
import { collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { Grid } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { SET_USER } from './context/actions/userActions';
import Newproject from './pages/Newproject' ;
import { SET_PROJECTS } from './context/actions/projectAction';
// import Openproject from './pages/Openproject';
import Newprojectsmake from './pages/Newprojectsmake';
import Loadpage from './pages/Loadpage';
function App() {
  const [isloading,setisloading]=useState(true);
  const Navigate=useNavigate();
  const dispatch=useDispatch();
  useEffect(()=>{
    const unsubscribe= auth.onAuthStateChanged((userCred)=>{
      if(userCred){
        console.log(userCred?.providerData[0]);
        setDoc(doc(db,"users",userCred?.uid),userCred?.providerData[0])
        .then(()=>{
            dispatch(SET_USER(userCred?.providerData[0]));
            Navigate('/home/projects',{replace:true})
        })
      } 
      else{
        Navigate('/home/Loadpage',{replace:true});
      }
    });
    setTimeout(() => {
      setisloading(false)
    },1000);
    return ()=>unsubscribe();

  },[]);

  useEffect(()=>{ 
    const projectQuery=query(
      collection(db,"Projects"),
      orderBy("id","desc")
    );
    
    const unsubscribe= onSnapshot(projectQuery,(querySnaps)=>{
      const projectsList=querySnaps.docs.map((doc)=>doc.data());
      dispatch(SET_PROJECTS(projectsList));
    });
    return unsubscribe;
  },[]);

  return (
    <>
      {isloading?<div className=' w-screen h-screen flex justify-center items-center'>
        <Grid
        visible={true}
        height="80"
        width="80"
        color=  "#4fa94d"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"/>
      </div>
      :
      <div className="  w-screen h-screen font-bold text-cyan-700 justify-center items-center ">
      <Routes>
          <Route path='/home/*' element={<Home/>} />
          <Route path='/' element={<Home/>}/>
          {/* <Route path='/openproj' element={<Openproject/>}/> */}
          <Route path="/project/:id" element={<Newproject />} />
          <Route path='/newproject' element={<Newproject/>}/>
          <Route path='/newprojectmake' element={<Newprojectsmake/>}/>
          <Route path='/Loadpage' element={<Loadpage/>}/>
          <Route path='*' element={<Navigate to={"/home"}/>}/>
      </Routes> 
      
    </div>}
    </>
        
  );
}
export default App;
