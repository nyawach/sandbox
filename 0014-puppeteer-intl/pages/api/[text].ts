import { NextApiHandler } from "next"

const handler: NextApiHandler = (req, res) => {
  const { text } = req.query
  res.status(200).json({text})
}

export default handler
