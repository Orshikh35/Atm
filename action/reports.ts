// actions/device.ts
import { ATM } from "@/types/device";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_LOCAL}/Devices`;

export const getReport = async () => {
  const fullUrl = BASE_URL;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_LOCAL}/devices/atm/maintenance/Report`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log({response});

    if (!response.ok) throw new Error("Серверээс алдаа ирлээ");

    const result = await response.json();
    //console.log({result});

    return result;
  } catch (error) {
    console.error("GET Error:", error);
    return { status: false, message: "Алдаа гарлаа." };
  }
};
