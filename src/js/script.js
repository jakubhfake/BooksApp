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

  //const favoriteBooks = [];
  function initActions() {
    const booksList  = document.querySelector(select.containerOf.menu);
    const selectedBooks = booksList.querySelectorAll(select.containerOf.favorite);
    //console.log('Books list', booksList);
    for(let book of selectedBooks){
      console.log(book);
      book.addEventListener('dblclick', function(event) {
        event.preventDefault();
        //event.stopPropagation();
        //event.currentTarget.classList.toggle('favorite');
        console.log('dblclick', event);
        
      });
    }
  }
  initActions();
}