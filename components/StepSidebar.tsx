
import React from 'react';
import { Step } from '../types';
import { useSignatureStore } from '../store/useSignatureStore';
import { User, Image as ImageIcon, LayoutTemplate, Palette, Download, CheckCircle2 } from 'lucide-react';

interface StepSidebarProps {
    onStepClick?: () => void;
}

const StepItem: React.FC<{
    step: Step;
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    isComplete: boolean;
    onClick: (step: Step) => void;
}> = ({ step, icon, label, isActive, isComplete, onClick }) => {
    return (
        <li
            onClick={() => onClick(step)}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                isActive ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-600'
            }`}
        >
            <div className={`mr-4 ${isActive ? 'text-blue-600' : ''}`}>{icon}</div>
            <span className={`font-semibold ${isActive ? '' : ''}`}>{label}</span>
            {isComplete && !isActive && <CheckCircle2 className="ml-auto text-green-500" size={20} />}
        </li>
    );
};

const StepSidebar: React.FC<StepSidebarProps> = ({ onStepClick }) => {
    const { activeStep, setActiveStep, firstName, lastName } = useSignatureStore();
    
    const detailsComplete = !!firstName && !!lastName;

    const handleStepClick = (step: Step) => {
        setActiveStep(step);
        if (onStepClick) {
            onStepClick();
        }
    };

    const steps = [
        { step: Step.Details, icon: <User />, label: 'Details', isComplete: detailsComplete },
        { step: Step.Images, icon: <ImageIcon />, label: 'Images', isComplete: false },
        { step: Step.Templates, icon: <LayoutTemplate />, label: 'Templates', isComplete: false },
        { step: Step.Styles, icon: <Palette />, label: 'Styles', isComplete: false },
        { step: Step.Export, icon: <Download />, label: 'Export', isComplete: false },
    ];

    return (
        <nav>
            <ul className="space-y-2">
                {steps.map((s) => (
                    <StepItem
                        key={s.step}
                        step={s.step}
                        icon={s.icon}
                        label={s.label}
                        isActive={activeStep === s.step}
                        isComplete={s.isComplete}
                        onClick={handleStepClick}
                    />
                ))}
            </ul>
        </nav>
    );
};

export default StepSidebar;
