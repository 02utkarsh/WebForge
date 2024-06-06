import React, { useEffect, useState } from 'react';
import { FiSettings, FiChevronDown } from 'react-icons/fi'; // Importing settings and down arrow icons from react-icons

const TypingAnimation = ({ codeLines, className, style, title,color }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % codeLines.length;
      const fullText = codeLines[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const typingTimer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimer);
  }, [text, isDeleting, typingSpeed, loopNum, codeLines]);

  return (
    <div className={`p-4 rounded shadow-lg ${className}`} style={style}>
      <div className="flex justify-between items-center mb-2">
        <div className="font-bold text-xl text-white">{title}</div>
        <div className="flex items-center">
          <FiSettings className="text-white" />
          <FiChevronDown className="text-white ml-2" />
        </div>
      </div>
      <div className={`mt-4 font-mono text-lg ${color} whitespace-pre-wrap`}>
        <pre>{text}</pre>
      </div>
    </div>
  );
};

export default TypingAnimation;
