"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";
import { RefreshCw, Search } from "lucide-react";

import { getUsers } from "@/lib/api/users";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  user_id: string;
  name: string;
  email: string;
  password: string;
}

export default function UsersTable() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    setLoading(true);
    getUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    [user.name, user.email].some((field) =>
      field?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <>
      <div className="flex justify-between items-center gap-2 mb-4">
        <div className="flex items-center gap-2 flex-1">
          <Search className="w-5" />
          <Input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md"
          />
          <Button
            variant="outline"
            onClick={() => fetchUsers()}
          >
            <RefreshCw />
            <span>Atualizar</span>
          </Button>
        </div>
      </div>

      <Table>
        <TableCaption className="sr-only">Lista de Utilizadores</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[25%]">Nome</TableHead>
            <TableHead className="w-[25%]">Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array(15)
                .fill(0)
                .map((_, idx) => (
                  <TableRow
                    key={idx}
                    className={
                      idx % 2 === 0
                        ? "bg-muted/40 hover:bg-muted"
                        : "bg-muted/0 hover:bg-muted"
                    }
                  >
                    <TableCell>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  </TableRow>
                ))
            : filteredUsers.map((user, idx) => (
                <TableRow
                  key={user.user_id}
                  onClick={() => router.push(`/utilizadores/${user.user_id}`)}
                  className={
                    idx % 2 === 0
                      ? "bg-muted/40 hover:bg-muted"
                      : "bg-muted/0 hover:bg-muted"
                  }
                >
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="font-medium">{user.email}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  );
}
