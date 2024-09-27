import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl">Sign In</CardTitle>
        <CardContent className=" w-[300px]">
          <LoginForm />
        </CardContent>
      </CardHeader>
    </Card>
  )
}
