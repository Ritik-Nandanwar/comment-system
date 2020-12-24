var socket = io('http://localhost:3333')
const inputArea = document.querySelector(".input-area");
const submitButton = document.querySelector(".submit-btn");
const commentSection = document.querySelector(".comment-section")
const form = document.querySelector('.form')
let username
do {
  username = prompt("enter user name")
} while (!username);

console.log(username)
form.addEventListener("submit" , (e)=>{
  e.preventDefault()
  const comment = inputArea.value
  addComment(comment)
  inputArea.value =""
})

const addComment = (comment) => {
  const data ={
    username : username ,
    comment : comment
  }
  //APPEND COMMENT
  appendComment(data)
  
//BROADCAST COMMENT
broadcastComment(data)
}
const appendComment = data => {
  let commentDiv = document.createElement('div')
  commentDiv.classList.add("comment")
 let commentHTML = `${data.comment} 
 <br>
      <small class="grey-text darken-2">${data.username}</small>
 `
commentDiv.innerHTML=commentHTML
commentSection.prepend(commentDiv)

}
const broadcastComment = (data) => {
  //REQUEST 1 : SEND DATA TO SERVER
  socket.emit('comment' , data)
}
//CATCH RESPONSE FROM SERVER
socket.on('comment' , data => {
  appendComment(data)
})