import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBook } from "../services/books/getBook";

interface BookDetailsProps {
  title: string;
  author: string;
  publishedDate: string;
  description: string;
}

export const BookDetails = () => {
  const [book, setBook] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchdata = async () => {
      const data = await fetchBook(id as string);
      //setBook(data?.items);
      console.log("data", data);
    };
  }, []);

  return (
    <div>
  {/*     <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <p>
        <strong>Published Date:</strong> {book.publishedDate}
      </p>
      <p>{book.description}</p> */}
    </div>
  );
};
