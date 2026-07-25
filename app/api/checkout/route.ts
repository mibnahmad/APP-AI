import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/payments";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      artworkId?: string;
      artworkTitle?: string;
    };

    if (!body.artworkId || !body.artworkTitle) {
      throw new Error("Artwork details are required to unlock downloads.");
    }

    const session = await createCheckoutSession({
      artworkId: body.artworkId,
      artworkTitle: body.artworkTitle,
    });

    return NextResponse.json(session);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to start checkout.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
