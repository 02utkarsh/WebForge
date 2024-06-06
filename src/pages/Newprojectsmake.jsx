import { Menus, signOutAction } from '../utils/helper';
import React, { useEffect, useState } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { TiHtml5 } from "react-icons/ti";
import { IoSettings } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { FaCss3 } from "react-icons/fa6";
import { SiJavascript } from "react-icons/si";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Link, useParams } from 'react-router-dom'; // Import useParams
import { FaChevronDown } from 'react-icons/fa';
import { doc, getDoc } from 'firebase/firestore'; // Import getDoc
import { IoMdCheckmark } from "react-icons/io";
import { MdEdit } from "react-icons/md";  
import { useSelector } from 'react-redux';
import { setDoc } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import Alertmodal from '../components/Alertmodal';
const Newprojectsmake = () => {
  const { id } = useParams(); // Get project ID from URL

    const [html, sethtml] = useState("");
  const [css, setcss] = useState("");   
  const [js, setjs] = useState("");   
  const [output, setoutput] = useState("");
  const [istitle, setistitle] = useState("");
  const [title, settitle] = useState("Untitled");
  const user = useSelector((state) => state.user.user);
  const [isstate, setisstate] = useState(false);
  const [alert, setalert] = useState(false);
  useEffect(() => {
    // Fetch project details from Firebase using the ID
    const fetchProject = async () => {
      if (id) {
        const docRef = doc(db, "Projects", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const project = docSnap.data();
          sethtml(project.html);
          setcss(project.css);
          setjs(project.js);
          settitle(project.title);
          setoutput(project.output);
        }
      }
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    updateOutput();
  }, [html, css, js]);

  const savetofirebase = async () => {
    const _doc = {
      id: id || `${Date.now()}`,
      title: title,
      html: html,
      css: css,
      js: js,
      output: output,
      user: user
    };

    await setDoc(doc(db, "Projects", _doc.id), _doc)
      .then((res) => {
        setalert(true);
      })
      .catch((err) => {
        console.log(err.message);
      });

    setTimeout(() => {
      setalert(false);
    }, 2000);
  };

  const updateOutput = () => {
    const combinedoutput = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
        ${html}
        <script>${js}</script>
        </body>
      </html>
    `;
    setoutput(combinedoutput);
  };

  return (
    <div>
         <div className='w-full h-full flex flex-col gap-1 overflow-hidden p-2'>
      <header className='w-full flex items-center justify-between px-8 py-1'>
        <div className='flex items-center justify-center gap-6'>
          <Link to={"/home/projects"}>
            <span className='text-center font-extrabold text-gray-400 mx-auto text-3xl'>WebForge</span>
          </Link>
          <div className='flex flex-col items-start justify-start'>
            <div className='flex items-center justify-center gap-3'>
              {istitle ?
                <div>
                  <input
                    key={"titleinput"}
                    type='text'
                    placeholder='project title'
                    value={title}
                    className='px-3 py-2 rounded-md bg-transparent text-gray-500'
                    onChange={(e) => settitle(e.target.value)}
                  />
                </div> :
                <div className='px-3 py-1 text-white'>
                  {title}
                </div>
              }
              {istitle ?
                <div className='cursor-pointer hover:scale-90' onClick={() => setistitle(false)}>
                  <IoMdCheckmark className='text-2xl text-emerald-400' />
                </div> :
                <div onClick={() => setistitle(true)} className='cursor-pointer'>
                  <MdEdit className='text-2xl text-emerald-400' />
                </div>
              }
            </div>
            <div className='flex items-center justify-center px-3 gap-1 relative'>
              <p className='text-gray-500 gap-2 flex'>
                {user?.displayName ? user?.displayName : `${user?.email.split("@")[0]}`}
                <div className='bg-emerald-400 text-white rounded-sm text-[10px] p-1 cursor-pointer hover:scale-90 transition-all duration-100'>
                  + Follow
                </div>
              </p>
            </div>
          </div>
        </div>

        {user && (
          <div className='relative flex gap-2'>
            {alert && <Alertmodal status={"Success"} alertmessage={"Project saved..."} />}
            <div onClick={savetofirebase} className='text-white cursor-pointer font-medium flex justify-center items-center p-2 px-3 bg-gray-400 rounded-md hover:scale-90 transition-all duration-100'>
              save
            </div>
            <div>
              <div className='bg-emerald-400 rounded-lg w-[38px] text-center hover:scale-90 duration-150 transition-all'>
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className='w-full h-full rounded-md' />
                ) : (
                  <span className='text-white'>{user?.email[0]}</span>
                )}
              </div>
            </div>
            <div>
              <div onClick={() => setisstate(!isstate)} className='bg-slate-800 p-2 rounded-lg hover:scale-90 duration-150 transition-all'>
                <FaChevronDown className='text-white' />
              </div>
              {isstate && (
                <div className='bg-slate-600 absolute top-10 right-0 px-4 py-4 rounded-xl text-slate-400 shadow-md z-10 flex flex-col items-start justify-start gap-4 min-w-[165px]'>
                  {Menus && Menus.map(menu => (
                    <Link className='hover:bg-[rgba(256,256,256,0.05)] px-2 w-full rounded-md' to={menu.uri} key={menu.id}>{menu.name}</Link>
                  ))}
                  <div onClick={signOutAction} className='hover:bg-[rgba(256,256,256,0.05)] px-2 w-full rounded-md hover:scale-90 transition-all duration-100'>
                    Sign out
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
      <Splitter style={{ height: '600px' }} layout="vertical" className='h-full'>
        <SplitterPanel className="flex align-items-center justify-content-center" size={60} minSize={45}>
          <Splitter style={{ height: '' }}>
            <SplitterPanel className="flex align-items-center justify-content-center bg-zinc-800">
              {/* HTML */}
              <div className='w-full h-full flex flex-col justify-center items-start'>
                <div className='flex items-start bg-gray-700 w-full justify-between px-1 rounded-sm'>
                  <div className='gap-1 px-2 flex items-center border-t-4 border-t-gray-400 bg-zinc-600'>
                    <TiHtml5 className='text-red-500 text-2xl' />
                    <span className='text-xl font-normal text-white'>HTML</span>
                  </div>
                  <div className='flex items-center justify-center gap-1 p-1'>
                    <IoSettings className='text-white text-2xl' />
                    <FaAngleDown className='text-white text-2xl' />
                  </div>
                </div>
                <div className='w-full h-full p-2'>
                  <CodeMirror
                    value={html}
                    height="300px"
                    extensions={[javascript({ jsx: true })]}
                    theme={"dark"}
                    onChange={(value, viewUpdate) => { sethtml(value) }}
                  />
                </div>
              </div>
            </SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center bg-zinc-800">
              {/* CSS */}
              <div className='w-full h-full flex flex-col justify-center items-start'>
                <div className='flex items-start bg-gray-700 w-full justify-between px-1 rounded-sm'>
                  <div className='gap-1 px-2 flex items-center border-t-4 border-t-gray-400 bg-zinc-600'>
                    <FaCss3 className='text-blue-500 text-2xl' />
                    <span className='text-xl font-normal text-white'>CSS</span>
                  </div>
                  <div className='flex items-center justify-center gap-1 p-1'>
                    <IoSettings className='text-white text-2xl' />
                    <FaAngleDown className='text-white text-2xl' />
                  </div>
                </div>
                <div className='w-full h-full p-2'>
                  <CodeMirror
                    value={css}
                    height="300px"
                    extensions={[javascript({ jsx: true })]}
                    theme={"dark"}
                    onChange={(value, viewUpdate) => { setcss(value) }}
                  />
                </div>
              </div>
            </SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center bg-zinc-800">
              {/* JavaScript */}
              <div className='w-full h-full flex flex-col justify-center items-start'>
                <div className='flex items-start bg-gray-700 w-full justify-between px-1 rounded-sm'>
                  <div className='gap-1 px-2 flex items-center border-t-4 border-t-gray-400 bg-zinc-600'>
                    <SiJavascript className='text-yellow-500 text-2xl' />
                    <span className='text-xl font-normal text-white'>JavaScript</span>
                  </div>
                  <div className='flex items-center justify-center gap-1 p-1'>
                    <IoSettings className='text-white text-2xl' />
                    <FaAngleDown className='text-white text-2xl' />
                  </div>
                </div>
                <div className='w-full h-full p-2'>
                  <CodeMirror
                    value={js}
                    height="300px"
                    extensions={[javascript({ jsx: true })]}
                    theme={"dark"}
                    onChange={(value, viewUpdate) => { setjs(value) }}
                  />
                </div>
              </div>
            </SplitterPanel>
          </Splitter>
        </SplitterPanel>
        <div className='bg-white' style={{ overflow: 'hidden', height: "100%" }}>
          <iframe title='result' srcDoc={output} style={{ border: 'none', width: '100%', height: '100%' }} />
        </div>
      </Splitter>
    </div>
    </div>
  )
}

export default Newprojectsmake