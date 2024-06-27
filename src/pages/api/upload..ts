import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import db from "@/db/sqlite";

const upload = multer({
  storage: multer.memoryStorage(),
});

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("file"));

const checkWestgardRules = (value: number, mean: number, stdDev: number) => {
  const z = (value - mean) / stdDev;

  const rules = {
    "1_2s": Math.abs(z) <= 2 ? "OK" : "NOK",
    "1_3s": Math.abs(z) <= 3 ? "OK" : "NOK",
    "2_2s": "OK", // Placeholder
    R_4s: "OK", // Placeholder
    "4_1s": "OK", // Placeholder
    "10_x": "OK", // Placeholder
  };

  let action = "Nenhuma";
  if (rules["1_2s"] === "NOK") action = "Verificar método";
  if (rules["1_3s"] === "NOK") action = "Recalibrar";
  // Add additional logic for other rules if needed

  return { rules, action };
};

apiRoute.post((req: any, res: NextApiResponse) => {
  const csvData = req.file.buffer.toString("utf-8");
  const rows = csvData.split("\n").map((row: string) => row.split(","));
  const [headers, ...data] = rows;

  const samples: any[] = [];
  const mean = 100; // Placeholder mean value
  const stdDev = 10; // Placeholder standard deviation value

  data.forEach((row: string[]) => {
    const [data, valorMedido] = row;
    const valor = parseFloat(valorMedido);
    const { rules, action } = checkWestgardRules(valor, mean, stdDev);

    const sample = { data, valor_medido: valor, ...rules, action };
    samples.push(sample);

    db.run("INSERT INTO samples (data, valor_medido) VALUES (?, ?)", [
      data,
      valor,
    ]);
  });

  res.status(200).json({ message: "Upload successful", samples });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
