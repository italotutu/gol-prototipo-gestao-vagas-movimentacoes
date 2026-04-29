
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructionModal from '../components/InstructionModal';
import { Section, Stepper, DisabledInput, InputField, SelectField, AttachmentSection, SolicitanteSection, LogHistorySection, CommentHistorySection } from './JobOpeningView';
import { useFlow } from '../context/FlowContext';

const NegotiationView: React.FC = () => {
  const navigate = useNavigate();
  const { flowState, updateFlowState } = useFlow();
  const [showModal, setShowModal] = useState(true);
  const [attachments, setAttachments] = useState<{ id: string, name: string, isNew?: boolean }[]>([
    { id: '1', name: 'justificativa.pdf' },
    { id: '2', name: 'grade_salarial_aprovada.pdf' },
    { id: '3', name: 'curriculo_selecionado.pdf' }
  ]);

  const logs = [
    { user: 'João Silva Ramos', action: 'Abertura solicitada', date: '23/10/2023', time: '10:00' },
    { user: 'Admin Fluig', action: 'Parecer BP registrado', date: '24/10/2023', time: '14:30' },
    { user: 'Triagem RH', action: 'Tratativa finalizada', date: '27/10/2023', time: '09:00' }
  ];

  const comments = [
    { user: 'João Silva Ramos', role: 'Solicitante', text: 'Necessidade de reforço na equipe de infraestrutura.', date: '23/10/2023 10:00' },
    { user: 'Triagem RH', role: 'Tratativa', text: 'Candidata selecionada após triagem técnica e comportamental.', date: '27/10/2023 09:00' }
  ];

  const handleNext = () => {
    if (flowState.fluxo === 'interno') {
      updateFlowState({ status: 'Aguardando Medicina' });
      navigate('/medicine');
    } else {
      updateFlowState({ status: 'Aguardando Admissão' });
      navigate('/admission');
    }
  };

  return (
    <>
      <InstructionModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title="Etapa de Negociação"
        description="Formalização da proposta final para o candidato. Analise os dados capturados nas etapas anteriores."
      />

      <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sticky top-0 bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-sm z-30 py-2 border-b border-gray-100 dark:border-gray-800">
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">Negociação Final</h1>
          <div className="flex gap-3">
            <button onClick={() => navigate('/treatment')} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 px-6 py-2.5 rounded-lg shadow-sm font-bold hover:bg-gray-50 transition-all">Voltar</button>
            <button onClick={handleNext} className="bg-primary hover:bg-primary-hover text-white px-10 py-2.5 rounded-lg shadow-lg font-bold transform hover:scale-105 transition-all">Avançar</button>
          </div>
        </div>

        <Stepper activeStep="Negociação" cenario={flowState.cenario} fluxo={flowState.fluxo} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLUNA ESQUERDA PADRONIZADA */}
          <div className="lg:col-span-1 space-y-6">
            <SolicitanteSection cif="21654984152" solicitante="João Silva Ramos" funcao="Gerente de T.I." data="23/10/2023" />
            <AttachmentSection 
              attachments={attachments} 
              onRemove={(id: string) => setAttachments(attachments.filter(a => a.id !== id))} 
              onAdd={() => setAttachments([...attachments, { id: Date.now().toString(), name: `proposta_negoc_${attachments.length + 1}.pdf`, isNew: true }])} 
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

            <Section title="Informações Consolidadas do Processo" icon="description">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 border-b border-gray-50 dark:border-gray-700 pb-2 mb-2">
                  <h3 className="text-[10px] font-black uppercase text-primary tracking-widest">Informações da Vaga</h3>
                </div>
                <DisabledInput label="Gestor" value="Carlos Souza" />
                <DisabledInput label="Cargo" value={flowState.cargo || "Analista Sênior"} />
                <DisabledInput label="Departamento" value={flowState.departamento || "Tecnologia da Informação"} />
                <DisabledInput label="Código da Seção Proposta" value="15036.0.0.0.3.00.08.00.01.04.MA6901" />
                <DisabledInput label="Salário Estimado" value={flowState.salario || "R$ 9.800,00"} badge="+12%" />
                <DisabledInput label="UGB" value="TI_INFRA_01" />
                
                <div className="md:col-span-2 border-b border-gray-50 dark:border-gray-700 pb-2 mb-2 mt-4">
                  <h3 className="text-[10px] font-black uppercase text-primary tracking-widest">Dados do Candidato Selecionado</h3>
                </div>
                <DisabledInput label="Nome Completo" value={flowState.candidatoNome || "Mariana Silva"} />
                <DisabledInput label="Código da Seção Atual" value="12000.0.0.0.1.00.05.00.01.02.MA1234" />
                <DisabledInput label="E-mail" value="m.silva@exemplo.com" />
                <DisabledInput label="Data Prevista de Início" value="15/11/2023" />
                <DisabledInput label="Código Vaga" value="VAGA-2023-012" />
                <DisabledInput label="Tipo de Contrato" value={flowState.tipoContrato || "-"} />
                {flowState.tipoContrato === 'Outro' && (
                  <DisabledInput label="Descrição do Tipo de Contrato" value={flowState.descricaoTipoContrato} />
                )}
              </div>
            </Section>

            <Section title="Parecer da Decisão da Negociação" icon="monetization_on">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Salário Final Acordado *" placeholder="R$ 0,00" badge="+12%" />
                <SelectField label="Aprovado por Remuneração? *" options={[{value: "sim", label: "Sim"}, {value: "nao", label: "Não"}]} />
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Observações da Negociação</label>
                  <textarea className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 p-4 text-sm min-h-[120px] focus:ring-primary focus:border-primary" placeholder="Registre as notas finais da negociação..."></textarea>
                </div>
              </div>
            </Section>

            <CommentHistorySection comments={comments} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NegotiationView;
