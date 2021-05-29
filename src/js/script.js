{
  ('use strict');
  // Const
  const select = {
    templatesOf: {
      menuProduct: '#template-book',
    },
    containerOf: {
      list: '.books-list',
      bookImage: '.book__image',
    },
  };
  const classNames = {
    bookLinkClass: 'book__image',
    favoriteBook: 'favorite',
  };

  // Handlebars templates
  const templates = {
    bookList: Handlebars.compile(
      document.querySelector(select.templatesOf.menuProduct).innerHTML
    ),
  };
  // Functions
 
  function renderBooks() {
    //const thisBookList = this;
    for( let book of /*thisBookList.*/dataSource.books){
      const generatedHTML = templates.bookList({
        id: book.id,
        price: book.price,
        name: book.name,
        image: book.image,
        rating: book.rating,
        details: book.details,
      });
      //console.log('source', dataSource.books);
      //console.log('HTML', generatedHTML);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      book = document.querySelector(select.containerOf.list);
      //console.log('DOM', generatedDOM);
      //console.log('Book', book) ;
      /*thisBookList.*/book.appendChild(generatedDOM);
    }
  }
  renderBooks();

  function getElements() {
    
    
  }
  getElements();

  const favoriteBooks = [];
  console.log('Array favorite books ID', favoriteBooks);

  function initActions() {
    const booksList  = document.querySelector(select.containerOf.list);
    //const singleBooks = booksList.querySelectorAll(select.containerOf.bookImage);
    //console.log('Books list', booksList);
    
    booksList.addEventListener('dblclick', function(event) {
      event.preventDefault();
      if (event.target.offsetParent.classList.contains(classNames.bookLinkClass)){
        const favoriteBookClass = event.currentTarget.classList.contains(classNames.favoriteBook);
        console.log('Book image parent', event.target.offsetParent);
        if( favoriteBookClass == false) {
          event.currentTarget.classList.add('favorite');
          console.log('dblclick', event);
          //event.getElementById
          const favoriteBookId = event.target.offsetParent.getAttribute('data-id');
          console.log('Book Id', favoriteBookId);
          favoriteBooks.push(favoriteBookId);
        }
        else if ( favoriteBookClass == true) {
          event.currentTarget.classList.remove('favorite');
          console.log('click', event);
          //event.getElementById
          const indexOfBookId = favoriteBooks.indexOf('data-id');
          const removedBookId = favoriteBooks.splice( indexOfBookId, 1);
          console.log('Removed book',removedBookId);
        }
        else {
          console.log('Something goes wrong');
        }
      }
    });
    
  }
  initActions();
  
}