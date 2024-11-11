import { useEffect, useState } from "react";

interface BookDetailsProps {
  title: string;
  author: string;
  publishedDate: string;
  description: string;
}

export const BookDetails = () => {
  const [book, setBook] = useState();
  
  useEffect(() => {}, []);

  return (
    <div>
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <p>
        <strong>Published Date:</strong> {book.publishedDate}
      </p>
      <p>{book.description}</p>
    </div>
  );
};
