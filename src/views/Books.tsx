import React, { Context } from 'react';
import { prettySize } from 'pretty-size';
import { Table, Divider, Tag } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { booksLoaded } from '../store/actions/books'
import BooksController from '../controllers/BooksController';
import Adhyan from '../core/Adhyan';
import { AppContext } from '../providers/AppProvider';
import { BookInterface } from '../interfaces';

type PropsType = {
    actions: {
        booksLoaded: (books: BookInterface[]) => null
    },
    books: {
        items: BookInterface[]
    }
}
const getColorOfStatus = status => {
    const obj = {
        processed: 'green',
        processing: 'blue',
        failed: 'red'
    }
    return obj[status]
}
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
    },
    {
        title: 'Size',
        dataIndex: 'file.size',
        key: 'fileSize',
        render: size => prettySize(size)
    },
    {
        title: 'URL',
        dataIndex: 'file.url',
        key: 'fileUrl',
        render: url => <a href={url} target="_blank">Download</a>
    },
    {

        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: status => (
            <span>
                <Tag color={getColorOfStatus(status)} >
                    {status}
                </Tag>
            </span>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
                <a href="javascript:;">Delete</a>
            </span>
        ),
    },
];

class Books extends React.Component<PropsType> {
    static contextType: Context<Adhyan> = AppContext;
    controller: BooksController;

    constructor(props: PropsType, context: Context<Adhyan>) {
        super(props, context);
        this.controller = this.context.createController('books');

    }
    async componentWillMount() {

        // @todo handle error
        const books: BookInterface[] = await this.controller.getBooks();
        this.props.actions.booksLoaded(books);

    }
    render() {
        return <div>
            <Table columns={columns} dataSource={this.props.books.items} />
        </div>
    }
}

// const 
const mapStateToProps = ({ books }) => ({
    books
});
const mapActions = dispatch => ({
    actions: bindActionCreators({ booksLoaded }, dispatch)
})
export default connect(mapStateToProps, mapActions)(Books);