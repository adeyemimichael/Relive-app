import  {useState} from 'react';
import Register from './Register' 
import Login from './Login' 

const Dropdown = ({ isRegistered, handleRegistered, handleLogin}) => {
    const [showRegister, setShowRegsiter] = useState(!isRegistered);

    const toggleForm = () => {
        setShowRegsiter(!showRegister);

    };


    return(
        <div className='dropdown' >
    {showRegister ? (
        <Register handleRegistered = {handleRegistered} />
    ) : (
        <Login handleLogin = {handleLogin} /> 
    )}
    <button onClick={toggleForm}>
        {showRegister ? 'Already have an account? Login' : 'Don\'t have an account Register ' }
    </button>
    </div>
    )
}

export default Dropdown