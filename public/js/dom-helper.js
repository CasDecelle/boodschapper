createButton = (buttonText, buttonClass, eventListener) => {
  const button = document.createElement("button");
  const textNode = document.createTextNode(buttonText);
  button.appendChild(textNode);

  if (buttonClass) {
    button.classList.add(buttonClass);
  }

  if (eventListener) {
    button.addEventListener(eventListener);
  }

  return button;
};

createDivWithText = (divText, divClass, hidden) => {
  const div = document.createElement("div");
  const textNode = document.createTextNode(divText);
  div.appendChild(textNode);

  if (divClass) {
    div.classList.add(divClass);
  }

  if (hidden) {
    div.hidden = true;
  }

  return div;
};

appendChildrenToLiElement = (li, children) => {
  if (children) {
    children.forEach((child) => li.appendChild(child));
  }
};
