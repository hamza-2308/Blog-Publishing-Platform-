"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-xs text-ink-400 hover:text-red-600 transition-colors font-medium hover:underline underline-offset-2"
    >
      Log out
    </button>
  );
}