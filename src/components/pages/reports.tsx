"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const expensesByCategory = [
  { name: "Alimentación", value: 1200, color: "#8884d8" },
  { name: "Transporte", value: 800, color: "#82ca9d" },
  { name: "Entretenimiento", value: 400, color: "#ffc658" },
  { name: "Servicios", value: 600, color: "#ff7300" },
  { name: "Salud", value: 300, color: "#00ff00" },
  { name: "Otros", value: 200, color: "#ff0000" },
];

const monthlyData = [
  { month: "Ene", ingresos: 4200, gastos: 3100, ahorro: 1100 },
  { month: "Feb", ingresos: 3800, gastos: 2900, ahorro: 900 },
  { month: "Mar", ingresos: 4500, gastos: 3200, ahorro: 1300 },
  { month: "Abr", ingresos: 4100, gastos: 3000, ahorro: 1100 },
  { month: "May", ingresos: 4300, gastos: 3400, ahorro: 900 },
  { month: "Jun", ingresos: 4600, gastos: 3100, ahorro: 1500 },
];

const summaryData = [
  { month: "Enero", ingresos: 4200, gastos: 3100, ahorro: 1100 },
  { month: "Febrero", ingresos: 3800, gastos: 2900, ahorro: 900 },
  { month: "Marzo", ingresos: 4500, gastos: 3200, ahorro: 1300 },
  { month: "Abril", ingresos: 4100, gastos: 3000, ahorro: 1100 },
  { month: "Mayo", ingresos: 4300, gastos: 3400, ahorro: 900 },
  { month: "Junio", ingresos: 4600, gastos: 3100, ahorro: 1500 },
];

export function Reports() {
  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Reportes</h1>
      </header>

      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Gastos por Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expensesByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, "Monto"]} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Tendencia Mensual</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, ""]} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="ingresos"
                    stroke="#22c55e"
                    strokeWidth={2}
                    name="Ingresos"
                  />
                  <Line
                    type="monotone"
                    dataKey="gastos"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Gastos"
                  />
                  <Line
                    type="monotone"
                    dataKey="ahorro"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Ahorro"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Summary Table */}
        <Card>
          <CardHeader>
            <CardTitle>Resumen Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mes</TableHead>
                  <TableHead className="text-right">Ingresos</TableHead>
                  <TableHead className="text-right">Gastos</TableHead>
                  <TableHead className="text-right">Ahorro</TableHead>
                  <TableHead className="text-right">% Ahorro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summaryData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.month}</TableCell>
                    <TableCell className="text-right text-green-600 font-medium">
                      ${row.ingresos.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-red-600 font-medium">
                      ${row.gastos.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-blue-600 font-medium">
                      ${row.ahorro.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {((row.ahorro / row.ingresos) * 100).toFixed(1)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Ingresos (6 meses)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                $
                {summaryData
                  .reduce((sum, item) => sum + item.ingresos, 0)
                  .toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Gastos (6 meses)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                $
                {summaryData
                  .reduce((sum, item) => sum + item.gastos, 0)
                  .toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Ahorrado (6 meses)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                $
                {summaryData
                  .reduce((sum, item) => sum + item.ahorro, 0)
                  .toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
