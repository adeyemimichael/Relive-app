 import { useState } from "react"

  const Register = ({handleRegistered}) => {
 const [username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistered({
      username, password
    });
  }
   return (
    <form action=""
    onSubmit={handleSubmit}>
      <label htmlFor="">username:</label>
      <input type="text" 
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="">Password:</label>
      <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      
      />
      <button type="submit">Register</button>
    </form>
   )
  }
 

export default Register