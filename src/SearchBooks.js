import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import * as BooksAPI from './BooksAPI'

export default class SearchBooks extends Component {
    state = {
        query: '',
        searchedBooks:[],
     
    }
    //checking the props 
    static propTypes = {
      addBook: propTypes.func.isRequired,
     }
    

searchHandler =  (query)=>{
    this.setState(()=>({
        query: query,
       
        
    }))}

  handleUpdateQuery(query) {
      BooksAPI.search(query).then(searchedBooks => searchedBooks ? this.setState({ searchedBooks }) : []);
      this.setState({ query });
      }

  addNewBookHandler = (book,event)=>{
    event.preventDefault();
    this.props.addBook(book);
  }

   
    render() {
     const {query} = this.state;
     const {searchedBooks} = this.state;


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
              searchedBooks.length > 0 ? 
              
              ( <ol className="books-grid">
                 {searchedBooks.map((book) => (
                
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
                        <select value={book.shelf} onChange={(event)=>this.addNewBookHandler(book,event)}>
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

