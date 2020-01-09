let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  getToys();

  let form = document.querySelector("form.add-toy-form")
  form.addEventListener("submit", function() {
    event.preventDefault();
    let toy = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    }
    createToy(toy)
  }) 

  document.addEventListener('click', function(e) {
    if (e.target.className === 'like-btn') {
      console.log('you clicked a like button!')
      let div = e.target.parentNode
      // figure out new likes number
      let likesCount = e.target.parentNode.querySelector("span.likes-count").innerText
      likesCount++
      e.target.parentNode.querySelector("span.likes-count").innerText = likesCount
      //run a patch require
      // let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
      console.log(typeof (div.dataset.id))
      console.log(typeof (likesCount))
      fetch(`http://localhost:3000/toys/${div.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
          // "Access-Control-Allow-Origin": "http://localhost:3000/toys"
        },
        body: JSON.stringify({ likes: likesCount })
      }) 
    }
  })

})

function createToy(toy) {
  fetch('http://localhost:3000/toys', { 
    method: "POST", 
    body: JSON.stringify(toy),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(toy => {
    console.log(toy)
    addToyCard(toy)
  })
}

function addToyCard(toy) {
  let div = document.createElement('div')
  div.className = 'card'
  div.dataset.id = toy.id
  div.innerHTML = `
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar">
        <p>Likes: <span class="likes-count">${toy.likes}</span></p>
        <button class="like-btn">Like</button>
      `
  let bigDiv = document.querySelector('div#toy-collection')
  bigDiv.appendChild(div)
}

function getToys(){
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => {

    //code for what to do with the toys
    //iterate through toys (maybe forEach? )
    toys.forEach(function(toy){
      addToyCard(toy)
    })
    
  })
}

