
import { getLogo, getContacts } from '../../api/API';
import './App.scss'
import { useEffect, useState } from 'react';

function App() {
  const [logo, setLogo] = useState()
  const [email, setEmail] = useState()
  const [numbers, setNumbers] = useState()
  const [socialMedia, setSocialMedia] = useState()

  useEffect( () => {
    const f = async () => {
      const responseLogo = await getLogo()
      const responseContacts = await getContacts()

      setLogo(responseLogo.data.src)
      setEmail(responseContacts.data.email)
      setNumbers(responseContacts.data.numbers)
      setSocialMedia(responseContacts.data.socialMedia)
    }
    f()
  }, [])

  console.log(socialMedia);

  return (
    <div className="App">
      <div>
        <img src={logo} />

        {email}

        {numbers ? numbers.map(item => <div key={item.id}>{item.number}</div>) : null}

        {/* {socialMedia ? socialMedia.map(item => <div key={item.id}>{item.title}</div>) : null} */}

      </div>
    </div>
  );
}

export default App;
