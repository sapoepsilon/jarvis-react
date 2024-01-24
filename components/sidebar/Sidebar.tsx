// Sidebar.tsx
import { IVIUSAssistant, VIUSAssistant } from '@/constants/VIUSAssistant';
import React from 'react';
interface SidebarProps {
  onAssistantSelect: (assistantFunc: () => IVIUSAssistant) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onAssistantSelect }) => {
  const assistants = [VIUSAssistant.skyridge, VIUSAssistant.tuhaye, VIUSAssistant.promontory, VIUSAssistant.marcella];

  return (
    <div className="sidebar rounded-sm bg-gray-800 text-white w-64 h-full transition-all">
      <div className="p-4">
        <h1 className="text-lg font-bold">Assistants</h1>
        <select onChange={(e) => onAssistantSelect(assistants[parseInt(e.target.value)])} className="mt-2 p-2 bg-gray-700">
          {assistants.map((assistantFunc, index) => (
            <option key={index} value={index}>
              {assistantFunc().name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
