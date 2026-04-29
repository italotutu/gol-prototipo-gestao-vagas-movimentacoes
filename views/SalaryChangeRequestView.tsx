
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructionModal from '../components/InstructionModal';
import { useFlow } from '../context/FlowContext';
import { 
  Section, 
  SolicitanteSection, 
  AttachmentSection, 
  InputField, 
  SelectField, 
  DisabledInput,
  SearchableSelect,
  ZoomField
} from './JobOpeningView';

const SalaryChangeRequestView: React.FC = () => {
  const navigate = useNavigate();
  const { flowState, updateFlowState } = useFlow();
  const [showModal, setShowModal] = useState(true);

  const removeAttachment = (id: string) => {
    updateFlowState({ attachments: flowState.attachments.filter(a => a.id !== id) });
  };

  const handleSend = () => {
    updateFlowState({ status: 'Aguardando Análise BP' });
    navigate('/salary-change-bp-analysis');
  };

  return (
    <>
      <InstructionModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title="Solicitação de Mudança Salarial"
        description="Preencha os dados para solicitar uma alteração na remuneração do colaborador. Esta solicitação seguirá para análise do BP."
      />

      <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sticky top-0 bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-sm z-30 py-2 border-b border-gray-100 dark:border-gray-800">
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">Movimentação Interna - Mudança Salarial</h1>
          <div className="flex gap-3">
            <button onClick={() => navigate('/')} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-2.5 rounded-lg shadow-sm font-bold hover:bg-gray-50 transition-all">Voltar</button>
            <button onClick={handleSend} className="bg-primary hover:bg-primary-hover text-white px-10 py-2.5 rounded-lg shadow-lg font-bold transition-all transform hover:scale-105">Enviar</button>
          </div>
        </div>

        <SalaryChangeStepper activeStep="Solicitação" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLUNA ESQUERDA */}
          <div className="lg:col-span-1 space-y-6">
            <SolicitanteSection 
              cif={flowState.cif} 
              solicitante={flowState.solicitante} 
              funcao={flowState.funcao} 
              data={flowState.dataSolicitacao} 
            />
            <AttachmentSection 
              attachments={flowState.attachments} 
              onRemove={removeAttachment} 
              onAdd={() => updateFlowState({ attachments: [...flowState.attachments, { id: Date.now().toString(), name: `novo_anexo_${flowState.attachments.length + 1}.pdf`, isNew: true }] })}
            />
          </div>

          {/* COLUNA DIREITA */}
          <div className="lg:col-span-2 space-y-6">
            <Section title="Informações da Solicitação" icon="info">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ZoomField 
                  label="Gestor da Vaga" 
                  placeholder="Ex.: João Gomes" 
                />
                <SelectField 
                  label="Motivo da Solicitação" 
                  value="Mudança Salarial"
                  options={[{value: "Mudança Salarial", label: "Mudança Salarial"}]} 
                />
                <SelectField 
                  label="Classificação" 
                  value={flowState.classificacaoMudancaSalarial}
                  onChange={(val: string) => updateFlowState({ classificacaoMudancaSalarial: val })}
                  options={[
                    {value: "Mérito", label: "Mérito"},
                    {value: "Promoção", label: "Promoção"},
                    {value: "Enquadramento", label: "Enquadramento"}
                  ]} 
                />
              </div>
            </Section>

            <Section title="Dados da Mudança Salarial" icon="payments">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ZoomField 
                  label="Colaborador" 
                  placeholder="Ex.: Júlio Cesar" 
                />
                <DisabledInput label="Função" value="Analista de Sistemas PL" />
                <DisabledInput label="Cód. Seção" value="12000.0.0.0.1.00.05.00.01.02.MA1234" />
                <DisabledInput label="Admissão" value="15/05/2021" />
                <DisabledInput label="Nome da Área" value="Tecnologia da Informação (T.I.)" />
                <InputField 
                  label="Percentual de Aumento" 
                  placeholder="Ex.: 15%" 
                  value={flowState.percentualAumento}
                  onChange={(e: any) => updateFlowState({ percentualAumento: e.target.value })}
                />
                <InputField 
                  label="Vigência da Alteração (Ano)" 
                  type="number"
                  value={flowState.vigenciaAno}
                  onChange={(e: any) => updateFlowState({ vigenciaAno: e.target.value })}
                />
                <SelectField 
                  label="Vigência da Alteração (Mês)" 
                  value={flowState.vigenciaMes}
                  onChange={(val: string) => updateFlowState({ vigenciaMes: val })}
                  options={[
                    {value: "Janeiro", label: "Janeiro"},
                    {value: "Fevereiro", label: "Fevereiro"},
                    {value: "Março", label: "Março"},
                    {value: "Abril", label: "Abril"},
                    {value: "Maio", label: "Maio"},
                    {value: "Junho", label: "Junho"},
                    {value: "Julho", label: "Julho"},
                    {value: "Agosto", label: "Agosto"},
                    {value: "Setembro", label: "Setembro"},
                    {value: "Outubro", label: "Outubro"},
                    {value: "Novembro", label: "Novembro"},
                    {value: "Dezembro", label: "Dezembro"}
                  ]} 
                />
              </div>
            </Section>

            <Section title="Justificativa" icon="description">
              <textarea 
                className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 p-4 text-sm min-h-[100px] focus:ring-primary focus:border-primary" 
                placeholder="Descreva o motivo da mudança..."
                value={flowState.justificativaMudancaSalarial}
                onChange={(e) => updateFlowState({ justificativaMudancaSalarial: e.target.value })}
              ></textarea>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
};

export const SalaryChangeStepper = ({ activeStep }: { activeStep: string }) => {
  const steps = [
    { icon: "add_circle", label: "Solicitação" },
    { icon: "groups", label: "Análise BP" },
    { icon: "settings", label: "Aprovação final" },
    { icon: "sync", label: "Atualização RM" },
    { icon: "task_alt", label: "Conclusão" },
  ];

  const getStatus = (label: string) => {
    const activeIndex = steps.findIndex(s => s.label === activeStep);
    const stepIndex = steps.findIndex(s => s.label === label);
    if (stepIndex < activeIndex) return 'complete';
    if (stepIndex === activeIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-3 mb-8">
        <span className="material-icons-round text-primary text-2xl">schema</span>
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Etapas da Solicitação</h2>
      </div>
      <div className="relative flex items-center justify-between min-w-[800px] px-10">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-gray-700 -z-0 transform -translate-y-4"></div>
        {steps.map((step) => (
          <div key={step.label} className="flex flex-col items-center z-10 w-28 shrink-0">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 shadow-md transition-all ${getStatus(step.label) === 'active' ? 'bg-primary text-white scale-110 ring-4 ring-orange-100 dark:ring-orange-900/30' : getStatus(step.label) === 'complete' ? 'bg-green-500 text-white' : 'bg-white dark:bg-gray-700 border-2 border-gray-200 text-gray-300'}`}>
              <span className="material-icons-round text-xl">{getStatus(step.label) === 'complete' ? 'check' : step.icon}</span>
            </div>
            <span className={`text-[9px] text-center font-bold uppercase tracking-widest ${getStatus(step.label) === 'active' ? 'text-primary' : getStatus(step.label) === 'complete' ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400'}`}>{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalaryChangeRequestView;
