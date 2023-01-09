let myLibrary = [];

const addBook = document.querySelector('.add');
const overlay = document.querySelector('.overlay');
const exit = document.querySelector('.exit-icon');
const title = document.querySelector('input[name="title"]');
const author = document.querySelector('input[name="author"]');
const page = document.querySelector('input[name="page"]');
const haveRead = document.querySelector('input[name="have-read"]');
const addToLibrary = document.querySelector('.add-button');

addBook.addEventListener('click', () => {
  overlay.classList.add('active');
})

exit.addEventListener('click', () => {
  overlay.classList.remove('active');
})

// add event listener for "add to library" button, check all inputs for validity before removing active class from overlay
// add event listener for each icon button to change color state
// add function to create div book and append to shelf
// add parent function to create book object, call addBookToLibrary, create div book, append to shelf

addToLibrary.addEventListener('click', e => {
  let bookTitle = title.value;
  let bookAuthor = author.value;
  let bookPage = page.value;
  let bookRead = haveRead.checked;
  console.log(bookTitle);
  console.log(bookAuthor);
  console.log(bookPage);
  console.log(bookRead);
  e.preventDefault();
})

class Book {
  constructor(name, author, pages) {
    this.name = name;
    this.author = author;
    this.pages = pages;
  }
}

function addBookToLibrary(...books) {
  for (const book of books) {
    myLibrary.push(book);
  }
}

const default1 = new Book("Billion Dollar Whale", "Tom Wright, Bradley Hope", 400);
const default2 = new Book("Models: Attract Women Through Honesty", "Mark Manson", 260);
const default3 = new Book("Rich Dad Poor Dad", "Robert T. Kiyosaki", 336);

addBookToLibrary(default1, default2, default3);