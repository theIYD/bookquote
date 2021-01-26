import { createWorker } from "tesseract.js";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST": {
      const { imageFile } = req.body;

      if (!imageFile) {
        res.status(200).json({ error: false, message: "Image not recieved" });
        break;
      }

      const worker = createWorker({
        logger: (m) => console.log(m),
      });

      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const {
        data: { text },
      } = await worker.recognize(imageFile);
      await worker.terminate();

      console.log("text", text);
      res.status(200).json({ error: false, text });
      break;
    }

    default: {
      res.status(400);
    }
  }
}
