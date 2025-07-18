import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Tipo para el contexto
type GoalsContextType = {
  goals: any[];
  setGoals: (goals: any[]) => void;
};

// Contexto inicial
const GoalsContext = createContext<GoalsContextType>({
  goals: [],
  setGoals: () => {},
});

// Hook para usar el contexto
export const useGoals = () => useContext(GoalsContext);

// Provider para el contexto
export const GoalsProvider = ({ children }: { children: ReactNode }) => {
  const [goals, setGoals] = useState<any[]>([]);

  return (
    <GoalsContext.Provider value={{ goals, setGoals }}>
      {children}
    </GoalsContext.Provider>
  );
};

export default GoalsContext;
