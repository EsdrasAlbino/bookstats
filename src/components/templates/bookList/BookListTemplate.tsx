import { Link } from "react-router-dom";
import Cards from "../../cards/Cards";
import { Box, Pagination } from "@mui/material";
import { BookClient } from "../../../services/books/books";

interface BookListTemplateProps {
  books: BookClient[] | undefined;
  totalPages: number;
  page: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export const BookListTemplate = ({
  books,
  totalPages,
  page,
  handlePageChange,
}: BookListTemplateProps) => {
  return (
    <>
      <div className="book-list">
        {books?.map((book) => (
          <Link to={`/book/${book.id}`} style={{ textDecoration: "none" }}>
            <Cards key={book.id} book={book} />
          </Link>
        ))}
      </div>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
};
