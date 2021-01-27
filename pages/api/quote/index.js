import to from "await-to-js";
import dbConnect from "../../../utils/database";
import Quote from "../../../models/Quote";

export default async function handler(req, res) {
  const { method, query } = req;

  await dbConnect();
  switch (method) {
    case "GET": {
      let err, quotes;
      if (query && query.me) {
        [err, quotes] = await to(Quote.find({ userId: query.me }));
      } else {
        [err, quotes] = await to(Quote.find({ isPublic: true }));
      }
      if (err) {
        res.status(400).json({ error: true, err });
      }

      res.status(200).json({ error: false, quotes });
      break;
    }

    case "POST": {
      const { bookName, content, authorName, isPublic, user, id } = req.body;
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

      const quoteData = {
        bookName,
        content,
        author: authorName,
        hashtag: count + 1,
        isPublic,
      };

      if (user && id) {
        quoteData["user"] = user;
        quoteData["userId"] = id;
      }

      [err] = await to(new Quote(quoteData).save());
      if (err) {
        return res.status(400).json({ error: true, err });
      }

      res.status(201).json({ error: false, message: "Quote was created" });
      break;
    }

    case "PUT": {
      const { bookName, content, authorName, isPublic, id } = req.body;
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

      const quoteData = {
        bookName,
        content,
        author: authorName,
        isPublic,
      };

      const [err] = await to(Quote.findOneAndUpdate({ userId: id }, quoteData));
      if (err) {
        return res.status(400).json({ error: true, err });
      }

      res.status(200).json({ error: false, message: "Quote was updated" });
      break;
    }

    default:
      res.status(400);
      break;
  }
}
