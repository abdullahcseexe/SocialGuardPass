import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "~`!@#$%^&*(){}[]+=";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator()
  } ,[length , numberAllowed , charAllowed, passwordGenerator])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3) 
    window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-6 my-8 text-black font-semibold  bg-white bg-opacity-70 ">
        <h2 className="text-black font-extrabold text-center pb-3 font-montserrat">
          Password Generator
        </h2>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 leading-8"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button 
          className="bg-slate-300 px-2 py-3 text-black hover:bg-slate-500 font-semibold"
          onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
           onChange={() => {
            setNumberAllowed((prev) => !prev);
           }}
          />
          <label htmlFor="number input">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={charAllowed}
           onChange={() => {
            setCharAllowed((prev) => !prev);
           }}
          />
          <label htmlFor=" character input">Characters</label>
          </div>
        </div>
      </div>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-6 my-8 text-black bg-white bg-opacity-70  mt-20">
      "<b className="text-red-500" >SocialGuardPass</b> is a user-friendly password generator app designed for seamless protection across your favorite social platforms like Instagram, Facebook, and Reddit. Generate strong and secure passwords with just a tap, ensuring your online accounts stay safeguarded. Simplify your digital life with <b className="text-red-500" >SocialGuardPass's</b> quick and reliable password generation, enhancing your online security effortlessly."
      </div>
    </>
  );
}

export default App;
