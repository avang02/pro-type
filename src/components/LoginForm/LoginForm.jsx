import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import './LogInForm.css';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch (err) {
      console.log(err)
      setError('Log In Failed - Try Again: ', err);
    }
  }

  return (
    <div>
      <div className="form-container">
        <h3>Log In</h3>
        <form autoComplete="off" onSubmit={handleSubmit} className='login-form'>
          <label>Email</label>
          <input className="email-input" type="text" name="email" value={credentials.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
          <button className='login-btn' type="submit">LOG IN</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}