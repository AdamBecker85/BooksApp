{
  'use strict';

  const select = {
    templateOfBook: '#template-book',
    listOfBooks: '.books-list',
    bookImage: '.book__image',
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
    }
        
  }

  render();

  const favoriteBooks = [];

  function initActions(){
    debugger;
    const clickableBookImages = document.querySelector(select.bookImage);
    
    for(let imagee in clickableBookImages){

      imagee.addEventListener('dblclick', function(event){
        event.preventDefault();
        imagee.classList.add('favorite');
        const dataID = imagee.getAttribute('data-id');
        favoriteBooks.push(dataID);
      });
    }
       
  }
  
  

}