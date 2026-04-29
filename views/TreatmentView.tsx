
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructionModal from '../components/InstructionModal';
import { Section, Stepper, DisabledInput, InputField, SelectField, RadioGroupField, AttachmentSection, SolicitanteSection, LogHistorySection, CommentHistorySection } from './JobOpeningView';
import { useFlow } from '../context/FlowContext';

const TreatmentView: React.FC = () => {
  const navigate = useNavigate();
  const { flowState, updateFlowState } = useFlow();
  const [showModal, setShowModal] = useState(true);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [attachments, setAttachments] = useState<{ id: string, name: string, isNew?: boolean }[]>([
    { id: '1', name: 'justificativa.pdf' },
    { id: '2', name: 'grade_salarial_aprovada.pdf' }
  ]);

  const logs = [
    { user: 'João Silva Ramos', action: 'Abertura solicitada', date: '23/10/2023', time: '10:00' },
    { user: 'Admin Fluig', action: 'Parecer BP registrado', date: '24/10/2023', time: '14:30' },
    { user: 'Remuneração RH', action: 'Salarial aprovado', date: '25/10/2023', time: '11:00' }
  ];

  const comments = [
    { user: 'João Silva Ramos', role: 'Solicitante', text: 'Necessidade de reforço na equipe de infraestrutura para novos projetos do triênio.', date: '23/10/2023 10:00' },
    { user: 'Remuneração RH', role: 'Remuneração', text: 'Análise salarial concluída. Proposta dentro da grade para Analista Sênior.', date: '25/10/2023 11:00' }
  ];

  const handleNext = () => {
    let newErrors: Record<string, boolean> = {};
    
    if (!flowState.tipoContrato) {
      newErrors.tipoContrato = true;
    }
    
    if (flowState.tipoContrato === 'Outro' && !flowState.descricaoTipoContrato.trim()) {
      newErrors.descricaoTipoContrato = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (flowState.cenario === 'administrativo') {
      updateFlowState({ status: 'Em Negociação' });
      navigate('/negotiation');
    } else if (flowState.fluxo === 'interno') {
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
        title="Tratativa de Vaga"
        description="Nesta etapa o RH realiza a triagem de candidatos e define a estratégia de busca."
      />

      <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sticky top-0 bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-sm z-30 py-2 border-b border-gray-100 dark:border-gray-800">
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">Tratativa de Vaga</h1>
          <div className="flex gap-3">
            <button onClick={() => navigate('/compensation-approval')} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 px-6 py-2.5 rounded-lg shadow-sm font-bold hover:bg-gray-50 transition-all">Voltar</button>
            <button onClick={handleNext} className="bg-primary hover:bg-primary-hover text-white px-10 py-2.5 rounded-lg shadow-lg font-bold transform hover:scale-105 transition-all">Avançar</button>
          </div>
        </div>

        <Stepper activeStep="Tratativa" cenario={flowState.cenario} fluxo={flowState.fluxo} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLUNA ESQUERDA PADRONIZADA */}
          <div className="lg:col-span-1 space-y-6">
            <SolicitanteSection cif="21654984152" solicitante="João Silva Ramos" funcao="Gerente de T.I." data="23/10/2023" />
            <AttachmentSection 
              attachments={attachments} 
              onRemove={(id: string) => setAttachments(attachments.filter(a => a.id !== id))} 
              onAdd={() => setAttachments([...attachments, { id: Date.now().toString(), name: `curriculo_tratativa_${attachments.length + 1}.pdf`, isNew: true }])} 
            />
            <LogHistorySection logs={logs} />
          </div>

          {/* COLUNA DIREITA PRINCIPAL */}
          <div className="lg:col-span-2 space-y-6">
            <Section title="Informações da Solicitação" icon="description">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DisabledInput label="Gestor" value="Carlos Souza" />
                <DisabledInput label="Cargo" value={flowState.cargo || "Analista Sênior"} />
                <DisabledInput label="Departamento" value={flowState.departamento || "Tecnologia da Informação"} />
                <DisabledInput label="Código da Seção Proposta" value="15036.0.0.0.3.00.08.00.01.04.MA6901" />
                <DisabledInput label="Salário Estimado" value={flowState.salario || "R$ 9.800,00"} />
                <DisabledInput label="UGB" value="TI_INFRA_01" />
              </div>
            </Section>

            <Section title="Dados da Tratativa" icon="edit_note">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Código da Vaga *" placeholder="VAGA-2023-XXX" />
                <SelectField 
                  label="Candidato Externo? *" 
                  value={flowState.fluxo === 'externo' || flowState.fluxo === 'misto' ? 'sim' : 'nao'} 
                  options={[{value: "sim", label: "Sim"}, {value: "nao", label: "Não"}]} 
                  onChange={() => {}} // Read-only based on fluxo
                />
                <InputField 
                  label="Nome do Candidato *" 
                  placeholder="Nome completo" 
                  value={flowState.candidatoNome}
                  onChange={(e: any) => updateFlowState({ candidatoNome: e.target.value })}
                />
                <DisabledInput label="Código da Seção Atual" value="12000.0.0.0.1.00.05.00.01.02.MA1234" />
                <InputField label="E-mail *" placeholder="email@exemplo.com" />
                <InputField label="Data Prevista de Início *" type="date" />
                {flowState.cenario === 'administrativo' && (
                  <SelectField label="Solicitou Negociação Salarial? *" options={[{value: "sim", label: "Sim"}, {value: "nao", label: "Não"}]} />
                )}
                <RadioGroupField 
                  label="Tipo de Contrato *" 
                  value={flowState.tipoContrato}
                  onChange={(val: string) => {
                    const updates: any = { tipoContrato: val };
                    if (val !== 'Outro') updates.descricaoTipoContrato = '';
                    updateFlowState(updates);
                    if (errors.tipoContrato) setErrors({ ...errors, tipoContrato: false });
                  }}
                  options={[
                    {value: "Determinado", label: "Determinado"},
                    {value: "Indeterminado", label: "Indeterminado"},
                    {value: "Outro", label: "Outro"}
                  ]}
                  error={errors.tipoContrato}
                />
              </div>
              {flowState.tipoContrato === 'Outro' && (
                <div className="mt-4 animate-fade-in">
                  <InputField 
                    label="Descreva o Tipo de Contrato *" 
                    placeholder="Ex.: Sob demanda" 
                    value={flowState.descricaoTipoContrato}
                    onChange={(e: any) => {
                      updateFlowState({ descricaoTipoContrato: e.target.value });
                      if (errors.descricaoTipoContrato) setErrors({ ...errors, descricaoTipoContrato: false });
                    }}
                    error={errors.descricaoTipoContrato}
                  />
                </div>
              )}
            </Section>

            <CommentHistorySection comments={comments} />

            <Section title="Parecer da Triagem" icon="rate_review">
              <textarea className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 p-4 text-sm min-h-[120px] focus:ring-primary focus:border-primary" placeholder="Registre detalhes da triagem e busca..."></textarea>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
};

export default TreatmentView;
