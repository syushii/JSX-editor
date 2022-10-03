import { useRef, useEffect } from 'react';
import './preview.css';


const html = `
<html>
  <head><style>
  html {background-color: white;}
  </style></head>
  
  <body>
    <div id="root"></div>
    <script>
    const handleError = (err) => {
      const root = document.querySelector('#root');
      root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
      console.error(err);
    };

    window.addEventListener('error', (event) => {
      event.preventDefault();
      handleError(event.message);
    });
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          handleError(err);
        }
      }, false);
    </script>
  </body>
</html>
`;
const Preview = ({ code, error }) => {
    const iframe = useRef();

    useEffect(() => {
        iframe.current.srcdoc = html;
        setTimeout(() => {
        iframe.current.contentWindow.postMessage(code, '*');
        }, 500);

    }, [code]);


    return <div className='preview-wrapper'>
    <iframe 
    ref={iframe} sandbox="allow-scripts" 
    srcDoc={html}/>
    {error && <div  className='preview-error'>{error}</div>}
    </div>

}

export default Preview;