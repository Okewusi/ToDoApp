let array = [];
let ul = document.querySelector('ul');
// for(let i in array){
//     let li= document.createElement('li');
//     let span = document.createElement('span');
//     span.textContent ='X'
//     li.textContent = array[i];
//     li.appendChild(span);
//     ul.appendChild(li);
// // }


// let remove = document.getElementsByTagName('i');
// for(let i = 0; i < remove.length; i++){
//     let listing = document.querySelectorAll('li')
//     remove[i].addEventListener('click', removing);
//     function removing(){
//         listing[i].innerHTML = '';
//         listing[i].style.borderBottom = 'none'
//     }
// }
let add = document.querySelector('.add');
add.addEventListener('click', addItem);
function addItem(){
    let item = document.querySelector('.text');
    let todo = item.value;
    if(todo.length){
        add.disabled = false;
        db.collection('Todos').add({
        name: todo,
        })
        .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        appendItem(docRef.id,todo);
        })
        .catch((error) => {
        console.error("Error adding document: ", error);
        });
    }else{
        alert('please enter an item');
    }

   
    // todo.setAttribute('id',docRef.id)
    // array.push(todo);
    
}
function appendItem(id,item){
    let list = document.createElement('li');
    let span = document.createElement('span');
    span.className = 'what'
    list.textContent = item;
    span.innerHTML = '<i class="far fa-trash-alt"></i>';
    list.setAttribute('data-id',id);
    // console.log(list);
    
   
    list.appendChild(span);
    ul.appendChild(list);
    console.log(array); 

    // deleting items from frontend and firebase
    span.addEventListener('click',()=>{
        let listId = list.getAttribute('data-id');
        db.collection("Todos").doc(listId).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        list.remove();
    })
}
for(let i in array){
  appendItem(array[i]);
}
db.collection("Todos").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        appendItem(doc.id,data.name);
    });
});

