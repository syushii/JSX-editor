import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';

let service;
const bundle = async (rawCode) => {


  // start service of Esbuild
  if(!service){
    await esbuild.initialize({
      worker: true,
      wasmURL: '/esbuild.wasm',
    });
     service = true;
    };

  try {
    // start the bundle process
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    /*  
    Since the bundled code is a string and the error message is also a string, 
    we return a object here which has code and error properties.
    */
   return {
    code: result.outputFiles[0].text,
    err: ''
   }
     
} catch(err) {
  return {
    code: '',
    err: err.message
   }
  
}
    
}
export default bundle;