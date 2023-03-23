"use strict";

const selectButtons = [...document.querySelectorAll(".item")];
const customInput = document.querySelector(".custom");
const billInput = document.getElementById("bill-input");
const numPeopleInput = document.getElementById("people-input");
const tipAmountEl = document.getElementById("tip-amount");
const totalAmountEl = document.getElementById("total-amount");

let bill;
let tipPercent;
let numPeople;
let tip;
let total;

const modifyStr = (num) => {
  return Number.parseFloat(num).toFixed(2);
};

const calcTip = (bill, percent, people) => {
  let a = bill * (percent / 100);
  tip = modifyStr(a / people);
  // console.log(tip);
  total = modifyStr((a + bill) / people);
  // console.log(total);
};

billInput.addEventListener("change", (e) => {
  bill = Number(e.target.value);
});

numPeopleInput.addEventListener("input", (e) => {
  if (e.target.value.indexOf("0") === 0) {
    document.getElementById("p-input").classList.add("input--alert");
    document.querySelector(".zero").style.opacity = 1;
  } else {
    numPeople = Number(e.target.value);
    document.getElementById("p-input").classList.remove("input--alert");
    document.querySelector(".zero").style.opacity = 0;
  }
});

selectButtons.map((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    // update selected item UI
    selectButtons.map((item) => item.classList.remove("select--active"));
    let currentSelect = e.target;
    currentSelect.classList.add("select--active");

    // clear custom input data
    customInput.value = "";

    // get tip percent
    tipPercent = Number(currentSelect.textContent.replace("%", ""));
  });
});

customInput.addEventListener("click", (e) => {
  e.preventDefault();
  selectButtons.map((item) => item.classList.remove("select--active"));
});

customInput.addEventListener("input", (e) => {
  // e.preventDefault();
  tipPercent = Number(e.target.value);
  console.log(tipPercent);
});

const updateUI = () => {
  calcTip(bill, tipPercent, numPeople);
  if (bill && tipPercent && numPeople) {
    tipAmountEl.textContent = tip;
    totalAmountEl.textContent = total;
  } else {
    return 0;
  }
};

setInterval(updateUI, 1000);

const reset = () => {
  selectButtons.map((item) => {
    item.classList.remove("select--active");
  });

  // variable change

  bill = 0;
  tipPercent = 0;
  numPeople = 0;
  tip = 0;
  total = 0;

  // UI change
  customInput.value = "";
  billInput.value = "";
  numPeopleInput.value = "";
  tipAmountEl.textContent = "0.00";
  totalAmountEl.textContent = "0.00";
};
document.querySelector(".reset").addEventListener("click", reset);
