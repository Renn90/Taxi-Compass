import { NextResponse } from "next/server";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const paramText = searchParams.get("q");

  const baseUrl = "https://api.mapbox.com/search/searchbox/v1/suggest";

  const resData = await fetch(
    baseUrl +
      "?q=" +
      paramText +
      "?language=en&limit=6&session_token=pk.eyJ1IjoicmVubjkwIiwiYSI6ImNtNWFiNG5jdjAxb3QyanIzamRpZDV5NWYifQ.hpLadjezkfA8MjZPpNoPtA" +
      "&access_token=" +
      process.env.MAPBOXACCESSTOKEN,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const searchResult = await resData.json();
  return NextResponse.json(searchResult);
}
