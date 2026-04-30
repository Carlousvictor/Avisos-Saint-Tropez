import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const PERIODS = [
  { id: 'daily', label: 'Diária', sub: 'Todos os dias', color: 'var(--daily)' },
  { id: 'weekly', label: 'Semanal', sub: 'Uma vez por semana', color: 'var(--weekly)' },
  { id: 'biweekly', label: 'Quinzenal', sub: 'A cada 15 dias', color: 'var(--biweekly)' },
  { id: 'monthly', label: 'Mensal', sub: 'Uma vez por mês', color: 'var(--monthly)' },
  { id: 'quarterly', label: 'Trimestral', sub: 'A cada 3 meses', color: 'var(--quarterly)' },
];

const DEFAULT_TASKS = {
  daily: [
    'Varrição – Alamedas / Rua Principal / Estacionamento / Quadra / Calçada Dulcídio',
    'Esvaziar as lixeiras dos postes',
    'Higienização do Parquinho – Varrer e passar produto',
    'Limpeza Banheiros Guaritas e Quadra',
    'Limpeza Guaritas – Varrer / Passar pano balcão / Janelas',
    'Coleta de Lixo – 10:30 e 15h',
    'Verificação de lâmpadas e carrinhos',
  ],
  weekly: [
    'Limpeza Administração (Mesas/Geladeira/Banheiro)',
    'Limpeza dos Ralos (Bocas de Lobo) – Sexta-feira',
    'Limpeza / Manutenção Jardim do Canal',
    'Limpeza Copa Funcionários',
  ],
  biweekly: [
    'Cortar Grama Américas / Gramadão / Alameda 1',
    'Lavagem da Churrasqueira',
    'Poda de Plantas (Alamedas e Câmeras)',
  ],
  monthly: [
    'Limpeza Calhas e Telhados',
    'Limpeza das Caixas d\'Água',
    'Lavagem das Alamedas',
  ],
  quarterly: [
    'Limpar Portas dos PCs de Energia',
  ],
};

export const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: (() => {
        const initial = {};
        PERIODS.forEach(p => {
          initial[p.id] = DEFAULT_TASKS[p.id] || [];
        });
        return initial;
      })(),

      addTask: (periodId, text) => set((state) => ({
        tasks: {
          ...state.tasks,
          [periodId]: [...(state.tasks[periodId] || []), text]
        }
      })),

      removeTask: (periodId, index) => set((state) => ({
        tasks: {
          ...state.tasks,
          [periodId]: state.tasks[periodId].filter((_, i) => i !== index)
        }
      })),

      updateTask: (periodId, index, newText) => set((state) => ({
        tasks: {
          ...state.tasks,
          [periodId]: state.tasks[periodId].map((t, i) => i === index ? newText : t)
        }
      })),
      
      // Move task between periods
      moveTask: (fromPeriod, toPeriod, index) => set((state) => {
        const task = state.tasks[fromPeriod][index];
        const newFrom = state.tasks[fromPeriod].filter((_, i) => i !== index);
        const newTo = [...(state.tasks[toPeriod] || []), task];
        return {
          tasks: {
            ...state.tasks,
            [fromPeriod]: newFrom,
            [toPeriod]: newTo
          }
        };
      }),
    }),
    {
      name: 'saint-tropez-tasks',
    }
  )
);
