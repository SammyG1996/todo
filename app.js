const ul = document.querySelector('ul');
const check = document.querySelectorAll('.checkmark');
const trash = document.querySelectorAll('.trash');
const formElement = document.querySelector('form input');
const formButton = document.querySelector('form button');
let spans = document.querySelectorAll('.span');


//The todo array will store the value of the text entered into input field
let todo = [];
//The strike array will hold the true/false values for the coresponding index num
//on the todo array. true === strike and false===no strike. 
let strike = [];

//the above arrays get stored into local storage in the code bellow. These two 
//varaibles will contained the parsed JSON string to use. 
let returnedTodo = JSON.parse(localStorage.getItem('todo'));
let returnedStrike = JSON.parse(localStorage.getItem('strike'));

//I added an event listener to the ul element
ul.addEventListener('click', (e) => {
  //'e' target will return the img. I want the button so I then look for the 
  //parentElement. If the class name is 'checkmark' then the following code runs 
  if(e.target.parentElement.className === 'checkmark') {
    const target = e.target;
    const text = target.parentElement.parentElement.lastElementChild;
    
    text.classList.toggle('strike')

    
    //The code bellow will update the strike array and the strike localStorage object
    //------------------------------------------------
    let selectsSpans = document.querySelectorAll('.span')

    spans = selectsSpans  

    let tempArr = [];
     for (let i = 0; i < todo.length; i++) {
        if (spans[i].className === 'span strike') {
          tempArr.push(true)
        } else {
          tempArr.push(false)
        }

        strike = tempArr

        localStorage.setItem('strike', JSON.stringify(strike));
  } 
    // ------------------------------------------------

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
    for (let i = 0; i < todo.length; i++) {
      if (todo[i].includes(span)) {
        todo.splice(i, 1);
        break
      }
    }

    //I then update the todo local storage object with the new value of the todo array
    localStorage.setItem('todo', JSON.stringify(todo));

  //This will now update the strike array to remove the item and keep it
  //in sync with the todo array. 
  // -------------------------------------------
     let selectsSpans = document.querySelectorAll('.span')

     spans = selectsSpans  

     let tempArr = [];

       for (let i = 0; i < todo.length; i++) {
          if (spans[i].className === 'span strike') {
            tempArr.push(true)
          } else if(spans[i].className === 'span') {
            tempArr.push(false)
          }

          strike = tempArr

          localStorage.setItem('strike', JSON.stringify(strike));
       }

     // -------------------------------------------
    
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
 todo.push(text)
//I update the todo local storage object with the new item.
 localStorage.setItem('todo', JSON.stringify(todo))
//I clear the form input
 formElement.value = ''
})

//All of this code in here must load AFTER the DOM is created
document.addEventListener('DOMContentLoaded', () => {
  //i repopulate the strike array
  for(let strikes of returnedStrike) {
    strike.push(strikes)
  }

  //Then I regenerate all of the saved items using the information stored
  //local storage
  for(let i = 0; i < returnedTodo.length; i++) {
    console.log(returnedTodo[i])

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
     newSpan.innerText = returnedTodo[i];
          
    //this will add the class of 'span' or 'span strike'
    //depending on whether the coresponding index of 
    //'returned strike' is true or false 
    if(returnedStrike[i] === true) {
      newSpan.className = 'span strike' 
    } else {
      newSpan.className = 'span'
    }
  
     newLi.append(newCheckButton);
     newLi.append(newTrashButton);
     newLi.append(newSpan);
  
     ul.append(newLi);
    //This repopulates the todo array
     todo.push(returnedTodo[i]);

     //The code below depened on the DOM being loaded to work. 
     //It updates the variable spans with all the current span elements
     //that have the span class (which is all of them).

     let selectsSpans = document.querySelectorAll('.span')

     spans = selectsSpans  

  }

 });






