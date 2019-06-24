import { BOOKS_LOADED } from '../types';

export function booksLoaded(books) {
  return {
    type: BOOKS_LOADED,
    data: books,
  };
}
