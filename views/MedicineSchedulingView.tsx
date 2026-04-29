import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructionModal from '../components/InstructionModal';
import { useFlow } from '../context/FlowContext';

const MedicineSchedulingView: React.FC = () => {
  const navigate = useNavigate();
  const { flowState, updateFlowState } = useFlow();
  const [showModal, setShowModal] = useState(true);
  const [examDate, setExamDate] = useState<string>('');
  const [observacoes, setObservacoes] = useState<string>('');

  // Calculate minimum date (5 business days from today)
  const getMinBusinessDate = (daysToAdd: number) => {
    let date = new Date();
    let addedDays = 0;
    while (addedDays < daysToAdd) {
      date.setDate(date.getDate() + 1);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        addedDays++;
      }
    }
    return date.toISOString().split('T')[0];
  };

  const minDate = getMinBusinessDate(5);

  const isBusinessDay = (dateString: string) => {
    if (!dateString) return false;
    const date = new Date(dateString + 'T00:00:00');
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const isValidDate = examDate && examDate >= minDate && isBusinessDay(examDate);

  const handleConfirm = () => {
    if (!isValidDate) return;
    updateFlowState({ 
      status: 'Aguardando confirmação de agendamento',
      dataExame: examDate,
      observacaoMedicinaAgendamento: observacoes
    });
    navigate('/medicine-confirmation');
  };

  return (
    <>
      <InstructionModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title="Agendamento de Exame"
        description="A Medicina do Trabalho solicitou um exame ocupacional para esta movimentação. Por favor, agende a data do exame para o colaborador."
      />

      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-card-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight flex items-center gap-3">
              <span className="material-icons-outlined text-orange-500 text-4xl">calendar_month</span>
              Agendamento de Exame
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium mt-1 ml-12">Solicitação <span className="text-orange-500 font-bold">#000008</span></p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/consultation')} className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Voltar</button>
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
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/30">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-blue-700 dark:text-blue-300">Medicina do Trabalho</span>
                    <span className="text-[10px] text-blue-400">21/10/2024 09:15</span>
                  </div>
                  <p className="text-sm text-blue-800 dark:text-blue-200 italic">"Necessário exame clínico para a nova função. Favor agendar."</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Scheduling Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 border-b border-orange-100 dark:border-orange-800/30">
                <h2 className="text-sm font-black text-orange-700 dark:text-orange-300 uppercase tracking-widest flex items-center gap-2">
                  <span className="material-icons-outlined text-orange-500">event</span>
                  Agendar Exame
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Data do Exame <span className="text-red-500">*</span></label>
                    <input 
                      type="date" 
                      min={minDate}
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
                      className={`w-full bg-gray-50 dark:bg-gray-800 rounded-xl border-2 p-3 text-sm focus:ring-primary focus:border-primary ${examDate && !isValidDate ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`} 
                    />
                    {examDate && !isValidDate && (
                      <p className="text-red-500 text-[10px] mt-1 font-bold">
                        {examDate < minDate ? 'A data deve ser no mínimo 5 dias úteis após hoje.' : 'Selecione um dia útil (Segunda a Sexta).'}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      <span className="material-icons-outlined text-[14px]">info</span>
                      Mínimo 5 dias úteis.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Observações (Opcional)</label>
                  <textarea 
                    rows={4} 
                    placeholder="Insira observações relevantes para a clínica..." 
                    className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl border-gray-200 dark:border-gray-700 p-3 text-sm focus:ring-primary focus:border-primary resize-none"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
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
                disabled={!isValidDate}
                className="bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Encaminhar para Saúde
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicineSchedulingView;
