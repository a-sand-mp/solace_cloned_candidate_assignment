import db from "../../../db";
import { advocates } from "../../../db/schema";
import {
  advocateData,
  randomSpecialty,
  specialties,
} from "../../../db/seed/advocates";

export async function GET(req: Request) {
  // Uncomment this line to use a database
  const { searchParams } = new URL(req.url);
  const filterValue = searchParams.get("filter")?.trim() ?? "";
  const queryData = await db?.select().from(advocates);
  console.log({ filterValue });
  const data = queryData?.filter((advocate) => {
    return (
      advocate.firstName.toLowerCase().includes(filterValue) ||
      advocate.lastName.toLowerCase().includes(filterValue) ||
      advocate.city.toLowerCase().includes(filterValue) ||
      advocate.degree.toLowerCase().includes(filterValue) ||
      (Array.isArray(advocate.specialties) &&
        advocate.specialties.some((specs) =>
          specs.toLowerCase().includes(filterValue)
        )) ||
      advocate.yearsOfExperience.toString().toLowerCase().includes(filterValue)
    );
  });
  console.log({ data });
  // const data = advocateData;

  return Response.json({ data });
}

export async function POST(req: Request) {
  try {
    const respObj = await req.json();
    console.log({ respObj });
    await db?.insert(advocates).values({
      firstName: respObj.firstName,
      lastName: respObj.lastName,
      city: respObj.city,
      degree: respObj.degree,
      specialties: specialties.slice(...randomSpecialty()),
      yearsOfExperience: respObj.yearsOfExperience,
      phoneNumber: respObj.phoneNumber,
    });
    return Response.json({ text: "success" }, { status: 200 });
  } catch (e) {
    return Response.json({ text: e }, { status: 400 });
  }
}
