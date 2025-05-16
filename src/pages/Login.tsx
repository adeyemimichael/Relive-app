import { useState } from "react"

const Login = ({handleLogin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    handleLogin({
      username, password
    });

  }

  return (
   <form onSubmit={handleSubmit}>
    <label htmlFor=""
    >username:</label>
    <input type="text" name="" id=""
    onChange={(e) => setUsername(e.target.value)}
    value={username}/>
   <label>
    Password:
   </label>
   <input type="password"
   value={password}
   onChange={(e) => setPassword(e.target.value)}
   
   />
   <button type="submit">Login</button>
   </form>
  )
}

export default Login