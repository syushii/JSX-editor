import * as ReactDOM from 'react-dom/client';
import CodeCell from './components/code-cell';


const App = () => {
  return (
    <div>
    <CodeCell />
</div>
  )

}
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);



