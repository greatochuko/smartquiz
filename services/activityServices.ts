import Activity, { ActivityType } from "@/db/models/Activity";
import { parseJSONResponse } from "@/lib/utils";

export async function getActivitiesByUser(userId: string) {
  try {
    const activities: ActivityType[] = await Activity.find({
      user: userId,
    })
      .populate({ path: "user", select: "firstName lastName" })
      .populate({ path: "exam", select: "name" })
      .sort({ createdAt: -1 })
      .limit(10);

    return { activities: parseJSONResponse(activities), error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching activities: ", error.message);
    return { activities: [], error: error.message };
  }
}
