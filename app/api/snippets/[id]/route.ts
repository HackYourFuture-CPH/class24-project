// get one snippet by id

import { getMongoDb } from "@/app/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  res: NextResponse;
  try {
    const snippetId = params.id;
    const db = getMongoDb();
    console.log(snippetId);
    const oneSnippetFromDatabase = await db
      .collection("snippets")
      .findOne({ _id: new ObjectId(snippetId) });
    return new NextResponse(JSON.stringify(oneSnippetFromDatabase));
  } catch (error) {
    NextResponse.json(error);
  }
}

/*export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { id: ObjectId };
  }
): Promise<NextResponse> {
  const objectId = new ObjectId(params.id);
  const oneSnippetFromDatabase = await getMongoDb()
    .collection("snippets")
    .findOne({ _id: objectId });
  /* .find
    // .limit();
    .toArray();

  return new NextResponse(JSON.stringify(oneSnippetFromDatabase));
}
*/
