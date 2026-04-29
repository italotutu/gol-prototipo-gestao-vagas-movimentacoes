
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructionModal from '../components/InstructionModal';
import { useFlow } from '../context/FlowContext';
import { 
  Section, 
  SolicitanteSection, 
  DataRow,
  AttachmentSection
} from './JobOpeningView';
import { SalaryChangeStepper } from './SalaryChangeRequestView';

const BPSalaryAnalysisView: React.FC = () => {
  const navigate = useNavigate();
  const { flowState, updateFlowState } = useFlow();
  const [showModal, setShowModal] = useState(true);

  const handleApprove = () => {
    updateFlowState({ status: 'Concluída' });
    navigate('/movement-conclusion');
  };

  const handleReject = () => {
    updateFlowState({ status: 'Cancelado' });
    navigate('/movement-conclusion');
  };

  return (
    <>
      <InstructionModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title="Análise BP - Mudança Salarial"
        description="Analise os dados da solicitação de mudança salarial e tome uma decisão. A aprovação resultará na atualização automática da remuneração no sistema RM."
      />

      <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sticky top-0 bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-sm z-30 py-2 border-b border-gray-100 dark:border-gray-800">
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">Análise BP - Mudança Salarial</h1>
          <div className="flex gap-3">
            <button onClick={() => navigate('/')} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-2.5 rounded-lg shadow-sm font-bold hover:bg-gray-50 transition-all">Voltar</button>
            <button onClick={handleReject} className="bg-red-500 hover:bg-red-600 text-white px-8 py-2.5 rounded-lg shadow-lg font-bold transition-all">Reprovar</button>
            <button onClick={handleApprove} className="bg-green-600 hover:bg-green-700 text-white px-10 py-2.5 rounded-lg shadow-lg font-bold transition-all transform hover:scale-105">Aprovar</button>
          </div>
        </div>

        <SalaryChangeStepper activeStep="Análise BP" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLUNA ESQUERDA */}
          <div className="lg:col-span-1 space-y-6">
            <SolicitanteSection 
              cif={flowState.cif} 
              solicitante={flowState.solicitante} 
              funcao={flowState.funcao} 
              data={flowState.dataSolicitacao} 
            />
            <Section title="Anexos" icon="attach_file">
              <div className="space-y-2">
                {flowState.attachments.map((file: any) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shadow-sm">
                        <span className="material-icons-round text-xl">description</span>
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300 truncate max-w-[140px]">{file.name}</span>
                    </div>
                    <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-primary transition-transform active:scale-90"><span className="material-icons-outlined text-sm">download</span></button>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* COLUNA DIREITA */}
          <div className="lg:col-span-2 space-y-6">
            <Section title="Informações da Solicitação" icon="info">
              <div className="space-y-4">
                <DataRow label="Gestor da Vaga" value="João Gomes" />
                <DataRow label="Motivo da Solicitação" value="Mudança Salarial" />
                <DataRow label="Classificação" value={flowState.classificacaoMudancaSalarial || "Mérito"} />
              </div>
            </Section>

            <Section title="Dados da Mudança Salarial" icon="payments">
              <div className="space-y-4">
                <DataRow label="Colaborador" value="Júlio Cesar" />
                <DataRow label="Função" value="Analista de Sistemas PL" />
                <DataRow label="Cód. Seção" value="12000.0.0.0.1.00.05.00.01.02.MA1234" />
                <DataRow label="Admissão" value="15/05/2021" />
                <DataRow label="Nome da Área" value="Tecnologia da Informação (T.I.)" />
                <DataRow label="Percentual de Aumento" value={flowState.percentualAumento || "15%"} />
                <DataRow label="Vigência da Alteração" value={`${flowState.vigenciaMes} / ${flowState.vigenciaAno}`} />
              </div>
            </Section>

            <Section title="Justificativa" icon="description">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-sm italic text-gray-600 dark:text-gray-400">
                "{flowState.justificativaMudancaSalarial || "Nenhuma justificativa fornecida."}"
              </div>
            </Section>

            <Section title="Decisão do BP" icon="fact_check">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Parecer / Observação do BP</label>
                  <textarea 
                    className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 p-4 text-sm min-h-[100px] focus:ring-primary focus:border-primary" 
                    placeholder="Insira seu parecer sobre a solicitação..."
                    value={flowState.parecerBP}
                    onChange={(e) => updateFlowState({ parecerBP: e.target.value })}
                  ></textarea>
                </div>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
};

export default BPSalaryAnalysisView;
