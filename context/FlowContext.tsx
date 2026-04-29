import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FlowState {
  // Solicitante
  solicitante: string;
  cif: string;
  funcao: string;
  dataSolicitacao: string;

  // Abertura
  gestor: string;
  motivo: string;
  tipo: string;
  cenario: string; // 'administrativo' | 'operacional'
  fluxo: string; // 'externo' | 'interno'
  departamento: string;
  cargo: string;
  quantidade: string;
  filial: string;
  ugb: string;
  jornada: string;
  salario: string;
  percentual: string;
  mesmoPerfil: string;
  tipoContrato: string;
  descricaoTipoContrato: string;
  justificativaAbertura: string;
  
  // Substituição
  colaboradorSubstituido: string;
  motivoSubstituicao: string;

  // Movimentação
  dadosMovimentacao: string;
  candidatoNome: string;

  // Anexos
  attachments: { id: string, name: string, isNew?: boolean }[];

  // Medicina
  necessitaExame: string; // 'sim' | 'nao'
  resultadoMedicina: string; // 'aprovado' | 'reprovado'
  dataExame: string;
  horarioExame: string;
  observacaoMedicinaInicial: string;
  observacaoMedicinaAgendamento: string;
  motivoReprovacaoMedicina: string;
  observacaoMedicinaFinal: string;

  // Decisão Gestor Futuro
  decisaoGestorFuturo: string; // 'prosseguir' | 'encerrar'

  // Status da solicitação
  status: string;

  // Mudança Salarial
  classificacaoMudancaSalarial: string;
  codSecao: string;
  admissaoColaborador: string;
  nomeArea: string;
  percentualAumento: string;
  vigenciaAno: string;
  vigenciaMes: string;
  justificativaMudancaSalarial: string;
  parecerBP: string;
  revisionOrigin?: string;
  revisionComment?: string;
}

const initialState: FlowState = {
  solicitante: 'João Silva Ramos',
  cif: '21654984152',
  funcao: 'Gerente de T.I.',
  dataSolicitacao: '23/10/2023',
  gestor: '1',
  motivo: 'Aumento de Quadro',
  tipo: 'Efetivo',
  cenario: 'operacional',
  fluxo: 'externo',
  departamento: '',
  cargo: '',
  quantidade: '1',
  filial: '',
  ugb: 'TI_INFRA_01',
  jornada: '',
  salario: '',
  percentual: '',
  mesmoPerfil: 'sim',
  tipoContrato: '',
  descricaoTipoContrato: '',
  justificativaAbertura: '',
  colaboradorSubstituido: '',
  motivoSubstituicao: '',
  dadosMovimentacao: '',
  candidatoNome: '',
  attachments: [{ id: '1', name: 'solicitacao_assiduidade.pdf' }],
  necessitaExame: 'sim',
  resultadoMedicina: 'aprovado',
  dataExame: '',
  horarioExame: '',
  observacaoMedicinaInicial: '',
  observacaoMedicinaAgendamento: '',
  motivoReprovacaoMedicina: '',
  observacaoMedicinaFinal: '',
  decisaoGestorFuturo: 'prosseguir',
  status: 'Aguardando Aprovação',
  classificacaoMudancaSalarial: '',
  codSecao: '',
  admissaoColaborador: '',
  nomeArea: '',
  percentualAumento: '',
  vigenciaAno: '2024',
  vigenciaMes: 'Julho',
  justificativaMudancaSalarial: '',
  parecerBP: '',
  revisionOrigin: '',
  revisionComment: '',
};

interface FlowContextProps {
  flowState: FlowState;
  updateFlowState: (updates: Partial<FlowState>) => void;
  resetFlowState: () => void;
}

const FlowContext = createContext<FlowContextProps | undefined>(undefined);

export const FlowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [flowState, setFlowState] = useState<FlowState>(initialState);

  const updateFlowState = (updates: Partial<FlowState>) => {
    setFlowState((prev) => ({ ...prev, ...updates }));
  };

  const resetFlowState = () => {
    setFlowState(initialState);
  };

  return (
    <FlowContext.Provider value={{ flowState, updateFlowState, resetFlowState }}>
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
};
