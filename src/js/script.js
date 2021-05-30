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
      filters: '.filters'
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

  // Render books menu
  function renderBooks() {
    //const thisBookList = this;
    for( let book of /*thisBookList.*/dataSource.books){
      const generatedHTML = templates.bookList({
        id: book.id,
        price: book.price,
        name: book.name,
        image: book.image,
        rating: book.rating,
        details: {
          adults: book.details.adults,
          nonFiction: book.details.adults,
        }
      });
      console.log('source', dataSource.books);
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
  const filtersArray = [];
  console.log('Filter array',filtersArray);

  function initActions() {
    //Favorite books
    const booksList  = document.querySelector(select.containerOf.list);
    booksList.addEventListener('dblclick', function(event) {
      event.preventDefault();
      const clickedBook = event.target.offsetParent;
      const favoriteBookClass = clickedBook.classList.contains(classNames.favoriteBook);
      if (clickedBook.classList.contains(classNames.bookLinkClass)){
        console.log('Book image link', clickedBook);
        console.log('Contains favorite class?', favoriteBookClass);
        if( favoriteBookClass == false) {
          clickedBook.classList.add('favorite');
          console.log('dblclick', event);
          //event.getElementById
          const favoriteBookId = event.target.offsetParent.getAttribute('data-id');
          console.log('Added book Id', favoriteBookId);
          favoriteBooks.push(favoriteBookId);
        }
        else if ( favoriteBookClass == true) {
          clickedBook.classList.remove('favorite');
          console.log('click', event);
          //event.getElementById
          const indexOfBookId = favoriteBooks.indexOf('data-id');
          const removedBookId = favoriteBooks.splice( indexOfBookId, 1);
          console.log('Removed book id',removedBookId);
        }
        else {
          console.log('Something goes wrong');
        }
      }
    });
    // Books filters
    const bookFilters  = document.querySelector(select.containerOf.filters);
    console.log('Filters', bookFilters);
    bookFilters.addEventListener('change', function(event) {
      event.preventDefault;
      console.log('Marked filter is:', event.target.value);

    });
  }
  initActions();

  // Filtersm function
  

  
}