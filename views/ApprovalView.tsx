
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructionModal from '../components/InstructionModal';
import { Section, Stepper, DisabledInput, AttachmentSection, SolicitanteSection, LogHistorySection } from './JobOpeningView';
import { useFlow } from '../context/FlowContext';

const ApprovalView: React.FC = () => {
  const navigate = useNavigate();
  const { flowState, updateFlowState } = useFlow();
  const [showModal, setShowModal] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [showRevisionBlock, setShowRevisionBlock] = useState(false);
  const [revisionText, setRevisionText] = useState('');
  const [attachments, setAttachments] = useState<{ id: string, name: string, isNew?: boolean }[]>([
    { id: '1', name: 'justificativa.pdf' }
  ]);

  const logs = [
    { user: 'João Silva Ramos', action: 'Abertura solicitada', date: '23/10/2023', time: '10:00' }
  ];

  const handleApprove = () => {
    setIsApproved(true);
    setShowConfirmModal(false);
  };

  const handleNext = () => {
    updateFlowState({ status: 'Aguardando Remuneração' });
    navigate('/compensation-approval');
  };

  const handleConfirmRevision = () => {
    if (!revisionText.trim()) return;
    updateFlowState({ 
      status: 'Ajuste Solicitado',
      revisionOrigin: 'BP Gente e Cultura',
      revisionComment: revisionText
    });
    navigate('/consultation');
  };

  return (
    <>
      <InstructionModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title="BP Gente e Cultura"
        description="Analise a solicitação de abertura de vaga e registre seu parecer para continuidade do processo."
      />

      {/* MODAL DE CONFIRMAÇÃO DE APROVAÇÃO */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-card-dark rounded-[2rem] shadow-2xl p-8 max-w-sm w-full mx-4 border border-gray-100 dark:border-gray-800 animate-scale-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <span className="material-icons-round text-4xl">check_circle</span>
              </div>
              <h2 className="text-xl font-black text-gray-800 dark:text-white mb-2">Confirmar aprovação</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 font-medium">Deseja mesmo aprovar o processo?</p>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setShowConfirmModal(false)}
                  className="py-3.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleApprove}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-95"
                >
                  Aprovar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sticky top-0 bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-sm z-30 py-2 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">Aprovação BP Gente e Cultura</h1>
            <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-1 rounded-full border border-orange-200">SLA BP: 3 dias</span>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/open-solicitation')} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 px-6 py-2.5 rounded-lg shadow-sm font-bold hover:bg-gray-50 transition-all">Voltar</button>
            <button onClick={handleNext} className="bg-primary hover:bg-primary-hover text-white px-10 py-2.5 rounded-lg shadow-lg font-bold transform hover:scale-105 transition-all">Avançar</button>
          </div>
        </div>

        <Stepper activeStep="BP Gente e Cultura" cenario={flowState.cenario} fluxo={flowState.fluxo} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLUNA ESQUERDA PADRONIZADA */}
          <div className="lg:col-span-1 space-y-6">
            <SolicitanteSection cif="21654984152" solicitante="João Silva Ramos" funcao="Gerente de T.I." data="23/10/2023" />
            <AttachmentSection 
              attachments={attachments} 
              onRemove={(id: string) => setAttachments(attachments.filter(a => a.id !== id))} 
              onAdd={() => setAttachments([...attachments, { id: Date.now().toString(), name: `anexo_bp_${attachments.length + 1}.pdf`, isNew: true }])} 
            />
            <LogHistorySection logs={logs} />
          </div>

          {/* COLUNA DIREITA PRINCIPAL */}
          <div className="lg:col-span-2 space-y-6">
            <Section title="Informações da Solicitação (Original)" icon="description">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DisabledInput label="Gestor" value="Carlos Souza" />
                <DisabledInput label="Motivo" value={flowState.motivo} />
                <DisabledInput label="Recrutamento" value={flowState.fluxo === 'interno' ? 'Interno (Movimentação)' : flowState.fluxo === 'externo' ? 'Externo' : 'Misto'} />
                <DisabledInput label="Departamento" value={flowState.departamento || "Tecnologia da Informação"} />
                <DisabledInput label="Cargo" value={flowState.cargo || "Analista Sênior"} />
                <DisabledInput label="Código da Seção Proposta" value="15036.0.0.0.3.00.08.00.01.04.MA6901" />
                <DisabledInput label="Quantidade" value={flowState.quantidade} />
                <DisabledInput label="Filial" value={flowState.filial || "São Paulo - SEDE"} />
                <DisabledInput label="UGB" value="TI_INFRA_01" />
                <DisabledInput label="Salário Estimado" value={flowState.salario || "R$ 9.800,00"} />
                <DisabledInput label="Vaga PCD" value="Não" />
                {flowState.motivo === 'Substituição' && (
                  <>
                    <DisabledInput label="Colaborador Substituído" value={flowState.colaboradorSubstituido} />
                    <DisabledInput label="Código da Seção Atual" value="12000.0.0.0.1.00.05.00.01.02.MA1234" />
                    <DisabledInput label="Motivo Substituição" value={flowState.motivoSubstituicao} />
                  </>
                )}
                <div className="md:col-span-2">
                   <DisabledInput label="Justificativa do Solicitante" value="Necessidade de reforço na equipe de infraestrutura para novos projetos do triênio." />
                </div>
              </div>
            </Section>

            <Section title="Parecer da Aprovação BP" icon="rate_review">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Observações do BP</label>
                  <textarea 
                    disabled={isApproved}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl p-4 text-sm focus:ring-primary focus:border-primary min-h-[150px] disabled:opacity-60 disabled:cursor-not-allowed" 
                    placeholder="Registre seu parecer..."
                  ></textarea>
                </div>

                {isApproved && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 rounded-xl flex items-center gap-3 animate-fade-in">
                    <span className="material-icons-round text-green-600">info</span>
                    <p className="text-green-800 dark:text-green-200 text-sm font-bold">
                      Processo aprovado. Para ir para a próxima tela, clique em avançar.
                    </p>
                  </div>
                )}

                {showRevisionBlock && (
                  <div className="p-6 bg-orange-50 dark:bg-orange-900/10 border-2 border-orange-200 dark:border-orange-800/30 rounded-2xl space-y-4 animate-fade-in">
                    <div className="flex items-start gap-3">
                      <span className="material-icons-round text-orange-500">info</span>
                      <div className="space-y-1">
                        <p className="text-sm text-orange-800 dark:text-orange-200 font-bold">Solicitar Revisão</p>
                        <p className="text-xs text-orange-700 dark:text-orange-300">
                          A solicitação será devolvida ao gestor que abriu a vaga; o gestor solicitante deverá realizar os ajustes solicitados.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-orange-400 tracking-widest ml-1">O que precisa ser ajustado? <span className="text-red-500">*</span></label>
                      <textarea 
                        value={revisionText}
                        onChange={(e) => setRevisionText(e.target.value)}
                        className="w-full bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-700 rounded-xl p-4 text-sm focus:ring-orange-500 focus:border-orange-500 min-h-[100px]" 
                        placeholder="Descreva detalhadamente os ajustes necessários..."
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    disabled={isApproved || showRevisionBlock}
                    onClick={() => setShowConfirmModal(true)}
                    className={`font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 ${isApproved ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-green-600 hover:bg-green-700 text-white'} ${(isApproved || showRevisionBlock) ? 'opacity-50' : ''}`}
                  >
                    {isApproved ? 'Aprovado' : 'Aprovar Processo'}
                  </button>
                  <button 
                    disabled={isApproved || showRevisionBlock}
                    onClick={() => setShowRevisionBlock(true)}
                    className="border-2 border-orange-500 text-orange-500 font-bold py-4 rounded-xl hover:bg-orange-50 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                  >
                    Revisar
                  </button>
                  <button 
                    disabled={isApproved || showRevisionBlock}
                    className="border-2 border-red-500 text-red-500 font-bold py-4 rounded-xl hover:bg-red-50 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                  >
                    Reprovar
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

export default ApprovalView;
