import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ScoreChart = ({ data }) => {


  const CustomTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={5}
          textAnchor="end"
          fill="#666"
          transform="rotate(-45)"
          style={{ fontSize: "0.7rem" }}
        >
          {payload.value}
        </text>
      </g>
    );
  };


  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="resultGate" tick={<CustomTick />} interval={0} height={130}/>
        <YAxis/>
        <Tooltip />
        {/* <Legend /> */}
        {/* <Bar dataKey="score1" fill="#8884d8" name="Raw Score" />
        <Bar dataKey="score2" fill="#82ca9d" name="Normalized Score" />
        <Bar dataKey="score3" fill="#ffc658" name="Regulated Score" /> */}
        <Bar dataKey="score4" fill="#000000" name="Score" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ScoreChart;
