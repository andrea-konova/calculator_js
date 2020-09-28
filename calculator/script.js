class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.readyForReset = false;
    this.currentOperand = 0;
    this.updateDisplay();
  }

  clear() {
    this.previousOperand  = '';
    this.currentOperand  = 0;
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    if (this.currentOperand === '') this.currentOperand = 0;
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.calculate();
    }
    this.operation = operation;
    this. previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  countRoot() {
    if (this.currentOperand < 0) {
      this.currentOperand = 0;
      alert("Error: extracting the square root of a negative number is impossible")
      return;
    }
    this.currentOperand = Math.sqrt(this.currentOperand).toString().slice(0,20);
    this.readyForReset = 1;
  }

  changeSign() {
    this.currentOperand *= -1;
  }

  calculate() {
    let computation;
    const prev = parseFloat(this.previousOperand),
      current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;
    
    switch (this.operation) {
      case '+':
        computation = (prev*10 + current*10)/10;
        break;
      case '-':
        computation = (prev*10 - current*10)/10;
        break;
      case '*':
        computation = (prev*10 * current*10)/100;
        break;
      case '÷':
        computation = (prev*10 / current*10)/100;
        break;
      case '^':
        computation = Math.pow(prev, current);
        break;
      default:
        return;
    }

    this.currentOperand = computation.toString().slice(0,20);
    this.operation = undefined;
    this.previousOperand = '';
    this.readyForReset = true;
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString(),
      integerDigits = parseFloat(stringNumber.split('.')[0]),
      decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandText.innerText = 
      this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandText.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandText.innerText = '';
    }
    
  }
}

const numbersButtons = document.querySelectorAll('[data-number]'),
  operationButtons = document.querySelectorAll('[data-operation]'), 
  operationSqrt = document.querySelector('[data-operation-sqrt]'),
  equalsButton = document.querySelector('[data-equals]'),
  deleteButton = document.querySelector('[data-delete]'),
  rootButton = document.querySelector('[data-root]'),
  changeSignButton = document.querySelector('[data-change-sign]'),
  allClearButton = document.querySelector('[data-all-clear]'),
  previousOperandText = document.querySelector('[data-previous-operand]'),
  currentOperandText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandText, currentOperandText)

numbersButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (calculator.readyForReset) {
      calculator.currentOperand = "";
    }
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
    calculator.readyForReset = false;
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

rootButton.addEventListener('click', () => {
  calculator.countRoot();
  calculator.updateDisplay();
})

equalsButton.addEventListener('click', () => {
  calculator.calculate();
  calculator.updateDisplay();
})

changeSignButton.addEventListener('click', () => {
  calculator.changeSign();
  calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})