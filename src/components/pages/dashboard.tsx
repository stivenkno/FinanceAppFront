"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useEffect, useState } from "react";
import apiInstance, { setAuthToken } from "../../apiInstance/apiInstance";
import { useFinance } from "../../context/dashboardContext";

const weeklyData = [
  { week: "Sem 1", ingresos: 2400, gastos: 1800 },
  { week: "Sem 2", ingresos: 1800, gastos: 2200 },
  { week: "Sem 3", ingresos: 3200, gastos: 1900 },
  { week: "Sem 4", ingresos: 2800, gastos: 2400 },
  { week: "Sem 1", ingresos: 2400, gastos: 1800 },
  { week: "Sem 2", ingresos: 1800, gastos: 2200 },
  { week: "Sem 3", ingresos: 3200, gastos: 1900 },
  { week: "Sem 4", ingresos: 2800, gastos: 2400 },
];

const goals = [
  { name: "Vacaciones", target: 5000, current: 3200, progress: 64 },
  { name: "Fondo de emergencia", target: 10000, current: 7500, progress: 75 },
  { name: "Nuevo auto", target: 15000, current: 4500, progress: 30 },
];

export function Dashboard() {
  const { totalIngresos, totalEgresos, actualBalance, setContextDashboard } =
    useFinance();

  useEffect(() => {
    setAuthToken(localStorage.getItem("token"));
    const fetchData = async () => {
      const res1 = await apiInstance.get("/dashboard/balance");
      const res2 = await apiInstance.get("/dashboard/ingresos");
      const res3 = await apiInstance.get("/dashboard/gastos");

      setContextDashboard(
        res2.data.total_ingresos,
        res3.data.total_egresos,
        res1.data.balance
      );
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </header>

      <div className="flex-1 space-y-6 p-6">
        {/* Balance Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Balance Actual
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                }).format(actualBalance)}
              </div>
              <p className="text-xs text-muted-foreground">
                +2.5% desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ingresos del Mes
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                }).format(totalIngresos)}
              </div>
              <p className="text-xs text-muted-foreground">
                +12% desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Gastos del Mes
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                }).format(totalEgresos)}
              </div>
              <p className="text-xs text-muted-foreground">
                -5% desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ahorro del Mes
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">$1,880</div>
              <p className="text-xs text-muted-foreground">Meta: $2,000</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Ingresos vs Gastos por Semana</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="ingresos" fill="#22c55e" />
                  <Bar dataKey="gastos" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Metas Más Cercanas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{goal.name}</span>
                    <span className="text-muted-foreground">
                      ${goal.current.toLocaleString()} / $
                      {goal.target.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">
                    {goal.progress}% completado
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
