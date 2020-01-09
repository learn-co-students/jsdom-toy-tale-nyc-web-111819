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
  let targetDiv = document.getElementById("toy-collection")
  var toylist
  function getToys(toys){
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    toylist = toys
    toys.forEach(function(toy){
      let div = document.createElement('div')
      div.className = "card"
      div.dataset = toy["id"]
      targetDiv.appendChild(div)
      let htwo = document.createElement('h2')
      htwo.innerText = toy['name']
      div.appendChild(htwo)
      let img = document.createElement('img')
      img.src = toy['image']
      img.className = "toy-avatar"
      div.appendChild(img)
      let p = document.createElement('p')
      p.innerText = toy['likes']
      div.appendChild(p)
      let button = document.createElement('button')
      button.id = toy["name"]
      button.innerText = 'Likes <3'
      div.appendChild(button)
    })
  })}
  getToys()
  let toyLiker = document.addEventListener("click", function(){
    let newLikes = parseInt(event.target.parentNode.children[2].innerText)+1
    fetch(`http://localhost:3000/toys/${toylist.find(element=>element.name === event.target.id)['id']}`,{
    method: "PATCH",
    headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": newLikes
      })
    })
    event.target.parentNode.children[2].innerText = newLikes
  })
  let submit = document.getElementsByClassName('submit')[0]
  submit.addEventListener("click", function(){
  let name = document.getElementsByClassName('input-text')[0].value
  let url = document.getElementsByClassName('input-text')[1].value
  let newToy = {
    "name": name,
    "image": url,
    "likes": 0
  }
  fetch("http://localhost:3000/toys/", {
      method: "POST",
      headers: {
          "content-type": "application/json",
          accepts: "application/json"
      },
      body: JSON.stringify(newToy)
    })
  })
})