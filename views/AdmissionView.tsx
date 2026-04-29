
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructionModal from '../components/InstructionModal';
import { Section, Stepper, DisabledInput } from './JobOpeningView';
import { useFlow } from '../context/FlowContext';

const AdmissionView: React.FC = () => {
  const navigate = useNavigate();
  const { flowState, updateFlowState } = useFlow();
  const [showModal, setShowModal] = useState(true);

  const handleFinish = () => {
    updateFlowState({ status: 'Concluído' });
    navigate('/consultation');
  };

  return (
    <>
      <InstructionModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title="Fluxo Concluído"
        description="O processo de abertura de vaga foi finalizado e a pré-admissão foi iniciada em paralelo."
      />

      <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sticky top-0 bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-sm z-30 py-2 border-b border-gray-100 dark:border-gray-800">
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">Integração Final</h1>
          <div className="flex gap-3">
            <button onClick={() => navigate('/negotiation')} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 px-6 py-2.5 rounded-lg shadow-sm font-bold hover:bg-gray-50 transition-all">Voltar</button>
            <button onClick={handleFinish} className="bg-primary hover:bg-primary-hover text-white px-10 py-2.5 rounded-lg shadow-lg font-bold transform hover:scale-105 transition-all">Concluir</button>
          </div>
        </div>

        <Stepper activeStep="Admissão" cenario={flowState.cenario} fluxo={flowState.fluxo} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Section title="Candidato Admitido" icon="verified">
              <div className="space-y-4 text-center py-4">
                <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="material-icons-round text-4xl">person</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white text-lg">{flowState.candidatoNome || "Mariana Silva"}</h3>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">{flowState.cargo || "Analista Sênior de Marketing"}</p>
                </div>
              </div>
            </Section>

            <Section title="Histórico" icon="history">
               <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 px-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-800/30">
                    <span className="text-[10px] text-green-700 dark:text-green-400 font-black uppercase tracking-widest">Fluxo Finalizado</span>
                    <span className="text-green-800 dark:text-green-300 text-xs font-bold">28/10/2023</span>
                  </div>
               </div>
            </Section>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="size-12 rounded-2xl bg-orange-50 dark:bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                  <span className="material-icons-round text-3xl">task_alt</span>
                </div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Processo Concluído</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-base mb-8 leading-relaxed font-medium">
                O fluxo de abertura de vaga foi finalizado com sucesso. O processo de <strong>pré-admissão</strong> foi iniciado automaticamente no SAP SuccessFactors para que o RH dê continuidade à integração do colaborador.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={handleFinish} className="inline-flex items-center gap-3 bg-primary text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:brightness-110 transition-all active:scale-95 group">
                  <span className="material-icons-round">list</span>
                  <span>Ver em Consultas</span>
                  <span className="material-icons-round group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>

            <Section title="Dados Consolidados" icon="assignment_ind">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DisabledInput label="Cargo Final" value={flowState.cargo || "Analista Sênior"} />
                <DisabledInput label="Código da Seção Proposta" value="15036.0.0.0.3.00.08.00.01.04.MA6901" />
                <DisabledInput label="Tipo de Contrato" value={flowState.tipoContrato || "-"} />
                {flowState.tipoContrato === 'Outro' && (
                  <DisabledInput label="Descrição do Tipo de Contrato" value={flowState.descricaoTipoContrato} />
                )}
                <DisabledInput label="Data de Início" value="15/11/2023" />
                <DisabledInput label="Salário Final" value={flowState.salario || "R$ 9.800,00"} badge="+12%" />
                <DisabledInput label="Unidade" value={flowState.filial || "São Paulo - SEDE"} />
                <DisabledInput label="Código da Seção Atual" value="12000.0.0.0.1.00.05.00.01.02.MA1234" />
              </div>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmissionView;
