
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructionModal from '../components/InstructionModal';
import { Section, Stepper, DisabledInput, AttachmentSection, SolicitanteSection, LogHistorySection, CommentHistorySection } from './JobOpeningView';
import { useFlow } from '../context/FlowContext';

const CompensationApprovalView: React.FC = () => {
  const navigate = useNavigate();
  const { flowState, updateFlowState } = useFlow();
  const [showModal, setShowModal] = useState(true);
  const [showRevisionBlock, setShowRevisionBlock] = useState(false);
  const [revisionText, setRevisionText] = useState('');
  const [attachments, setAttachments] = useState<{ id: string, name: string, isNew?: boolean }[]>([
    { id: '1', name: 'justificativa.pdf' },
    { id: '2', name: 'parecer_bp_01.pdf' }
  ]);

  const logs = [
    { user: 'João Silva Ramos', action: 'Abertura solicitada', date: '23/10/2023', time: '10:00' },
    { user: 'Admin Fluig', action: 'Parecer BP Gente registrado', date: '24/10/2023', time: '14:30' }
  ];

  const comments = [
    { user: 'João Silva Ramos', role: 'Solicitante', text: 'Necessidade de reforço na equipe de infraestrutura para novos projetos do triênio.', date: '23/10/2023 10:00' },
    { user: 'Admin Fluig', role: 'BP Gente e Cultura', text: 'Solicitação validada. O perfil está de acordo com as necessidades estratégicas da área de TI.', date: '24/10/2023 14:30' }
  ];

  const handleNext = () => {
    updateFlowState({ status: 'Em Tratativa' });
    navigate('/treatment');
  };

  const handleConfirmRevision = () => {
    if (!revisionText.trim()) return;
    updateFlowState({ 
      status: 'Ajuste Solicitado',
      revisionOrigin: 'Remuneração',
      revisionComment: revisionText
    });
    navigate('/consultation');
  };

  return (
    <>
      <InstructionModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title="Aprovação de Remuneração"
        description="Analise a viabilidade financeira e orçamentária para esta contratação baseando-se nos dados completos da solicitação."
      />

      <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sticky top-0 bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-sm z-30 py-2 border-b border-gray-100 dark:border-gray-800">
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">Aprovação de Remuneração</h1>
          <div className="flex gap-3">
            <button onClick={() => navigate('/approval')} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 px-6 py-2.5 rounded-lg shadow-sm font-bold hover:bg-gray-50 transition-all">Voltar</button>
            <button onClick={handleNext} className="bg-primary hover:bg-primary-hover text-white px-10 py-2.5 rounded-lg shadow-lg font-bold transform hover:scale-105 transition-all">Avançar</button>
          </div>
        </div>

        <Stepper activeStep="Remuneração" cenario={flowState.cenario} fluxo={flowState.fluxo} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLUNA ESQUERDA PADRONIZADA */}
          <div className="lg:col-span-1 space-y-6">
            <SolicitanteSection cif="21654984152" solicitante="João Silva Ramos" funcao="Gerente de T.I." data="23/10/2023" />
            <AttachmentSection 
              attachments={attachments} 
              onRemove={(id: string) => setAttachments(attachments.filter(a => a.id !== id))} 
              onAdd={() => setAttachments([...attachments, { id: Date.now().toString(), name: `analise_remu_${attachments.length + 1}.pdf`, isNew: true }])}
            />
            <LogHistorySection logs={logs} />
          </div>

          {/* COLUNA DIREITA PRINCIPAL */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-xl p-4 flex items-start gap-3">
              <span className="material-icons-round text-orange-500 mt-0.5">info</span>
              <p className="text-sm text-orange-800 dark:text-orange-200 font-medium leading-relaxed">
                O colaborador será movimentado somente após a finalização de todo o processo.
              </p>
            </div>

            <Section title="Informações da Solicitação (Original)" icon="description">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DisabledInput label="Gestor" value="Carlos Souza" />
                <DisabledInput label="Motivo da Solicitação" value={flowState.motivo} />
                <DisabledInput label="Tipo de Recrutamento" value={flowState.fluxo === 'interno' ? 'Interno (Movimentação)' : flowState.fluxo === 'externo' ? 'Externo' : 'Misto'} />
                <DisabledInput label="Departamento" value={flowState.departamento || "Tecnologia da Informação"} />
                <DisabledInput label="Cargo" value={flowState.cargo || "Analista Sênior"} />
                <DisabledInput label="Código da Seção Proposta" value="15036.0.0.0.3.00.08.00.01.04.MA6901" />
                <DisabledInput label="Quantidade de Vagas" value={flowState.quantidade} />
                <DisabledInput label="Mesmo Perfil?" value="Sim" />
                <DisabledInput label="Filial" value={flowState.filial || "São Paulo - SEDE"} />
                <DisabledInput label="UGB" value="TI_INFRA_01" />
                <DisabledInput label="Salário Estimado" value={flowState.salario || "R$ 9.800,00"} badge="+12%" />
                <DisabledInput label="Jornada Mensal" value={flowState.jornada || "220h"} />
                {flowState.motivo === 'Substituição' && (
                  <>
                    <DisabledInput label="Colaborador Substituído" value={flowState.colaboradorSubstituido} />
                    <DisabledInput label="Código da Seção Atual" value="12000.0.0.0.1.00.05.00.01.02.MA1234" />
                    <DisabledInput label="Motivo Substituição" value={flowState.motivoSubstituicao} />
                  </>
                )}
              </div>
            </Section>

            <CommentHistorySection comments={comments} />

            <Section title="Parecer de Remuneração" icon="rate_review">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Análise de Grade Salarial</label>
                  <textarea className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl p-4 text-sm min-h-[150px] focus:ring-primary focus:border-primary" placeholder="Registre seu parecer financeiro..."></textarea>
                </div>

                {showRevisionBlock && (
                  <div className="p-6 bg-orange-50 dark:bg-orange-900/10 border-2 border-orange-200 dark:border-orange-800/30 rounded-2xl space-y-4 animate-fade-in">
                    <div className="flex items-start gap-3">
                      <span className="material-icons-round text-orange-500">info</span>
                      <div className="space-y-1">
                        <p className="text-sm text-orange-800 dark:text-orange-200 font-bold">Solicitar Revisão</p>
                        <p className="text-xs text-orange-700 dark:text-orange-300">
                          A solicitação será devolvida ao gestor que abriu a vaga; o gestor solicitante deverá ajustar as informações solicitadas.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-orange-400 tracking-widest ml-1">O que precisa ser ajustado? <span className="text-red-500">*</span></label>
                      <textarea 
                        value={revisionText}
                        onChange={(e) => setRevisionText(e.target.value)}
                        className="w-full bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-700 rounded-xl p-4 text-sm focus:ring-orange-500 focus:border-orange-500 min-h-[100px]" 
                        placeholder="Detalhe os ajustes necessários..."
                      ></textarea>
                    </div>

                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => setShowRevisionBlock(false)}
                        className="px-6 py-2 rounded-lg font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button 
                        onClick={handleConfirmRevision}
                        disabled={!revisionText.trim()}
                        className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-2 rounded-lg font-bold shadow-lg transition-all active:scale-95"
                      >
                        Confirmar Revisão
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    disabled={showRevisionBlock}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
                  >
                    Aprovar Proposta
                  </button>
                  <button 
                    disabled={showRevisionBlock}
                    onClick={() => setShowRevisionBlock(true)}
                    className="border-2 border-red-500 text-red-500 font-bold py-4 rounded-xl hover:bg-red-50 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                  >
                    Revisão Necessária
                  </button>
                </div>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompensationApprovalView;
