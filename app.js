const editIncomeButton = document.querySelector('.income-box button');
const submitButton = document.getElementById('submit');
const date = document.getElementById('date');
const itemInfo = document.getElementById('item');
const amountSpent = document.getElementById('amount');
const typeOfExpense = document.getElementById('expense-type');
const categoryTitles = document.querySelectorAll('.categories th');
const tableBody = document.getElementsByClassName('table')[0].getElementsByTagName('tbody')[0];
let totalSpend = parseFloat(categoryTitles[categoryTitles.length - 1].nextElementSibling.textContent.slice(2));
let itemCounter = 1;
let savingsAmount = document.getElementById('savings-amount');
let incomeAmount = document.getElementById('income');



function formNotComplete(dropdown) {
  const dropdownChoice = document.querySelector(dropdown);
  if (dropdownChoice[0].selected) {
    return true;
  } else {
    return false;
  }
}

function notNumber(arg) {
  return isNaN(parseFloat(arg));
}

function emptyInput(input) {
  return (input == "");
}






submitButton.addEventListener('click', () => {
  if (emptyInput(itemInfo.value)) {
    alert("You did not describe your item.");
    return;
  }

  if (formNotComplete('#expense-type')) {
    alert("You have not chosen the type of expense.");
    return;
  }

  if (notNumber(amountSpent.value)) {
    alert("Invalid amount entered.");
    amountSpent.value = "";
    return;
  }

  const tr = document.createElement('tr');
  const th = document.createElement('th');
  const tdType = document.createElement('td');
  const tdItem = document.createElement('td');
  const tdAmount = document.createElement('td');
  const tdButtons = document.createElement('td');
  const tdEditButton = document.createElement('button');
  tdEditButton.textContent = "edit";
  const tdDeleteButton = document.createElement('button');
  tdDeleteButton.textContent = "delete";

  //row number
  th.textContent = itemCounter;
  th.className = "number-col";

  //expense type
  for (let i = 1; i < typeOfExpense.children.length; i++) {
    if (typeOfExpense.children[i].selected) {
      tdType.textContent = typeOfExpense.children[i].textContent;
    }
  }
  tdType.className = "type-col";

  //item description
  tdItem.textContent = itemInfo.value;
  tdItem.className = "item-col";

  //amount spent
  tdAmount.innerHTML = "$ " + "<span>" + parseFloat(amountSpent.value).toFixed(2) + "</span";
  tdAmount.className = "amount-col";

  //buttons
  tdEditButton.className = "edit-button";
  tdDeleteButton.className = "delete-button";
  tdButtons.appendChild(tdEditButton);
  tdButtons.appendChild(tdDeleteButton);
  tdButtons.className = "change-col";



  tr.className = "row";
  tr.appendChild(th);
  tr.appendChild(tdItem);
  tr.appendChild(tdType);
  tr.appendChild(tdAmount);
  tr.appendChild(tdButtons);
  tableBody.appendChild(tr);


  for (let i = 1; i < typeOfExpense.children.length; i++) {
    if (typeOfExpense.children[i].selected) {
      for (let j = 0; j < categoryTitles.length; j++) {
        if (categoryTitles[j].firstChild.textContent == typeOfExpense.children[i].value) {
          let cost = parseFloat(categoryTitles[j].nextElementSibling.textContent.slice(2));
          cost += parseFloat(amountSpent.value);
          categoryTitles[j].nextElementSibling.textContent = "$ " + String(cost.toFixed(2));
          //let totalSpend = parseFloat(categoryTitles[categoryTitles.length - 1].nextElementSibling.textContent.slice(2));
          totalSpend += parseFloat(amountSpent.value);
          categoryTitles[categoryTitles.length - 1].nextElementSibling.textContent = "$ " + String(totalSpend.toFixed(2));
          savingsAmount.textContent = "$ " + String((parseFloat(savingsAmount.textContent.slice(2)) - parseFloat(amountSpent.value)).toFixed(2));

        }
      }
    }
  }

  itemCounter += 1;
  itemInfo.value = "";
  amountSpent.value = ""
  ;

})

// edit or delete entries

tableBody.addEventListener('click', (e) => {


  if(e.target.className == "delete-button") {
    if (confirm("Are you sure you want to delete?")) {
      const parentRow = e.target.parentNode.parentNode;
      const parentRowCategory = parentRow.firstElementChild.nextElementSibling.nextElementSibling;
      const parentRowAmount = parseFloat(parentRowCategory.nextElementSibling.textContent.slice(2));
      // reverse corresponding category amount
      for (let i = 0; i < categoryTitles.length; i++) {
        if (categoryTitles[i].textContent == parentRowCategory.textContent) {
          let categoryValue = parseFloat(categoryTitles[i].nextElementSibling.textContent.slice(2));
          categoryValue -= parentRowAmount;
          categoryTitles[i].nextElementSibling.textContent = "$ " + String(categoryValue.toFixed(2));
          savingsAmount.textContent = "$ " + String((parseFloat(savingsAmount.textContent.slice(2)) + parseFloat(parentRowAmount)).toFixed(2));
          //let totalSpend = parseFloat(categoryTitles[categoryTitles.length - 1].nextElementSibling.textContent.slice(2));
          totalSpend -= parseFloat(parentRowAmount);
          categoryTitles[categoryTitles.length - 1].nextElementSibling.textContent = "$ " + String(totalSpend.toFixed(2));
        }
      }
      //shift all other elements by -1, if there exists more rows after the chosen row
      if (parentRow.nextElementSibling != null) {
        let nextRow = parentRow.nextElementSibling;
        let startingIndex = parseInt(nextRow.firstElementChild.textContent) - 1;
        while (startingIndex <= tableBody.children.length - 1) {
          nextRow.firstElementChild.textContent = startingIndex;
          nextRow = nextRow.nextElementSibling;
          startingIndex += 1;
        }
      } //remove the row entirely
      tableBody.removeChild(parentRow);
      itemCounter -= 1;
    }
    // else if clicked edit button
  } else if (e.target.className == "edit-button") {

    const parentRow = e.target.parentNode.parentNode;
    const itemCell = parentRow.children[1];
    const categoryCell = parentRow.children[2];
    const oldCategory = categoryCell.textContent;
    const amountCell = parentRow.children[3].firstElementChild;
    const oldAmount = parseFloat(amountCell.textContent);


    // edit state, reverse the entry.
    if (e.target.textContent == "edit") {
      itemCell.innerHTML = "<input type = 'text' id = 'item-edit' size = '15' value = " + itemCell.innerHTML + " autofocus/>";
      amountCell.innerHTML = "<input type = 'text' id = 'amount-edit' size = '5' value = " + amountCell.innerHTML + " autofocus/>";
      e.target.textContent = "update";
      categoryCell.innerHTML = "<div class = 'expense-type'><select id = 'category-edit'><option selected disabled>Choose one</option><option value='F&B'>F&B</option><option value='Shopping'>Shopping</option><option value='Transport'>Transport</option><option value='Others'>Others</option></select></div>"
      for (let i = 0; i < categoryTitles.length; i++) {
        if (categoryTitles[i].textContent == oldCategory) {
          let previousValue = parseFloat(categoryTitles[i].nextElementSibling.textContent.slice(2));
          previousValue -= oldAmount;
          categoryTitles[i].nextElementSibling.textContent = "$ " + String(previousValue.toFixed(2));
        }
      }
      savingsAmount.textContent = "$ " + String((parseFloat(savingsAmount.textContent.slice(2)) + parseFloat(oldAmount)).toFixed(2));
      totalSpend -= parseFloat(oldAmount);
      categoryTitles[categoryTitles.length - 1].nextElementSibling.textContent = "$ " + String(totalSpend.toFixed(2));

    // update state, add new entry.
    } else if (e.target.textContent == "update") {
      const itemEdit = document.getElementById('item-edit');
      const amountEdit = document.getElementById('amount-edit');
      const categoryEdit = document.getElementById('category-edit');
      if (formNotComplete('#category-edit')) {
        alert("You have not chosen the type of expense.");
        return;
      }
      if (emptyInput(itemEdit.value)) {
        alert("You did not describe your item.");
        return;
      }
      if (notNumber(amountEdit.value)) {
        alert("Invalid amount entered.");
        amountEdit.value = "";
        return;
      }
      for (let i = 1; i < categoryEdit.children.length; i++) {
        if (categoryEdit.children[i].selected) {
          for (let j = 0; j < categoryTitles.length; j++) {
            if (categoryTitles[j].textContent == categoryEdit.children[i].value) {
              let previousValue = parseFloat(categoryTitles[j].nextElementSibling.textContent.slice(2));
              previousValue += parseFloat(amountEdit.value);
              categoryTitles[j].nextElementSibling.textContent = "$ " + String(previousValue.toFixed(2));
              //let totalSpend = parseFloat(categoryTitles[categoryTitles.length - 1].nextElementSibling.textContent.slice(2));
              totalSpend += parseFloat(amountEdit.value);
              categoryTitles[categoryTitles.length - 1].nextElementSibling.textContent = "$ " + String(totalSpend.toFixed(2));
              savingsAmount.textContent = "$ " + String((parseFloat(savingsAmount.textContent.slice(2)) - parseFloat(amountEdit.value)).toFixed(2));
              const parentRow = e.target.parentNode.parentNode;
              const categoryCell = parentRow.children[2];
              categoryCell.innerHTML = categoryEdit.children[i].value;

            }
          }
        }
      }
      itemCell.innerHTML = itemEdit.value;
      amountCell.innerHTML = parseFloat(amountEdit.value).toFixed(2);
      e.target.textContent = "edit";


      }
    }
  }
)

//edit income

editIncomeButton.addEventListener('click', () => {
  const incomeText = document.getElementsByClassName('income-box')[0].firstElementChild.firstElementChild;
  if (incomeText.tagName == "INPUT" ) {
    const newIncome = incomeText.value;
    let check = true;
    while (check) {
      if (notNumber(newIncome)) {
        alert("Invalid income entered. Enter again");
        incomeText.value = "";
        return;
      } else {
        check = false;
      }
    }
    editIncomeButton.textContent = "edit";
    const span = document.createElement('span');
    incomeText.parentNode.insertBefore(span, incomeText);
    incomeText.parentNode.removeChild(incomeText);
    span.textContent = newIncome;
    savingsAmount.textContent = "$ " + (parseFloat(newIncome)-totalSpend).toFixed(2);  //handle expenditure in future

  } else if (incomeText.tagName == "SPAN") {
    const input = document.createElement('input');
    input.type = "text";
    input.size = "5";
    input.style.height = "25px";
    incomeText.parentNode.insertBefore(input, incomeText);
    incomeText.parentNode.removeChild(incomeText);

//    incomeText.innerHTML = "<input type = 'text' size = '5'>";
//    incomeText.style.height = "25px";
//    incomeText.style.padding = "0";
    editIncomeButton.style.fontFamily = "'Mali', cursive";
    editIncomeButton.textContent = "update";
  }

})
