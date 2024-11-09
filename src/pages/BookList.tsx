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
import { Dashboard } from "./Dashboard";
//import { Link } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState<BookClient[]>();
  const [query, setQuery] = useState("");
  const [genreData, setGenreData] = useState([]);
  const [reviewTrendData, setReviewTrendData] = useState([]);
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
      const genreCount: { [key: string]: number } = {};
      const reviewTrend: { [key: string]: number[] } = {};

      data.forEach((book) => {
        const genre = book.volumeInfo.categories
          ? book.volumeInfo.categories[0]
          : "Unknown";
        const averageRating = book.volumeInfo.averageRating || 0;
        const publishedDate = book.volumeInfo.publishedDate
          ? new Date(book.volumeInfo.publishedDate).getMonth()
          : 0;

        if (genreCount[genre]) {
          genreCount[genre]++;
        } else {
          genreCount[genre] = 1;
        }

        if (reviewTrend[publishedDate]) {
          reviewTrend[publishedDate].push(averageRating);
        } else {
          reviewTrend[publishedDate] = [averageRating];
        }
      });

      const genreDataArray = Object.keys(genreCount).map((genre) => ({
        genre,
        reviews: genreCount[genre],
      }));

      const reviewTrendDataArray = Object.keys(reviewTrend).map((month) => ({
        month: new Date(0, parseInt(month)).toLocaleString("default", {
          month: "short",
        }),
        averageReview:
          reviewTrend[month].reduce((a, b) => a + b, 0) /
          reviewTrend[month].length,
      }));

      setGenreData(genreDataArray);
      setReviewTrendData(reviewTrendDataArray);

      setBooks(bookList);
      setLoading(false);
    };
    getBooks();
  }, [query]);

  return (
    <Container
      maxWidth="md"
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

      {!loading && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1rem",
            width: "100%",
          }}
        >
          <Dashboard genreData={genreData} reviewTrendData={reviewTrendData}/>
          {books?.map((book) => (
            <Card
              key={book.id}
              style={{
                width: "100%",
                maxWidth: "300px", // Largura máxima para manter os cartões compactos
                margin: "1rem",
                boxSizing: "border-box",
              }}
            >
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
