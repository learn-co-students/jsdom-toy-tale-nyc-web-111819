
// const e = require("express")

// import { response } from "express"

let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  let toyColDiv = document.getElementById("toy-collection")
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let form = document.getElementsByClassName("add-toy-form")[0]
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  function addToCollection(toy){
    let toyDiv = document.createElement("div")
    toyDiv.className = "card"
    toyDiv.innerHTML = `<h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p><span id="${toy.id}">${toy.likes}</span> Likes </p>
    <button class="like-btn">Like ❤️</button>
    <button class="delete" id="${toy.id}">Delete Toy</button>`
    toyColDiv.append(toyDiv)
  }

  function fetchToys(){
    fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toys => {
      toys.forEach(addToCollection)
    })
  }

  fetchToys()

  function createNewToy(toy){
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify(toy)
    })
    .then(response => response.json())
    .then(toy => {addToCollection(toy)})
  }


  form.addEventListener('submit', function(){
    event.preventDefault()
    let name = event.target.name.value
    let image = event.target.image.value
    let toyObject = {
      name, image, likes: 0
    }
    createNewToy(toyObject)
    
    event.target.reset()
    toyForm.style.display = 'none'
  })

  function updateToy(id, likes){
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify(likes)
    })
  }

  toyColDiv.addEventListener('click', function(){
    if (event.target.className === "like-btn"){
      let parent = event.target.parentNode
      let num = parent.querySelector("span")
      let id = num.id
      let likes = (parseInt(num.innerText)) + 1
      num.innerText = likes
      updateToy(id, {likes: likes})
    } else if (event.target.className == "delete"){
      let id = event.target.id
      fetch(`http://localhost:3000/toys/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          accepts: "application/json"
        },
        body: JSON.stringify({id})
      })
      event.target.parentNode.remove()
    }
  })

})
