import to from "await-to-js";
import View from "../../../models/View";
import requestIp from "request-ip";
import mongoose from "mongoose";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET": {
      const { quoteId } = req.query;
      if (!quoteId) {
        return res
          .status(200)
          .json({ error: false, message: "QuoteId not present in url" });
      }

      const [err, views] = await to(View.countDocuments({ quoteId }));
      if (err) {
        return res.status(400).json({ error: true, err });
      }

      return res.status(200).json({ error: false, views });
    }

    case "POST": {
      const { quoteId } = req.body;
      const ipAddr = requestIp.getClientIp(req);
      let err, quoteView;
      if (!quoteId) {
        return res
          .status(200)
          .json({ error: false, message: "QuoteId not present in payload" });
      }

      [err, quoteView] = await to(
        View.findOne({ quoteId, userAddress: ipAddr })
      );
      if (err) {
        return res.status(400).json({ error: true, err });
      }

      if (!quoteView) {
        [err] = await to(new View({ quoteId, userAddress: ipAddr }).save());
        if (err) {
          return res.status(400).json({ error: true, err });
        }

        return res
          .status(201)
          .json({ error: false, message: "Quote viewed", viewed: true });
      } else {
        return res.status(200).json({
          error: false,
          message: "Quote already viewed",
          viewed: false,
        });
      }
    }

    default:
      return res.status(400);
  }
}
