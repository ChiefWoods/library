let myLibrary = [], deleteIndex;
let bookColors = ['rgb(239, 68, 68)', 'rgb(249, 115, 22)', 'rgb(14, 165, 233)', 'rgb(168, 85, 247)', 'rgb(236, 72, 153)', 'rgb(34, 197, 94)', 'rgb(184, 134, 11)'];

const addBook = document.querySelector('.add');
const shelf = document.querySelector('.shelf');
const favouriteIcons = document.querySelectorAll('.favourite-icon');
const clockIcons = document.querySelectorAll('.clock-icon');
const checkIcons = document.querySelectorAll('.check-icon');
const trashIcons = document.querySelectorAll('.trash-icon');
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
  closeOverlay();
})

favouriteIcons.forEach(icon => {
  addFavouriteEventListener(icon);
})

clockIcons.forEach(icon => {
  addClockEventListener(icon);
})

checkIcons.forEach(icon => {
  addCheckEventListener(icon);
})

trashIcons.forEach(icon => {
  addTrashEventListener(icon);
})

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
    closeOverlay();
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

function closeOverlay() {
  title.value = '';
  author.value = '';
  page.value = '';
  haveRead.checked = false;
  overlay.classList.remove('active');
}

function setMultipleAttributes(element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function addFavouriteEventListener(icon) {
  icon.addEventListener('click', () => {
    if (icon.style.fill !== 'rgb(253, 224, 71)') {
      icon.style.fill = 'rgb(253, 224, 71)';
    } else {
      icon.style.fill = 'rgb(0, 0, 0)';
    }
  })
}

function addClockEventListener(icon) {
  icon.addEventListener('click', () => {
    const bookToClockTitle = icon.closest('.book').querySelector('.title').textContent;
    for (let book of myLibrary) {
      if (bookToClockTitle === book.name) {
        if (icon.style.fill !== 'rgb(239, 246, 255)') {
          icon.style.fill = 'rgb(239, 246, 255)';
          icon.parentNode.querySelector('.check-icon').style.fill = 'rgb(0, 0, 0)';
          if (book.haveRead) {
            book.haveRead = !book.haveRead;
            break;
          }
        } else {
          icon.style.fill = 'rgb(0, 0, 0)';
          if (!book.haveRead) {
            book.haveRead = !book.haveRead;
            break;
          }
        }
      }
    }
  })
}

function addCheckEventListener(icon) {
  icon.addEventListener('click', () => {
    const bookToCheckTitle = icon.closest('.book').querySelector('.title').textContent;
    for (let book of myLibrary) {
      if (bookToCheckTitle === book.name) {
        if (icon.style.fill !== 'rgb(74, 222, 128)') {
          icon.style.fill = 'rgb(74, 222, 128)';
          icon.parentNode.querySelector('.clock-icon').style.fill = 'rgb(0, 0, 0)';
          book.haveRead = !book.haveRead;
          break;
        } else {
          icon.style.fill = 'rgb(0, 0, 0)';
          book.haveRead = !book.haveRead;
          break;
        }
      }
    }
  })
}

function addTrashEventListener(icon) {
  icon.addEventListener('click', () => {
    const bookToDeleteTitle = icon.closest('.book').querySelector('.title').textContent;
    for (let book of myLibrary) {
      if (bookToDeleteTitle === book.name) {
        deleteIndex = myLibrary.indexOf(book);
        break;
      }
    }
    myLibrary = myLibrary.slice(0, deleteIndex).concat(myLibrary.slice(deleteIndex + 1));
    icon.closest('.book').remove();
  })
}

function randomColor() {
  return bookColors[Math.floor(Math.random() * bookColors.length)];
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
  setMultipleAttributes(newBook, { 'data-index': libraryIndex.toString(), 'style': `background-color: ${randomColor()}` }); //

  const favouriteSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  setMultipleAttributes(favouriteSVG, { "class": "favourite-icon", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 24 24" });
  const favouritePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setMultipleAttributes(favouritePath, { "d": "M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" });
  favouriteSVG.append(favouritePath);
  addFavouriteEventListener(favouriteSVG);

  const clockSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  setMultipleAttributes(clockSVG, { "class": "clock-icon", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 24 24" });
  const clockPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setMultipleAttributes(clockPath, { "d": "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" });
  clockSVG.append(clockPath);
  addClockEventListener(clockSVG);

  const checkSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  if (bookRead) {
    setMultipleAttributes(checkSVG, { "class": "check-icon", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 24 24", "style": "fill: rgb(74, 222, 128);" });
  } else {
    setMultipleAttributes(checkSVG, { "class": "check-icon", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 24 24" });
  }
  const checkPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setMultipleAttributes(checkPath, { "d": "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" });
  checkSVG.append(checkPath);
  addCheckEventListener(checkSVG);

  const trashSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  setMultipleAttributes(trashSVG, { "class": "trash-icon", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 24 24" });
  const trashPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setMultipleAttributes(trashPath, { "d": "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" });
  trashSVG.append(trashPath);
  addTrashEventListener(trashSVG);

  newBookTab.append(favouriteSVG, clockSVG, checkSVG, trashSVG);
  newBook.append(newBookInfo, newBookTab);
  shelf.append(newBook);
}

const default1 = new Book("Billion Dollar Whale", "Tom Wright, Bradley Hope", 400, false);
shelf.querySelector('div.book:nth-of-type(1)').querySelector('.clock-icon').style.fill = 'rgb(239, 246, 255)';
const default2 = new Book("Models: Attract Women Through Honesty", "Mark Manson", 260, true);
shelf.querySelector('div.book:nth-of-type(2)').querySelector('.check-icon').style.fill = 'rgb(74, 222, 128)';
const default3 = new Book("Rich Dad Poor Dad", "Robert T. Kiyosaki", 336, false);
shelf.querySelector('div.book:nth-of-type(3)').querySelector('.favourite-icon').style.fill = 'rgb(253, 224, 71)';

addBookToLibrary(default1, default2, default3);