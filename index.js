// Static Info Mapping
let numbersText = ["zero","one","two","three","four","five","six","seven","eight","nine"];
let numbers = [0,1,2,3,4,5,6,7,8,9];
let functionsText = ["delete", "clear", "divide", "multiply", "subtraction", "addition", "equal", "dot"];
let functionsSymbol = ["Delete", "Clear All", "/", "*", "-", "+", "=", "."];
let operator = {
  '/': function(a,b){return parseFloat(a) / parseFloat(b);},
  '*': function(a,b){return parseFloat(a) * parseFloat(b);},
  '-': function(a,b){return parseFloat(a) - parseFloat(b);},
  '+': function(a,b){return parseFloat(a) + parseFloat(b);}
};


// DOM selection
let screen = document.querySelector(".screen");
let parent = document.querySelector(".parent");

// Variable Declaration
let num1, num2, numLock, formulaOperate;
numLock = 0;
num1 = 0;
num2 = 0;

// Main numbers' buttons creation function
let createNumbers = () => {
  for(let i = 0; i < 10; i++) {
    let button = document.createElement("button");
    button.classList.add(`${numbersText[i]}`);
    button.classList.add("ui");
    button.classList.add("button");
    button.innerText = `${numbers[i]}`;
    button.addEventListener("click", () => {
      numLock === 1? num2 += numbers[i].toString() : num1 += numbers[i].toString();
      numLock === 1? screen.innerText = parseFloat(num2) : screen.innerText = parseFloat(num1);
    });
    parent.appendChild(button);
  }
};

// Functions buttons creation
let createFunctions = () => {
  for(let i = 0; i < functionsText.length; i++) {
    let button = document.createElement("button");
    button.classList.add(`${functionsText[i]}`);
    button.classList.add("ui");
    button.classList.add("button");

    if (functionsText[i] === "delete") {
      button.classList.add("orange");
      button.addEventListener("click", () => {deleteOne()});
    } else if (functionsText[i] === "clear") {
      button.classList.add("red");
      button.addEventListener("click", () => {clearAll()});
    } else if (functionsText[i] === "equal") {
      button.classList.add("green");
      button.addEventListener("click", () => {
        equal(num1, num2);
      });
    } else {
      button.classList.add("blue");
      if (Object.keys(operator).includes(functionsSymbol[i])) {
        button.addEventListener("click", () => {
          numLock = 1;
          screen.innerText = parseFloat(num2);
          formulaOperate = functionsSymbol[i];
        });
      } else {
        button.addEventListener("click", () => {
          dot();
        });
      }
    }
    button.innerText = `${functionsSymbol[i]}`;
    parent.appendChild(button);
  }
};

let clearAll = () => {
  num1 = 0;
  num2 = 0;
  numLock = 0;
  screen.innerText = parseFloat(num1);
};

let dot = () => {
  numLock === 1? num2 = num2.toString() + '.': num1 = num1.toString() + '.';
};

let deleteOne = () => {
  if(numLock === 1) {
    if(num2.toString().length > 1) {
    num2 = num2.toString().slice(0,-1);
    } else {num2 = 0;}
  } else {
    if(num1.toString().length > 1){
    num1 = num1.toString().slice(0,-1);
    } else {num1 = 0;}
  }
  numLock === 1? screen.innerText = parseFloat(num2): screen.innerText = parseFloat(num1);
  num1 === 0? num1 = 0: num1 = num1;
  num2 === 0? num2 = 0: num2 = num2;
};

let equal = (a,b) => {
  if (numLock === 1) {
    screen.innerText = parseFloat(operator[formulaOperate](a,b));
    num1 = parseFloat(operator[formulaOperate](a,b));
    num2 = 0;
    numLock = 2;
  }
};


// Function execution
createNumbers();
createFunctions();
