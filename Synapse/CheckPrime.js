// Function to check whether a given number is prime or not
function isPrime(number) {
    if (number < 2) {
        return false;
    }
    if (number === 2) {
        return true;
    }
    if (number % 2 === 0) {
        return false;
    }
    for (let i = 3; i * i <= number; i += 2) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}

// Returns binary form of a number
function returnBinary(number) {
    return number.toString(2);
}

// Returns all the divisors of a given number
function returnDivisors(number) {
    let divisors = [];
    for (let i = 1; i <= number; i++) {
        if (number % i === 0) {
            divisors.push(i);
        }
    }
    return divisors;
}

// main function
function generatePrimes(start, end) {
    let ans = {};
    for (let i = start; i < end; i++) {
        if (isPrime(i)) {
            ans[i] = returnBinary(i);
        } else {
            ans[i] = returnDivisors(i);
        }
    }
    return ans;
}

let result = generatePrimes(2, 8);
console.log(result);
