"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Dashboard } from "@/components/pages/dashboard";
import { Transactions } from "@/components/pages/transactions";
import { Goals } from "@/components/pages/goals";
import { Reports } from "@/components/pages/reports";
import { Settings } from "@/components/pages/settings";
import FinanceProvider from "@/context/dashboardContext";
import TransactionsProvider from "@/context/transactionsContext";
import { GoalsProvider } from "@/context/goalsContext";
import { redirect } from "next/navigation";

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "transactions":
        return <Transactions />;
      case "goals":
        return <Goals />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      redirect("/login");
    }
  }, []);

  return (
    <TransactionsProvider>
      <GoalsProvider>
        <FinanceProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SidebarProvider>
              <AppSidebar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
              <SidebarInset>
                <div className="flex flex-1 flex-col">{renderPage()}</div>
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </FinanceProvider>
      </GoalsProvider>
    </TransactionsProvider>
  );
}
