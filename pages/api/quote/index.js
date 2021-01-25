import to from "await-to-js";
import dbConnect from "../../../utils/database";
import Quote from "../../../models/Quote";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET": {
      const [err, quotes] = await to(Quote.find({}));
      if (err) {
        res.status(400).json({ error: true, err });
      }

      res.status(200).json({ error: false, quotes });
      break;
    }

    case "POST": {
      console.log("THIS IS POST");
      res.status(200);
      break;
    }

    default:
      res.status(400);
      break;
  }
}
