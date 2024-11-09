// src/pages/BookList.js
import { CircularProgress, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { BookClient } from "../services/books/books";
import { fetchBooks } from "../services/books/getBooks";
import Cards from "../components/cards/Cards";
//import { Link } from "react-router-dom";
import "../styles/Booklist.css";

const BookList = () => {
  const [books, setBooks] = useState<BookClient[]>();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      const data = await fetchBooks(query);
      const bookList = data.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.join(", "),
        genre: item.volumeInfo.categories?.[0],
        rating: item.volumeInfo.averageRating,
      }));
      setBooks(bookList);
      setLoading(false);
    };
    getBooks();
  }, [query]);

  return (
    <Container
      maxWidth="md"
      className="container"
    >
      <h1>Lista de Livros</h1>
      <TextField
        label="Buscar Livro"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <CircularProgress />}

      {!loading && (
        <div className="book-list">
          {books?.map((book) => (
            <Cards key={book.id} book={book} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default BookList;
