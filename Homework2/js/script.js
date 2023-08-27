const screen = document.getElementById('result');
const buttons = document.querySelectorAll('.buttons button');
const equalsButton = document.getElementById('button-equals');
const clearButton = document.getElementById('button-clear');
const historyList = document.querySelector('.history-list');
const clearHistoryButton = document.querySelector('.clear-history');

let currentInput = '';
let currentOperator = '';
let history = [];

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (Number.isInteger(parseInt(button.value))) {
      currentInput += button.value;
      screen.value = currentInput;
    }
    else if (button.classList.contains('operator')) {
      if (currentInput !== '') {
        history.push(parseFloat(currentInput));
        console.log(currentInput);
      }
      currentInput = '';
      if (button.id === 'button-minus' && (history.length === 0 || typeof history[history.length - 1] === 'string' || history[history.length - 2] === undefined)) {
        currentInput = '-';
        screen.value = currentInput;
      }
      else if (history.length >= 1 && typeof history[history.length - 1] === 'string' && typeof history[history.length - 2] === 'number') {
        history.pop();
        currentOperator = button.dataset.action;
        history.push(currentOperator);
      }
      else if (button.dataset.action === '*' || button.dataset.action === '/') {
        if (history.length >= 1 && typeof history[history.length - 1] === 'string' && typeof history[history.length - 2] === 'number') {
          history.pop();
          currentOperator = button.dataset.action;
          history.push(currentOperator);
        }
        else {
          currentOperator = button.dataset.action;
          history.push(currentOperator);
        }
      }
      else {
        currentOperator = button.dataset.action;
        history.push(currentOperator);
      }
    }
    else if (button.id === 'button-dot') {
      if (!currentInput.includes('.')) {
        currentInput += '.';
        screen.value = currentInput;
      }
    }
  });
});


equalsButton.addEventListener('click', () => {
    if (currentInput !== '') {
      history.push(parseFloat(currentInput));
    }
    currentInput = '';
  
    let result = history[0];
    let equation = history[0].toString();
    for (let i = 1; i < history.length; i += 2) {
      const operator = history[i];
      const operand = history[i + 1];
      if (operator === '+') {
        result += operand;
      } else if (operator === '-') {
        result -= operand;
      } else if (operator === '*') {
        result *= operand;
      } else if (operator === '/') {
        result /= operand;
      }
  
      const value = result.toString();
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.textContent = value;
      link.href = '#';
      link.addEventListener('click', () => {
        screen.value = value;
        currentInput = value.toString();
      });
      listItem.appendChild(link);
      historyList.appendChild(listItem);
    }
  
    if (typeof result === 'number' && !isNaN(result)) {
      screen.value = result;
      history = [result];
      currentOperator = '';
      currentInput = '';
    } else {
      screen.value = 'Error';
      history = [];
      currentOperator = '';
      currentInput = '';
    }
  });

clearButton.addEventListener('click', () => {
  screen.value = '';
  currentInput = '';
  currentOperator = '';
  history = [];
});

clearHistoryButton.addEventListener('click', () => {
    screen.value = '';
    currentInput = '';
    currentOperator = '';
    history = [];
    while (historyList.firstChild) {
        historyList.removeChild(historyList.firstChild);
      }
  });

