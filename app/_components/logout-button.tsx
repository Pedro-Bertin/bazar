"use client";

import { logoutUser } from "@/actions/user.actions";

export function LogoutButton() {
  return (
    <form action={logoutUser}>
      <button type="submit" className="w-full text-left text-red-600">
        Sair
      </button>
    </form>
  );
}
