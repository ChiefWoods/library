let myLibrary = [];

const addBook = document.querySelector('.add');
const shelf = document.querySelector('.shelf');
let favouriteIcons = document.querySelectorAll('.favourite-icon');
let clockIcons = document.querySelectorAll('.clock-icon');
let checkIcons = document.querySelectorAll('.check-icon');
let trashIcons = document.querySelectorAll('.trash-icon');
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

favouriteIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    if (icon.style.fill !== 'rgb(253, 224, 71)') {
      icon.style.fill = 'rgb(253, 224, 71)';
    } else {
      icon.style.fill = 'rgb(0, 0, 0)';
    }
  })
})

clockIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    if (icon.style.fill !== 'rgb(239, 246, 255)') {
      icon.style.fill = 'rgb(239, 246, 255)';
      icon.parentNode.querySelector('.check-icon').style.fill = 'rgb(0, 0, 0)';
    } else {
      icon.style.fill = 'rgb(0, 0, 0)';
    }
  })
})

checkIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    if (icon.style.fill !== 'rgb(74, 222, 128)') {
      icon.style.fill = 'rgb(74, 222, 128)';
      icon.parentNode.querySelector('.clock-icon').style.fill = 'rgb(0, 0, 0)';
    } else {
      icon.style.fill = 'rgb(0, 0, 0)';
    }
  })
})

trashIcons.forEach(icon => {
  icon.addEventListener('click', () => {

  })
})

exit.addEventListener('click', () => {
  overlay.classList.remove('active');
})

function setAttributes(element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function createBook(bookTitle, bookAuthor, bookPage, bookRead, libraryIndex) {
  const newBook = document.createElement('div');
  const newBookInfo = document.createElement('div');
  const newBookTitle = document.createElement('h1');
  const newBookAuthor = document.createElement('p');
  const newBookPage = document.createElement('p');
  const newBookTab = document.createElement('div');
  newBookTitle.textContent = bookTitle;
  newBookAuthor.textContent = bookAuthor;
  newBookPage.textContent = bookPage;
  newBook.classList.add('book');
  newBookInfo.classList.add('book-info');
  newBookTab.classList.add('tab');
  newBookTitle.classList.add('title');
  newBookAuthor.classList.add('author');
  newBookPage.classList.add('page');
  newBookInfo.append(newBookTitle, newBookAuthor, newBookPage);
  newBook.setAttribute('data-index', libraryIndex.toString())

  const favouriteSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  setAttributes(favouriteSVG, { "class": "favourite-icon", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 24 24" });
  const favouritePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setAttributes(favouritePath, { "d": "M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" });
  favouriteSVG.append(favouritePath);

  const clockSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  setAttributes(clockSVG, { "class": "clock-icon", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 24 24" });
  const clockPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setAttributes(clockPath, { "d": "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" });
  clockSVG.append(clockPath);

  const checkSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  if (bookRead) {
    setAttributes(checkSVG, { "class": "check-icon", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 24 24", "fill": "rgb(74, 222, 128)" });
  } else {
    setAttributes(checkSVG, { "class": "check-icon", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 24 24" });
  }
  const checkPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setAttributes(checkPath, { "d": "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" });
  checkSVG.append(checkPath);

  const trashSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  setAttributes(trashSVG, { "class": "trash-icon", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 24 24" });
  const trashPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setAttributes(trashPath, { "d": "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" });
  trashSVG.append(trashPath);

  newBookTab.append(favouriteSVG, clockSVG, checkSVG, trashSVG);
  newBook.append(newBookInfo, newBookTab);
  shelf.append(newBook);

  favouriteIcons = document.querySelectorAll('.favourite-icon');
  clockIcons = document.querySelectorAll('.clock-icon');
  checkIcons = document.querySelectorAll('.check-icon');
  trashIcons = document.querySelectorAll('.trash-icon');
}

addToLibrary.addEventListener('click', e => {
  e.preventDefault();
  if (title.checkValidity() && author.checkValidity() && page.checkValidity()) {
    let bookTitle = title.value;
    let bookAuthor = author.value;
    let bookPage = page.value;
    let bookRead = haveRead.checked;
    const bookToAdd = new Book(bookTitle, bookAuthor, bookPage, bookRead);
    addBookToLibrary(bookToAdd);
    createBook(bookTitle, bookAuthor, bookPage, bookRead, myLibrary.indexOf(bookToAdd));
    overlay.classList.remove('active');
  }
})

class Book {
  constructor(name, author, pages, haveRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
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