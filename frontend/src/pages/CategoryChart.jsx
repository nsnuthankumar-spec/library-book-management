import { PieChart, Pie, Tooltip, Cell } from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CategoryChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/books")
      .then(res => {
        const grouped = {};
        res.data.forEach(b => {
          grouped[b.category] = (grouped[b.category] || 0) + 1;
        });

        setData(
          Object.keys(grouped).map(k => ({
            name: k,
            value: grouped[k]
          }))
        );
      });
  }, []);

  return (
    <PieChart width={300} height={300}>
      <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
        {data.map((_, i) => (
          <Cell key={i} fill={["#4f46e5","#22c55e","#f97316"][i % 3]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
