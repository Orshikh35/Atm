// actions/device.ts
import { ATM } from "@/types/device";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_LOCAL}/Devices`;

export const getDevicesATM = async () => {
    const fullUrl = BASE_URL;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_LOCAL}/Devices/ATM`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          },
      });
      //console.log({response});
      
      if (!response.ok) throw new Error("Серверээс алдаа ирлээ");

      const result = await response.json();
      //console.log({result});
      
      return result;
    } catch (error) {
      //console.error("GET Error:", error);
      return { status: false, message: "Алдаа гарлаа." };
    }
};

export const getDevicesKiosk = async () => {
  const fullUrl = BASE_URL;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_LOCAL}/Devices/Kiosk`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
        },
    });
    //console.log({response});
    
    if (!response.ok) throw new Error("Серверээс алдаа ирлээ");

    const result = await response.json();
    //console.log({result});
    
    return result;
  } catch (error) {
    //console.error("GET Error:", error);
    return { status: false, message: "Алдаа гарлаа." };
  }
};
export const getDevicesOther = async () => {
  const fullUrl = BASE_URL;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_LOCAL}/Devices/OtherDevices`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
        },
    });
    //console.log({response});
    
    if (!response.ok) throw new Error("Серверээс алдаа ирлээ");

    const result = await response.json();
    //console.log({result});
    
    return result;
  } catch (error) {
    //console.error("GET Error:", error);
    return { status: false, message: "Алдаа гарлаа." };
  }
};

export const createDevice = async (data: ATM) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Хадгалах үед алдаа гарлаа");
  return res.json();
};

export const updateDevice = async (id: number, data: ATM) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Шинэчлэх үед алдаа гарлаа");
  return res.json();
};

export const deleteDevice = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Устгах үед алдаа гарлаа");
};


