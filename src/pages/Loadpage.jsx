import React from 'react';
import { useNavigate } from 'react-router-dom';
import TypingAnimation from './TypingAnimation';
// import './index.css'; // Assuming this is where the CSS for the blinking cursor is defined

const Loadpage = () => {
  const navigate = useNavigate();

  const cssCodeLines = [
    "body {",
    "  background-color: #fff;",
    "  font-family: Arial, sans-serif;",
    "}"
  ];

  const htmlCodeLines = [
    "<!DOCTYPE html>",
    "<html>",
    "<head>",
    "  <title>Hello World</title>",
    "</head>",
    "<body>",
    "  <h1>Hello, World!</h1>",
    "</body>",
    "</html>"
  ];

  const jsCodeLines = [
    "console.log('Hello, World!');",
    "function greet() {",
    "  alert('Hello, World!');",
    "}"
  ];

  return (
    <div className='p-2 w-[105%] h-[] -ml-8 -mt-4 text-gray-200'>
      <div className='flex justify-center items-center '>
        <div className='w-[60%] pt-10 flex flex-col gap-6'>
          <div className='flex gap-2 items-start'>
            <div className='font-bold text-6xl text-gray-600 p-2 h-20 rounded-full border border-green-400'>WF</div>
            <div className='text-white font-extrabold text-4xl pt-3'>
              The best place to build,<br />
              test, and discover front-<br />
              end code.
            </div>
          </div>
          <div className='text-gray-400 text-[22px]'>
            <div className='p-2 w-[90%] rounded-lg'>
              WebForge is a <span className='text-gray-200'>social development environment</span> for front-end
              designers and developers. Build and deploy a website, show off your
              work, build test cases to learn and debug, and find inspiration.
            </div>
          </div>
          <div
            onClick={() => navigate('/home/auth')}
            className='p-2 pl-4 hover:scale-90 cursor-pointer transition-all duration-100 bg-emerald-600 rounded-lg text-xl font-bold text-white w-[28%]'
          >
            Sign up for Free
          </div>
        </div>
        <div className='w-[40%] h-[72vh] mt-4 bg-slate-800 p-2 rounded-lg flex flex-col justify-evenly -ml-14'>
          <TypingAnimation
            title="CSS"
            // color={'text-yellow-500'}
            className='bg-slate-700 text-yellow-400 overflow-hidden'
            codeLines={cssCodeLines}
            style={{ width: '70%', height: '25%', alignSelf: 'flex-start' }}
          />
          <TypingAnimation
            title="HTML"
            className='bg-slate-600 text-purple-500'
            codeLines={htmlCodeLines}
            style={{ width: '70%', height: '25%', alignSelf: 'flex-end' }}
          />
          <TypingAnimation
            title="JS"
            className='bg-slate-500 text-blue-400'
            codeLines={jsCodeLines}
            style={{ width: '70%', height: '25%', alignSelf: 'flex-start' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loadpage;
