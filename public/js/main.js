

function newItem() {
  
  const inputValue = document.querySelector("#myInput").value;
  const amountValue = document.querySelector("#amount").value;

  if (inputValue !== "" && amountValue > 0 && amountValue <= 10) {

    const data = {naam: inputValue, hoeveelheid: amountValue};

    fetch('http://localhost:3000/api/boodschappen', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {'Content-type': 'application/json; charset=UTF-8'},
    })
    .then((response) => {
      if (response.status === 200){
        return response.json()
      }
      if (response.status === 404){
        throw Error('Niet gevonden')
      }
      throw Error('Er liep iets mis')
    })
  
    .then((data) => {
      addNewValue(data.naam, data.id, data.hoeveelheid);
      
    })
    
    .catch((error) => {
      alert(`Catch: ${error}`);
    })

    document.getElementById("myInput").value = "";
    
  }

};



function addNewValue(value, id, amount = 1) {
  const li = document.createElement("li");
    const bdschp = document.createElement("div");
    const tekst = document.createTextNode(value);

    bdschp.appendChild(tekst);

    const amnt = document.createElement("div");
    const getal = document.createTextNode(amount)

    amnt.appendChild(getal);
    
    li.appendChild(bdschp);
    li.appendChild(amnt);


    const ul = document.getElementById("myUL");
    ul.appendChild(li);

    

    const button = document.createElement("button");
    const txt = document.createTextNode("x");
    button.classList.add("close");
    
    button.appendChild(txt);
    li.appendChild(button);
  
   button.addEventListener("click", (event) => {

    fetch(`http://localhost:3000/api/boodschappen/${id}`, {
      method: "DELETE",
    })
    .then((response) => {
      if (response.status === 200){
        console.log(event);
        ul.removeChild(li);
      }
      if (response.status === 404){
        throw Error('Niet gevonden')
      }
      throw Error('Er liep iets mis')
    })

   })  
};

window.onload = () => {
  const button = document.querySelector(".addBtn");
  button.addEventListener("click", (event) => {
    console.log(event);
    newItem();
  });


  const loader = document.querySelector(".loader");
  loader.style.display = "initial";

  /*
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["appel", "peer", "tomaat"]);
    }, 5000);
  });

  
  promise.then((data) => {
    data.forEach(element => {
      addNewValue(element);
    });
    loader.style.display = "none";
    
  });

  */
 
  fetch('http://localhost:3000/api/boodschappen', {})
  .then((response) => {
    if (response.status === 200){
      return response.json()
    }
    if (response.status === 404){
      throw Error('Niet gevonden')
    }
    throw Error('Er liep iets mis')
  })

  .then((data) => {
    data.forEach(element => {
      addNewValue(element.naam, element.id, element.hoeveelheid);
    });
    loader.style.display = "none";
    
  })
  
  .catch((error) => {
    alert(`Catch: ${error}`);
  })
  
  

  
};
