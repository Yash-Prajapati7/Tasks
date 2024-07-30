function countDistinctLetters(sentence) {
    // Convert sentence to lowercase for case-insensitive counting
    sentence = sentence.toLowerCase();
  
    // Create an empty object to store letter frequencies
    const letterCounts = {};
  
    // Iterate over each character in the sentence
    for (let char of sentence) {
      // Check if the character is a letter (a-z)
      if (/[a-z]/.test(char)) {
        // If the letter exists in the object, increment its count
        if (letterCounts[char]) {
          letterCounts[char]++;
        } else {
          // If the letter is new, add it to the object with a count of 1
          letterCounts[char] = 1;
        }
      }
    }
  
    // Count the number of distinct letters
    const distinctLetters = Object.keys(letterCounts).length;
  
    console.log(`The sentence has ${distinctLetters} distinct letters.`);
  
    // Loop through the letter counts object and display frequencies
    for (const letter in letterCounts) {
      console.log(`Letter '${letter}' appears ${letterCounts[letter]} times.`);
    }
  }
  
  // Example usage
  const sentence = "Hello World";
  countDistinctLetters(sentence);
  