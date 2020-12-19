import React, {useEffect, useState} from 'react';
import './App.css';

function App(props) {

    const numberOfTiles = 9;
    const letters = [];
    const maxConsonants = 5;
    const maxVowels = 5;

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

    for (let i=0; i<numberOfTiles; i++) {
	letters.push(getRandomLetter(letters, maxConsonants, maxVowels));
    }


    const letterTiles = []

    let i = 1;
    for (let l of letters) {
	i++;
	letterTiles.push(<Letter key={i} letter={l} />);
    }

    return(
	<>
	{letterTiles}
	    </>
    );
}

function Letter(props) {

    const theLetter = props.letter;

    return (<span>{theLetter}</span>);
}

export default App;
