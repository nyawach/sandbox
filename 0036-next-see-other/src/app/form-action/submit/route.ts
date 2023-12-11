import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  return NextResponse.redirect(
    new URL("http://localhost:3000/form-action/result"),
    {
      status: 303,
    }
  );
};
