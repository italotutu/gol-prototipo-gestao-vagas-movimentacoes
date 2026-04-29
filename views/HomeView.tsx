
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructionModal from '../components/InstructionModal';

const HomeView: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      <InstructionModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title="Política de Armazenamento de Dados"
        description="Inserir aqui o texto oficial do jurídico sobre armazenamento e descarte de dados da GOL."
      />
      
      <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight">Menu de acesso</h1>
          <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium text-sm">
            Voltar
          </button>
        </div>

        <div className="bg-white dark:bg-card-dark rounded-2xl shadow-xl p-10 flex-1 flex items-center justify-center border border-gray-100 dark:border-gray-800 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-7xl">
            <div 
              onClick={() => navigate('/open-solicitation')}
              className="group relative bg-white dark:bg-gray-800 border-2 border-primary rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer shadow-[0_0_30px_rgba(255,94,0,0.15)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,94,0,0.25)] min-h-[360px]"
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Abrir solicitação</h2>
              <div className="w-24 h-24 rounded-full bg-orange-50 dark:bg-gray-700 flex items-center justify-center mb-6 ring-4 ring-primary/10 transition-transform duration-300 group-hover:scale-110">
                <span className="material-icons-outlined text-primary text-5xl">add_circle_outline</span>
              </div>
            </div>

            <div 
              onClick={() => navigate('/salary-change-request')}
              className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col text-center cursor-pointer hover:border-green-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl min-h-[360px] overflow-hidden"
            >
              <div className="flex-1 flex flex-col items-center justify-center p-10">
                <h2 className="text-2xl font-bold text-gray-500 dark:text-gray-400 mb-6 group-hover:text-green-500 transition-colors">Mudança Salarial</h2>
                <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center mb-6 group-hover:bg-green-50 transition-colors">
                  <span className="material-icons-outlined text-gray-400 group-hover:text-green-500 text-5xl">payments</span>
                </div>
              </div>
              <div className="w-full bg-green-50 dark:bg-green-900/20 max-h-0 group-hover:max-h-40 transition-all duration-500 ease-in-out border-t border-transparent group-hover:border-green-100 dark:group-hover:border-green-900/30">
                <div className="p-6 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  <p className="text-green-900 dark:text-green-200 text-xs leading-relaxed font-bold">
                    Solicite alterações de remuneração, mérito ou promoções sem movimentação de cargo.
                  </p>
                </div>
              </div>
            </div>

            <div 
              onClick={() => navigate('/consultation')}
              className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col text-center cursor-pointer hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl min-h-[360px] grayscale opacity-70 hover:grayscale-0 hover:opacity-100 overflow-hidden"
            >
              {/* Main Content Area */}
              <div className="flex-1 flex flex-col items-center justify-center p-10">
                <h2 className="text-2xl font-bold text-gray-500 dark:text-gray-400 mb-6 group-hover:text-primary transition-colors">Consultar Solicitações</h2>
                <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center mb-6 group-hover:bg-orange-50 transition-colors">
                  <span className="material-icons-outlined text-gray-400 group-hover:text-primary text-5xl">list_alt</span>
                </div>
              </div>

              {/* Smoothly Integrated Footer Tooltip */}
              <div className="w-full bg-orange-50 dark:bg-orange-900/20 max-h-0 group-hover:max-h-40 transition-all duration-500 ease-in-out border-t border-transparent group-hover:border-orange-100 dark:group-hover:border-orange-900/30">
                <div className="p-6 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  <p className="text-orange-900 dark:text-orange-200 text-xs leading-relaxed font-bold">
                    Clique aqui para visualizar e acompanhar o status das solicitações <strong>finalizadas</strong> e <strong>em andamento</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div 
              onClick={() => navigate('/medicine-consultation')}
              className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col text-center cursor-pointer hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl min-h-[360px] grayscale opacity-70 hover:grayscale-0 hover:opacity-100 overflow-hidden"
            >
              {/* Main Content Area */}
              <div className="flex-1 flex flex-col items-center justify-center p-10">
                <h2 className="text-2xl font-bold text-gray-500 dark:text-gray-400 mb-6 group-hover:text-blue-500 transition-colors">Consulta Medicina</h2>
                <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
                  <span className="material-icons-outlined text-gray-400 group-hover:text-blue-500 text-5xl">medical_services</span>
                </div>
              </div>

              {/* Smoothly Integrated Footer Tooltip */}
              <div className="w-full bg-blue-50 dark:bg-blue-900/20 max-h-0 group-hover:max-h-40 transition-all duration-500 ease-in-out border-t border-transparent group-hover:border-blue-100 dark:group-hover:border-blue-900/30">
                <div className="p-6 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  <p className="text-blue-900 dark:text-blue-200 text-xs leading-relaxed font-bold">
                    Acesso exclusivo para a equipe de <strong>Medicina do Trabalho</strong> analisar e gerenciar exames.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeView;
