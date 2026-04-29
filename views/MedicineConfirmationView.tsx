import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../context/FlowContext';

const MedicineConfirmationView: React.FC = () => {
  const navigate = useNavigate();
  const { flowState, updateFlowState } = useFlow();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [examDate, setExamDate] = useState<string>(flowState.dataExame || '');
  const [examTime, setExamTime] = useState<string>(flowState.horarioExame || '');
  const [examLocation, setExamLocation] = useState<string>(flowState.localExame || '');
  const [examInstructions, setExamInstructions] = useState<string>(flowState.orientacoesExame || '');

  const handleConfirm = () => {
    setIsConfirmed(true);
    updateFlowState({ 
      status: 'Aguardando avaliação final da Medicina',
      dataExame: examDate,
      horarioExame: examTime,
      localExame: examLocation,
      orientacoesExame: examInstructions
    });
    
    // Short delay to show feedback before navigating back to consultation
    setTimeout(() => {
      navigate('/medicine-consultation');
    }, 3000);
  };

  const handleRequestRevision = () => {
    updateFlowState({ 
      status: 'Aguardando Agendamento'
    });
    navigate('/medicine-consultation');
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-card-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight flex items-center gap-3">
            <span className="material-icons-outlined text-blue-500 text-4xl">verified</span>
            Confirmação de Agendamento
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-1 ml-12">Área de Saúde - Validação de Data e Horário</p>
        </div>
      </div>

      {isConfirmed ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 rounded-2xl p-10 text-center animate-scale-in">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200 dark:shadow-none">
            <span className="material-icons-outlined text-white text-4xl">check</span>
          </div>
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">Agendamento confirmado</h2>
          <p className="text-green-700 dark:text-green-300 font-medium">E-mail enviado ao colaborador e ao gestor, com cópia para a equipe de Medicina.</p>
          <p className="text-green-600/60 dark:text-green-400/60 text-sm mt-4 italic">Redirecionando para a tela de consulta...</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <span className="material-icons-outlined text-gray-400">assignment_ind</span>
                Dados da Solicitação
              </h2>
            </div>
            <div className="p-6 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Colaborador</label>
                    <div className="font-bold text-gray-800 dark:text-gray-200 text-lg">{flowState.candidatoNome || "João Silva"}</div>
                    <div className="text-xs text-gray-500 font-medium mt-0.5">Matrícula: 987654</div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Nova Posição</label>
                    <div className="font-bold text-gray-800 dark:text-gray-200">{flowState.cargo || "Supervisor de Rampa"}</div>
                    <div className="text-xs text-gray-500 font-medium mt-0.5">Unidade: {flowState.filial || "GRU"}</div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-6 border border-blue-100 dark:border-blue-800/30 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-1">Data do Exame <span className="text-red-500">*</span></label>
                      <input 
                        type="date" 
                        value={examDate}
                        onChange={(e) => setExamDate(e.target.value)}
                        className="w-full bg-white dark:bg-gray-800 rounded-xl border-blue-100 dark:border-blue-800 p-2.5 text-sm font-bold text-blue-900 dark:text-blue-100 focus:ring-blue-500 focus:border-blue-500" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-1">Horário do Exame <span className="text-red-500">*</span></label>
                      <input 
                        type="time" 
                        value={examTime}
                        onChange={(e) => setExamTime(e.target.value)}
                        className="w-full bg-white dark:bg-gray-800 rounded-xl border-blue-100 dark:border-blue-800 p-2.5 text-sm font-bold text-blue-900 dark:text-blue-100 focus:ring-blue-500 focus:border-blue-500" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-1">Local do Exame <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Ex: Clínica ABC - Unidade Centro"
                      value={examLocation}
                      onChange={(e) => setExamLocation(e.target.value)}
                      className="w-full bg-white dark:bg-gray-800 rounded-xl border-blue-100 dark:border-blue-800 p-2.5 text-sm font-bold text-blue-900 dark:text-blue-100 focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Orientações / Preparo do Exame / Mensagem Complementar</label>
                  <textarea 
                    rows={4} 
                    placeholder="Insira orientações de preparo, documentos necessários, etc..." 
                    className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl border-gray-200 dark:border-gray-700 p-3 text-sm focus:ring-primary focus:border-primary resize-none"
                    value={examInstructions}
                    onChange={(e) => setExamInstructions(e.target.value)}
                  ></textarea>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700 flex items-start gap-3">
                  <span className="material-icons-outlined text-gray-400 text-xl">info</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    Ao confirmar o agendamento, o sistema enviará automaticamente um e-mail ao <span className="font-bold">gestor atual</span> e ao <span className="font-bold">colaborador</span>, com cópia para a <span className="font-bold">equipe de Medicina</span>, contendo a data, horário, local e as orientações de preparo informadas acima.
                  </p>
                </div>
              </div>
            </div>

            {flowState.observacaoMedicinaAgendamento && (
              <div className="px-6 pb-6">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Observações do Gestor</label>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 italic">
                  "{flowState.observacaoMedicinaAgendamento}"
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            <button 
              onClick={handleRequestRevision} 
              className="flex-1 border-2 border-orange-500 text-orange-600 dark:text-orange-400 font-bold py-4 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="material-icons-outlined">edit_calendar</span>
              Solicitar revisão ao Gestor
            </button>
            <button 
              onClick={handleConfirm}
              className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="material-icons-outlined">check_circle</span>
              Confirmar Agendamento
            </button>
          </div>
          <div className="text-center">
            <button 
              onClick={() => navigate('/medicine-consultation')} 
              className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 underline"
            >
              Voltar para Consulta
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineConfirmationView;
