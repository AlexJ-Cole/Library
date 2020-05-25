let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function openForm() {
  document.getElementById('form').style.display = "block";
}

function closeForm() {
  document.getElementById('form').style.display = "none";
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  render();
}

function submitForm() {
    let title = document.getElementById('bTitle');
    let author = document.getElementById('bAuthor');
    let pages = document.getElementById('bPages');
    let read = getRadioValue();

    addBookToLibrary(title.value, author.value, pages.value, read);
    title.value = "";
    author.value = "";
    pages.value = "";
}

function getRadioValue() {
    let btns = document.getElementsByName('read');

    if (btns[0].checked) {
        return 'Yeah';
    } else {
        return 'Not yet';
    }
}

function render() {
  table = document.querySelector('#table');

  while (table.rows.length > 1) {
      table.deleteRow(1);
  }

  for (i = 0; i < myLibrary.length; i++) {
    let booky = myLibrary[i];
    let delBtn = document.createElement('input');
    delBtn.type = 'image';
    delBtn.id = 'removeBtn';
    delBtn.src = './images/delete.png';
    delBtn.addEventListener('click', removeRow);
    let row = table.insertRow();
    row.id = i;
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    cell1.textContent = booky.title;
    cell2.textContent = booky.author;
    cell3.textContent = booky.pages;
    cell4.textContent = booky.read;
    cell5.appendChild(delBtn);


    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);
    table.appendChild(row);
  }
}

function removeRow() {
  let table = document.querySelector('#table');
  let td = event.target.parentNode;
  let tr = td.parentNode;
  let row = tr.rowIndex;
  let title = table.rows[row].cells[0].textContent;
  removeFromArray(title);
  tr.parentNode.removeChild(tr);
}

function removeFromArray(title) {
    for (i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title == title) {
            myLibrary.splice(i, 1);
            break;
        }
    }
}

let button = document.querySelector('#openTheForm');
button.addEventListener('click', () => openForm());

let submitBook = document.querySelector('#submitBook');
submitBook.addEventListener('click', submitForm);