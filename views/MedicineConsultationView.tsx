import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructionModal from '../components/InstructionModal';
import { useFlow } from '../context/FlowContext';

interface MedicineSolicitation {
  id: string;
  employee: string;
  department: string;
  unit: string;
  status: string;
  date: string;
}

const MedicineConsultationView: React.FC = () => {
  const navigate = useNavigate();
  const { flowState } = useFlow();
  const [showModal, setShowModal] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Filter states
  const [filterDepartment, setFilterDepartment] = useState('Todos');
  const [filterStatus, setFilterStatus] = useState('Todos');

  const allSolicitations: MedicineSolicitation[] = [
    { id: '000008', employee: flowState.candidatoNome || 'João Silva', department: flowState.departamento || 'Operações', unit: flowState.filial || 'CGH', status: flowState.status === 'Aguardando Consulta Medicina' ? 'Aguardando Análise' : (flowState.status || 'Aguardando Análise'), date: '20/10/2024' },
    { id: '000009', employee: 'Maria Souza', department: 'Manutenção', unit: 'GRU', status: 'Exame Agendado', date: '21/10/2024' },
    { id: '000010', employee: 'Pedro Santos', department: 'Cargas', unit: 'VCP', status: 'Aguardando Resultado', date: '22/10/2024' },
    { id: '000011', employee: 'Ana Oliveira', department: 'Atendimento', unit: 'SDU', status: 'Aprovado', date: '23/10/2024' },
    { id: '000012', employee: 'Carlos Pereira', department: 'Rampa', unit: 'BSB', status: 'Reprovado', date: '24/10/2024' },
  ];

  const solicitations = allSolicitations.filter(sol => {
    if (filterDepartment !== 'Todos' && sol.department !== filterDepartment) return false;
    if (filterStatus !== 'Todos' && sol.status !== filterStatus) return false;
    return true;
  });

  const removeFilter = (filter: string) => {
    const newFilters = activeFilters.filter(f => f !== filter);
    setActiveFilters(newFilters);
    
    if (filter.startsWith('Departamento:')) setFilterDepartment('Todos');
    if (filter.startsWith('Status:')) setFilterStatus('Todos');
  };

  const applyFilters = () => {
    const newFilters: string[] = [];
    if (filterDepartment !== 'Todos') newFilters.push(`Departamento: ${filterDepartment}`);
    if (filterStatus !== 'Todos') newFilters.push(`Status: ${filterStatus}`);
    
    setActiveFilters(newFilters);
    setShowFilterModal(false);
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setFilterDepartment('Todos');
    setFilterStatus('Todos');
  };

  const handleActionClick = (status: string) => {
    if (status === 'Aguardando avaliação final da Medicina') {
      navigate('/medicine-final-evaluation');
    } else {
      navigate('/medicine-analysis');
    }
  };

  return (
    <>
      <InstructionModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title="Consulta Medicina do Trabalho"
        description="Acesso exclusivo para a equipe de Medicina analisar e gerenciar os exames ocupacionais das movimentações internas."
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
                <input type="text" placeholder="Nome do colaborador..." className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl border-gray-200 dark:border-gray-700 p-3 text-sm focus:ring-primary focus:border-primary" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Unidade</label>
                <input type="text" placeholder="Ex: CGH" className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl border-gray-200 dark:border-gray-700 p-3 text-sm focus:ring-primary focus:border-primary" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Área / Departamento</label>
                <select 
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl border-gray-200 dark:border-gray-700 p-3 text-sm focus:ring-primary focus:border-primary appearance-none"
                >
                  <option value="Todos">Todos</option>
                  <option value="Operações">Operações</option>
                  <option value="Manutenção">Manutenção</option>
                  <option value="Cargas">Cargas</option>
                  <option value="Atendimento">Atendimento</option>
                  <option value="Rampa">Rampa</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status Medicina</label>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl border-gray-200 dark:border-gray-700 p-3 text-sm focus:ring-primary focus:border-primary appearance-none"
                >
                  <option value="Todos">Todos</option>
                  <option value="Aguardando Análise">Aguardando Análise</option>
                  <option value="Aguardando Agendamento">Aguardando Agendamento</option>
                  <option value="Exame Agendado">Exame Agendado</option>
                  <option value="Aguardando Resultado">Aguardando Resultado</option>
                  <option value="Aprovado">Aprovado</option>
                  <option value="Reprovado">Reprovado</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Data da Solicitação</label>
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
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight">Consulta Medicina</h1>
          <div className="flex gap-3">
            <button onClick={() => navigate('/')} className="px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-all">Voltar</button>
            <button onClick={() => setShowFilterModal(true)} className="flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold shadow-lg transition-all transform hover:scale-105">
              <span className="material-icons-outlined text-sm">filter_alt</span>
              Filtros
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-bold text-gray-500 dark:text-gray-400 mr-2">Filtros ativos:</span>
            {activeFilters.map((filter, index) => (
              <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium border border-blue-100 dark:border-blue-800/30">
                {filter}
                <button onClick={() => removeFilter(filter)} className="hover:text-blue-900 dark:hover:text-blue-100 focus:outline-none">
                  <span className="material-icons-outlined text-[16px]">close</span>
                </button>
              </span>
            ))}
            <button onClick={clearFilters} className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 underline ml-2">Limpar todos</button>
          </div>
        )}

        <div className="bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                  <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Solicitação</th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Colaborador</th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Área / Depto</th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Unidade</th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Data</th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                {solicitations.map((solicitation) => (
                  <tr key={solicitation.id} className="hover:bg-blue-50/30 dark:hover:bg-gray-800/30 transition-colors group">
                    <td className="p-4">
                      <span className="font-mono font-bold text-gray-900 dark:text-gray-100">{solicitation.id}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-gray-700 dark:text-gray-300">{solicitation.employee}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-600 dark:text-gray-400">{solicitation.department}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-600 dark:text-gray-400">{solicitation.unit}</span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                        solicitation.status === 'Aprovado' ? 'bg-green-50 text-green-700 border-green-200' :
                        solicitation.status === 'Reprovado' ? 'bg-red-50 text-red-700 border-red-200' :
                        solicitation.status === 'Aguardando Análise' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-orange-50 text-orange-700 border-orange-200'
                      }`}>
                        {solicitation.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 dark:text-gray-400 text-sm">{solicitation.date}</td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleActionClick(solicitation.status)}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="Analisar"
                      >
                        <span className="material-icons-outlined">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/30 dark:bg-gray-800/30">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Mostrando 1 a 5 de 5 registros</span>
            <div className="flex gap-1">
               <button className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 disabled:opacity-50"><span className="material-icons-outlined text-sm">chevron_left</span></button>
              <button className="p-1.5 rounded-lg border border-blue-500 bg-blue-50 text-blue-600 font-bold text-sm min-w-[32px]">1</button>
              <button className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 disabled:opacity-50"><span className="material-icons-outlined text-sm">chevron_right</span></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicineConsultationView;
