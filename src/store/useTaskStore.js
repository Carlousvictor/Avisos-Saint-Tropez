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
    'Varrição – Alamedas / Rua Principal / Estacionamento / Quadra / Calçada Dulcídio / Jardim e Quintal ADM com rega',
    'Esvaziar as lixeiras dos postes',
    'Higienização do Parquinho – Varrer e passar produto em todos os brinquedos',
    'Limpeza Banheiros Guaritas e Quadra',
    'Limpeza Guaritas – Varrer / Passar pano balcão / Limpar janelas / Frigobar / Interfone',
    'Higienização do bebedouro da Quadra',
    'Coleta de Lixo – 10:30 e 15h / 13h aos fins de semana',
    'Verificação de sacos de dejetos',
    'Verificação de lâmpadas',
    'Verificação de rodas dos carrinhos (Compras / Lixo / Carga)',
    'Verificação de copos / Papel higiênico / Papel toalha',
  ],
  weekly: [
    'Limpeza Administração – (Mesas / Geladeira / Pia / Banheiro)',
    'Limpeza Banheiro Salão – Segunda (ou Sexta caso haja festa)',
    'Limpeza dos Ralos (Bocas de Lobo) – Sexta-feira ou quando houver previsão de chuva forte',
    'Limpeza / Manutenção Jardim do Canal (Externo – Ciclovia) – Varrição / Capina',
    'Manutenção Pedras Portuguesas',
    'Limpeza Banheiro / Vestiário Funcionários',
    'Limpeza dos Portões Garagem e Pedestres – Canal e Américas',
    'Limpeza Copa Funcionários – Microondas / Geladeira / Ventilador / Pia (Cuba e Bancada)',
    'Verificação de Caixas de Gordura das Alamedas',
  ],
  biweekly: [
    'Cortar Grama Américas / Gramadão / Alameda 1 / 3 Casas',
    'Lavagem da Churrasqueira',
    'Lavagem Bancos e Lixeiras dos Postes',
    'Lavagem de Toldos do Salão',
    'Poda de Plantas que impedem as Alamedas e Câmeras',
    'Lavagem das Luminárias',
  ],
  monthly: [
    'Limpeza Calhas e Telhados Salão / Administração / Guaritas',
    'Limpeza das Caixas d\'Água Salão e Administração',
    'Lavagem das Alamedas',
  ],
  quarterly: [
    'Limpar Portas dos PCs de Energia',
  ],
};

export const useTaskStore = create(
  persist(
    (set) => ({
      tasks: DEFAULT_TASKS,

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

      resetTasks: () => {
        if (confirm('Deseja resetar todas as tarefas para o padrão original?')) {
          set({ tasks: DEFAULT_TASKS });
        }
      }
    }),
    {
      name: 'sainttropez_board_v3',
    }
  )
);
