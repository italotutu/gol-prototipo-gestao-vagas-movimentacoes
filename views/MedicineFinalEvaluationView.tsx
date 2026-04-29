import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructionModal from '../components/InstructionModal';
import { useFlow } from '../context/FlowContext';

const MedicineFinalEvaluationView: React.FC = () => {
  const navigate = useNavigate();
  const { flowState, updateFlowState } = useFlow();
  const [showModal, setShowModal] = useState(true);
  const [status, setStatus] = useState<string>('');
  const [motivoReprovacao, setMotivoReprovacao] = useState<string>('');
  const [observacoes, setObservacoes] = useState<string>('');

  const handleConfirm = () => {
    if (status === 'aprovado') {
      updateFlowState({ 
        status: 'Aprovado pela Medicina',
        resultadoMedicina: 'aprovado',
        observacaoMedicinaFinal: observacoes
      });
      navigate('/movement-conclusion');
    } else if (status === 'reprovado') {
      // Rule: If "Inapto para a função", the process ends here.
      // If "Restrição Médica Impeditiva" or "Outros", it goes to Future Manager Decision.
      const isProcessEnd = motivoReprovacao === 'inapto';
      
      if (isProcessEnd) {
        updateFlowState({ 
          status: 'Processo Encerrado - Inapto para Função',
          resultadoMedicina: 'reprovado',
          motivoReprovacaoMedicina: motivoReprovacao,
          observacaoMedicinaFinal: observacoes,
          colaboradorInapto: true
        });
        navigate('/movement-conclusion');
      } else {
        updateFlowState({ 
          status: 'Reprovado / Restrito pela Medicina',
          resultadoMedicina: 'reprovado',
          motivoReprovacaoMedicina: motivoReprovacao,
          observacaoMedicinaFinal: observacoes
        });
        navigate('/future-manager-decision');
      }
    }
  };

  return (
    <>
      <InstructionModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title="Avaliação Final da Medicina"
        description="Registre o resultado final da avaliação médica ocupacional. Em caso de reprovação ou restrição, o Gestor Futuro será acionado para decisão."
      />

      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-card-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight flex items-center gap-3">
              <span className="material-icons-outlined text-blue-500 text-4xl">health_and_safety</span>
              Avaliação Final da Medicina
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium mt-1 ml-12">Solicitação <span className="text-blue-500 font-bold">#000008</span></p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/medicine-consultation')} className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Voltar</button>
          </div>
        </div>

        {/* Stepper */}
        <div className="bg-white dark:bg-card-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 overflow-x-auto">
          <div className="flex items-center min-w-max">
            <div className="flex items-center text-green-500">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center font-bold border-2 border-green-500">
                <span className="material-icons-outlined text-sm">check</span>
              </div>
              <span className="ml-3 font-bold text-sm">Abertura</span>
            </div>
            <div className="w-16 h-0.5 bg-green-500 mx-4"></div>
            <div className="flex items-center text-green-500">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center font-bold border-2 border-green-500">
                <span className="material-icons-outlined text-sm">check</span>
              </div>
              <span className="ml-3 font-bold text-sm">Aprovação BP</span>
            </div>
            <div className="w-16 h-0.5 bg-green-500 mx-4"></div>
            <div className="flex items-center text-blue-600">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center font-bold border-2 border-blue-600 ring-4 ring-blue-50 dark:ring-blue-900/20">3</div>
              <span className="ml-3 font-bold text-sm">Medicina (Avaliação Final)</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-200 dark:bg-gray-700 mx-4"></div>
            <div className="flex items-center text-gray-400">
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold border-2 border-gray-200 dark:border-gray-700">4</div>
              <span className="ml-3 font-bold text-sm">Conclusão</span>
            </div>
          </div>
        </div>

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
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Código da Seção Atual</label>
                  <div className="font-bold text-gray-800 dark:text-gray-200">12000.0.0.0.1.00.05.00.01.02.MA1234</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="material-icons-outlined text-gray-400">history</span>
                  Histórico de Observações
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Gestor Atual</span>
                    <span className="text-[10px] text-gray-400">22/10/2024 10:00</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">"Exame agendado para o dia {flowState.dataExame ? new Date(flowState.dataExame).toLocaleDateString('pt-BR') : '27/10/2024'}."</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Analysis Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 border-b border-blue-100 dark:border-blue-800/30">
                <h2 className="text-sm font-black text-blue-700 dark:text-blue-300 uppercase tracking-widest flex items-center gap-2">
                  <span className="material-icons-outlined text-blue-500">assignment</span>
                  Dados da Nova Posição
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Nova Unidade</label>
                  <div className="font-bold text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700">{flowState.filial || "GRU"}</div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Novo Setor</label>
                  <div className="font-bold text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700">{flowState.departamento || "Operações de Rampa"}</div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Novo Cargo</label>
                  <div className="font-bold text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700">{flowState.cargo || "Supervisor de Rampa"}</div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Código da Seção Proposta</label>
                  <div className="font-bold text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700">15036.0.0.0.3.00.08.00.01.04.MA6901</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="material-icons-outlined text-gray-400">fact_check</span>
                  Avaliação Final
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Status Final da Avaliação</label>
                  <div className="flex gap-4">
                    <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${status === 'aprovado' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                      <input type="radio" name="status" value="aprovado" className="hidden" onChange={(e) => setStatus(e.target.value)} />
                      <span className="material-icons-outlined">{status === 'aprovado' ? 'check_circle' : 'radio_button_unchecked'}</span>
                      <span className="font-bold">Aprovado</span>
                    </label>
                    <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${status === 'reprovado' ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                      <input type="radio" name="status" value="reprovado" className="hidden" onChange={(e) => setStatus(e.target.value)} />
                      <span className="material-icons-outlined">{status === 'reprovado' ? 'cancel' : 'radio_button_unchecked'}</span>
                      <span className="font-bold">Reprovado / Restrito</span>
                    </label>
                  </div>
                </div>

                {status === 'reprovado' && (
                  <div className="animate-fade-in">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Motivo da Reprovação / Restrição</label>
                    <select 
                      className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl border-gray-200 dark:border-gray-700 p-3 text-sm focus:ring-primary focus:border-primary appearance-none"
                      value={motivoReprovacao}
                      onChange={(e) => setMotivoReprovacao(e.target.value)}
                    >
                      <option value="">Selecione um motivo...</option>
                      <option value="inapto">Inapto para a função</option>
                      <option value="restricao">Restrição médica impeditiva</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Observações Finais (Opcional)</label>
                  <textarea 
                    rows={4} 
                    placeholder="Insira observações relevantes (sem detalhamento médico sensível)..." 
                    className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl border-gray-200 dark:border-gray-700 p-3 text-sm focus:ring-primary focus:border-primary resize-none"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                  ></textarea>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Evidências do Exame (Laudos / Pareceres)</label>
                  <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group">
                    <span className="material-icons-outlined text-gray-400 group-hover:text-blue-500 transition-colors text-3xl mb-2">cloud_upload</span>
                    <p className="text-xs text-gray-500 text-center">Clique ou arraste para anexar documentos</p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">PDF, JPG ou PNG (Máx 5MB)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={() => navigate('/medicine-consultation')} className="border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold py-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95">
                Cancelar
              </button>
              <button 
                onClick={handleConfirm}
                disabled={!status || (status === 'reprovado' && !motivoReprovacao)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Confirmar Avaliação
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicineFinalEvaluationView;
