import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "bazar-session";

export async function createSession(userId: number) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, String(userId), {
    httpOnly: true,
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!cookie) return null;

  return Number(cookie.value);
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
