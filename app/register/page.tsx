// "use client";

// import { createUser } from "@/actions/user.actions";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export default function RegisterPage() {
//   async function handleRegister() {
//     try {
//       await createUser({
//         name,
//         email,
//         password,
//         phone,
//         address: {
//           street,
//           neighborhood,
//           city,
//           state,
//           zip,
//         },
//       });

//       alert("Usuário criado com sucesso!");
//     } catch (err: any) {
//       alert(err.message);
//     }
//   }

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
//       <Card className="w-full max-w-sm">
//         <CardHeader className="text-center">
//           <CardTitle>Criar Conta</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {/* Dados pessoais */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-1">
//               <Label htmlFor="name">Nome completo</Label>
//               <Input id="name" placeholder="Seu nome" />
//             </div>

//             <div className="space-y-1">
//               <Label htmlFor="phone">Telefone</Label>
//               <Input id="phone" placeholder="(11) 99999-9999" />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-1">
//               <Label htmlFor="email">Email</Label>
//               <Input id="email" type="email" placeholder="seu@email.com" />
//             </div>

//             <div className="space-y-1">
//               <Label htmlFor="password">Senha</Label>
//               <Input id="password" type="password" />
//             </div>
//           </div>

//           {/* Endereço */}
//           <div className="space-y-2">
//             <h3 className="text-sm font-semibold">Endereço</h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-1">
//                 <Label htmlFor="street">Rua</Label>
//                 <Input id="street" placeholder="Rua Exemplo" />
//               </div>

//               <div className="space-y-1">
//                 <Label htmlFor="neighborhood">Bairro</Label>
//                 <Input id="neighborhood" placeholder="Centro" />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="space-y-1">
//                 <Label htmlFor="city">Cidade</Label>
//                 <Input id="city" placeholder="São Paulo" />
//               </div>

//               <div className="space-y-1">
//                 <Label htmlFor="state">Estado</Label>
//                 <Input id="state" placeholder="SP" />
//               </div>

//               <div className="space-y-1">
//                 <Label htmlFor="zip">CEP</Label>
//                 <Input id="zip" placeholder="00000-000" />
//               </div>
//             </div>
//           </div>

//           <Button className="w-full" onClick={handleRegister}>
//             Cadastrar
//           </Button>

//           <p className="text-sm text-center text-muted-foreground">
//             Já tem conta?{" "}
//             <Link href="/login" className="underline">
//               Entrar
//             </Link>
//           </p>
//         </CardContent>
//       </Card>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import { createUser } from "@/actions/user.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterPage() {
  // Dados pessoais
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // Endereço
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  async function handleRegister() {
    try {
      await createUser({
        name,
        email,
        password,
        phone,
        address: {
          street,
          neighborhood,
          city,
          state,
          zip,
        },
      });

      alert("Usuário criado com sucesso!");
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle>Criar Conta</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Dados pessoais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Nome completo</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="space-y-1">
              <Label>Telefone</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label>Senha</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Endereço</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Rua"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <Input
                placeholder="Bairro"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Cidade"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Input
                placeholder="Estado"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <Input
                placeholder="CEP"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
          </div>

          <Button className="w-full" onClick={handleRegister}>
            Cadastrar
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Já tem conta?{" "}
            <Link href="/login" className="underline">
              Entrar
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
