import express from "express";
import {
    specialChars,
    nums,
    twoLetterWords,
    twoLetterWordsCaps,
    threeLetterWords,
    threeLetterWordsCaps,
    fourLetterWords,
    fourLetterWordsCaps,
    fiveLetterWords,
    fiveLetterWordsCaps,
    sixLetterWords,
    sixLetterWordsCaps,
    sevenLetterWords,
    sevenLetterWordsCaps,
    eightLetterWords,
    eightLetterWordsCaps,
    nineLetterWords,
    nineLetterWordsCaps
} from "./Words.js";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to PassGen. Your password generator.");
});

app.post('/generate-password', (req, res) => {
    const { length, capital, number, specialChar } = req.body;
    if (!length) {
        return res.status(400).json({ error: 'Length is required' });
    }

    const passwordLength = parseInt(length);

    let password = generatePassword(passwordLength, capital, number, specialChar);
    res.status(200).json(password);
});

function returnWord(words) {
    let index = Math.floor(Math.random() * words.length);
    return words[index];
}

function returnNumbers(value) {
    let num = "";
    for (let i = 0; i < value; i++) {
        let index = Math.floor(Math.random() * nums.length)
        num += nums[index];
    }
    return num;
}

function getWordsList(length, capital) {
    if (length === 2) return capital ? twoLetterWordsCaps : twoLetterWords;
    if (length === 3) return capital ? threeLetterWordsCaps : threeLetterWords;
    if (length === 4) return capital ? fourLetterWordsCaps : fourLetterWords;
    if (length === 5) return capital ? fiveLetterWordsCaps : fiveLetterWords;
    if (length === 6) return capital ? sixLetterWordsCaps : sixLetterWords;
    if (length === 7) return capital ? sevenLetterWordsCaps : sevenLetterWords;
    if (length === 8) return capital ? eightLetterWordsCaps : eightLetterWords;
    return capital ? nineLetterWordsCaps : nineLetterWords;
}

function generatePassword(length, capital, number, specialChar) {
    let password = "";
    let numberString = "";
    let spChar = "";
    let choiceForSpecialChar = 1;

    while (length > 0) {

        choiceForSpecialChar = Math.round(Math.random());
        if (specialChar == true) {
            let i = Math.floor(Math.random() * specialChars.length);
            spChar = specialChars[i];
            length--;
            specialChar = false; // Ensure that special character is generated only once
        }

        if (number == true) {
            // (length - 2) because the minimum letter word we have is 2 letter word. So we have to include atleast that 
            let numLength = Math.floor(Math.random() * ((length - 2) - 1)) + 1; 
            length = length - numLength;
            numberString = returnNumbers(numLength);
            number = false; // Ensure that numberString is generated only once
        }

        
        let words = getWordsList(length, capital);
        let word = returnWord(words);
        password += word;
        length -= word.length;
    }

    if (choiceForSpecialChar == 0) {
        password = `${spChar}${password}${numberString}`;
    }
    else if (choiceForSpecialChar == 1) {
        password = `${password}${spChar}${numberString}`;
    }
    return password
}

app.listen(3000);