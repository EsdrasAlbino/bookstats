import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Star from "@mui/icons-material/Star";
import StarHalf from "@mui/icons-material/StarHalf";
import StarOutline from "@mui/icons-material/StarOutline";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
}

interface CardsProps {
  book: Book;
}

const Cards: React.FC<CardsProps> = ({ book }) => {
  const starRender = () => {
    const stars = [];
    const fullStars = Math.floor(book.rating || 0);
    const hasHalfStar = (book.rating || 0) % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarOutline key={`empty-${i}`} />);
    }

    return stars;
  };


  return (
    <Card style={{ width: 300 }}>
      <CardContent>
        <Typography variant="h6">{book.title}</Typography>
        {book?.author && (
          <Typography variant="subtitle1">Autor: {book.author}</Typography>
        )}
        {book?.genre && (
          <Typography variant="subtitle2">Gênero: {book.genre}</Typography>
        )}
        {starRender().map((star) => star)}
      </CardContent>
    </Card>
  );
};

export default Cards;
