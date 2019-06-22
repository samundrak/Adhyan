import React, { Context } from 'react';
import { firestore } from '../firebase';
import Book from '../models/Book';
import BooksController from '../controllers/BooksController';
import Adhyan from '../core/Adhyan';
import { AppContext } from '../providers/AppProvider';

type PropsType = {}
class Books extends React.Component<PropsType> {
    static contextType: Context<Adhyan> = AppContext;
    controller: BooksController;

    constructor(props: PropsType, context: Context<Adhyan>) {
        super(props, context);
        this.controller = this.context.createController('books');

    }
    async componentWillMount() {
        this.controller.getBooks().then(d => {
            console.log(d)
        })
        console.log(this.controller)
        // const books = new Book(firestore)
        // console.log(await books.all())
    }
    render() {
        return <div>Books</div>
    }
}

// const 
export default Books;