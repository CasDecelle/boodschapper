getBoodschappen = () => {
    return fetch('http://localhost:3000/api/boodschappen', { method: "GET" })
    .then(handleApiResponse);
}

postBoodschapItem = (data) => {
    return fetch('http://localhost:3000/api/boodschappen', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    })
    .then(handleApiResponse);
}

deleteBoodschapItem = (id) => {
    return fetch(`http://localhost:3000/api/boodschappen/${id}`, { method: "DELETE" })
    .then(handleApiResponse);
}

putBoodschapItem = (data) => {
    return fetch(`http://localhost:3000/api/boodschappen`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    })
    .then(handleApiResponse);
}

handleApiResponse = (response) => {
    if (response.status === 200){
      return response.json()
    }
    if (response.status === 404){
      throw Error('Niet gevonden')
    }
    throw Error('Er liep iets mis')
}