import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type FinanceData = {
  totalIngresos: number;
  totalEgresos: number;
  actualBalance: number;
  setContextDashboard: (
    ingresos: number,
    egresos: number,
    balance: number
  ) => void;
};

const FinanceContext = createContext<FinanceData>({
  totalIngresos: 0,
  totalEgresos: 0,
  actualBalance: 0,
  setContextDashboard: () => {},
});

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalEgresos, setTotalEgresos] = useState(0);
  const [actualBalance, setActualBalance] = useState(0);

  const setContextDashboard = (ingresos, egresos, balance) => {
    setTotalIngresos(ingresos);
    setTotalEgresos(egresos);
    setActualBalance(balance);
  };

  return (
    <FinanceContext.Provider
      value={{
        totalIngresos,
        totalEgresos,
        actualBalance,
        setContextDashboard,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);

export default FinanceProvider;
