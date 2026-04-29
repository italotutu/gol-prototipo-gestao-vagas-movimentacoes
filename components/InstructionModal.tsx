
import React, { useState, useEffect } from 'react';

interface InstructionModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
}

const InstructionModal: React.FC<InstructionModalProps> = ({ title, description, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-card-dark rounded-[2rem] shadow-2xl p-8 max-w-md w-full mx-4 border border-gray-100 dark:border-gray-800 transform animate-scale-in">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-orange-50 dark:bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <span className="material-icons-round text-primary text-4xl">info</span>
          </div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white mb-4 tracking-tight">{title}</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-8">
            {description}
          </p>
          <button
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-95"
          >
            OK, entendi
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionModal;
