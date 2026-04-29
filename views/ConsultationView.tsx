
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructionModal from '../components/InstructionModal';
import { Solicitation } from '../types';
import { useFlow } from '../context/FlowContext';

const ConsultationView: React.FC = () => {
  const navigate = useNavigate();
  const { flowState } = useFlow();
  const [showModal, setShowModal] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Filter states
  const [filterDepartment, setFilterDepartment] = useState('Todas');
  const [filterStatus, setFilterStatus] = useState('Todas');

  const allSolicitations: Solicitation[] = [
    { id: '000008', classification: flowState.motivo || 'Recrutamento Externo', vacancyId: 'VAGA-2024/08-012', department: flowState.departamento || 'Tecnologia', status: flowState.status || 'Abertura', slaStatus: 'No Prazo', slaColor: 'green', roleName: flowState.cargo || 'Desenvolvedor Senior', date: '15/08/2024' },
    { id: '000002', classification: 'Recrutamento Interno', vacancyId: 'VAGA-2024/09-045', department: 'Financeiro', status: 'Em Negociação', slaStatus: 'No Prazo', slaColor: 'green', roleName: 'Analista Pleno', date: '09/09/2024' },
    { id: '000003', classification: 'Recrutamento Misto', vacancyId: 'VAGA-2024/09-046', department: 'T.I.', status: 'Em Aprovação', slaStatus: 'Atrasado', slaColor: 'red', roleName: 'Gerente TI', date: '12/09/2024' },
    { id: '000004', classification: 'Recrutamento Externo', vacancyId: 'VAGA-2024/10-001', department: 'Operações', status: 'Tratativa', slaStatus: 'No Prazo', slaColor: 'green', roleName: 'Supervisor de Vendas', date: '01/10/2024' },
    { id: '000005', classification: 'Substituição', vacancyId: 'VAGA-2024/10-005', department: 'Jurídico', status: 'Remuneração', slaStatus: 'Atenção', slaColor: 'orange', roleName: 'Advogado Jr', date: '05/10/2024' },
    { id: '000006', classification: 'Aumento de Quadro', vacancyId: 'VAGA-2024/10-010', department: 'Marketing', status: 'Abertura', slaStatus: 'No Prazo', slaColor: 'green', roleName: 'Designer UI/UX', date: '10/10/2024' },
    { id: '000007', classification: 'Recrutamento Externo', vacancyId: 'VAGA-2024/11-002', department: 'T.I.', status: 'Concluído', slaStatus: 'Atrasado', slaColor: 'red', roleName: 'Analista DevOps', date: '02/11/2024', preAdmissionStatus: 'Em andamento' },
  ];

  const solicitations = allSolicitations.filter(sol => {
    if (filterDepartment !== 'Todas' && sol.department !== filterDepartment) return false;
    if (filterStatus !== 'Todas' && sol.status !== filterStatus) return false;
    return true;
  });

  const removeFilter = (filter: string) => {
    const newFilters = activeFilters.filter(f => f !== filter);
    setActiveFilters(newFilters);
    
    if (filter.startsWith('Departamento:')) setFilterDepartment('Todas');
    if (filter.startsWith('Status:')) setFilterStatus('Todas');
  };

  const applyFilters = () => {
    const newFilters: string[] = [];
    if (filterDepartment !== 'Todas') newFilters.push(`Departamento: ${filterDepartment}`);
    if (filterStatus !== 'Todas') newFilters.push(`Status: ${filterStatus}`);
    
    setActiveFilters(newFilters);
    setShowFilterModal(false);
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setFilterDepartment('Todas');
    setFilterStatus('Todas');
  };

  const handleRowClick = (status: string) => {
    switch (status) {
      case 'Abertura':
      case 'Ajuste Solicitado':
        navigate('/open-solicitation');
        break;
      case 'Aprovação BP':
        navigate('/approval');
        break;
      case 'Aprovação Remuneração':
        navigate('/compensation-approval');
        break;
      case 'Tratativa':
        navigate('/treatment');
        break;
      case 'Negociação':
        navigate('/negotiation');
        break;
      case 'Aguardando Admissão':
        navigate('/admission');
        break;
      case 'Aguardando Consulta Medicina':
        navigate('/medicine-consultation');
        break;
      case 'Análise Medicina':
        navigate('/medicine-analysis');
        break;
      case 'Aguardando Agendamento Exame':
        navigate('/medicine-scheduling');
        break;
      case 'Aguardando avaliação final da Medicina':
        navigate('/medicine-final-evaluation');
        break;
      case 'Reprovado / Restrito pela Medicina':
        navigate('/future-manager-decision');
        break;
      case 'Aprovado pela Medicina':
        navigate('/movement-conclusion');
        break;
      case 'Reprovado Medicina':
        navigate('/future-manager-decision');
        break;
      case 'Cancelado':
        navigate('/movement-conclusion');
        break;
      case 'Concluído':
        navigate('/movement-conclusion');
        break;
      default:
        navigate('/approval');
    }
  };

  return (
    <>
      <InstructionModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title="Consulta de Solicitações"
        description="Acompanhe o status de todas as suas vagas em tempo real. Use os filtros para localizar processos específicos por departamento ou status."
      />

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-card-dark rounded-[2rem] p-8 max-w-2xl w-full mx-4 shadow-2xl border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-black text-gray-800 dark:text-white mb-6">Filtro de buscas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Número da Solicitação</label>
                <input type="text" placeholder="Ex: 000001" className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl border-gray-200 dark:border-gray-700 p-3 text-sm focus:ring-primary focus:border-primary" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Colaborador</label>
                <input type="text" placeholder="Nome do solicitante..." className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl border-gray-200 dark:border-gray-700 p-3 text-sm focus:ring-primary focus:border-primary" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Diretoria</label>
                <select className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl border-gray-200 dark:border-gray-700 p-3 text-sm focus:ring-primary focus:border-primary appearance-none">
                  <option>Todas</option>
                  <option>TI</option>
                  <option>Operações</option>
                  <option>Comercial</option>
                  <option>RH</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Área / Departamento</label>
                <select 
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl border-gray-200 dark:border-gray-700 p-3 text-sm focus:ring-primary focus:border-primary appearance-none"
                >
                  <option value="Todas">Todas</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="Financeiro">Financeiro</option>
                  <option value="T.I.">T.I.</option>
                  <option value="Operações">Operações</option>
                  <option value="Jurídico">Jurídico</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Etapa Atual</label>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl border-gray-200 dark:border-gray-700 p-3 text-sm focus:ring-primary focus:border-primary appearance-none"
                >
                  <option value="Todas">Todas</option>
                  <option value="Abertura">Abertura</option>
                  <option value="Em Aprovação">Em Aprovação</option>
                  <option value="Em Negociação">Em Negociação</option>
                  <option value="Tratativa">Tratativa</option>
                  <option value="Remuneração">Remuneração</option>
                  <option value="Concluído">Concluído</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Responsável Atual</label>
                <input type="text" placeholder="Nome do responsável..." className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl border-gray-200 dark:border-gray-700 p-3 text-sm focus:ring-primary focus:border-primary" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Data de Abertura</label>
                <input type="date" className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl border-gray-200 dark:border-gray-700 p-3 text-sm focus:ring-primary focus:border-primary" />
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setShowFilterModal(false)} className="flex-1 py-4 font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">Cancelar</button>
              <button onClick={applyFilters} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 uppercase text-xs tracking-widest">Aplicar filtros</button>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight">Consulta de Solicitações</h1>
          <div className="flex gap-3">
            <button onClick={() => navigate('/')} className="px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-all">Voltar</button>
            <button onClick={() => setShowFilterModal(true)} className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-lg transition-all transform hover:scale-105">
              <span className="material-icons-outlined text-sm">filter_alt</span>
              Filtros
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">Filtros ativos:</span>
            {activeFilters.map((filter) => (
              <div key={filter} className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 dark:bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-bold">
                <span>{filter}</span>
                <button onClick={() => removeFilter(filter)} className="hover:text-primary-hover">
                  <span className="material-icons-round text-xs">close</span>
                </button>
              </div>
            ))}
            <button onClick={clearFilters} className="text-[10px] font-bold text-gray-400 hover:text-primary underline ml-2">Limpar todos</button>
          </div>
        )}

        <div className="bg-white dark:bg-card-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-100 dark:border-gray-700">
                  <th className="p-5">Número</th>
                  <th className="p-5">Classificação</th>
                  <th className="p-5">ID Vaga</th>
                  <th className="p-5">Área / Depto</th>
                  <th className="p-5">Status Atual</th>
                  <th className="p-5">SLA</th>
                  <th className="p-5">Cargo</th>
                  <th className="p-5">Abertura</th>
                  <th className="p-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700 text-xs">
                {solicitations.map((sol) => (
                  <tr key={sol.id} onClick={() => handleRowClick(sol.status)} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors group">
                    <td className="p-5">
                      <span className="text-primary font-black group-hover:underline">{sol.id}</span>
                    </td>
                    <td className="p-5 text-gray-600 dark:text-gray-400 font-medium">{sol.classification}</td>
                    <td className="p-5 text-gray-600 dark:text-gray-400 font-bold">{sol.vacancyId}</td>
                    <td className="p-5 font-bold text-gray-700 dark:text-gray-300">{sol.department}</td>
                    <td className="p-5">
                      <div className="flex flex-col gap-1 items-start">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-[9px] font-black bg-orange-100 dark:bg-primary/20 text-primary border border-primary/20 uppercase tracking-widest">
                          {sol.status}
                        </span>
                        {sol.preAdmissionStatus && (
                          <span className="text-[9px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                            Pré-Admissão: {sol.preAdmissionStatus}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-5 font-bold" style={{ color: sol.slaColor }}>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full`} style={{ backgroundColor: sol.slaColor }}></div>
                        {sol.slaStatus}
                      </div>
                    </td>
                    <td className="p-5 font-bold text-gray-700 dark:text-gray-200">{sol.roleName}</td>
                    <td className="p-5 text-gray-400 font-bold">{sol.date}</td>
                    <td className="p-5 text-right">
                      <span className="material-icons-outlined text-primary opacity-0 group-hover:opacity-100 transition-all text-sm" title="Ver detalhes">visibility</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 bg-gray-50/30 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800 flex justify-end">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-[11px] font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm uppercase tracking-wider">
              <span className="material-icons-outlined text-sm">download</span>
              Exportar lista
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultationView;
