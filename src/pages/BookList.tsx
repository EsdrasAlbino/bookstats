// src/pages/BookList.js
import {
  Card,
  CardContent,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { BookClient } from "../services/books/books";
import { fetchBooks } from "../services/books/getBooks";
//import { Link } from "react-router-dom";

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
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
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

      {(!loading && !query) && <Typography>Insira um termo de busca</Typography>}

      {!loading && (
        <div>
          {books?.map((book) => (
            <Card key={book.id} style={{ margin: "1rem" }}>
              {/* <Link to={`/books/${book.id}`}> */}
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="subtitle1">
                  Autor: {book.author}
                </Typography>
                <Typography variant="body2">Gênero: {book.genre}</Typography>
                <Typography variant="body2">
                  Avaliação: {book.rating}
                </Typography>
              </CardContent>
              {/* </Link> */}
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default BookList;
