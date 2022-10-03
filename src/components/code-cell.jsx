import React, { useEffect, useState } from "react";
import bundle from "../bundler/index";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";


const CodeCell = () => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const [code, setCode] = useState('');
    
    useEffect( () => {
        let timer = setTimeout(async () => {
            const output = await bundle(input);
            setCode(output.code);
            setError(output.err);
        }
        , 500)
        return () => {
            clearTimeout(timer);
        };
    }, [input]);


    // const onClick = async () => {
    //     const output = await bundle(input);
    //     setCode(output);
    //   };
      
      return (
        <Resizable direction="vertical" >
        <div style={{ height: '100%', display: 'flex', flexDirtion: 'row'}}>
          <Resizable direction="horizontal" >
          <CodeEditor 
          initivalValue={"const a = 2;"}
          onChange={(value) => setInput(value)}/>
           </Resizable>
         {/* <button onClick={onClick}>Submit</button> */}
          <Preview code={code} error={error}/> 
        </div>
        </Resizable>
      );
    };

export default CodeCell;