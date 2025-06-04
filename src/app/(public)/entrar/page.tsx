import { LoginForm } from "@/components/forms/login-forms";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Autenticacao() {
  return (
    <div className="flex justify-center items-center flex-col h-svh p-5 gap-10">
      <Card className="w-xl max-w-full">
        <CardHeader className="gap-10">
          <img
            src="../../icon.svg"
            className="w-10 text-center justify-self-center"
            alt="AGEST Icon"
          />
          <div className="flex flex-col items-center gap-2">
            <CardTitle>
              <h1 className="text-2xl font-semibold leading-tight tracking-tight text-center">
                Autenticação
              </h1>
            </CardTitle>
            <CardDescription>
              <p className="text-muted-foreground text-sm text-center">
                Insira os seus dados de acesso para iniciar sessão.
              </p>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
