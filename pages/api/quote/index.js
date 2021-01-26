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
      const { bookName, content, authorName } = req.body;
      let err = null;
      let count = null;
      if (!bookName) {
        return res.status(400).json({
          error: false,
          message: "Book name was not found in the payload",
        });
      }

      if (!content) {
        return res.status(400).json({
          error: false,
          message: "Quote content was not found in the payload",
        });
      }

      if (!authorName) {
        return res.status(400).json({
          error: false,
          message: "Author name was not found in the payload",
        });
      }

      [err, count] = await to(Quote.countDocuments({}));
      if (err) {
        return res.status(400).json({ error: true, err });
      }

      [err] = await to(
        new Quote({
          bookName,
          content,
          author: authorName,
          hashtag: count + 1,
        }).save()
      );
      if (err) {
        return res.status(400).json({ error: true, err });
      }

      res.status(201).json({ error: false, message: "Quote was created" });
      break;
    }

    default:
      res.status(400);
      break;
  }
}
