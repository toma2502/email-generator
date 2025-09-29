import React from 'react';
import { useSignatureStore } from '../../store/useSignatureStore';
import type { Template } from '../../types';

const templates: { id: Template; name: string; description: string }[] = [
    { id: 'minimal', name: 'Minimal', description: 'Clean typography, no lines, compact.' },
    { id: 'modern', name: 'Modern', description: 'Accent line, thin icons, subtle colors.' },
    { id: 'corporate', name: 'Corporate', description: 'Clear sections, separators, professional.' },
    { id: 'professional', name: 'Professional', description: 'Classic side-by-side with vertical separator.' },
    { id: 'creative', name: 'Creative', description: 'Split layout with avatar in the middle.' },
    { id: 'banner', name: 'Banner', description: 'Contact details with a full-width social banner.' },
    { id: 'classic', name: 'Classic', description: 'Circular avatar with a logo on the right.' },
    { id: 'verticalSocial', name: 'Vertical Social', description: 'Avatar with vertically aligned social icons.' },
    { id: 'logoFocus', name: 'Logo Focus', description: 'Prominent logo on the left with contact details.' },
];

const TemplateCard: React.FC<{
    template: { id: Template; name: string; description: string };
    isSelected: boolean;
    onSelect: (id: Template) => void;
}> = ({ template, isSelected, onSelect }) => (
    <div
        onClick={() => onSelect(template.id)}
        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
            isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-400'
        }`}
    >
        <h3 className="font-bold text-gray-800">{template.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{template.description}</p>
        
        {/* Simplified visual representation of the template */}
        <div className="mt-4 p-2 bg-gray-100 rounded-md">
            {template.id === 'classic' && (
                <div className="flex items-center justify-between">
                    <div className="h-6 w-6 bg-gray-400 rounded-full"></div>
                    <div className="flex-1 ml-2 space-y-1">
                        <div className="h-2 w-3/4 bg-gray-500 rounded-sm"></div>
                        <div className="h-1.5 w-1/2 bg-gray-400 rounded-sm"></div>
                    </div>
                    <div className="h-4 w-6 bg-indigo-300 rounded-sm"></div>
                </div>
            )}
             {template.id === 'verticalSocial' && (
                <div className="flex items-center">
                    <div className="h-8 w-8 bg-gray-400 rounded-md"></div>
                    <div className="flex-1 ml-2 space-y-1">
                        <div className="h-2 w-3/4 bg-gray-500 rounded-sm"></div>
                        <div className="h-1.5 w-1/2 bg-gray-400 rounded-sm"></div>
                    </div>
                    <div className="w-px h-8 bg-gray-300 mx-2"></div>
                    <div className="space-y-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                    </div>
                </div>
            )}
             {template.id === 'logoFocus' && (
                <div className="flex items-center">
                    <div className="h-8 w-10 bg-indigo-300 rounded-sm"></div>
                    <div className="w-px h-8 bg-gray-300 mx-2"></div>
                    <div className="flex-1 space-y-1">
                        <div className="h-2 w-3/4 bg-gray-500 rounded-sm"></div>
                        <div className="h-1.5 w-1/2 bg-gray-400 rounded-sm"></div>
                    </div>
                </div>
            )}
            {(template.id !== 'classic' && template.id !== 'verticalSocial' && template.id !== 'logoFocus') && (
                <div className="space-y-1">
                    <div className="h-2 w-1/2 bg-gray-500 rounded-sm"></div>
                    {template.id === 'modern' && <div className="h-0.5 w-1/4 bg-blue-500"></div>}
                    <div className="h-1.5 w-1/3 bg-gray-400 rounded-sm"></div>
                    <div className="h-1.5 w-1/4 bg-gray-400 rounded-sm"></div>
                    {(template.id === 'corporate' || template.id === 'professional' || template.id === 'creative') && <div className="h-px w-full bg-gray-300 my-1"></div>}
                    <div className="flex gap-2 pt-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                    </div>
                    {template.id === 'banner' && <div className="h-4 w-full bg-blue-400 rounded-sm mt-2"></div>}
                </div>
            )}
        </div>
    </div>
);

const TemplatePicker: React.FC = () => {
    const { template, updateData } = useSignatureStore();

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Choose a Template</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((t) => (
                    <TemplateCard
                        key={t.id}
                        template={t}
                        isSelected={template === t.id}
                        onSelect={(id) => updateData({ template: id })}
                    />
                ))}
            </div>
        </div>
    );
};

export default TemplatePicker;