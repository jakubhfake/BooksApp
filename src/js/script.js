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
    hiddenClass: 'hidden',
  };

  // Handlebars templates
  const templates = {
    bookList: Handlebars.compile(
      document.querySelector(select.templatesOf.menuProduct).innerHTML
    ),
  };

  // Render books menu
  function renderBooks() {
    for( let book of dataSource.books){
      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;
      const generatedHTML = templates.bookList({
        id: book.id,
        price: book.price,
        name: book.name,
        image: book.image,
        rating: book.rating,
        details: {
          adults: book.details.adults,
          nonFiction: book.details.adults,
        },
        ratingBgc,
        ratingWidth,
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
    
    bookFilters.addEventListener('change', function(event) {
      event.preventDefault;
      if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
        //console.log('target marked filter is:', event.target);
        //console.log('tagName marked filter is:', event.target.tagName);
        //console.log('Type of marked filter is:', event.target.type);
        //console.log('Name of marked filter is:', event.target.name);
        //console.log('Marked filter is:', event.target.checked);
        if(event.target.checked == true) {
          filtersArray.push(event.target.value);
          //console.log('Marked filter is value:', event.target.value);
        }
        else if (event.target.checked == false) {
          const filterId = filtersArray.indexOf(event.target.value);
          //console.log('Filter Id:', filterId);
          const removedFilter = filtersArray.splice(filterId, 1);
          console.log('Filter removed:', removedFilter);
        }
      }
      filterBooks();
    });
    
    function filterBooks() {
      //let souldBeHidden
      //false; do przemyślenia
      for( let book of dataSource.books){
        console.log(book);
        let souldBeHidden = false;
        const bookToFilter = document.querySelector('.book__image[data-id="'+ book.id +'"]');
        console.log('bookTofilter', bookToFilter);
        for(let filter of filtersArray) {
          console.log('xxx:', filter);
          //if(book.details[filter] == true) 
          if(!book.details[filter])
          {
            souldBeHidden = true;
            console.log('Nie Book filter:',!book.details[filter]);
            console.log('Book to hidde:', souldBeHidden);
            break;
          }
        }
        if(souldBeHidden == true) {
          bookToFilter.classList.add(classNames.hiddenClass);
        }
        else if (souldBeHidden == false){
          bookToFilter.classList.remove(classNames.hiddenClass);
        }
      }
    }
  }
  initActions();

  // Books rating
  function determineRatingBgc(rating){

    let background = '';
    if (rating < 6){
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    }
    else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } 
    else if(rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }
    else if(rating > 9){
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return background;
  }
  determineRatingBgc();

  
}