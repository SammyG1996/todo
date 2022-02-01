const ul = document.querySelector('ul');
const check = document.querySelectorAll('.checkmark');
const trash = document.querySelectorAll('.trash');
const formElement = document.querySelector('form input');
const formButton = document.querySelector('form button');
let spans = document.querySelectorAll('.span');


let todos = {
  
}

//the above arrays get stored into local storage in the code bellow. These two 
//varaibles will contained the parsed JSON string to use. 
let returnedTodo = JSON.parse(localStorage.getItem('todos'));

//I added an event listener to the ul element
ul.addEventListener('click', (e) => {
  //'e' target will return the img. I want the button so I then look for the 
  //parentElement. If the class name is 'checkmark' then the following code runs 
  if(e.target.parentElement.className === 'checkmark') {
    const target = e.target;
    const text = target.parentElement.parentElement.lastElementChild;
    const innerText = text.innerText
    
    text.classList.toggle('strike')
    todos[innerText] = 'strike';
    localStorage.setItem('todos', JSON.stringify(todos));

    //I next do an 'else...if' statement because an 'else' statment would cause 
    //a list item to be deleted if you clicked on the text rather than the trash 
    //button. I then check to see if the className === the class trash
    }else if(e.target.parentElement.className === 'trash') {

    //target contains the li element (since its the parent of the 'e' parent)
    const target = e.target.parentElement.parentElement;
    //span then targets the last element of the li which is the span element. 
    //it then extracts the text.
    const span = target.lastElementChild.innerText;

   //this will iterate over the array 'todo' and if it contains the text of the 
   //span variable (which has the the item we want to delete), it will then remove
   //it and break from the loop in order to not delete and duplicate items.
    // for (let i = 0; i < todos.length; i++) {
   delete todos[span]

    //I then update the todo local storage object with the new value of the todo array
    localStorage.setItem('todos', JSON.stringify(todos));
    
    //I then remove the li using DOM
    target.remove();
  }
})


//I add an event listener to the form button. 
formButton.addEventListener('click', (e) => {
//I prevent the default action of the button (which refreshed the page)
 e.preventDefault(); 

 //this contains the information entered into the form
 const text = formElement.value

 //Everything that comes next it to create a new todo entry using DOM manipulation
 const ul = document.querySelector('ul');

 const newLi = document.createElement('li');

 const newCheckButton = document.createElement('button');
 const newCheckImg = document.createElement('img');
 newCheckImg.src = 'img/checkmark.svg';
 newCheckButton.append(newCheckImg);
 newCheckButton.className = 'checkmark';


 const newTrashButton = document.createElement('button');
 const newTrashImg = document.createElement('img');
 newTrashImg.src = 'img/trash.svg';
 newTrashButton.append(newTrashImg);
 newTrashButton.className = 'trash';

 const newSpan = document.createElement('span');
 newSpan.innerText = text;
 newSpan.className = 'span'

 newLi.append(newCheckButton);
 newLi.append(newTrashButton);
 newLi.append(newSpan);

 ul.append(newLi);

 //I update the todo with the new item. 
 todos[text] = '';
//I update the todo local storage object with the new item.
 localStorage.setItem('todos', JSON.stringify(todos))
//I clear the form input
 formElement.value = ''
})


//All of this code in here must load AFTER the DOM is created
document.addEventListener('DOMContentLoaded', () => {
  //i repopulate the strike array
  // for(let strikes of returnedStrike) {
  //   strike.push(strikes)
  // }

  //Then I regenerate all of the saved items using the information stored
  //local storage
  for(let todo in returnedTodo) {
    console.log(returnedTodo[todo])

     const ul = document.querySelector('ul');
     const newLi = document.createElement('li');
  
     const newCheckButton = document.createElement('button');
     const newCheckImg = document.createElement('img');
     newCheckImg.src = 'img/checkmark.svg';
     newCheckButton.append(newCheckImg);
     newCheckButton.className = 'checkmark';
  
  
     const newTrashButton = document.createElement('button');
     const newTrashImg = document.createElement('img');
     newTrashImg.src = 'img/trash.svg';
     newTrashButton.append(newTrashImg);
     newTrashButton.className = 'trash';
  
     const newSpan = document.createElement('span');
     newSpan.innerText = todo;
          
    //this will add the class of 'span' or 'span strike'
    //depending on whether the value of the todo key is strike or not

    returnedTodo[todo] === 'strike' ? newSpan.className = 'span strike' : newSpan.className = 'span'
  
     newLi.append(newCheckButton);
     newLi.append(newTrashButton);
     newLi.append(newSpan);
  
     ul.append(newLi);
    //This repopulates the todo object
    todos = {...returnedTodo} 
  }

 });






