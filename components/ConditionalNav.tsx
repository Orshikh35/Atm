"use client";
import { useSession } from "next-auth/react";
import NavHeader from "./home-header";

export default function ConditionalNavHeader() {
  const { data: session, status } = useSession();

  // Нэвтэрсэн бол NavHeader-г харуулахгүй
  if (status === "loading") return null;

  return !session ? <NavHeader /> : null;
}
