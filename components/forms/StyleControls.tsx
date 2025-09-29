import React from 'react';
import { useSignatureStore } from '../../store/useSignatureStore';
import type { SignatureData } from '../../types';

const ColorPicker: React.FC<{ label: string, color: string, onChange: (color: string) => void }> = ({ label, color, onChange }) => (
    <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex items-center gap-2 border rounded-lg p-1">
            <input
                type="color"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="w-8 h-8 p-0 border-none rounded cursor-pointer"
            />
            <span className="font-mono text-sm pr-2">{color.toUpperCase()}</span>
        </div>
    </div>
);

const ToggleSwitch: React.FC<{
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}> = ({ label, checked, onChange }) => (
    <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <button
            type="button"
            className={`${
                checked ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
        >
            <span
                className={`${
                    checked ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
        </button>
    </div>
);


const StyleControls: React.FC = () => {
    const data = useSignatureStore();
    const update = data.updateData;

    return (
        <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Styles & Options</h2>
            
            <div className="space-y-4">
                 <h3 className="font-semibold text-gray-800">Colors</h3>
                 <ColorPicker label="Primary Color (Links)" color={data.primaryColor} onChange={color => update({ primaryColor: color })} />
                 <ColorPicker label="Secondary Color (Lines)" color={data.secondaryColor} onChange={color => update({ secondaryColor: color })} />
                 <ColorPicker label="Accent Color (Icons, Underlines)" color={data.accentColor} onChange={color => update({ accentColor: color })} />
            </div>

            <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Typography & Spacing</h3>
                <div>
                    <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700 mb-1">Font Size: {data.fontSize}px</label>
                    <input type="range" id="fontSize" min="12" max="16" value={data.fontSize} onChange={e => update({ fontSize: Number(e.target.value)})} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                </div>
                 <div>
                    <label htmlFor="lineHeight" className="block text-sm font-medium text-gray-700 mb-1">Line Height: {data.lineHeight}%</label>
                    <input type="range" id="lineHeight" min="100" max="200" value={data.lineHeight} onChange={e => update({ lineHeight: Number(e.target.value)})} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                </div>
            </div>

             <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">General</h3>
                <ToggleSwitch label="Show Icons" checked={data.showIcons} onChange={c => update({ showIcons: c })} />
                <ToggleSwitch label="Show Separators/Lines" checked={data.showSeparators} onChange={c => update({ showSeparators: c })} />
                <ToggleSwitch label="Accent Underline" checked={data.useAccentUnderline} onChange={c => update({ useAccentUnderline: c })} />
                <ToggleSwitch label="Right-to-Left (RTL)" checked={data.direction === 'rtl'} onChange={c => update({ direction: c ? 'rtl' : 'ltr' })} />
            </div>

        </div>
    );
};

export default StyleControls;