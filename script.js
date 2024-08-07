//------------------------------------------------------------- Calculator Starts Here -------------------------------------------------------------//

const input = document.getElementById("inputBox");
let string = "";

const operators = document.querySelectorAll(".oper");
operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    const lastChar = string.charAt(string.length - 1);
    if (
      lastChar !== "/" &&
      lastChar !== "%" &&
      lastChar !== "*" &&
      lastChar !== "+" &&
      lastChar !== "-"
    ) {
      string += e.target.innerHTML;
      input.value = string;
    }
  });
});
// ------------------------------------------------------------- Solving expression Function -------------------------------------------------------------//

let parens = /\((-?\d+(?:\.\d+)?)\)/; 
let exp = /(-?\d+(?:\.\d+)?) ?\^ ?(-?\d+(?:\.\d+)?)/; 
let sqrt = /(?:(-?\d+(?:\.\d+)?) ?\+ )?(-?\d*(?:\.\d+)?) ?\√ ?(-?\d+(?:\.\d+)?)/; 
let mul = /(-?\d+(?:\.\d+)?) ?\* ?(-?\d+(?:\.\d+)?)/; 
let div = /(-?\d+(?:\.\d+)?) ?\/ ?(-?\d+(?:\.\d+)?)/; 
let add = /(-?\d+(?:\.\d+)?) ?\+ ?(-?\d+(?:\.\d+)?)/; 
let sub = /(-?\d+(?:\.\d+)?) ?\- ?(-?\d+(?:\.\d+)?)/; 

function evaluate(expr)
{
    if(isNaN(Number(expr)))
    {
        if(parens.test(expr))
        {
            let newExpr = expr.replace(parens, function(match, subExpr) {
                return evaluate(subExpr);
            });
            return evaluate(newExpr);
        }
        else if (sqrt.test(expr)) {
          let newExpr = expr.replace(sqrt, function(match, a, c, b) {
              if (c === undefined || c==='') {
                  c = 1; 
              }
              if (a === undefined || a==='') {
                  a = 0; 
              }
              if (Number(b) >= 0) {
                  return Number(a) + (Number(c) * Math.sqrt(Number(b)));
              } else {
                  throw new Error('Square root of a negative number is undefined');
              }
          });
          return evaluate(newExpr);
      }
      

        else if(exp.test(expr))
        {
            let newExpr = expr.replace(exp, function(match, base, pow) {
                return Math.pow(Number(base), Number(pow));
            });
            return evaluate(newExpr);
        }
        else if(mul.test(expr))
        {
            let newExpr = expr.replace(mul, function(match, a, b) {
                return Number(a) * Number(b);
            });
            return evaluate(newExpr);
        }
        else if(div.test(expr))
        {
            let newExpr = expr.replace(div, function(match, a, b) {
                if(b != 0)
                    return Number(a) / Number(b);
                else
                    throw new Error('Division by zero');
            });
            return evaluate(newExpr);
        }
        else if(add.test(expr))
        {
            let newExpr = expr.replace(add, function(match, a, b) {
                return Number(a) + Number(b);
            });
            return evaluate(newExpr);
        }
        else if(sub.test(expr))
        {
            let newExpr = expr.replace(sub, function(match, a, b) {
                return (Number(a) - Number(b));
            });
            return evaluate(newExpr);
        }
        else
        {
            return expr;
        }
    }
    return Number(expr);
}

const numbers = document.querySelectorAll(".numbers");
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerHTML !== "0" || string !== "") {
      string += e.target.innerHTML;
      input.value = string;
    }
  });
});

document.getElementById("equalButn").addEventListener("click", () => {
    string = evaluate(string);
    input.value = string;
});

document.getElementById("clear").addEventListener("click", () => {
  string = "";
  input.value = "";
});

document.getElementById("del").addEventListener("click", () => {
  string = string.slice(0, -1);
  input.value = string;
});


const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

function showTab(tabIndex) {
  tabContents.forEach((tabContent) => {
    tabContent.classList.remove("active");
  });
  tabContents[tabIndex].classList.add("active");
}

tabButtons.forEach((tabButton, index) => {
  tabButton.addEventListener("click", () => {
    showTab(index);
  });
});

//------------------------------------------Currency Code--------------------------------------------------------------------------------------------------------//
(function () {
  fetch(
    "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_R4wt6y6yWPY1IiDH8xVieHyykdIf6prVghSqJFTy"
  )
    .then((response) => response.json())
    .then((data) => {
      const currencyData = Object.entries(data.data);
      const targetCurrencySelect = document.getElementById("targetCurrency");
      const baseCurrencySelect = document.getElementById("baseCurrency");
      currencyData.forEach((currency) => {
        const newOption = new Option(currency[0], currency[1]);
        targetCurrencySelect.add(newOption);
        baseCurrencySelect.add(newOption.cloneNode(true));
      });
    })
    .catch((error) => console.error(error));
})();

showTab(0); 

function convertCurrency() {
  const inputAmount = document.getElementById("currencyAmount").value;
  const baseCurrency = document.getElementById("baseCurrency").value;
  const targetCurrency = document.getElementById("targetCurrency").value;
  const result = document.getElementById("result");
  const currencyAmount = (targetCurrency / baseCurrency) * inputAmount;
  result.innerHTML = `Converted Amount: ${currencyAmount}`;
}

document
  .getElementById("convertCurrency")
  .addEventListener("click", convertCurrency);

document.getElementById("clearCurrency").addEventListener("click", () => {
  document.getElementById("currencyAmount").value = "";
  document.getElementById("baseCurrency").value = "USD";
  document.getElementById("targetCurrency").value = "USD";
  document.getElementById("result").innerHTML = "";
  input.value = "";
});
//-------------Number system-------------------------//

function convertNumberSystem() {
  const inputNumber = document.getElementById("NumberInputSystem").value;
  const base = document.getElementById("CurrentSystem").value;
  const target = document.getElementById("TargetSystem").value;
  const result = document.getElementById("resultSystem");
  const convertedNumber = parseInt(inputNumber, base).toString(target);
  result.innerHTML = `Converted Number: ${convertedNumber}`;
}

document
  .getElementById("convertNumberSystem")
  .addEventListener("click", convertNumberSystem);

document.getElementById("ClearSystem").addEventListener("click", () => {
  document.getElementById("NumberInputSystem").value = "";
  document.getElementById("CurrentSystem").options[0].selected = true;
  document.getElementById("TargetSystem").options[0].selected = true;
  const result = document.getElementById("resultSystem");
  result.innerHTML = ``;
});