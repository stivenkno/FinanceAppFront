"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import apiInstance, { setAuthToken } from "@/apiInstance/apiInstance";
import { useFinance } from "@/context/dashboardContext";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const fetchFinanceData = async () => {
    try {
      const response1 = await apiInstance.get("/dashboard/balance");
      const response2 = await apiInstance.get("/dashboard/ingresos");
      const response3 = await apiInstance.get("/dashboard/gastos");

      const balance = response1.data.balance;
      const ingresos = response2.data.total_ingresos;
      const egresos = response3.data.total_gastos;

      console.log("Balance:", balance);
      console.log("Ingresos:", ingresos);
      console.log("Egresos:", egresos);
      setContextDashboard(ingresos, egresos, balance);
    } catch (error) {
      console.error("Error fetching finance data:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await axios.post(
      "https://financeappback-nmp7.onrender.com/api/auth/login",
      {
        email: formData.email,
        password: formData.password,
      }
    );
    if (response) {
      setAuthToken(response.data.token);
      console.log("el token se ha seteado:", response.data.token);
      console.log(response.data.token);
    }
    console.log(response);

    await fetchFinanceData();

    router.push("/");
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  name="password"
                  placeholder="password"
                  onChange={handleInputChange}
                  value={formData.password}
                  id="password"
                  type="password"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
