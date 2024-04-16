import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import './Design.css'

function App() {
  const [len, setLen] = useState(8)

  const [charAllow, setCharAllow] = useState(false)

  const [numberAllow, setNumberAllow] = useState(false)
  const [password, setPassword] = useState('')


  const passwordRef = useRef(null)

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password)
  }, [password])

  const PasswordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numberAllow == true) {
      str += '0123456789'
    }
    if (charAllow == true) {
      str += '@#_!$'
    }
    for (let i = 1; i <= len; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass = pass + str.charAt(char);

    }
    setPassword(pass)

  }, [len, charAllow, numberAllow, setPassword])

  useEffect(() => {
    PasswordGenerator()
  }, [len, charAllow, numberAllow, setPassword])


  return (
    <>
      <div class="container" style={{ height: '100vh', width: '100vw' }}>
        <div>
          <h1 style={{ fontSize: '90px', backgroundColor: '#FA7070', borderRadius: '25px',textAlign:'center' }}>Password Generator</h1>
          <input id='Textfield' type="text" placeholder='Password' value={password} ref={passwordRef} readOnly />&nbsp;&nbsp;
          <button onClick={copyPasswordToClipboard}>Copy</button><br />
          <input class='check' type="range" min={8} max={100} value={len} onChange={(e) => setLen(e.target.value)} />&nbsp;<br /><label class='check' >Length of Password: {len}</label><br />
          <input class='check' type='checkbox' defaultChecked={charAllow}
            id="characterInput" onChange={() => { setCharAllow((prev) => !prev) }} />&nbsp;Special Characters<br />
          <input class='check' type="checkbox" defaultChecked={numberAllow}
            id="numberInput" onChange={() => { setNumberAllow((prev) => !prev) }} />&nbsp;Numbers
        </div>
      </div>

    </>
  )
}

export default App
