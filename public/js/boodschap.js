class Item {
  
  constructor(id, name, amount) {
    const init = (id, name, amount) => {
      this.setId(id);
      this.setName(name);
      this.setAmount(amount);
    };

    const template = document.querySelector("new-bdschp-item").content;
    liElement = template.cloneNode(true);

    const ul = document.querySelector("bdschp-list");
    ul.append(liElement);

    this.idElement = liElement.querySelector("bdschp-id");
    this.nameElement = liElement.querySelector("bdschp-item-name");
    this.amountElement = liElement.querySelector("bdschp-amount");

    this.idElement.appendChild(document.createTextNode());
    this.nameElement.appendChild(document.createTextNode());
    this.amountElement.appendChild(document.createTextNode());

    this.getId = () => this.idElement.textContent;
    this.getName = () => this.nameElement.textContent;
    this.getAmount = () => parseInt(this.amountElement.textContent);

    this.setId = (id) => (this.idElement.textContent = id);
    this.setName = (name) => (this.nameElement.textContent = name);
    this.setAmount = (amount) => (this.amountElement.textContent = amount);

    this.getData = () => {
      return {
        id: this.getId(),
        name: this.getName(),
        amount: this.getAmount(),
      };
    };
  }
}
