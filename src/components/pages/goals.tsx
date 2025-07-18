"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Plus, Target, Calendar, DollarSign, Trash2 } from "lucide-react";
import { useGoals } from "@/context/goalsContext";

import apiInstance from "@/apiInstance/apiInstance";

export function Goals() {
  const { goals, setGoals } = useGoals();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isContributeDialogOpen, setIsContributeDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [contributeAmount, setContributeAmount] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    targetamount: "",
    deadline: "",
  });

  const fetchGoals = async () => {
    try {
      const response = await apiInstance.get("/goals/getgoals");
      setGoals(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  const createGoal = async (e) => {
    e.preventDefault();
    try {
      const response = await apiInstance.post("/goals/creategoal", formData);
      fetchGoals();
      console.log(response.data);
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  const contributeToGoal = async (e) => {
    e.preventDefault();
    try {
      console.log(selectedGoal.id);
      console.log(typeof parseInt(contributeAmount));
      const response = await apiInstance.put(`/goals/goal_aporte`, {
        id: selectedGoal.id,
        amount: parseInt(contributeAmount),
      });
      fetchGoals();
      setIsContributeDialogOpen(false);
    } catch (error) {
      console.error("Error contributing to goal:", error);
    }
  };

  const deleteGoal = async (id: number) => {
    try {
      await apiInstance.delete(`/goals/deletegoal`, { data: { id: id } });
      fetchGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const openContributeDialog = (goal: any) => {
    setSelectedGoal(goal);
    setIsContributeDialogOpen(true);
  };

  useEffect(() => {
    fetchGoals();
    console.log(goals);
  }, []);

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Mis Metas Financieras</h1>
      </header>

      <div className="flex-1 space-y-6 p-6">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            Administra tus objetivos de ahorro
          </p>

          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Crear Nueva Meta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nueva Meta Financiera</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={createGoal}>
                <div>
                  <Label htmlFor="name">Nombre de la meta</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Ej: Vacaciones, Auto nuevo..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="targetamount">Monto objetivo</Label>
                  <Input
                    id="targetamount"
                    type="number"
                    step="0.01"
                    value={formData.targetamount}
                    onChange={(e) =>
                      setFormData({ ...formData, targetamount: e.target.value })
                    }
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="deadline">Fecha límite (opcional)</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) =>
                      setFormData({ ...formData, deadline: e.target.value })
                    }
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    Crear Meta
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <Card key={goal.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{goal.name}</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteGoal(goal.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progreso</span>
                    <span className="font-medium">
                      {Number(goal.progress).toFixed(2)}%
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Monto:</span>
                    <span className="font-medium">
                      ${goal.currentamount} / ${goal.targetamount}
                    </span>
                  </div>

                  {goal.deadline && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Fecha límite:
                      </span>
                      <span className="font-medium">
                        {new Date(goal.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    className="w-full"
                    onClick={() => openContributeDialog(goal)}
                    disabled={goal.progress >= 100}
                  >
                    {goal.progress >= 100 ? "¡Meta Completada!" : "Aportar"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contribute Dialog */}
        <Dialog
          open={isContributeDialogOpen}
          onOpenChange={setIsContributeDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Aportar a: {selectedGoal?.name}</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={contributeToGoal}>
              <div>
                <Label htmlFor="contributeAmount">Cantidad a aportar</Label>
                <Input
                  id="contributeAmount"
                  type="number"
                  step="0.01"
                  value={contributeAmount}
                  onChange={(e) => setContributeAmount(e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>

              {selectedGoal && (
                <div className="p-3 bg-muted rounded-lg text-sm">
                  <p>
                    Progreso actual: ${selectedGoal.currentamount} / $
                    {selectedGoal.targetamount}
                  </p>
                  <p>
                    Restante: $
                    {(
                      selectedGoal.targetamount - selectedGoal.currentamount
                    ).toLocaleString()}
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  Aportar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsContributeDialogOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
