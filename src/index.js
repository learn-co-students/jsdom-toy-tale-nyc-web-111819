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

  
  fetch("http://localhost:3000/toys")
  .then(response => {return response.json()})
  .then(toy => {
    toy.forEach(toy => {
      renderToy(toy)
    });
    
  })
  
  const toyCollectionDiv = document.getElementById("toy-collection")

  function renderToy(toy) {
    let toyCardDiv = document.createElement('div')
    toyCardDiv.className += "card"
    let toyH2 = document.createElement('h2')
    let toyImage = document.createElement('img')
    toyImage.className += "toy-avatar"
    let toyLikeP = document.createElement('p')
    let toyButton = document.createElement('button')
    toyButton.className += "like-btn"

    toyH2.innerText = toy.name
    toyImage.src = toy.image 
    toyLikeP.innerText = `${toy.likes} likes`
    toyLikeP.id = `toy-likes-id${toy.id}`
    toyButton.innerText = "Like"
    toyButton.dataset.id = toy.id

    toyCardDiv.appendChild(toyH2)
    toyCardDiv.appendChild(toyImage)
    toyCardDiv.appendChild(toyLikeP)
    toyCardDiv.appendChild(toyButton)

    toyCollectionDiv.appendChild(toyCardDiv)
  } // end of renderToy function

 let addToyForm = document.getElementById("add-toy-form")

  addToyForm.addEventListener("submit", (e)=> {
    e.preventDefault()

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: e.target.elements[0].value,
        image: e.target.elements[1].value,
        likes: 0
      })
    })
    .then(response => {return response.json()})
    .then(toy => {
      renderToy(toy)
    }) // end of second then statement
    e.target.reset()
  }) // end of addToyForm event listener


  toyCollectionDiv.addEventListener("click", function(e){
    
    if (e.target.className === "like-btn") {
      let toyLikes = document.getElementById(`toy-likes-id${e.target.dataset.id}`)
      let splitToyLikes = toyLikes.innerText.split(" ")
      let intToyLikes = parseInt(splitToyLikes[0]) + 1
      toyLikes.innerText = `${intToyLikes} likes`

      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({
          "likes": intToyLikes
        })
      })
      
    }
  })


}) // end of main function
