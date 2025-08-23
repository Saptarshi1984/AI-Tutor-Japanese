import { main } from "@/app/helper";

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    const message = await main(input);
    return Response.json({ message });
  } catch (error) {
    console.error("Error Getting AI Response", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
