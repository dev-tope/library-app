const modal = document.getElementById("modal");
const addBookBtn = document.querySelector("#addBookBtn");
const cardDiv = document.querySelector(".book-cards")
// const readStatusBtn = document.querySelector(".readStatusBtn");

// VALUES
const form = document.getElementById("bookForm")
const titleVal = document.getElementById("title");
const authorVal = document.querySelector("#author");
const pagesVal = document.querySelector("#pages");
const readStatusVal = document.getElementById("readstatus");


// BRING UP MODAL
addBookBtn.addEventListener('click', function(){
    modal.style.display = "grid"
})

// CLOSE MODAL
window.addEventListener('click', function(e){
    if(e.target == modal) {
        modal.style.display = "none";
    }
})

// APP LOGIC

myLibrary = [];


// function Book(title, author, pages, readStatus) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this. readStatus = readStatus;
// }

class Book {
    constructor(title, author, pages, readStatus){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }
}


function addBookToLibrary() {
    let book = new Book();

    book.title = titleVal.value;
    book.author = authorVal.value;
    book.pages = parseInt(pagesVal.value);
    book.readStatus = readStatusVal.checked;

    myLibrary.push(book);
}

function displayLibrary() {
    for(let i = 0; i < myLibrary.length; i++) {
        
        const card = document.createElement("div");
        card.classList.add('card');
        // card.id = i;
    
        const titleName = document.createElement('h1');
        titleName.innerText = `"${myLibrary[i].title}"`;
    
        const authorName = document.createElement('h1');
        authorName.innerText = `by ${myLibrary[i].author}`;
    
        const pageNum = document.createElement('h1');
        pageNum.innerText = `${myLibrary[i].pages} pages`;
    
        // READSTATUS
        const readStatusDiv = document.createElement("button");
        readStatusDiv.classList.add('readStatusBtn');
        readStatusDiv.id = i;
        
    
        let status = myLibrary[i].readStatus;
    
        if(status === true){
            readStatusDiv.innerText = "READ"
            readStatusDiv.classList.add('readStatusBtnTrue')
        } else {
            readStatusDiv.innerText = "UNREAD";
            readStatusDiv.classList.add('readStatusBtnFalse')
        }
    
    
    
        // //DELETE BUTTON
        const deleteBook = document.createElement('div');
        deleteBook.classList.add('deleteBook')
        deleteBook.classList.add('delBtn');
        deleteBook.id = i;

        const delImg = document.createElement('img');
        delImg.classList.add('delBtn');
        delImg.src = 'images/outline_delete_white_24dp.png'
        deleteBook.appendChild(delImg);


    
    
        card.appendChild(titleName);
        card.appendChild(authorName);
        card.appendChild(pageNum);
        card.appendChild(readStatusDiv);
        card.appendChild(deleteBook);
        
        cardDiv.appendChild(card)
    }

}

function toggleReadStatus(status){
   if (status === true){
    return false;
   } else {
    return true;
   }
}

function resetCardDiv() {
    cardDiv.innerHTML = ""
}

function removeBook(index){
    myLibrary.splice(index, 1);
    return myLibrary;
}



//Deletes Card
cardDiv.addEventListener('click', function(e){
    if (e.target.classList.contains('delBtn')) {
        const bookId = Number(e.target.id);
        removeBook(bookId);
        resetCardDiv();
        displayLibrary()
    }
})

cardDiv.addEventListener('click', function(e){
    if(e.target.classList.contains('readStatusBtn')) {
        const index = Number(e.target.id);
        const readStatus = myLibrary[index].readStatus;
        myLibrary[index].readStatus =  toggleReadStatus(readStatus);
        resetCardDiv()
        displayLibrary()
        console.log(myLibrary)
    }
})

//submits form + add book to library + display library
form.addEventListener('submit', function(e){
    e.preventDefault();
    addBookToLibrary();
    modal.style.display = "none";
    console.log(myLibrary);
    resetCardDiv()
    displayLibrary()
    form.reset()
})


