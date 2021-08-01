{
  'use strict';

  const select = {
    templateOfBook: '#template-book',
    listOfBooks: '.books-list',
    bookImage: '.books-list .book__image',
    filters: '.filters',    
  };

  const templates = {
    boook: Handlebars.compile(document.querySelector(select.templateOfBook).innerHTML),
  };

  class BooksList{

    constructor() {
      this.initData();
      this.getElements();
      this.render();    
      this.initActions();
      this.determineRatingBgc();
    }

    initData(){
      this.data = dataSource.books;
    }

    getElements(){
      this.favoriteBooks = [];
      this.filters = [];
    }

    render(){
      
      for(let book of dataSource.books){
        
        const ratingBgc = this.determineRatingBgc(book.rating);
        const ratingWidth = book.rating*10;
        
        book.ratingBgc = ratingBgc;
        book.ratingWidth = ratingWidth;

        const generatedHTML = templates.boook(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        const bookToShow = document.querySelector(select.listOfBooks);
        bookToShow.appendChild(generatedDOM);      
              
      }
          
    }

    initActions(){
      
      const clickableBookImages = document.querySelectorAll(select.bookImage);
      console.log(clickableBookImages);
      
      document.querySelector(select.listOfBooks).addEventListener('dblclick', (event) => {
        event.preventDefault();
        const clickedElement = event.target.offsetParent;
        
        if(clickedElement.classList.contains('book__image')){
          
          const dataID = clickedElement.getAttribute('data-id');

          if(!this.favoriteBooks.includes(dataID)){
            clickedElement.classList.add('favorite');
            this.favoriteBooks.push(dataID);
          } else {
            clickedElement.classList.remove('favorite');
            this.favoriteBooks.splice(this.favoriteBooks.indexOf(dataID),1);
          }
          
        }
      });

      document.querySelector(select.filters).addEventListener('click', (event) => {
        const clickedElement = event.target;

        if(clickedElement.tagName=='INPUT'
          &&clickedElement.getAttribute('type')=='checkbox'
          &&clickedElement.getAttribute('name')=='filter'){
          console.log(clickedElement.value);
          if(clickedElement.checked){
            this.filters.push(clickedElement.value);
            console.log(this.filters);
          } else {
            this.filters.splice(this.filters.indexOf(clickedElement.value),1);
            console.log(this.filters);
          }
        }

        this.filterBooks();

      });
          
    }
  
    filterBooks(){
      for (let filteredBook of this.data){

        let shouldBeHidden = false;

        for (let filter of this.filters){

          if(!filteredBook.details[filter]){
            shouldBeHidden = true;
            break;
          }

        }

        const book = document.querySelector('.book__image[data-id= "'  + filteredBook.id + '"]');

        if(shouldBeHidden == true){
          book.classList.add('hidden');
        } else {
          book.classList.remove('hidden');
        }

      }
    }

    determineRatingBgc(rating){
      if (rating < 6){
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }
      if(rating > 6 && rating <= 8){
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }
      if(rating > 8 && rating <= 9){
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }
      if(rating > 9){
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }

  }
  // eslint-disable-next-line
  const app = new BooksList();

}