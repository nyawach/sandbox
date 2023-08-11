import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Page A", uv: 400, pv: 2100, amt: 2400 },
  { name: "Page A", uv: 500, pv: 2200, amt: 2400 },
  { name: "Page A", uv: 600, pv: 2300, amt: 2400 },
  { name: "Page A", uv: 200, pv: 2400, amt: 2400 },
];

export const Graph = () => {
  return (
    <LineChart width={280} height={400} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
      <XAxis dataKey="pv" fontSize={10} />
      <YAxis dataKey="uv" fontSize={10} />
    </LineChart>
  );
};
