// actions/device.ts
import { ATM } from "@/types/device";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_LOCAL}/Devices`;

export const getDevicesATM = async () => {
  const fullUrl = BASE_URL;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_LOCAL}/Devices/ATM`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_LOCAL}/Devices/Kiosk`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_LOCAL}/Devices/OtherDevices`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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

export const updateDevice = async (id: number, formData: any) => {
  const request = {
    deviceName: formData.deviceName || "",
    serialNumber: formData.serialNumber || "",
    model: formData.model || "",
    deviceType: formData.deviceType ?? 0,
    status: formData.status ?? 0,
    ip: formData.ip || "",
    port: formData.port ?? 0,
    location: formData.location || "",
    province: formData.province || "",
    masterkey: formData.masterkey || "",
    installationDate: formData.installationDate || null,
    expiredDate: formData.expiredDate || null,
    ownerId: 1,
    orgName: formData.orgName || "",
    atmZone: formData.atmZone || "",
  };
  const fullUrl = `${process.env.NEXT_PUBLIC_BACKEND_LOCAL}/Devices/ATM/${id}`;

  console.log({ fullUrl });
  console.log({ request });

  try {
    const res = await fetch(fullUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    console.log({ res });

    if (res.status === 204 || res.headers.get("content-length") === "0") {
      return {
        status: true,
        message: "No content returned, but the request succeeded",
      };
    }

    let data;
    try {
      data = await res.json();
      console.log(data.result);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      return { status: false, message: "Unexpected response format" };
    }

    if (!res.ok || !data.status) {
      return {
        status: false,
        statusCode: res.status,
        message: data.message || res.statusText,
      };
    }

    return { status: true, data };
  } catch (error) {
    console.error("Error during API request:", error);
    return {
      status: false,
      message: "Failed to process the request. Please try again later.",
    };
  }
};

export const deleteDevice = async (id: number) => {

  const fullUrl = `${process.env.NEXT_PUBLIC_BACKEND_LOCAL}/Devices/ATM/${id}`;
  const res = await fetch(fullUrl, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  console.log("Delete response:", res);
  if (res.status === 404) {
    return { status: false, statusCode: 404, message: "Алдаатай хүсэлт." };
  }
  const data = await res.json();
  if (!data.status) {
    return { status: false, statusCode: res.status, message: data.message };
  }
  return data;
};
