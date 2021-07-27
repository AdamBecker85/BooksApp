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
        
  }

  initActions();  

}