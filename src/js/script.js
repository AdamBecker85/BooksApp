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

  function render(){
    
    for(let book of dataSource.books){
      const generatedHTML = templates.boook(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const bookToShow = document.querySelector(select.listOfBooks);
      bookToShow.appendChild(generatedDOM);
      
      const ratingBgc = determineRatingBgc(book.rating);
      console.log(ratingBgc);

      const ratingWidth = book.rating*10;
      console.log(ratingWidth);

     
    }
        
  }

  render();

  const favoriteBooks = [];
  const filters = [];

  function initActions(){
    
    const clickableBookImages = document.querySelectorAll(select.bookImage);
    console.log(clickableBookImages);
    
    document.querySelector(select.listOfBooks).addEventListener('dblclick', function(event){
      event.preventDefault();
      const clickedElement = event.target.offsetParent;
      
      if(clickedElement.classList.contains('book__image')){
        
        const dataID = clickedElement.getAttribute('data-id');

        if(!favoriteBooks.includes(dataID)){
          clickedElement.classList.add('favorite');
          favoriteBooks.push(dataID);
        } else {
          clickedElement.classList.remove('favorite');
          favoriteBooks.splice(favoriteBooks.indexOf(dataID),1);
        }
        
      }
    });

    document.querySelector(select.filters).addEventListener('click', function(event){
      const clickedElement = event.target;

      if(clickedElement.tagName=='INPUT'
        &&clickedElement.getAttribute('type')=='checkbox'
        &&clickedElement.getAttribute('name')=='filter'){
        console.log(clickedElement.value);
        if(clickedElement.checked){
          filters.push(clickedElement.value);
          console.log(filters);
        } else {
          filters.splice(filters.indexOf(clickedElement.value),1);
          console.log(filters);
        }
      }

      filterBooks();

    });
        
  }
  
  initActions(); 
  
  function filterBooks(){
    for (let filteredBook of dataSource.books){

      let shouldBeHidden = false;

      for (let filter of filters){

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

  function determineRatingBgc(rating){
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