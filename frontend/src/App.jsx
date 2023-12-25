import { useState } from 'react'
import './App.css'
import axios from 'axios'
function App() {
  const[email,setEmail]=useState('')
  const[message,setMessage]=useState('')

  const handleChange = (e) => {
    setEmail(e.target.value)
    console.log(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response=await axios.get(`${import.meta.BACKEND_URL}/secret?email=${email}`)
    console.log(response)
    setMessage(response.data.encryptedEmail.iv+response.data.encryptedEmail.content)
  }

  return (
    <>
      <div className='home'>
        <h1>Email Encryption for Discord</h1>
        <div className='form'>
          <form onSubmit={handleSubmit}>
            <div>
            <input 
            type="text" 
            placeholder='Enter Your Email Address' 
            value={email} 
            name={email} 
            onChange={handleChange} 
            />
            </div>
            <div><button type='submit'>Encrypt</button></div>
          </form>
        </div>
        <h3>Encrypted Message: </h3>
        <p>{message}</p>
      </div>
    </>
  )
}

export default App
