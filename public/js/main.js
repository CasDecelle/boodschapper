const amountMinValue = 1;
const amountMaxValue = 10;

newItem = () => {
  const inputValue = document.querySelector("#myInput").value;
  const amountValue = document.querySelector("#amount").value;

  if (
    inputValue !== "" &&
    canAddOrUpdateBoodschapItem(amountValue, 1)
  ) {
    const data = { naam: inputValue, hoeveelheid: amountValue };

    postBoodschapItem(data).then((data) => {
      addNewBoodschapItem(data.id, data.naam, data.hoeveelheid);
    });

    document.getElementById("myInput").value = "";
  }
};

addNewBoodschapItem = (id, name, amount = 1) => {
  const ulBoodschappen = document.getElementById("bdschp-list");
  const liBoodschap = document.createElement("li");
  ulBoodschappen.appendChild(liBoodschap);

  const idDiv = createDivWithText(id, "bdschp-id", true);
  const itemNameDiv = createDivWithText(name, "item-name");
  const amountDiv = createDivWithText(amount, "amount");

  const minusButton = createButton("-", "minus");
  const plusButton = createButton("+", "plus");
  const deleteButton = createButton("x", "close");

  minusButton.addEventListener("click", (event) =>
    changeBoodschapItemAmount(itemNameDiv, amountDiv, id, -1)
  );
  plusButton.addEventListener("click", (event) =>
    changeBoodschapItemAmount(itemNameDiv, amountDiv, id, 1)
  );
  deleteButton.addEventListener("click", (event) =>
    deleteBoodschap(ulBoodschappen, liBoodschap, id)
  );

  appendChildrenToLiElement(liBoodschap, [
    idDiv,
    itemNameDiv,
    amountDiv,
    minusButton,
    plusButton,
    deleteButton,
  ]);
};

deleteBoodschap = (ulBoodschappen, liBoodschap, id) => {
  deleteBoodschapItem(id).then(() => {
    ulBoodschappen.removeChild(liBoodschap);
  });
};

changeBoodschapItemAmount = (itemNameDiv, amountDiv, id, incrementAmount) => {
  const itemName = itemNameDiv.textContent;
  const amount = parseInt(amountDiv.textContent, 10);
  if (canAddOrUpdateBoodschapItem(amount, incrementAmount)) {
    putBoodschapItem({
      id,
      naam: itemName,
      hoeveelheid: amount + incrementAmount,
    }).then((data) => {
      amountDiv.textContent = data.hoeveelheid;
    });
  }
};

canAddOrUpdateBoodschapItem = (amount, incrementAmount) => {
  if (incrementAmount > 0)
    return amount >= amountMinValue && amount < amountMaxValue
  return amount > amountMinValue && amount <= amountMaxValue
}

window.onload = () => {
  const button = document.querySelector(".add-btn");
  button.addEventListener("click", (event) => {
    newItem();
  });

  const loader = document.querySelector(".loader");
  loader.style.display = "initial";

  getBoodschappen().then((data) => {
    data.forEach((element) => {
      addNewBoodschapItem(element.id, element.naam, element.hoeveelheid);
    });
    loader.style.display = "none";
  });
};
