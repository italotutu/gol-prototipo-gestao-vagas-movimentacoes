import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructionModal from '../components/InstructionModal';
import { useFlow } from '../context/FlowContext';
import { Stepper } from './JobOpeningView';

const FutureManagerDecisionView: React.FC = () => {
  const navigate = useNavigate();
  const { flowState, updateFlowState } = useFlow();
  const [showModal, setShowModal] = useState(true);
  const [decision, setDecision] = useState<string>('');
  const [justificativa, setJustificativa] = useState<string>('');

  const handleConfirm = () => {
    if (decision === 'encerrar') {
      updateFlowState({ 
        status: 'Cancelado',
        decisaoGestorFuturo: 'encerrar'
      });
      navigate('/movement-conclusion');
    } else {
      updateFlowState({ 
        status: 'Aguardando Admissão',
        decisaoGestorFuturo: 'prosseguir'
      });
      // Navigate to admission stage or conclusion depending on the existing flow
      navigate('/movement-conclusion');
    }
  };

  const getMotivoLabel = (motivo: string) => {
    switch (motivo) {
      case 'inapto': return 'Inapto para a função';
      case 'restricao': return 'Restrição médica impeditiva';
      case 'outros': return 'Outros';
      default: return motivo;
    }
  };

  return (
    <>
      <InstructionModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title="Decisão do Gestor Futuro"
        description="A Medicina do Trabalho apontou restrições para esta movimentação. Como Gestor Futuro, você deve decidir se deseja prosseguir com a movimentação assumindo os riscos/restrições ou encerrar o processo."
      />

      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-card-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight flex items-center gap-3">
              <span className="material-icons-outlined text-red-500 text-4xl">warning</span>
              Decisão do Gestor Futuro
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium mt-1 ml-12">Solicitação <span className="text-red-500 font-bold">#000008</span></p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/consultation')} className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Voltar</button>
          </div>
        </div>

        <Stepper 
          activeStep="Decisão Gestor" 
          cenario={flowState.cenario} 
          fluxo={flowState.fluxo} 
          resultadoMedicina={flowState.resultadoMedicina}
          motivoReprovacaoMedicina={flowState.motivoReprovacaoMedicina}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Employee Data */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="material-icons-outlined text-gray-400">person</span>
                  Dados do Colaborador
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Nome</label>
                  <div className="font-bold text-gray-800 dark:text-gray-200">{flowState.candidatoNome || "João Silva"}</div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Matrícula</label>
                  <div className="font-bold text-gray-800 dark:text-gray-200">987654</div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Cargo Atual</label>
                  <div className="font-bold text-gray-800 dark:text-gray-200">Agente de Aeroporto</div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Unidade Atual</label>
                  <div className="font-bold text-gray-800 dark:text-gray-200">CGH</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="material-icons-outlined text-gray-400">work</span>
                  Nova Posição
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Cargo Proposto</label>
                  <div className="font-bold text-gray-800 dark:text-gray-200">{flowState.cargo || "Supervisor de Rampa"}</div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Unidade Proposta</label>
                  <div className="font-bold text-gray-800 dark:text-gray-200">{flowState.filial || "GRU"}</div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Departamento</label>
                  <div className="font-bold text-gray-800 dark:text-gray-200">{flowState.departamento || "Operações de Rampa"}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="material-icons-outlined text-gray-400">history</span>
                  Resultado da Medicina
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-100 dark:border-red-800/30">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-red-700 dark:text-red-300">Medicina do Trabalho</span>
                    <span className="text-[10px] text-red-400">24/10/2024 16:45</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-[10px] font-black text-red-400 uppercase tracking-widest block mb-1">Status</span>
                    <div className="text-sm font-bold text-red-800 dark:text-red-200">Reprovado / Restrito</div>
                  </div>
                  <div className="mb-2">
                    <span className="text-[10px] font-black text-red-400 uppercase tracking-widest block mb-1">Motivo</span>
                    <div className="text-sm font-bold text-red-800 dark:text-red-200">{getMotivoLabel(flowState.motivoReprovacaoMedicina)}</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-red-400 uppercase tracking-widest block mb-1">Observações</span>
                    <p className="text-sm text-red-800 dark:text-red-200 italic">"{flowState.observacaoMedicinaFinal || 'Sem observações adicionais.'}"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Decision Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 border-b border-red-100 dark:border-red-800/30">
                <h2 className="text-sm font-black text-red-700 dark:text-red-300 uppercase tracking-widest flex items-center gap-2">
                  <span className="material-icons-outlined text-red-500">gavel</span>
                  Tomada de Decisão
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Decisão do Gestor Futuro</label>
                  <div className="flex flex-col md:flex-row gap-4">
                    <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${decision === 'prosseguir' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                      <input type="radio" name="decision" value="prosseguir" className="hidden" onChange={(e) => setDecision(e.target.value)} />
                      <span className="material-icons-outlined">{decision === 'prosseguir' ? 'radio_button_checked' : 'radio_button_unchecked'}</span>
                      <span className="font-bold">Seguir com o colaborador</span>
                    </label>
                    <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${decision === 'encerrar' ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                      <input type="radio" name="decision" value="encerrar" className="hidden" onChange={(e) => setDecision(e.target.value)} />
                      <span className="material-icons-outlined">{decision === 'encerrar' ? 'radio_button_checked' : 'radio_button_unchecked'}</span>
                      <span className="font-bold">Não seguir com o colaborador</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Justificativa <span className="text-red-500">*</span></label>
                  <textarea 
                    rows={4} 
                    placeholder="Justifique sua decisão..." 
                    className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl border-gray-200 dark:border-gray-700 p-3 text-sm focus:ring-primary focus:border-primary resize-none"
                    value={justificativa}
                    onChange={(e) => setJustificativa(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={() => navigate('/consultation')} className="border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold py-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95">
                Cancelar
              </button>
              <button 
                onClick={handleConfirm}
                disabled={!decision || !justificativa}
                className="bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Enviar Decisão
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FutureManagerDecisionView;
