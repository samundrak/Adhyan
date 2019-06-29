import React, { Context } from 'react';
import { prettySize } from 'pretty-size';
import { Table, Tag } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { booksLoaded } from '../store/actions/books';
import { loading } from '../store/actions/global';
import BooksController from '../controllers/BooksController';
import Adhyan from '../core/Adhyan';
import { AppContext } from '../providers/AppProvider';

type PropsType = {
  actions: {
    booksLoaded: (books: BookInterface[]) => null;
    loading: (status: boolean) => null;
  };
  books: {
    items: BookInterface[];
  };
};

const getColorOfStatus = status => {
  const obj = {
    processed: 'green',
    processing: 'blue',
    failed: 'red',
  };
  return obj[status];
};

// eslint-disable-next-line
const jsVoidLink = 'javascript:void(0);';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href={jsVoidLink}>{text}</a>,
  },
  {
    title: 'Size',
    dataIndex: 'file.size',
    key: 'fileSize',
    render: size => prettySize(size),
  },
  {
    title: 'URL',
    dataIndex: 'file.url',
    key: 'fileUrl',
    render: url => (
      <a href={url} target="_blank" rel="noopener noreferrer">
        Download
      </a>
    ),
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: status => (
      <span>
        <Tag color={getColorOfStatus(status)}>{status}</Tag>
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href={jsVoidLink} rel="noopener noreferrer">
          Delete
        </a>
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
    this.props.actions.loading(true);
    // @todo handle error
    const books: BookInterface[] = await this.controller.getBooks();
    this.props.actions.booksLoaded(books);
    this.props.actions.loading(false);
  }
  render() {
    return (
      <div>
        <Table columns={columns} dataSource={this.props.books.items} />
      </div>
    );
  }
}

// const
const mapStateToProps = ({ books }) => ({
  books,
});
const mapActions = dispatch => ({
  actions: bindActionCreators({ booksLoaded, loading }, dispatch),
});
export default connect(
  mapStateToProps,
  mapActions,
)(Books);
