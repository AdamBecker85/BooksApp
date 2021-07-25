{
  'use strict';

  const select = {
    templateOfBook: '#template-book',
    listOfBooks: '.books-list',
    bookImage: '.books-list .book__image',
    
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
    
    const clickableBookImages = document.querySelectorAll(select.bookImage);
    console.log(clickableBookImages);
    
    for(let imagee of clickableBookImages){

      imagee.addEventListener('dblclick', function(event){
        event.preventDefault();
        imagee.classList.add('favorite');
        const dataID = imagee.getAttribute('data-id');
        favoriteBooks.push(dataID);
      });
    }
       
  }

  initActions();  

}