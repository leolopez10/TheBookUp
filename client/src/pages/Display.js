import React, { Component } from "react";
// import BookSearch from "../components/BookSearch";
import BookDisplayList from "../components/BookDisplayList";
import API from "../utils/API";
// import BookDisplay from "../components/BookDisplay";

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        API.display()
            .then(
                response => {
                    const books = [];
                    console.log(response.data.length);
                    for (var i = 0; i < response.data.length; i++) {
                        console.log(i);
                        let bookObj = {
                            title: response.data[i].title,
                            author: response.data[i].author,
                            image: response.data[i].image,
                            publishedDate: response.data[i].publishedDate,
                            ISBN: response.data[i].ISBN,
                            email: response.data[i].email,
                            price: response.data[i].price
                        }
                        books.push(bookObj);
                    }
                    this.setState({ books: books });
                    console.log(this.state.books);
                }
            )
    }




    render() {
        return (
            <div>
                <BookDisplayList books={this.state.books} />
            </div>
        );
    }
}

export default Display;
