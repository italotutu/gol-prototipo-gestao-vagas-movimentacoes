
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructionModal from '../components/InstructionModal';
import { useFlow } from '../context/FlowContext';

// --- MOCK DATA ---
const FILIAIS = [
  "FIL01 - SP | SEDE | VERBO DIVINO",
  "FIL02 - SP | CGH | CONGONHAS",
  "FIL03 - SP | GRU | GUARULHOS",
  "FIL04 - RJ | GIG | GALEÃO",
  "FIL05 - DF | BSB | BRASÍLIA",
  "FIL06 - CE | FOR | FORTALEZA",
  "FIL07 - MG | CNF | MANUTENÇÃO CONFINS",
  "FIL08 - RJ | SDU | SANTOS DUMONT",
  "FIL09 - BA | SSA | SALVADOR"
];

const DEPARTAMENTOS = [
  "TECNOLOGIA DA INFORMAÇÃO",
  "INFRAESTRUTURA E OPERAÇÕES DE TI",
  "SEGURANÇA DA INFORMAÇÃO",
  "RECURSOS HUMANOS",
  "FINANCEIRO",
  "CONTABILIDADE E FISCAL",
  "COMPRAS",
  "LOGÍSTICA",
  "COMERCIAL E VENDAS",
  "JURÍDICO E COMPLIANCE",
  "QUALIDADE",
  "MANUTENÇÃO"
];

const CARGOS = [
  "ANALISTA DE INFRAESTRUTURA JR",
  "ANALISTA DE INFRAESTRUTURA PL",
  "ANALISTA DE INFRAESTRUTURA SR",
  "ANALISTA DE SISTEMAS PL",
  "ANALISTA DE SISTEMAS SR",
  "ESPECIALISTA EM REDES",
  "ESPECIALISTA EM SEGURANÇA DA INFORMAÇÃO",
  "COORDENADOR DE INFRAESTRUTURA",
  "COORDENADOR DE TI",
  "GERENTE DE TI",
  "ASSISTENTE ADMINISTRATIVO",
  "ANALISTA DE RH PL"
];

const JobOpeningView: React.FC = () => {
  const navigate = useNavigate();
  const { flowState, updateFlowState } = useFlow();
  const [showModal, setShowModal] = useState(true);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  
  const removeAttachment = (id: string) => {
    updateFlowState({ attachments: flowState.attachments.filter(a => a.id !== id) });
  };

  const handleNext = () => {
    updateFlowState({ 
      status: 'Aguardando Aprovação',
      revisionOrigin: '',
      revisionComment: ''
    });
    navigate('/approval');
  };

  return (
    <>
      <InstructionModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title="Abertura de Vaga"
        description="Preencha todos os campos obrigatórios (*) para iniciar o processo. Os dados seguirão para as etapas de aprovação e recrutamento."
      />

      <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sticky top-0 bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-sm z-30 py-2 border-b border-gray-100 dark:border-gray-800">
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">Abertura de Vaga</h1>
          <div className="flex gap-3">
            <button onClick={() => navigate('/')} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-2.5 rounded-lg shadow-sm font-bold hover:bg-gray-50 transition-all">Voltar</button>
            <button onClick={handleNext} className="bg-primary hover:bg-primary-hover text-white px-10 py-2.5 rounded-lg shadow-lg font-bold transition-all transform hover:scale-105">Avançar</button>
          </div>
        </div>

        {/* Movement Finalization Communication Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-xl flex items-start gap-3">
          <span className="material-icons-outlined text-blue-500 mt-0.5">info</span>
          <div>
            <h3 className="text-sm font-bold text-blue-800 dark:text-blue-200">Atenção sobre a Efetivação da Movimentação</h3>
            <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
              O colaborador só será movimentado de fato após a conclusão de todas as etapas deste processo, incluindo aprovações, negociação e medicina (se aplicável).
            </p>
          </div>
        </div>

        <Stepper activeStep="Abertura" cenario={flowState.cenario} fluxo={flowState.fluxo} />

        {flowState.status === 'Ajuste Solicitado' && (
          <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-xl flex items-start gap-4 animate-fade-in shadow-sm">
            <div className="bg-orange-500 rounded-full p-1 flex items-center justify-center">
              <span className="material-icons-outlined text-white text-xl">history_edu</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-black text-orange-800 dark:text-orange-200 uppercase tracking-tight">Revisão Solicitada por {flowState.revisionOrigin}</h3>
                <span className="text-[10px] bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 px-2 py-0.5 rounded font-black uppercase tracking-widest">Ajuste Necessário</span>
              </div>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-2 font-medium leading-relaxed">
                {flowState.revisionComment || "Por favor, revise as informações da solicitação conforme solicitado pela área anterior."}
              </p>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-orange-400 uppercase tracking-widest">
                <span className="material-icons-outlined text-sm">info</span>
                <span>Após os ajustes, clique em avançar para reenviar a solicitação</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLUNA ESQUERDA PADRONIZADA */}
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

          {/* COLUNA DIREITA PRINCIPAL */}
          <div className="lg:col-span-2 space-y-6">
            <Section title="Informações da Solicitação" icon="info">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField 
                  label="Gestor *" 
                  value={flowState.gestor}
                  onChange={(val: string) => updateFlowState({ gestor: val })}
                  options={[{value: "1", label: "Carlos Souza"}]} 
                />
                <SelectField 
                  label="Motivo da Solicitação *" 
                  value={flowState.motivo} 
                  onChange={(val: string) => updateFlowState({ motivo: val })} 
                  options={[
                    {value: "Aumento de Quadro", label: "Aumento de Quadro"}, 
                    {value: "Substituição", label: "Substituição"}, 
                    {value: "Mérito", label: "Mérito"}
                  ]} 
                />
                <SelectField 
                  label="Tipo de Recrutamento *" 
                  value={flowState.fluxo}
                  onChange={(val: string) => updateFlowState({ fluxo: val })}
                  options={[
                    {value: "externo", label: "Externo"},
                    {value: "interno", label: "Interno (Movimentação)"},
                    {value: "misto", label: "Misto"}
                  ]} 
                />
                <SelectField 
                  label="Cenário da Vaga *" 
                  value={flowState.cenario} 
                  onChange={(val: string) => updateFlowState({ cenario: val })} 
                  options={[
                    {value: "administrativo", label: "Administrativo"}, 
                    {value: "operacional", label: "Operacional"}
                  ]} 
                />
              </div>
            </Section>

            {flowState.motivo === "Substituição" && (
              <Section title="Dados do Colaborador Substituído" icon="person_off">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField 
                      label="Nome do Colaborador *" 
                      placeholder="Digite o nome..." 
                      value={flowState.colaboradorSubstituido}
                      onChange={(e: any) => updateFlowState({ colaboradorSubstituido: e.target.value })}
                    />
                    <SelectField 
                      label="Motivo da Substituição *" 
                      value={flowState.motivoSubstituicao}
                      onChange={(val: string) => updateFlowState({ motivoSubstituicao: val })}
                      options={[
                        {value: "Desligamento", label: "Desligamento"},
                        {value: "Promoção", label: "Promoção"},
                        {value: "Transferência", label: "Transferência"}
                      ]} 
                    />
                    <DisabledInput label="Código da Seção Atual" value="12000.0.0.0.1.00.05.00.01.02.MA1234" />
                 </div>
              </Section>
            )}

            <Section title="Dados da Vaga" icon="work_outline">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SearchableSelect 
                  label="Filial *" 
                  placeholder="Buscar..." 
                  options={FILIAIS} 
                  value={flowState.filial} 
                  onChange={(val: string) => updateFlowState({ filial: val })}
                />
                <SearchableSelect 
                  label="Departamento *" 
                  placeholder="Buscar..." 
                  options={DEPARTAMENTOS} 
                  value={flowState.departamento}
                  onChange={(val: string) => updateFlowState({ departamento: val })}
                />
                <SearchableSelect 
                  label="Cargo *" 
                  placeholder="Buscar..." 
                  options={CARGOS} 
                  value={flowState.cargo}
                  onChange={(val: string) => updateFlowState({ cargo: val })}
                />
                <DisabledInput label="Código da Seção Proposta" value="15036.0.0.0.3.00.08.00.01.04.MA6901" />
                <SelectField 
                  label="Mesmo Perfil? *" 
                  value={flowState.mesmoPerfil}
                  onChange={(val: string) => updateFlowState({ mesmoPerfil: val })}
                  options={[
                    {value: "sim", label: "Sim"},
                    {value: "nao", label: "Não"}
                  ]} 
                />
                <NumericInput 
                  label="Quantidade *" 
                  value={parseInt(flowState.quantidade) || 1} 
                  onChange={(val: number) => updateFlowState({ quantidade: val.toString() })} 
                />
                <DisabledInput label="UGB" value={flowState.ugb} />
                <InputField 
                  label="Salário Estimado" 
                  placeholder="R$ 0,00" 
                  value={flowState.salario}
                  onChange={(e: any) => updateFlowState({ salario: e.target.value })}
                />
                <SelectField 
                  label="Jornada *" 
                  value={flowState.jornada}
                  onChange={(val: string) => updateFlowState({ jornada: val })}
                  options={[{value: "220", label: "220h"}]} 
                />
              </div>
            </Section>

            <Section title="Justificativa" icon="error_outline">
              <textarea 
                className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 p-4 text-sm min-h-[100px] focus:ring-primary focus:border-primary" 
                placeholder="Justifique a abertura..."
                value={flowState.justificativaAbertura}
                onChange={(e) => updateFlowState({ justificativaAbertura: e.target.value })}
              ></textarea>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
};

// --- REUSABLE COMPONENTS ---

export const Stepper = ({ activeStep, cenario = 'administrativo', fluxo = 'externo', resultadoMedicina, motivoReprovacaoMedicina }: { activeStep: string, cenario?: string, fluxo?: string, resultadoMedicina?: string, motivoReprovacaoMedicina?: string }) => {
  const steps = [
    { icon: "add_circle", label: "Abertura" },
    { icon: "groups", label: "BP Gente e Cultura" },
    { icon: "payments", label: "Remuneração" },
    { icon: "search", label: "Tratativa" },
    ...(cenario === 'administrativo' ? [{ icon: "handshake", label: "Negociação" }] : []),
    ...(fluxo === 'interno' ? [{ icon: "medical_services", label: "Medicina" }] : []),
    ...(resultadoMedicina === 'reprovado' && (motivoReprovacaoMedicina === 'restricao' || motivoReprovacaoMedicina === 'outros') ? [{ icon: "gavel", label: "Decisão Gestor" }] : []),
    { icon: "rocket_launch", label: "Admissão" },
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
          <Step key={step.label} icon={step.icon} label={step.label} status={getStatus(step.label)} />
        ))}
      </div>
    </div>
  );
};

export const Step = ({ icon, label, status }: any) => (
  <div className="flex flex-col items-center z-10 w-28 shrink-0">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 shadow-md transition-all ${status === 'active' ? 'bg-primary text-white scale-110 ring-4 ring-orange-100 dark:ring-orange-900/30' : status === 'complete' ? 'bg-green-500 text-white' : 'bg-white dark:bg-gray-700 border-2 border-gray-200 text-gray-300'}`}>
      <span className="material-icons-round text-xl">{status === 'complete' ? 'check' : icon}</span>
    </div>
    <span className={`text-[9px] text-center font-bold uppercase tracking-widest ${status === 'active' ? 'text-primary' : status === 'complete' ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400'}`}>{label}</span>
  </div>
);

export const Section = ({ title, icon, children, headerAction }: any) => (
  <div className="bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
    <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-50 dark:border-gray-700">
      <div className="flex items-center">
        <span className="material-icons-round text-primary mr-3 text-xl">{icon}</span>
        <h2 className="font-bold text-gray-800 dark:text-white">{title}</h2>
      </div>
      {headerAction}
    </div>
    {children}
  </div>
);

export const SolicitanteSection = ({ solicitante, cif, funcao, data }: any) => (
  <Section title="Dados do Solicitante" icon="person">
    <div className="space-y-4 text-sm">
      <DataRow label="Solicitante" value={solicitante} />
      <DataRow label="CIF" value={cif} />
      <DataRow label="Função" value={funcao} />
      <DataRow label="Data" value={data} />
    </div>
  </Section>
);

export const LogHistorySection = ({ logs }: { logs: { user: string, action: string, date: string, time: string }[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Section 
      title="Histórico de Ações" 
      icon="history"
      headerAction={
        <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <span className="material-icons-round text-gray-400">{isOpen ? 'expand_less' : 'expand_more'}</span>
        </button>
      }
    >
      {isOpen && (
        <div className="space-y-4 mt-2 animate-fade-in">
          {logs.map((log, idx) => (
            <div key={idx} className="flex gap-3 items-start border-l-2 border-primary pl-4 py-1">
              <div className="text-[11px]">
                <p className="font-bold text-gray-800 dark:text-gray-100">{log.user}</p>
                <p className="text-gray-400 uppercase font-black tracking-widest text-[9px] mt-0.5">{log.action} em {log.date} às {log.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {!isOpen && <p className="text-[10px] text-gray-400 italic">Clique para expandir o log de ações.</p>}
    </Section>
  );
};

export const CommentHistorySection = ({ comments }: { comments: { user: string, role: string, text: string, date: string, avatarUrl?: string }[] }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <Section title="Histórico de Observações" icon="forum">
      <div className="space-y-6">
        {comments.map((comment, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            {/* AVATAR STYLE CHAT */}
            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-orange-100 dark:bg-primary/20 border border-orange-200 dark:border-primary/30 flex items-center justify-center overflow-hidden">
              {comment.avatarUrl ? (
                <img src={comment.avatarUrl} alt={comment.user} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs font-black text-primary">{getInitials(comment.user)}</span>
              )}
            </div>
            
            <div className="flex-1 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 relative">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-black uppercase text-primary tracking-widest">{comment.role}</span>
                <span className="text-[9px] text-gray-400 font-bold">{comment.date}</span>
              </div>
              <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">{comment.user}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic leading-relaxed">"{comment.text}"</p>
              
              {/* Tooltip triangle-like decoration for chat feel */}
              <div className="absolute top-4 -left-1.5 w-3 h-3 bg-gray-50 dark:bg-gray-800/50 border-l border-b border-gray-100 dark:border-gray-700 transform rotate-45"></div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export const DataRow = ({ label, value }: any) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700/50">
    <span className="text-gray-500 dark:text-gray-400 font-medium">{label}</span>
    <span className="font-bold text-gray-800 dark:text-gray-100">{value}</span>
  </div>
);

export const ReadOnlyField = ({ label, value }: any) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700/50">
    <span className="text-gray-500 dark:text-gray-400 font-medium">{label}</span>
    <span className="font-bold text-gray-800 dark:text-gray-100">{value}</span>
  </div>
);

export const InputField = ({ label, placeholder, type = "text", badge, value, onChange }: any) => (
  <div className="space-y-1.5">
    <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      <input type={type} value={value} onChange={onChange} className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg py-2.5 px-3 text-sm focus:ring-primary focus:border-primary" placeholder={placeholder} />
      {badge && <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-md font-bold">{badge}</span></div>}
    </div>
  </div>
);

export const SelectField = ({ label, options, value, onChange }: any) => (
  <div className="space-y-1.5">
    <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      <select value={value} onChange={(e) => onChange?.(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg py-2.5 text-sm appearance-none px-3 focus:ring-primary focus:border-primary">
        <option value="">Selecione...</option>
        {options.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
      <span className="material-icons-round absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xl">expand_more</span>
    </div>
  </div>
);

export const RadioGroupField = ({ label, options, value, onChange, error }: any) => (
  <div className="space-y-1.5">
    <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="flex gap-4 p-1">
      {options.map((opt: any) => (
        <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <input 
              type="radio" 
              name={label} 
              value={opt.value} 
              checked={value === opt.value} 
              onChange={() => onChange(opt.value)} 
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${value === opt.value ? 'border-primary' : 'border-gray-300 dark:border-gray-600'}`}>
              {value === opt.value && <div className="w-2.5 h-2.5 rounded-full bg-primary animate-scale-in"></div>}
            </div>
          </div>
          <span className={`text-sm transition-colors ${value === opt.value ? 'text-gray-800 dark:text-white font-bold' : 'text-gray-500 dark:text-gray-400'}`}>
            {opt.label}
          </span>
        </label>
      ))}
    </div>
    {error && <p className="text-[10px] text-red-500 font-bold ml-1 animate-fade-in text-xs">Campo obrigatório</p>}
  </div>
);

export const SearchableSelect = ({ label, placeholder, options, value, onChange }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt: string) => 
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-1.5 relative" ref={containerRef}>
      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
      <div 
        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-2.5 px-3 text-sm cursor-pointer flex justify-between items-center focus-within:ring-2 focus-within:ring-primary transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-gray-800 dark:text-white font-bold" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <span className="material-icons-round text-gray-400 text-sm">search</span>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl max-h-60 overflow-y-auto no-scrollbar animate-scale-in">
          <div className="sticky top-0 p-2 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
            <input 
              autoFocus
              className="w-full text-xs p-2 bg-gray-50 dark:bg-gray-900 border-none focus:ring-0 rounded-lg" 
              placeholder="Digite para filtrar..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt: string) => (
              <div 
                key={opt} 
                className={`px-4 py-2.5 text-xs hover:bg-orange-50 dark:hover:bg-primary/10 cursor-pointer transition-colors ${value === opt ? 'bg-orange-100 dark:bg-primary/20 text-primary font-bold' : 'text-gray-600 dark:text-gray-300'}`}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                  setSearchTerm("");
                }}
              >
                {opt}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-xs text-gray-400 italic">Nenhum resultado encontrado</div>
          )}
        </div>
      )}
    </div>
  );
};

export const ZoomField = ({ label, placeholder }: any) => (
  <div className="space-y-1.5">
    <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      <input className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg py-2.5 px-3 pr-10 text-sm focus:ring-primary focus:border-primary" placeholder={placeholder} />
      <span className="material-icons-round absolute right-3 top-2.5 text-gray-400 text-sm">search</span>
    </div>
  </div>
);

export const NumericInput = ({ label, value, onChange }: any) => (
  <div className="space-y-1.5">
    <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="flex items-center gap-2">
      <button onClick={() => onChange(Math.max(1, value - 1))} className="size-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors text-xl font-bold text-gray-600">-</button>
      <div className="w-12 h-10 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-black text-gray-800 dark:text-white">
        {value}
      </div>
      <button onClick={() => onChange(value + 1)} className="size-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors text-xl font-bold text-gray-600">+</button>
    </div>
  </div>
);

export const DisabledInput = ({ label, value, badge }: any) => (
  <div className="space-y-1.5">
    <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2.5 px-3 text-sm font-bold text-gray-500 cursor-not-allowed min-h-[44px] flex items-center justify-between">
      <span>{value || '-'}</span>
      {badge && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-md">{badge}</span>}
    </div>
  </div>
);

export const AttachmentSection = ({ attachments, onRemove, onAdd }: any) => (
  <Section title="Anexos" icon="attach_file">
    <div className="space-y-4">
      <div 
        onClick={onAdd}
        className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
      >
        <span className="material-icons-round text-gray-400 group-hover:text-primary transition-colors text-3xl mb-2">file_upload</span>
        <p className="text-xs text-gray-500 text-center mb-4">Arraste ou clique para anexar</p>
        <button className="bg-green-500 hover:bg-green-600 text-white text-[10px] px-4 py-2 rounded-lg font-bold shadow-md uppercase">Selecionar</button>
      </div>

      <div className="space-y-2">
        {attachments.map((file: any) => (
          <div key={file.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shadow-sm">
                <span className="material-icons-round text-xl">description</span>
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300 truncate max-w-[140px]">{file.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-primary transition-transform active:scale-90"><span className="material-icons-outlined text-sm">download</span></button>
              {file.isNew && (
                <button onClick={() => onRemove(file.id)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-red-500 transition-transform active:scale-90"><span className="material-icons-outlined text-sm">delete</span></button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

export default JobOpeningView;
