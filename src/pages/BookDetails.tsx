import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBook } from "../services/books/getBook";
import { Volume } from "../services/books/books";
import { CircularProgress } from "@mui/material";

export const BookDetails = () => {
  const [book, setBook] = useState<Volume>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    setLoading(true);
    const data = await fetchBook(id as string);
    console.log("data", data);

    setBook(data);
    setLoading(false);
  };

  return (
    <div>
      {loading && <CircularProgress />}
      {!loading && (
        <>
          <h1>{book?.volumeInfo.title}</h1>
          <h2>{book?.volumeInfo.authors.join(", ")}</h2>
          <p>
            <strong>Published Date:</strong> {book?.volumeInfo.publishedDate}
          </p>
          {book?.volumeInfo.description}
        </>
      )}
    </div>
  );
};
