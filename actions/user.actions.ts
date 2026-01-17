"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/session";
import { destroySession } from "@/lib/session";
import { redirect } from "next/navigation";

/* ======================
  USER REGISTER
====================== */
export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zip: string;
  };
}) {
  const exists = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (exists) throw new Error("Usuário já existe");

  const hash = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hash,
      phone: data.phone,
      address: { create: data.address },
    },
  });
}

/* ======================
   LOGIN USER
====================== */
export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Email ou senha inválidos");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Email ou senha inválidos");
  }

  await createSession(user.id);

  return user;
}

/* ======================
  USER LOGOUT
====================== */
export async function logoutUser() {
  await destroySession();
  redirect("/");
}
