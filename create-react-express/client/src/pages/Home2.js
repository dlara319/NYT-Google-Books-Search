import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Form from "../components/Form";

import API from "../utils/API";

class Home2 extends Component {
    state= {
        books: [],
        q: "",
    }

    componentDidMount() {
        this.getBooks("mystery");
      }

      handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };
      
      handleFormSubmit = event => {
        event.preventDefault();
        this.getBooks(this.state.q);
        this.setState({q: ""});
      };

      getBooks = (q) => {
        API.getBooks(q).then(res =>
            this.setState({ books: res.data.items})) .catch( err =>
            console.log(err));
      }; 

      handleBookSave = (book) => {
        API.saveBook({
          googleId: book.id,
          title: book.volumeInfo.title,
          subtitle: book.volumeInfo.subtitle,
          link: book.volumeInfo.infoLink,
          authors: book.volumeInfo.authors,
          description: book.volumeInfo.description,
          image: book.volumeInfo.imageLinks.thumbnail
        }).then(alert("Book Saved")).catch(err => console.log(err));
      };

render () {
    return (
        <div>

            <div className="container">
             <Jumbotron>
              <h1 className="text-center">
                <strong>Google Books Search</strong>
              </h1>
              <h2 className="text-center">Search and Save Your Favorite Books.</h2>
            </Jumbotron>
            </div>

<div className ="container">
            <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                value={this.state.q}
              />
</div>

<br />
<br />
<br />


<div className = "container">
  <ul className="list-group">
{this.state.books.map(book =>
  <li className="list-group-item" key={book.id}>
  <div className="row">
    <div className="col-8">
      <h1>{book.volumeInfo.title}</h1>
      <p>Authors: {book.volumeInfo.authors ? book.volumeInfo.authors.join(" , ") : " "}</p>
      <p>Description: {book.volumeInfo.description ? book.volumeInfo.description : " No Description Available"}</p>
    </div>
    <div className="col-4">
      <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "./images/NoCoverArt_Book_3.png"} alt="bookimage" />
      <p></p>
      <p>
        <a className="btn btn-info" href={book.volumeInfo.infoLink} >Get Book</a>    

        <button className="btn btn-success" onClick={() => this.handleBookSave(book)}  >Save For Later</button>
      </p>
    </div>
  </div>
</li>
)}
</ul>
 	</div>
        </div>
    )
}
}

export default Home2;