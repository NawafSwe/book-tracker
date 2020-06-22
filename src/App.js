import React from 'react'
 import * as BooksAPI from './BooksAPI'
import './App.css';
import SearchBooks from './SearchBooks';
import {Route} from 'react-router-dom';
import BookList from './BookList';
import {Link} from 'react-router-dom';

class  BooksApp extends React.Component {
  state = {
    books:[]
  }

  // fetching the books from the Books API
  async componentDidMount(){
    await BooksAPI.getAll()
   .then( (books)=>{
      this.setState( ()=>({
       books
      }) )
    } )
  }

  addBook = (book)=>{
    this.setState((previousState)=>({
      books: [...previousState.books,book]
    }) )
  }

  render() {

    //this function for updating the shelf value of a book
  const updateShelf = (target,shelf)=>{
       BooksAPI.update(target,shelf)
        .then((updated)=>{
          this.setState({
            books: this.state.books.map(book => (book.id === target.id ? Object.assign({}, book, { shelf }) : book))
          })
      })
      }

  
    //we need to filter the books based on the shelf to pass them to the book list component also using router to navigate to each page
    //getting all books of shelf currentlyReading 
    const currentlyReadings =  {
      books: [...this.state.books.filter(book=> book.shelf === 'currentlyReading')],
      type: 'currently Reading'}

     
      
    //getting all books of shelf read
    const read = {
      books: [...this.state.books.filter(book=> book.shelf === 'read')],
      type:'read',
  }

  //getting all books of type shelf wantToRead
   const wantToRead = {
    books: [...this.state.books.filter(book=> book.shelf === 'wantToRead')],
    type:'wantToRead',
        }

    return (
      <div className="app">
        <Route 
        exact path ='/'
        render={()=>(
          <div>
            <BookList books={currentlyReadings} updateShelf={updateShelf}/> 
            <BookList books={read} updateShelf={updateShelf} /> 
            <BookList books={wantToRead} updateShelf={updateShelf} /> 

            <div className="open-search">
              <Link to='/search'>
              <button>Add a book</button>
              </Link>
            </div>
       </div>
      )}/>
     <Route
        exact path='/search'
        render={()=>(
            <SearchBooks addBook={this.addBook}/> 
          )
        
      }
        />
      </div>
    )
  }
}

export default BooksApp





