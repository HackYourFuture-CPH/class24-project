import { getMongoDb } from "@/app/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

// get one snippet by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } } //needs testing after changes
) {
  try {
    const snippetId = params.id;
    const db = getMongoDb();
    // console.log(snippetId);
    const oneSnippetFromDatabase = await db
      .collection("snippets")
      .findOne({ _id: new ObjectId(snippetId) });
    return NextResponse.json(oneSnippetFromDatabase);
    // new NextResponse(JSON.stringify(oneSnippetFromDatabase));
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
}

// Update the snippet by ID
export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  // I'm trying to modify the API so that can be used to update an array favoriteByIds.
  // we can use a user name instead of an id
  const userId = getServerSession()
  try {
    const snippetId = params.id;
    const body = await req.json();
    const db = getMongoDb();
    const updateOneSnippetFromDatabase = await db
      .collection("snippets")
      .updateOne({ _id: new ObjectId(snippetId) }, { $set: body });
    const oneSnippetFromDatabase = await db
      .collection("snippets")
      .findOne({ _id: new ObjectId(snippetId) });
    // if a user in array, we delete him
    if (oneSnippetFromDatabase?.favoriteByIds.include(userId)) {
      await db
        .collection("snippets")
        .updateOne({ _id: new ObjectId(snippetId) },
          { $pull: { favoriteByIds: { $in: [userId] } } });
    } else {
      // if a usr not in array, we add him
      await db
        .collection("snippets")
        .updateOne({ _id: new ObjectId(snippetId) },
          { $addToSet: { favoriteByIds: userId } })

    }
    return new NextResponse(JSON.stringify(updateOneSnippetFromDatabase));
  } catch (error) {
    return NextResponse.json({
      message: "something went wrong",
      error: error,
    });
  }
}

// delete one snippet
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const snippetId = params.id;
    const db = getMongoDb();
    // console.log(snippetId);
    const oneSnippetFromDatabase = await db
      .collection("snippets")
      .deleteOne({ _id: new ObjectId(snippetId) });
    return new NextResponse(JSON.stringify(oneSnippetFromDatabase));
  } catch (error) {
    // console.error("Error retrieving snippets from the database:", error);
    return new NextResponse(
      JSON.stringify({ error: "An error occurred while retrieving snippets" }),
      { status: 500 }
    );
  }
}
