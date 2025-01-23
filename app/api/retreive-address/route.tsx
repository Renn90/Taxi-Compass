import { NextResponse } from "next/server";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const addressId = searchParams.get("id");

  const token = process.env.MAPBOXACCESSTOKEN;

  const baseUrl = `https://api.mapbox.com/search/searchbox/v1/retrieve/${addressId}`;

  const resData = await fetch(baseUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const searchResult = await resData.json();
  return NextResponse.json(searchResult);
}
