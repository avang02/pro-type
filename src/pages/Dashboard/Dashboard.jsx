import { Link } from "react-router-dom"
import NavBar from "../../components/NavBar/NavBar"
import './Dashboard.css'

export default function Dashboard({user, setUser}) {

    return (
        <>
            <NavBar user={user} setUser={setUser} />
            <div className="dashboard">
                <h1>Rank: {user.rank}</h1>
                <p>WPM: {user.wpm}</p>
                <p>Accuracy: {user.accuracy}%</p>
                <p>Points: {user.points}</p>
            </div>
            <div className="btn-div">
                <Link to="/typetest"><button id="typetest-btn">TypeTest</button></Link>
            </div>
        </>
    )
}