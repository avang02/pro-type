import { Link } from "react-router-dom"
import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar"
import { getUser } from "../../utilities/users-service"
import './Dashboard.css'
import { useEffect } from "react"

export default function Dashboard({user, setUser}) {
    const [updatedUser, setUpdatedUser] = useState(user);

    useEffect(function () {
        async function fetchUpdatedUser() {
            try {
                setUpdatedUser(getUser())
            } catch (err) {
                console.log("Error fetching updated user: ", err);
            }
        }
        console.log(updatedUser)
        fetchUpdatedUser();
    }, [])

    return (
        <>
            <NavBar user={user} setUser={setUser} />
            <div className="dashboard">
                <h1>Rank: {updatedUser.rank}</h1>
                <p>WPM: {updatedUser.wpm}</p>
                <p>Accuracy: {updatedUser.accuracy}%</p>
                <p>Points: {updatedUser.points}</p>
            </div>
            <div className="btn-div">
                <Link to="/typetest"><button id="typetest-btn">TypeTest</button></Link>
            </div>
        </>
    )
}