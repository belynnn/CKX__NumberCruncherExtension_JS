const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentNumber = "";
let previousNumber = "";
let operation = null;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.hasAttribute("data-number")) {
            appendNumber(button.getAttribute("data-number"));
        } else if (button.hasAttribute("data-operation")) {
            setOperation(button.getAttribute("data-operation"));
        } else if (button.hasAttribute("data-equal")) {
            calculateResult();
        } else if (button.hasAttribute("data-clear")) {
            clearDisplay();
        }
    });
});

function appendNumber(number) {
    currentNumber += number;
    updateDisplay();
}

function setOperation(op) {
    if (currentNumber === "") return;
    if (previousNumber !== "") calculateResult();
    operation = op;
    previousNumber = currentNumber;
    currentNumber = "";
}

function calculateResult() {
    if (operation === null || currentNumber === "" || previousNumber === "") return;
    let result;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    switch (operation) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            result = current === 0 ? "Erreur" : prev / current;
        break;
        default:
            return;
    }

    currentNumber = result.toString();
    operation = null;
    previousNumber = "";
    updateDisplay();
}

function clearDisplay() {
    currentNumber = "";
    previousNumber = "";
    operation = null;
    updateDisplay();
}

function updateDisplay() {
    display.value = currentNumber;
}