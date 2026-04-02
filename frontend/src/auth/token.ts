import { cookies } from "next/headers";

export default async function getToken() {
    return (await cookies()).get('CASHTRACKR_TOKEN')?.value
}