// Generate random number between 1 and 10000
let randomNumber = Math.floor(Math.random() * 10000);
let attempts = 0;

let startTime = -1;
let timerIntervalId;

function startTimer() {
  startTime = Date.now();
  timerIntervalId = setInterval(updateTimer, 50);
}

function updateTimer() {
  const currentTime = Date.now();
  const elapsedTime = ((currentTime - startTime) / 1000);
  document.getElementById('timer').textContent = `${elapsedTime}`;
}

document.getElementById('reset').addEventListener('click', function() {
  randomNumber = Math.floor(Math.random() * 10000);
  const messageElement = document.getElementById('number-es');
  messageElement.textContent = convertNumberToSpanish(randomNumber);

  document.getElementById('guess').value = ""
  document.getElementById('message').textContent = "";

  if (startTime < 0) {
    startTimer();
  }

  const utterance = new SpeechSynthesisUtterance(convertNumberToSpanish(randomNumber));
  messageElement.textContent = ""
  utterance.lang = "es-ES";
  speechSynthesis.speak(utterance);
});

document.getElementById('replay').addEventListener('click', function() {
  const utterance = new SpeechSynthesisUtterance(convertNumberToSpanish(randomNumber));
  utterance.lang = "es-ES";
  speechSynthesis.speak(utterance);
});

document.getElementById('reveal').addEventListener('click', function() {
  const messageElement = document.getElementById('number-es');
  messageElement.textContent = convertNumberToSpanish(randomNumber);
});

document.getElementById('submitGuess').addEventListener('click', function() {
  const guess = parseInt(document.getElementById('guess').value);
  const messageElement = document.getElementById('message');

  if (guess === randomNumber) {
    messageElement.textContent = `Bravo!`;
    clearInterval(timerIntervalId);
    startTime = -1
  } else {
    messageElement.textContent = `Incorrecto!`;
  }
});

function convertNumberToSpanish(number) {
  console.log(number)
  if (number == 0){
    return "cero"
  }
  if (number === 1) {
    return "uno";
  }

  let answer = ""

  if (number > 1000) {
    answer = answer.concat(thousandsToSpanish(number))
    console.log(answer)
    number = number % 1000 
  }
  if (number > 100) {
    answer = answer.concat(hundredsToSpanish(number))
    number = number % 100
  }
  if (number >= 10) {
    answer = answer.concat(tensToSpanish(number))
  }
  else {
    if (number > 0) {
      answer += " y " + digitToSpanish(number)
    }
  }

  return answer 
}

function thousandsToSpanish(number) {
  let digit = Math.trunc(number / 1000)
  console.log(digit)
  return (digit > 1 ? digitToSpanish(digit) : "") + " mil"
}

function digitToSpanish(digit) {
  if (digit === 9) {
    return " nueve"
  }
  else if (digit === 8) {
    return " ocho"
  }
  else if (digit === 7) {
    return " siete"
  }
  else if (digit === 6) {
    return " seis"
  }
  else if (digit === 5) {
    return " cinco"
  }
  else if (digit === 4) {
    return " cuatro"
  }
  else if (digit === 3) {
    return " tres"
  }
  else if (digit === 2) {
    return " dos"
  }
  else if (digit === 1) {
    return " uno"
  }
  else {
    return ""
  }
}

function hundredsToSpanish(number) {
  let digit = Math.trunc(number / 100)
  if (digit === 9) {
    return " novecientos"
  }
  else if (digit === 8) {
    return " ochocientos"
  }
  else if (digit === 7) {
    return " setecientos"
  }
  else if (digit === 6) {
    return " seiscientos"
  }
  else if (digit === 5) {
    return " quinientos"
  }
  else if (digit === 4) {
    return " cuatroscientos"
  }
  else if (digit === 3) {
    return " trescientos"
  }
  else if (digit === 2) {
    return " doscientos"
  }
  else if (digit === 1) {
    return " cien"
  }
  else {
    return ""
  }
}

function tensToSpanish(number) {
  let tensDigit = Math.trunc(number / 10)
  let onesDigit = number % 10
  let word = ""
  if (tensDigit === 9) {
    word += " noventa"
  }
  else if (tensDigit === 8) {
    word += " ochenta"
  }
  else if (tensDigit === 7) {
    word += " setenta"
  }
  else if (tensDigit === 6) {
    word += " sesenta"
  }
  else if (tensDigit === 5) {
    word += " cincuenta"
  }
  else if (tensDigit === 4) {
    word += " cuarenta"
  }
  else if (tensDigit === 3) {
    word += " treinta"
  }
  else if (tensDigit === 2) {
    // Special handling
    if (onesDigit === 0) {
      return " viente"
    }
    else {
      return " vienti" + digitToSpanish(onesDigit)
    }
  }
  else if (tensDigit === 1) {
    // Special handling
    if (onesDigit >= 6) {
      return " dieci" + digitToSpanish(onesDigit)
    }
    else if (onesDigit === 5) {
      return " quince"
    }
    else if (onesDigit === 4) {
      return " catorce"
    }
    else if (onesDigit === 3) {
      return " trece"
    }
    else if (onesDigit === 2) {
      return " doce"
    }
    else if (onesDigit === 1) {
      return " once"
    }
    else if (onesDigit === 0) {
      return "diez"
    }
  }
  else {
    return " y" + digitToSpanish(onesDigit)
  }
  if (tensDigit > 2) {
    if (onesDigit > 0) {
      word = word + " y" + digitToSpanish(onesDigit)
    }
  }
  return word
}