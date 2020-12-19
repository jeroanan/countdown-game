import React, {useEffect, useState} from 'react';
import './App.css';

function App(props) {

    const numberOfTiles = 9;
    const maxConsonants = 5;
    const maxVowels = 5;
    const gameLengthSeconds = 5;

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

    const handleEnteredWordChange = (e) => {
	setEnteredWord(e.target.value);
    }

    const handleSubmit = (e) => {
	e.preventDefault();
	const w = enteredWord.trim();
	if (w==='') {
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
	return 'Game Over';
    };

    return(
	<>
	    <form onSubmit={handleSubmit} disabled={gameOver}>
	    <p>
		<TimeLeft timeLeft={secondsLeft} gameOverText={getGameOverText()} />
            </p>
	    <p>
		{letterTiles}
	    </p>
	    <p>
		    <input type="text" onChange={handleEnteredWordChange} disabled={gameOver} />
		    <input type="submit" value="Enter" disabled={gameOver} />
	    </p>
	    <p>
		<button onClick={handleReset}>Reset</button>
	    </p>
	    <TriedWords words={words} />
	    </form>
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
	    <ul>
		{triedWords}
	    </ul>
		
	</>
    );
}

function Letter(props) {

    const theLetter = props.letter;

    return (
	<span>{theLetter}</span>
    );
}

export default App;
