import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css'

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className='navbar'>
      <span className='welcome'>Welcome, <Link id="dashboard-link" to="/dashboard">{user.name}</Link></span>
      &nbsp; | &nbsp;
      <Link className='logout' to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}