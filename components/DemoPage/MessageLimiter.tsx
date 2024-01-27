import { useEffect, useState } from "react";
import { checkRateLimit } from "@/hooks/messageLimiter";

export const useRateLimitedData = () => {
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ip = "..."; // Retrieve client's IP address using a third-party API or other method
        const isAllowed = await checkRateLimit(ip);

        if (!isAllowed) {
          throw new Error("You have exceeded the 10 requests per hour limit!");
        }

        // Fetch your data here
        const data = "Your data";
        setData(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setAlertMessage(error.message);
        } else {
          setAlertMessage("An unexpected error occurred.");
        }
      }
    };

    fetchData();
  }, []);

  return { alertMessage, data };
};
