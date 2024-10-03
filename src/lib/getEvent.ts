import { revalidateTag, revalidatePath } from "next/cache";

export async function getEvent(id: number) {

    const API_KEY = 'kmMxhmJ3jPYQsevHUrcIVaIdtZ5MnbAu';

    const apiUrl = `https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=${API_KEY}`;

    try {
        const res = await fetch(apiUrl, { next: { tags: [`TheEvent:${id}`] } });

        if (res?.ok) {
            revalidateTag(`TheEvent:${id}`);
            revalidatePath(`/${id}`);
        } else {
            throw new Error("Failed to fetch the TheEvent data");
        }

        return res?.json();
    } catch (error) {
        console?.error("Error fetching the TheEvent data:", error);
        throw error;
    }
}