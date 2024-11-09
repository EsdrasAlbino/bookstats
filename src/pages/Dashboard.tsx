import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DashboardProps {
  genreData: { genre: string; reviews: number }[];
  reviewTrendData: { month: string; averageReview: number }[];
}

export const Dashboard = ({ genreData, reviewTrendData }: DashboardProps) => {
  return (
    <div
      style={{ display: "flex", alignContent: "center", alignItems: "center" }}
    >
      <div>
        <p>Distribuição de Avaliações por Gênero de Livro</p>
        <BarChart
          width={600}
          height={300}
          data={genreData}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="genre" tick={false}/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="reviews" fill="#8884d8" />
        </BarChart>
      </div>

      <div>
        <p>Evolução Média de Avaliações ao Longo do Tempo</p>
        <LineChart
          width={600}
          height={300}
          data={reviewTrendData}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 1, 2, 3, 4, 5]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="averageReview" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
};
