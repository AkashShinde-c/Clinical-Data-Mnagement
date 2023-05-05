import React,{useRef,useState} from 'react'
import { useHistory } from 'react-router-dom';
import '../CSS/Login.css';

export default function Login() {
    const [toggle, setToggle] = useState(true);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Get the email and password values from the refs
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if(email === "admin" && password === "admin") {
            navigate.push('/dashboard');
        }
        else{
            window.alert("ERROR..! Invalid email or password!")
        }
    }

  return (
    <> <div className="background"></div>
    <form onSubmit={handleSubmit} className='form-container'>
      <h3>{toggle ? 'Login Here' : 'Sign Up'}</h3>

      <label htmlFor="email">Username</label>
      <input type="email" placeholder="Username" id="email" ref={emailRef} className="form-control" />

      <label htmlFor="password">Password</label>
      <input type="password" placeholder="Password" id="password" ref={passwordRef} className="form-control" />

      <button type="submit" onClick={handleSubmit} className='submitButton'>{toggle ? 'Log In' : 'Sign Up'}</button>
      <div className="registerText">
        {/* {toggle ? "Don't have an account? " : 'Already have an account? '} */}
        <span onClick={() => setToggle(!toggle)}>
          {toggle ? 'Register' : 'Log In'}
        </span>
      </div>
    </form></>
  )
}
