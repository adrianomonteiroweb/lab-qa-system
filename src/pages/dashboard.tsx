import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface Sample {
  data: string;
  valor_medido: number;
  "1_2s": string;
  "1_3s": string;
  "2_2s": string;
  R_4s: string;
  "4_1s": string;
  "10_x": string;
  action: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<Sample[]>([]);

  useEffect(() => {
    if (router.query.data) {
      const samples = JSON.parse(router.query.data as string) as Sample[];
      setData(samples);
    }
  }, [router.query.data]);

  return (
    <div>
      <h1>Dashboard</h1>
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="data" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="valor_medido"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Valor Medido</th>
            <th>1_2s</th>
            <th>1_3s</th>
            <th>2_2s</th>
            <th>R_4s</th>
            <th>4_1s</th>
            <th>10_x</th>
            <th>Ação Requerida</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.data}</td>
              <td>{row.valor_medido}</td>
              <td>{row["1_2s"]}</td>
              <td>{row["1_3s"]}</td>
              <td>{row["2_2s"]}</td>
              <td>{row["R_4s"]}</td>
              <td>{row["4_1s"]}</td>
              <td>{row["10_x"]}</td>
              <td>{row.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
