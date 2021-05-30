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
  class BooksList {
    constructor(){
      const thisBooksList = this;
      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.renderBooks();
      this.initActions();
      //thisBooksList.determineRatingBgc();
    }
    initData() {
      this.data = dataSource.books;
    }
  
    getElements() {
      const thisBooksList = this;
      //thisBooksList.dom = {};
      //thisBooksList.dom.wrapper = element;
      thisBooksList.list = document.querySelector(select.containerOf.list);
      console.log('DOM object', thisBooksList.list);
      thisBooksList.bookFilters  = document.querySelector(select.containerOf.filters);
    
      thisBooksList.favoriteBooks = [];
      console.log('Array favorite books ID', thisBooksList.favoriteBooks);
      thisBooksList.filtersArray = [];
      console.log('Filter array',thisBooksList.filtersArray);
    }
    // Render books menu
    renderBooks() {
      const thisBooksList = this;
      for( let book of thisBooksList.data){
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
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
        console.log('source', thisBooksList.data);
        //console.log('HTML', generatedHTML);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        //book = document.querySelector(select.containerOf.list);
        //console.log('DOM', generatedDOM);
        //console.log('Book', book) ;
        thisBooksList.list.appendChild(generatedDOM);
      }
    }
  
    initActions() {
    //Favorite books
      const thisBooksList = this;
      thisBooksList.list.addEventListener('dblclick', function(event) {
        event.preventDefault();
        thisBooksList.clickedBook = event.target.offsetParent;
        thisBooksList.favoriteBookClass = thisBooksList.clickedBook.classList.contains(classNames.favoriteBook);
        if (thisBooksList.clickedBook.classList.contains(classNames.bookLinkClass)){
          console.log('Book image link', thisBooksList.clickedBook);
          console.log('Contains favorite class?', thisBooksList.favoriteBookClass);
          if( thisBooksList.favoriteBookClass == false) {
            thisBooksList.clickedBook.classList.add('favorite');
            console.log('dblclick', event);
            //event.getElementById
            thisBooksList.favoriteBookId = thisBooksList.clickedBook.getAttribute('data-id');
            console.log('Added book Id', thisBooksList.favoriteBookId);
            thisBooksList.favoriteBooks.push(thisBooksList.favoriteBookId);
          }
          else if ( thisBooksList.favoriteBookClass == true) {
            thisBooksList.clickedBook.classList.remove('favorite');
            //console.log('click', event);
            //event.getElementById
            thisBooksList.indexOfBookId =  thisBooksList.favoriteBooks.indexOf('data-id');
            thisBooksList.removedBookId = thisBooksList.favoriteBooks.splice(thisBooksList.indexOfBookId, 1);
            console.log('Removed book id',thisBooksList.indexOfBookId, thisBooksList.removedBookId);
          }
          else {
            console.log('Something goes wrong');
          }
        }
      });
      // Books filters
          
      thisBooksList.bookFilters.addEventListener('change', function(event) {
        event.preventDefault;
        if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
        //console.log('target marked filter is:', event.target);
        //console.log('tagName marked filter is:', event.target.tagName);
        //console.log('Type of marked filter is:', event.target.type);
        //console.log('Name of marked filter is:', event.target.name);
        //console.log('Marked filter is:', event.target.checked);
          if(event.target.checked == true) {
            thisBooksList.filtersArray.push(event.target.value);
          //console.log('Marked filter is value:', event.target.value);
          }
          else if (event.target.checked == false) {
            thisBooksList.filterId = thisBooksList.filtersArray.indexOf(event.target.value);
            //console.log('Filter Id:', filterId);
            thisBooksList.filterIdremovedFilter = thisBooksList.filtersArray.splice(thisBooksList.filterId, 1);
            console.log('Filter removed:', thisBooksList.filterIdremovedFilter);
          }
        }
        thisBooksList.filterBooks();
      });
    }
    filterBooks() {
      //let souldBeHidden
      //false; do przemyślenia
      const thisBooksList = this;
      for( let book of thisBooksList.data){
        console.log(book);
        let souldBeHidden = false;
        thisBooksList.bookToFilter = document.querySelector('.book__image[data-id="'+ book.id +'"]');
        console.log('bookTofilter', thisBooksList.bookToFilter);
        for(let filter of thisBooksList.filtersArray) {
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
          thisBooksList.bookToFilter.classList.add(classNames.hiddenClass);
        }
        else if (souldBeHidden == false){
          thisBooksList.bookToFilter.classList.remove(classNames.hiddenClass);
        }
      }
    }
    
    // Books rating
    determineRatingBgc(rating){

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
  
  }
  const app = new BooksList();
  console.log('app', app);
}