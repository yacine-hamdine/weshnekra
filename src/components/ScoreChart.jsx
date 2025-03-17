import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ScoreChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="resultGate" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="score1" fill="#8884d8" name="Raw Score" />
        <Bar dataKey="score2" fill="#82ca9d" name="Normalized Score" />
        <Bar dataKey="score3" fill="#ffc658" name="Regulated Score" />
        <Bar dataKey="score4" fill="#ff7300" name="Hybrid Score" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ScoreChart;
