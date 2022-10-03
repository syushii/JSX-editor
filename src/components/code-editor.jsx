import MoancoEditor from '@monaco-editor/react';
import { useRef } from 'react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './code-editor.css';


const CodeEditor = ({ initivalValue, onChange }) => {
    const editorRef = useRef(null);

    const onDidMount = (editor, monaco) => {
        editorRef.current = editor;
        editor.onDidChangeModelContent(() => {
            onChange(editor.getValue());
        });

        editor.getModel()?.updateOptions({ tabSize : 2});
    };

    const onFormatClick = () => {
        // get current value from editor
        const unformatted = editorRef.current.getValue();
        // format that value
        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        }).replace(/\n$/, '');
        // set the formatted value back into editor
        editorRef.current.setValue(formatted);
    };


    return <div className='editor-wrapper'>
        <button className='button-format'
        onClick={onFormatClick}>Format</button>
        <MoancoEditor 
    onMount={onDidMount}
    value= {initivalValue}
    height="100%"
    theme="vs-dark"
    language='javascript'
    options={{
        wordWrap: 'on',
        
        minimap: { enabled: false},
        showUnused: false,
        folding: false,
        lineNumberMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true
    }}
     />
     </div>

};

export default CodeEditor;