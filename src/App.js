import React, {useEffect, useState} from 'react';
import './App.css';

function App(props) {

    const numberOfTiles = 9;
    const maxConsonants = 5;
    const maxVowels = 5;
    const gameLengthSeconds = 60;

    const [secondsLeft, setSecondsLeft] = useState(gameLengthSeconds);
    const [letters, setLetters] = useState([]);
    
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
	setSecondsLeft(gameLengthSeconds);
    }

    if (letters.length===0) {
	generateLetters();
    }

    const letterTiles = []

    let i = 1;
    for (let l of letters) {
	i++;
	letterTiles.push(<Letter key={i} letter={l} />);
    }

    return(
	<>
	    <p>
		<TimeLeft timeLeft={secondsLeft} />
            </p>
	    <p>
		{letterTiles}
	    </p>
	    <p>
		<button onClick={handleReset}>Reset</button>
	    </p>
	</>
    );
}

function TimeLeft(props) {
    const timeLeft = props.timeLeft;
    return (
	<>
	    {timeLeft>0 ? <span>Time left: {props.timeLeft}</span> : <span>Game Over</span>}
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
