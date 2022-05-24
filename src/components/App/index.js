
import { getLogo } from '../../api/API';
import './App.scss'
import { useEffect, useState } from 'react';

function App() {
  const [logo, setLogo] = useState()

  useEffect( () => {
     const f = async() => {
      const resp = await getLogo()
      console.log(resp);
    }
    f()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>


    </div>
  );
}

export default App;
