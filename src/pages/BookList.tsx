// src/pages/BookList.js
import {
  CircularProgress,
  Container,
  TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { MenuBarLocal, menuOptions } from "../components/menu/MenuLocal";
import { BookListTemplate } from "../components/templates/bookList/BookListTemplate";
import { DashboardTemplate } from "../components/templates/dashboard/DashboardTemplate";
import { BookClient, Volume } from "../services/books/books";
import { fetchBooks } from "../services/books/getBooks";
import "../styles/Booklist.css";

interface GenreData {
  genre: string;
  reviews: number;
}

interface ReviewTrendData {
  month: string;
  averageReview: number;
}

const BookList = () => {
  const [books, setBooks] = useState<BookClient[]>();
  const [query, setQuery] = useState("");
  const [genreData, setGenreData] = useState<GenreData[]>([]);
  const [reviewTrendData, setReviewTrendData] = useState<ReviewTrendData[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"list" | "dashboard">("list");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    getBooks();
  }, [query, page]);

  const getBooks = async () => {
    setLoading(true);
    const bookRequest = await fetchBooks(
      query,
      (page - 1) * itemsPerPage,
      itemsPerPage
    );
    if (!bookRequest) return;
    const bookList = bookRequest.items.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors?.join(", "),
      genre: item.volumeInfo.categories?.[0],
      rating: item.volumeInfo.averageRating,
    }));

    const { genreDataArray, reviewTrend } = genreAccount(bookRequest.items);
    const reviewTrendDataArray = reviewTrending(reviewTrend);

    setGenreData(genreDataArray);
    setReviewTrendData(reviewTrendDataArray);
    setBooks(bookList);
    setTotalPages(Math.ceil(bookRequest.totalItems / itemsPerPage));

    setLoading(false);
  };

  const genreAccount = (books: Volume[]) => {
    const genreCount: { [key: string]: number } = {};
    const reviewTrend: { [key: string]: number[] } = {};
    books.forEach((book) => {
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

    return { genreDataArray, reviewTrend };
  };

  const reviewTrending = (reviewTrend: { [key: string]: number[] }) => {
    const reviewTrendDataArray = Object.keys(reviewTrend).map((month) => ({
      month: new Date(0, parseInt(month)).toLocaleString("default", {
        month: "short",
      }),
      averageReview:
        reviewTrend[month].reduce((a, b) => a + b, 0) /
        reviewTrend[month].length,
    }));

    return reviewTrendDataArray;
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log("value", value);
    setPage(value);
  };

  const menuOptions: menuOptions[] = [
    {
      onPress: () => setView("list"),
      backgroundColor: view === "list" ? "#070932" : "",
      text: "Lista de Livros",
    },
    {
      onPress: () => setView("dashboard"),
      backgroundColor: view === "dashboard" ? "#070932" : "",
      text: "Dashboard de Métricas",
    },
  ];

  return (
    <Container maxWidth="md" className="container">
      <h1>Lista de Livros</h1>
      <TextField
        label="Buscar Livro"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <MenuBarLocal menuOptions={menuOptions} />

      {loading && <CircularProgress />}

      {!loading && view === "list" && (
        <BookListTemplate
          books={books}
          totalPages={totalPages}
          page={page}
          handlePageChange={handlePageChange}
        />
      )}

      {!loading && view === "dashboard" && (
        <DashboardTemplate
          genreData={genreData}
          reviewTrendData={reviewTrendData}
        />
      )}
    </Container>
  );
};

export default BookList;
