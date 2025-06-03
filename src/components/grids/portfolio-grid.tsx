"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RefreshCw, Search } from "lucide-react";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { getProjects } from "@/lib/api/projects";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Project {
  project_id: string;
  name: string;
  description: string;
  url: string;
  image_url: string;
}

export default function PortfolioGrid() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProjects = () => {
    setLoading(true);
    getProjects()
      .then((res) => setProjects(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    [project.name].some((field) =>
      field?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <>
      <div className="flex justify-between items-center gap-2 mb-8">
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
            onClick={() => fetchProjects()}
          >
            <RefreshCw />
            <span>Atualizar</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array(6)
            .fill(0)
            .map((_, idx) => (
              <Card
                key={idx}
                className={idx % 2 === 0 ? "bg-muted/40" : "bg-muted/0"}
              >
                <CardHeader>
                  <CardTitle>
                    <Skeleton className="h-6 w-3/4" />
                  </CardTitle>
                  <CardDescription>
                    <Skeleton className="h-4 w-full" />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-40 w-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project, idx) => (
            <Card
              key={project.project_id}
              className={
                idx % 2 === 0
                  ? "bg-muted/40 hover:bg-muted"
                  : "bg-muted/0 hover:bg-muted"
              }
            >
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={project.image_url}
                  alt={project.name}
                  className="w-full aspect-video object-cover rounded-md"
                />
              </CardContent>
              <CardFooter>
                <Button
                  variant="default"
                  onClick={() =>
                    router.push(`/portfolio/${project.project_id}`)
                  }
                  className="w-full"
                >
                  Ver projeto
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">Nenhum projeto encontrado</p>
          </div>
        )}
      </div>
    </>
  );
}
