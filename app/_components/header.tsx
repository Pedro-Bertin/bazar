"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogoutButton } from "./logout-button";
import { ThemeToggle } from "./theme-toggle";

type User = {
  name: string;
};

export function Header({ user }: { user: User | null }) {
  return (
    <header className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-foreground">
          🧺 Bazar
        </Link>

        {/* Navegação */}
        <nav className="flex items-center gap-6 text-foreground">
          {!user && (
            <>
              <Link
                href="/login"
                className="text-sm text-foreground hover:underline"
              >
                Login
              </Link>

              <Link href="/register">
                <Button size="sm">Cadastrar</Button>
              </Link>
            </>
          )}

          {user && (
            <>
              <Link href="/dashboard" className="text-sm hover:underline">
                Dashboard
              </Link>

              <Link href="/products" className="text-sm hover:underline">
                Produtos
              </Link>

              <Link href="/products/new">
                <Button size="sm">Novo produto</Button>
              </Link>

              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarFallback>
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>{user.name}</DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Meu painel</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/products">Meus produtos</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="text-red-600">
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
