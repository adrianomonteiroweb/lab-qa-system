import { NextApiRequest, NextApiResponse } from "next";
import db from "@/db/sqlite";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  db.all("SELECT * FROM samples", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json(rows);
  });
}
