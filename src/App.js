import React, {useEffect, useState} from 'react';
import './App.css';
import Words from './words.js';

function App(props) {

  const numberOfTiles = 9;
  const maxConsonants = 5;
  const maxVowels = 5;
  const gameLengthSeconds = 60;

  const [secondsLeft, setSecondsLeft] = useState(gameLengthSeconds);
  const [letters, setLetters] = useState([]);
  const [enteredWord, setEnteredWord] = useState("");
  const [words, setWords] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  
  const isVowel = (l) =>
  {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    return vowels.indexOf(l) > -1;
  }

  const getRandomLetter = (ls, maxConsonants, maxVowels) => {

    while (true) {
      const aCharCode = 65;
      const r = Math.floor((Math.random()*26));

      const l = String.fromCharCode(aCharCode + r);

      const vowelsSoFar = ls.filter((x) => isVowel(x)).length;
      const consonantsSoFar = ls.filter((x) => !isVowel(x)).length;

      if ((!isVowel(l)) && (consonantsSoFar < maxConsonants)) {
        return l;
      } else if (isVowel(l) && (vowelsSoFar < maxVowels)) {
        return l;
      }
    }
  }

  const generateLetters = () => {
    const someLetters = [];

    for (let i=0; i<numberOfTiles; i++) {
        someLetters.push(getRandomLetter(someLetters, maxConsonants, maxVowels));
    }
    setLetters(someLetters);
  }

  const stringToArray = (w) => {
    const a = [];

    for (let i=0; i<w.length; i++) {
      a.push(w[i]);
    }

    return a;
  }

  const canMakeWord = (word, letters) => {
    const theWord = word.toUpperCase();

    if (Words.indexOf(theWord)===-1) {
      return false;
    }

    const wordArray = stringToArray(theWord);
    let someLetters = letters.slice();

    for (let i=0; i<wordArray.length; i++) {

        const thisLetter = wordArray[i];
        const index = someLetters.indexOf(thisLetter);
        
        let foundMatch = false;

        if (index === -1) {
          return false;
        }

        for (let j=0; j<someLetters.length; j++) {
          if (thisLetter === someLetters[j]) {
            foundMatch = true;

            if (j === 0) {
              someLetters = someLetters.slice(1);
            } else {
              someLetters = someLetters.slice(0, j).concat(someLetters.slice(j+1));
            }
            break;
          }
        }

        if (!foundMatch) {
          return false;
        }
    }

    return true;
  }

  const tickDown = () => {

    if (secondsLeft>0) {
        setSecondsLeft(secondsLeft-1);
    } else {
        setGameOver(true);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
        tickDown();
    }, 1000);
    return () => clearTimeout(timer);
  });

  const handleReset = () => {
    generateLetters();
    setGameOver(false);
    setSecondsLeft(gameLengthSeconds);
    setWords([]);
  }

  const handleGiveUp = () => {
    setSecondsLeft(0);
  }

  const handleEnteredWordChange = (e) => {
    setEnteredWord(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const w = enteredWord.trim();

    if (w==='') {
        return;
    }

    if (!canMakeWord(w, letters)) {
        return;
    }

    let someWords = words.slice();
    setWords(someWords.concat(w));
    setEnteredWord('');
  }

  if (letters.length===0) {
    generateLetters();
  }

  const letterTiles = letters.map((l,i) => {
    return <Letter key={i} letter={l} />
  });

  const getGameOverText = () => {
    const orderedWords = words.slice().sort((x,y) => x.length-y.length);
    const highScore = orderedWords.pop()?.length;
    return `Game Over. Highest score: ${highScore}`;
  };

  return(
    <>
      <div className="app">
        <form onSubmit={handleSubmit} disabled={gameOver}>

          <div className="letters">
            <div className="inner">
              {letterTiles}
            </div>
          </div>

          <div className="timeleft"> 
            <TimeLeft timeLeft={secondsLeft} gameOverText={getGameOverText()} />
          </div>

          <div className="words">
            <div className="input">
              <input className="word" type="text" value={enteredWord} onChange={handleEnteredWordChange} disabled={gameOver} />
              <input type="submit" value="Enter" disabled={gameOver} />
            </div>
            <div className="triedWords">
              <p><strong>Entered words</strong></p>
              <TriedWords words={words} />
            </div>
          </div>
          <div className="extra">
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleGiveUp}>Give Up</button>
          </div>
        </form>
      </div>  
    </>
  );
}

function TimeLeft(props) {
  const timeLeft = props.timeLeft;
  return (
    <>
      {timeLeft>0 ? <span>Time left: {props.timeLeft}</span> : <span>{props.gameOverText}</span>}
    </>
  );
}

function TriedWords(props) {
  const triedWords = props.words.map((x,i) => {
    return <li key={i}>{x}</li>;
  });

  return (
    <>
      <ul className="triedWords">
        {triedWords}
	    </ul>
    </>
  );
}

function Letter(props) {

  const theLetter = props.letter;

  return (
    <>
      <div className="letter">
        <span className="letter">{theLetter}</span>
      </div>
    </>
  );
}

export default App;
