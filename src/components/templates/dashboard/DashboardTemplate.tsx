import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "../../../styles/DashboardTemplate.css";

interface DashboardProps {
  genreData: { genre: string; reviews: number }[];
  reviewTrendData: { month: string; averageReview: number }[];
  ebookConversionData: { name: string; value: number }[];
}

export const DashboardTemplate = ({
  genreData,
  reviewTrendData,
  ebookConversionData
}: DashboardProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, [genreData, reviewTrendData]);

  const COLORS = ['#8884d8', '#82ca9d'];

  return (
    <div className="dashboard-container">
      {!show && <Typography variant="h6">Carregando métricas...</Typography>}
      {show && (
        <>
          <div className="chart-container">
            <Typography variant="caption" className="chart-title">
              Distribuição de Avaliações por Gênero de Livro
            </Typography>
            <ResponsiveContainer>
              <BarChart
                data={genreData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="genre" tick={false} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="reviews" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <Typography variant="caption" className="chart-title">
              Evolução Média de Avaliações ao Longo do Tempo
            </Typography>
            <ResponsiveContainer>
              <LineChart
                data={reviewTrendData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 1, 2, 3, 4, 5]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="averageReview"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <Typography variant="caption" className="chart-title">
              Taxa de Conversão de Livros para eBooks
            </Typography>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={ebookConversionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ebookConversionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};
