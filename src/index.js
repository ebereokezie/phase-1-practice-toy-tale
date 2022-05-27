let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(data =>{
    console.log(data)
    let toyArray = Object.values(data)
    toyArray.forEach(getEachToy)
  });

let toyCollection = document.getElementById("toy-collection")

function getEachToy(element){
  let toys = document.createElement("div")
  toys.classList.add("card")
  let name = document.createElement("h2")
  name.textContent = `${element.name}`
  let picture = document.createElement("img")
  picture.src = `${element.image}`
  picture.classList.add("toy-avatar")
  let likes = document.createElement("p")
  likes.textContent = `${element.likes} likes`
  let button = document.createElement("button")
  button.classList.add("like-btn")
  button.setAttribute('id', `${element.id}`)
  button.textContent = "Like ❤️"
  toys.appendChild(name)
  toys.appendChild(picture)
  toys.appendChild(likes)
  toys.appendChild(button)
  
  toyCollection.appendChild(toys)
}

let toyForm = document.querySelector(".add-toy-form")
console.log(toyForm)
toyForm.addEventListener("submit", (event) =>{
  event.preventDefault()
  let nameInput = toyForm.elements["name"].value 
  let urlInput = toyForm.elements["image"].value
  
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      "name":`${nameInput}`,
      "image":`${urlInput}`,
      "likes": 0})
  })
  .then(res => res.json())
  .then(data => getEachToy(data))

toyForm.reset()
})

toyCollection.addEventListener("click",(event)=>{
  if(event.target.className === "like-btn"){
  let toyID = event.target.id
  console.log(toyID)
  let pText = event.target.previousSibling.innerText
  let actualLikes = pText.split(" ")[0]
  let parsedLikes = parseInt(actualLikes)
  event.target.previousSibling.innerText =  `${parsedLikes +1} likes`
  fetch(`http://localhost:3000/toys/${toyID}`, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
          "likes": event.target.previousSibling.innerText
    })
  })
  .then(res => res.json())
  .then(data =>console.log(data))
  

  
}}
)


});
