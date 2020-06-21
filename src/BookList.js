import React from "react";
import propTypes from 'prop-types';

export default function BookList(props) {
  const { books } = props.books;
  const { type } = props.books;
  
  const shelfHandler =  (book,event)=>{
    event.preventDefault()
    props.updateShelf(book,event.target.value);

  }
  return (
    <div>
      <div className="list-books-title">
        <h1>
          {
          type
          }
        </h1>
      </div>
      <div className="list-books-content">
        <div className="bookshelf">
          <h2 className="bookshelf-title">{type}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage:
                          `url(${book.imageLinks.smallThumbnail? book.imageLinks.smallThumbnail :  book.imageLinks.thumbnail })`,
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={(event)=>shelfHandler(book,event)}>
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
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

//checking the props 
BookList.propTypes = {
  books: propTypes.object.isRequired,
  updateShelf: propTypes.func.isRequired,

 }