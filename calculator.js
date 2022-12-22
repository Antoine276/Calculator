// Constantes
const MAX_NUMBER = 15;
const SEUIL = 1e-6;

// Operations enum
const MathsOps = Object.freeze({
    Add: Symbol("add"), 
    Substract: Symbol("substract"), 
    Multiply: Symbol("multiply"), 
    Divide: Symbol("divide"), 
    None: Symbol("none")
})

// Calculator object
const Calculator = {
    integer: [], 
    floating: [], 
    sign: false, 
    decimal: false, 
    number: 0, 
    operation: MathsOps.None, 
    numberOp: 0
}

// Number buttons
const Button0 = document.getElementById("0");
const Button1 = document.getElementById("1");
const Button2 = document.getElementById("2");
const Button3 = document.getElementById("3");
const Button4 = document.getElementById("4");
const Button5 = document.getElementById("5");
const Button6 = document.getElementById("6");
const Button7 = document.getElementById("7");
const Button8 = document.getElementById("8");
const Button9 = document.getElementById("9");

// Operation buttons
const ButtonAdd       = document.getElementById("add");
const ButtonSubstract = document.getElementById("substract");
const ButtonMultiply  = document.getElementById("multiply");
const ButtonDivide    = document.getElementById("divide");
const ButtonEqual     = document.getElementById("equal");
const ButtonPoint     = document.getElementById("point");
const ButtonSign      = document.getElementById("sign");
const ButtonRemove    = document.getElementById("remove");
const ButtonRemoveAll = document.getElementById("removeAll");

// Display
const Display = document.getElementById("display");
const HistoryDisplay = document.getElementById("historyDisplay");

// Events -> Press number
Button0.addEventListener("click", () => pressNumber(0));
Button1.addEventListener("click", () => pressNumber(1));
Button2.addEventListener("click", () => pressNumber(2));
Button3.addEventListener("click", () => pressNumber(3));
Button4.addEventListener("click", () => pressNumber(4));
Button5.addEventListener("click", () => pressNumber(5));
Button6.addEventListener("click", () => pressNumber(6));
Button7.addEventListener("click", () => pressNumber(7));
Button8.addEventListener("click", () => pressNumber(8));
Button9.addEventListener("click", () => pressNumber(9));

// Events -> Remove
ButtonRemove.addEventListener("click", () => remove());
ButtonRemoveAll.addEventListener("click", () => removeAll());

// Events -> Number specifics
ButtonSign.addEventListener("click", () => sign());

// Events -> Maths operations
ButtonAdd.addEventListener("click", () => mathsOperation(MathsOps.Add));
ButtonSubstract.addEventListener("click", () => mathsOperation(MathsOps.Substract));
ButtonMultiply.addEventListener("click", () => mathsOperation(MathsOps.Multiply));
ButtonDivide.addEventListener("click", () => mathsOperation(MathsOps.Divide));
ButtonEqual.addEventListener("click", () => calculate());

function pressNumber(number) {
    if ((typeof(number) === "number") && (Calculator.integer.length < MAX_NUMBER)) {
        Calculator.integer.push(number);
    }

    // TODO: remove
    console.table(Calculator.integer);

    refreshNumber();
    refreshDisplay();
}

function remove() {
    Calculator.integer.pop();

    // TODO: remove
    console.table(Calculator.integer);

    refreshNumber();
    refreshDisplay();
}

function removeAll() {
    cleanNumber();
    cleanArray();
    Calculator.numberOp = 0;
    Calculator.operation = MathsOps.None;

    refreshDisplay();
}

function cleanArray() {
    const size = Calculator.integer.length;

    for (let i = 0; i < size; i++) {
        Calculator.integer.pop();
    }

    // TODO: remove
    console.table(Calculator.integer);
}

function cleanNumber() {
    Calculator.number = 0;
    Calculator.sign = false;
}

function sign() {
    Calculator.sign = Calculator.sign ? false : true;
    
    refreshNumber();
    refreshDisplay();
}

function mathsOperation(operation) {
    calculate();

    Calculator.operation = operation;

    Calculator.numberOp = Calculator.number;
    cleanNumber();
    cleanArray();

    console.log(Calculator.operation);

    refreshDisplay();
}

function calculate() {
    let ExcReport = 0;
    
    if (Calculator.operation !== MathsOps.None) {

        switch (Calculator.operation) {
            case MathsOps.Add :
                Calculator.number = add(Calculator.numberOp, Calculator.number);
                break;
                
            case MathsOps.Substract :
                Calculator.number = substract(Calculator.numberOp, Calculator.number);
                break;
                
            case MathsOps.Multiply :
                Calculator.number = multiply(Calculator.numberOp, Calculator.number);
                break;
                
            case MathsOps.Divide :
                Calculator.number = divide(Calculator.numberOp, Calculator.number, ExcReport);
                break;
        }

        Calculator.sign = false;
    
        Calculator.numberOp = 0;
        Calculator.operation = MathsOps.None;
        cleanArray();
    
        ExcReport < 0 ? Display.textContent = "ERROR" : refreshDisplay();
    }
}

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b, ExcReport) {
    if (Math.abs(b) > SEUIL) {
        return a / b;
    }
    else {
        ExcReport = -1;
        return 0;
    }
}

function truncTo(x, n) {
    return n > 0 ? (Math.trunc(x * Math.pow(10, n)) / Math.pow(10, n)) : x;
}

function refreshNumber() {
    const size = Calculator.integer.length;
    Calculator.number = 0;
    
    for (let i = 0; i < size; i++) {
        Calculator.number += (Calculator.integer[size - 1 - i] * Math.pow(10, i));
    }

    if (Calculator.number === 0) {
        Calculator.sign = false;
    }
    else {
        if (Calculator.sign) {
            Calculator.number *= -1;
        }
    }
}

function refreshDisplay() {
    if (Calculator.number > Math.pow(10, MAX_NUMBER)) {
        Display.textContent = Math.exp(Calculator.number.toString());
    }
    else {
        Display.textContent = Calculator.number;
    }
    HistoryDisplay.textContent = Calculator.numberOp.toString();
}