import { useState, useCallback } from 'react';
import './GameMenu.css'
import { createTypeTest, getAllTypeTest } from '../../utilities/typingtest-api';
import {  update } from '../../utilities/users-service';
import Quote from '../Quote/Quote';
import NavBar from '../NavBar/NavBar';

export default function GameMenu({user, setUser}) {
  const [newUser, setNewUser] = useState(user);
  const [quote, setQuote] = useState("");
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [newUserData, setNewUserData] = useState(null);
  const sentenceLength = quote.length;
  let typeTestData = {
    user: newUser,
    quote: '',
    wordcount: 0,
    charcount: 0,
    wpm: 0,
    accuracy: 0,
    points: 0
  };
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
  wordArray = quote.split(' ');  

  const API_URL = "https://api.quotable.io/random?minLength=100"

  async function getQuote() {
    document.getElementById('play-again').style.display = 'none';
    document.getElementById('main-game-content').style.display = 'none';
    try {
      const response = await fetch(API_URL)
      const data = await response.json();
      setQuote(data.content)
      if(response.ok) {
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

  function handleButtonClick(){
    getQuote();
    for (let i = 0; i < charArr.length; i++) {
      document.getElementById(i).style.color = 'white';
    }
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
      setAccuracy(((sentenceLength/keycount)*100));
      setWpm(parseInt(sentenceLength/seconds));
      typeTestData = {
        user: newUser,
        quote: quote,
        wordcount: newQuote.length,
        charcount: quote.length,
        wpm: parseInt(sentenceLength/seconds),
        accuracy: ((sentenceLength/keycount)*100),
        points: newQuote.length*(parseInt(sentenceLength/seconds)),
      };
      createGame(typeTestData);
      getNewUserData();
      updateUserData();
    }
  }

  async function createGame(typetestdata) {
    try{
      await createTypeTest(typetestdata, newUser._id);
      console.log("Typetest created successfully!");
    } catch (err) {
      if (err instanceof SyntaxError) {
        console.log("Received non-JSON response. Assuming success.");
        // Handle non-JSON response gracefully, if needed
      } else {
        console.log("Error creating typetest: ", err)
      }
    }
  }

  async function getNewUserData() {
    let newData = {
      wpm: 0,
      accuracy: 0,
      points: 0,
      rank: 0
    }
    try {
      const allTests = await getAllTypeTest(newUser._id);
      allTests.forEach((test) => {
        newData.wpm += test.wpm;
        newData.accuracy += test.accuracy;
        newData.points += test.points;
      });
      newData.wpm = newData.wpm/allTests.length;
      newData.accuracy = newData.accuracy/allTests.length;
      if (newData.points > 1000000) {
        newData.rank = "Legend";
      } else if (newData.points > 500000) {
        newData.rank = "Master";
      } else if (newData.points > 250000) {
        newData.rank = "Diamond";
      } else if (newData.points > 100000) {
        newData.rank = "Platinum";
      } else if (newData.points > 50000) {
        newData.rank = "Gold";
      } else if (newData.points > 25000) {
        newData.rank = "silver";
      } else {
        newData.rank = "Bronze";
      }
      setNewUserData(newData);
    } catch (err) {
      console.log("Error fetching all typetests: ", err);
    }
  }

  async function updateUserData() {
    try {
      const updatedUser = await update(newUserData, newUser._id);
      setNewUser(updatedUser);
      console.log("tryblock works");
    } catch (err) {
      console.log("Error updating user: ", err);
    }
  }

  return (
    <main className="gamemenu-main">
      <NavBar user={user} setUser={setUser}/>
      <div id='type-game'>
        <div id='quote'>
          {newQuote.map((word, idx) => (
            <Quote word={word} idx={idx} key={idx} />
          ))}
        </div>
        <div id="main-game-content">
          <p>WPM: {parseInt(wpm)}</p>
          <p>Accuracy: {parseFloat(accuracy).toFixed(2)}</p>
          <p>Points: {points}</p>
        </div>
        <input type="text" onChange={handleChange}/>
        <button id="play-again" onClick={handleButtonClick}>Type again?</button>
      </div>
    </main>
  )
}

