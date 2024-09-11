import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const apikey = process.env.OPENWEATHERMAP_API_KEY;
        const searchParams = req.nextUrl.searchParams;
        const lat = searchParams.get('lat');
        const lon = searchParams.get('lon');
        const URL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apikey}`;

        const res = await axios.get(URL)
        return NextResponse.json(res.data)
    } catch (error) {
        console.log('Error Fetching Pollution Data');
        return new Response("Error fetching Pollution data", { status: 500 })
    }
}