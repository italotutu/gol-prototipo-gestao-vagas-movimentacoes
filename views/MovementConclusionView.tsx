import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructionModal from '../components/InstructionModal';
import { useFlow } from '../context/FlowContext';

const MovementConclusionView: React.FC = () => {
  const navigate = useNavigate();
  const { flowState } = useFlow();
  const [showModal, setShowModal] = useState(true);

  const isCanceled = flowState.status === 'Cancelado';
  const isAwaitingAdmission = flowState.status === 'Aguardando Admissão';
  const isInapto = flowState.colaboradorInapto === true;
  const isSalaryChange = flowState.motivo === 'Mudança Salarial';

  return (
    <>
      <InstructionModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title={isSalaryChange ? "Conclusão da Mudança Salarial" : "Conclusão da Movimentação"}
        description="Esta tela representa o fim do processo. As ações sistêmicas foram disparadas e os dados foram atualizados conforme as aprovações."
      />

      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-card-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight flex items-center gap-3">
              <span className={`material-icons-outlined ${isCanceled || isInapto ? 'text-red-500' : isAwaitingAdmission ? 'text-orange-500' : 'text-green-500'} text-4xl`}>
                {isCanceled || isInapto ? 'cancel' : isAwaitingAdmission ? 'pending_actions' : 'task_alt'}
              </span>
              {isSalaryChange ? 'Mudança Salarial' : 'Movimentação'} {isCanceled ? 'Cancelada' : isInapto ? 'Encerrada (Inapto)' : isAwaitingAdmission ? 'Aguardando Admissão' : 'Concluída'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium mt-1 ml-12">Solicitação <span className={`${isCanceled || isInapto ? 'text-red-500' : isAwaitingAdmission ? 'text-orange-500' : 'text-green-500'} font-bold`}>#000008</span></p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/consultation')} className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Ir para Consulta</button>
          </div>
        </div>

        <div className="bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden p-10 text-center">
          <div className={`w-24 h-24 rounded-full ${isCanceled || isInapto ? 'bg-red-50 dark:bg-red-900/20' : isAwaitingAdmission ? 'bg-orange-50 dark:bg-orange-900/20' : 'bg-green-50 dark:bg-green-900/20'} flex items-center justify-center mx-auto mb-6`}>
            <span className={`material-icons-outlined ${isCanceled || isInapto ? 'text-red-500' : isAwaitingAdmission ? 'text-orange-500' : 'text-green-500'} text-6xl`}>
              {isCanceled || isInapto ? 'cancel' : isAwaitingAdmission ? 'pending_actions' : 'check_circle'}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {isCanceled ? 'Processo Cancelado' : isInapto ? 'Processo Encerrado - Inapto para Função' : isAwaitingAdmission ? 'Aguardando Processo de Admissão' : 'Processo Finalizado com Sucesso'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            {isSalaryChange 
              ? `A solicitação de mudança salarial do colaborador foi ${isCanceled ? 'reprovada pelo BP' : 'aprovada e processada'}.`
              : `A movimentação interna do colaborador <strong>${flowState.candidatoNome || "João Silva"}</strong> foi ${isCanceled ? 'cancelada pelo Gestor Futuro' : isInapto ? 'encerrada pela Medicina do Trabalho' : isAwaitingAdmission ? 'encaminhada para a área de Admissão' : 'concluída'}.`
            }
            {isCanceled 
              ? ' O processo foi encerrado e nenhuma alteração foi realizada.' 
              : isInapto 
                ? ' O colaborador foi avaliado como inapto para a nova função. O processo foi encerrado e o RM será atualizado com esta informação.' 
                : isAwaitingAdmission 
                  ? ' O Gestor Futuro decidiu prosseguir com a movimentação assumindo os riscos.' 
                  : isSalaryChange
                    ? ' A nova remuneração foi atualizada no sistema RM e entrará em vigor conforme a vigência informada.'
                    : ' Todas as aprovações e análises médicas foram realizadas. O colaborador está apto para assumir a nova posição.'
            }
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="material-icons-outlined text-gray-400 mb-2">person</span>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-1">Colaborador</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{isSalaryChange ? "Júlio Cesar" : (flowState.candidatoNome || "João Silva")} (987654)</p>
              <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-widest">Código da Seção Atual</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">12000.0.0.0.1.00.05.00.01.02.MA1234</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="material-icons-outlined text-gray-400 mb-2">{isSalaryChange ? 'payments' : 'work'}</span>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-1">{isSalaryChange ? 'Alteração' : 'Nova Posição'}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isSalaryChange 
                  ? `Aumento de ${flowState.percentualAumento || '15%'}` 
                  : `${flowState.cargo || "Supervisor de Rampa"} (${flowState.filial || "GRU"})`
                }
              </p>
              <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-widest">{isSalaryChange ? 'Vigência' : 'Código da Seção Proposta'}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                {isSalaryChange 
                  ? `${flowState.vigenciaMes} / ${flowState.vigenciaAno}` 
                  : "15036.0.0.0.3.00.08.00.01.04.MA6901"
                }
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="material-icons-outlined text-gray-400 mb-2">event</span>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-1">Data de Conclusão</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">25/10/2024</p>
            </div>
          </div>
          
          <div className="mt-10">
            <button onClick={() => navigate('/')} className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all active:scale-95">
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovementConclusionView;
