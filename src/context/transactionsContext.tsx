import { createContext, useContext, useState, ReactNode } from "react";

// Tipo para una transacción individual
export type Transaction = {
  id: number;
  user_id: number;
  fecha: string;
  category: string;
  description: string;
  amount: number;
  type: "Ingreso" | "Gasto";
};

// Tipo del contexto
type TransactionsContextType = {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  loading: boolean;
};

// Contexto inicial
const TransactionsContext = createContext<TransactionsContextType>({
  transactions: [],
  setTransactions: () => {},
  loading: false,
});

// Provider
export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading] = useState<boolean>(true);

  return (
    <TransactionsContext.Provider
      value={{ transactions, setTransactions, loading }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

// Hook para usar el contexto
export const useTransactions = () => useContext(TransactionsContext);

export default TransactionsProvider;
