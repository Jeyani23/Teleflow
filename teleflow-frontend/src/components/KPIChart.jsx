import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const KPIChart = ({ data }) => {
  const chartData = [
    { name: "Closed", value: data.closed || 0 },
    { name: "Pending", value: data.pending || 0 }
  ];
  const COLORS = ["#81A6C6", "#F3E3D0"];
  return (
    <PieChart width={300} height={300}>
      <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
        {chartData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
      </Pie>
      <Legend />
    </PieChart>
  );
};

export default KPIChart;