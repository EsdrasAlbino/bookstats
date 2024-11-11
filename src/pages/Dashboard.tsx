import { DashboardTemplate } from "../components/templates/dashboard/DashboardTemplate";
import { Volume } from "../services/books/books";

interface DashboardProps {
  genreData: { genre: string; reviews: number }[];
  reviewTrendData: { month: string; averageReview: number }[];
}

export const Dashboard = ({ genreData, reviewTrendData }: DashboardProps) => {

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

  return (
    <DashboardTemplate
      genreData={genreData}
      reviewTrendData={reviewTrendData}
      ebookConversionData={[]}
    />
  );
};
