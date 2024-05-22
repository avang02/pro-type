import {  useState } from 'react';
import './AuthPage.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import Quote from '../../components/Quote/Quote';

export default function AuthPage({ setUser }) {
  const [loginPage, setLoginPage] = useState(true);
  const [quote, setQuote] = useState("");
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const sentenceLength = quote.length;
  let keycount = 0;
  let wordArray = [];
  let playerWord = '';
  let seconds = 0;
  let timerStart = false;
  let charCount = 0;
  let inputLen;
  let charArr;
  let newQuote = [];
  let count = 0;
  let points;
  charArr = quote.split('', quote.length);
  wordArray = quote.split(' ');
  for (let i = 0; i < wordArray.length; i++){
    let pushEl = [];
    for (let j = 0; j < wordArray[i].length+1; j++) {
      if(j === wordArray[i].length+1) {
        pushEl.push([count, ' ']);
        count++;
      } else {
        pushEl.push([count, wordArray[i].charAt(j)]);
        count++;
      }
    }
    newQuote.push(pushEl);
  }
  points = newQuote.length*wpm;

  const API_URL = "https://api.quotable.io/random?minLength=100"

  function handleBtnClick() {
    getQuote();
    for (let i = 0; i < charArr.length; i++) {
      document.getElementById(i).style.color = 'white';
    }
  }

  async function getQuote() {
    document.getElementById('play-again').style.display = 'none';
    document.getElementById('main-game-content').style.display = 'none';
    try {
      const response = await fetch(API_URL)
      const data = await response.json();
      if(response.ok) {
          setQuote(data.content)
      } else {
          console.log("An error with response.")
      }
    } catch (err) {
        console.log("Error fetching quote")
    }
  }
  
  function timer() {
    timerStart = true;
    setInterval(function() {
        seconds++;
    }, 10000);
  }

  function handleChange(evt) {
    keycount++;
    inputLen = evt.target.value.length;
    playerWord = evt.target.value;
    for (let i = charCount; i < (inputLen+charCount); i++) {
      if(evt.target.value[i-charCount] === quote.charAt(i)) {
        document.getElementById(i).style.color = 'green';
      } else {
        document.getElementById(i).style.color = 'red';
      }
    }
    if (timerStart === false) {
        timer();
    }
    if (wordArray.length === 1) {
        if (playerWord === wordArray[0]) {
            charCount+= inputLen
            wordArray.shift();
        }
    }
    if (playerWord === (wordArray[0]+' ')) {
        charCount+=inputLen;
        wordArray.shift();
        evt.target.value = '';
    }
    if (wordArray.length === 0) {
        evt.target.value = '';
        document.getElementById('play-again').style.display = 'flex';
        document.getElementById('main-game-content').style.display = 'flex';
        setWpm(sentenceLength / seconds);
        setAccuracy((sentenceLength / keycount) * 100);
        points *= wpm;
    }
  }

  function login() {
    setLoginPage(true)
  }
  function signup() {
    setLoginPage(false)
  }

  return (
    <main className='homepage'>
      <h1 className='title'>Welcome to Pro-Type</h1>
      <nav className='login-nav'>
        <div>
          {loginPage ? <LoginForm setUser={setUser}/> : <SignUpForm setUser={setUser}/>}
        </div>
        <div className='button-login'>
          <button onClick={login}>Log In</button>
          <button onClick={signup}>Sign Up</button>
        </div>
      </nav>
      <br /><br /><br />
      <div id="type-game-auth">
        <div id="quote">
            {newQuote.map((word, idx) => (
              <Quote word={word} idx={idx} key={idx}/>
            ))}
        </div>
        <div id="main-game-content">
          <p>WPM: {parseInt(wpm)}</p>
          <p>Accuracy: {accuracy.toFixed(2)}</p>
          <p>Points: {points}</p>
        </div>
        <input className='quote-input' type="text" onChange={handleChange}/>
        <button className='game-btn' id="play-again" onClick={() => handleBtnClick()}>Type again?</button>
      </div>
    </main>
  );
}