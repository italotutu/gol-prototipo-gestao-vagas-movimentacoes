
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomeView from './views/HomeView';
import JobOpeningView from './views/JobOpeningView';
import ConsultationView from './views/ConsultationView';
import ApprovalView from './views/ApprovalView';
import CompensationApprovalView from './views/CompensationApprovalView';
import TreatmentView from './views/TreatmentView';
import NegotiationView from './views/NegotiationView';
import AdmissionView from './views/AdmissionView';
import MedicineConsultationView from './views/MedicineConsultationView';
import MedicineAnalysisView from './views/MedicineAnalysisView';
import MedicineSchedulingView from './views/MedicineSchedulingView';
import MedicineConfirmationView from './views/MedicineConfirmationView';
import MedicineFinalEvaluationView from './views/MedicineFinalEvaluationView';
import FutureManagerDecisionView from './views/FutureManagerDecisionView';
import MovementConclusionView from './views/MovementConclusionView';
import SalaryChangeRequestView from './views/SalaryChangeRequestView';
import BPSalaryAnalysisView from './views/BPSalaryAnalysisView';
import { FlowProvider } from './context/FlowContext';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Ensure we start at the home menu on initial load
  React.useEffect(() => {
    if (window.location.hash !== '#/') {
      window.location.hash = '#/';
    }
  }, []);

  return (
    <FlowProvider>
      <HashRouter>
        <div className="flex h-screen overflow-hidden font-sans">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 bg-gray-50 dark:bg-gray-900">
            <Header onToggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
            <main className="flex-1 overflow-y-auto no-scrollbar">
              <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/open-solicitation" element={<JobOpeningView />} />
                <Route path="/salary-change-request" element={<SalaryChangeRequestView />} />
                <Route path="/salary-change-bp-analysis" element={<BPSalaryAnalysisView />} />
                <Route path="/consultation" element={<ConsultationView />} />
                <Route path="/approval" element={<ApprovalView />} />
                <Route path="/compensation-approval" element={<CompensationApprovalView />} />
                <Route path="/treatment" element={<TreatmentView />} />
                <Route path="/negotiation" element={<NegotiationView />} />
                <Route path="/admission" element={<AdmissionView />} />
                <Route path="/medicine-consultation" element={<MedicineConsultationView />} />
                <Route path="/medicine-analysis" element={<MedicineAnalysisView />} />
                <Route path="/medicine-scheduling" element={<MedicineSchedulingView />} />
                <Route path="/medicine-confirmation" element={<MedicineConfirmationView />} />
                <Route path="/medicine-final-evaluation" element={<MedicineFinalEvaluationView />} />
                <Route path="/future-manager-decision" element={<FutureManagerDecisionView />} />
                <Route path="/movement-conclusion" element={<MovementConclusionView />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </HashRouter>
    </FlowProvider>
  );
};

export default App;
