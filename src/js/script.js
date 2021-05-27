{
  ('use strict');
  // Const
  const select = {
    templatesOf: {
      menuProduct: '#template-book',
    },
    containerOf: {
      menu: '.books-list',
      favorite: '.book__image',
    },
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
      book = document.querySelector(select.containerOf.menu);
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
    const booksList  = document.querySelector(select.containerOf.menu);
    const selectedBooks = booksList.querySelectorAll(select.containerOf.favorite);
    //console.log('Books list', booksList);
    for(let book of selectedBooks){
      console.log(book);
      // There must be event dblclick !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      book.addEventListener('click', function(event) {
        event.preventDefault();
        const favoriteBookClass = event.currentTarget.classList.contains('favorite');
        console.log('Book class', favoriteBookClass);
        if( favoriteBookClass == false) {
          event.currentTarget.classList.add('favorite');
          console.log('click', event);
          //event.getElementById
          const favoriteBookId = book.getAttribute('data-id');
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
        
      });
    }
  }
  initActions();
  
}