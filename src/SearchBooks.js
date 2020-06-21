import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import * as BooksAPI from './BooksAPI'

export default class SearchBooks extends Component {
    state = {
        query: '',
    }
    //checking the props 
    static propTypes = {
      books: propTypes.array.isRequired,
      updateShelf: propTypes.func.isRequired,
     }
 
searchHandler = (query)=>{
    this.setState(()=>({
        query: query.trim(),
    }))
  }
   shelfHandler =  (book,event)=>{
    event.preventDefault()
    this.props.updateShelf(book,event.target.value);

  }

    render() {
        const {query} = this.state;
        const {books} = this.props;
       

        let currentBooks = query === '' ? '' : 
        books.filter(book => (book.title.toLowerCase().includes( query.toLocaleLowerCase() )
        ));

        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link 
              className="close-search" 
              to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <input value={query} onChange={(event)=>this.searchHandler(event.target.value)} type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              {
              //checking if there are books if not null 
              currentBooks.length>0? 

              ( <ol className="books-grid">
                 {currentBooks.map((book) => (
                
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage:`url(${book.imageLinks.smallThumbnail? book.imageLinks.smallThumbnail :  book.imageLinks.thumbnail })`,
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={(event)=>this.shelfHandler(book,event)}>
                          <option key={1} value="move" disabled>
                            Move to...
                          </option>
                          <option key={2} value="currentlyReading">
                            Currently Reading
                          </option>
                          <option key={3} value="wantToRead">
                            Want to Read
                          </option>
                          <option key={4} value="read">
                            Read
                          </option>
                          <option key={5} value="none">
                            None
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              ))}
              </ol>)
              
              : null}
             
            </div>
          </div>
        )
        
    }
}

