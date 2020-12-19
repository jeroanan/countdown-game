import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    constructor(props) {
	super(props);

	const maxConsonants = 5;
	const maxVowels = 5;
	const numberOfTiles = 9;
	let letters = [];

	for (let i=0; i<numberOfTiles; i++) {
	    letters.push(this.getRandomLetter(letters, maxConsonants, maxVowels));
	}
	
	this.state = {
	    letters: letters,
	    vowels: 0,
	    consonants: 0,
	    maxConsonants: 5,
	    maxVowels: 5,
	}
    }

    isVowel(l)
    {
	const vowels = ['A', 'E', 'I', 'O', 'U'];
	return vowels.indexOf(l) > -1;
    }

    getRandomLetter(ls, maxConsonants, maxVowels) {

	while (true) {
	    const aCharCode = 65;
	    const r = Math.floor((Math.random()*26));

	    const l = String.fromCharCode(aCharCode + r);

	    const vowelsSoFar = ls.filter((x) => this.isVowel(x)).length;
	    const consonantsSoFar = ls.filter((x) => !this.isVowel(x)).length;

	    if ((!this.isVowel(l)) && (consonantsSoFar < maxConsonants)) {
		return l;
	    } else if (this.isVowel(l) && (vowelsSoFar < maxVowels)) {
		return l;
	    }
	}
    }

    render() {
	const letters = []
	let i = 1;
	for (let l of this.state.letters) {
	    i++;
	    letters.push(<Letter key={i} letter={l} />);
	}

	return(
	    <>
	    {letters}
		</>
	);
    }

}

function Letter(props) {

    const theLetter = props.letter;

    return (<span>{theLetter}</span>);
}

export default App;
