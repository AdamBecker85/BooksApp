{
    'use strict';

    const select = {
       templateOfBook: '#template-book',
       listOfBooks: '.books-list',
    }

    const templates = {
        boook: Handlebars.compile(document.querySelector(select.templateOfBook).innerHTML),
    }

    function render(){
        
        for(let book of dataSource.books){
            const generatedHTML = templates.boook(book);
            const generatedDOM = utils.createDOMFromHTML(generatedHTML);
            const bookToShow = document.querySelector(select.listOfBooks);
            bookToShow.appendChild(generatedDOM);
        }
        
    }

    render();

}