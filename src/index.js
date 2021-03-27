let url = 'http://localhost:3000/pups'
const pupBar = document.querySelector('#dog-bar')
const pupDiv = document.querySelector('#dog-info') 
const pupImg = document.querySelector('#dog-image')
const pupH2 = document.querySelector('#dog-name')
const goodPupButton = document.querySelector('#dog-button')
let filterBtn = document.querySelector("button#good-dog-filter")

let pupStatus = {}

//deliverable 1
//get fetch all dogs
//create span, add span to header

fetch(url)
.then(res => res.json())
.then(pupArr => {
  console.log(pupArr)
  pupArr.forEach(addPupToHeader)
})

// deliverable 2
//SHOW MORE INFO ABOUT EACH PUP
function addPupToHeader(pupObj){
  let pupSpan = document.createElement("span")
  pupSpan.innerText = pupObj.name
  pupBar.append(pupSpan)
  pupSpan.addEventListener("click", function(){
      pupStatus = pupObj
      pupImg.src = pupObj.image
      pupH2.innerText = pupObj.name
      if (pupObj.isGoodDog) {
          goodPupButton.innerText = 'Good Dog!'}
      else {
          goodPupButton.innerText = 'Bad Dog!'
      }
  })
  }





// deliverable 3
// TOGGLE GOOD DOG
goodPupButton.addEventListener('click',function(){
  if (pupStatus.isGoodDog)
  {pupStatus.isGoodDog = false
  goodPupButton.innerText = 'Bad Dog!'}
  else {pupStatus.isGoodDog = true
      goodPupButton.innerText = 'Good Dog'}

  fetch(`http://localhost:3000/pups/${pupStatus.id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({isGoodDog: pupStatus.isGoodDog}),
  })
  .then(res => res.json())
  .then(function(updatedDog){
      pupStatus.isGoodDog = updatedDog.isGoodDog
      console.log(updatedDog)
  })
  })
