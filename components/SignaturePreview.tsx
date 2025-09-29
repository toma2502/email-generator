import React, { useMemo, useState, useEffect } from 'react';
import { useSignatureStore } from '../store/useSignatureStore';
import { generateSignatureHtml } from '../helpers/signatureTemplates';
import { SignatureData } from '../types';
import { Sun, Moon } from 'lucide-react';


const SignaturePreview: React.FC = () => {
    const signatureData = useSignatureStore((state) => state);
    const { importData, setActiveStep } = useSignatureStore();
    const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light');

    // Effect to load config from URL hash on initial load
    useEffect(() => {
        const hash = window.location.hash;
        if (hash.startsWith('#config=')) {
            try {
                const base64 = hash.substring(8);
                const jsonString = atob(base64);
                const config = JSON.parse(jsonString) as SignatureData;
                if (config.firstName && config.primaryColor) {
                    importData(config);
                    setActiveStep(signatureData.activeStep); // Keep current step or reset
                    // Clean up URL
                    window.history.pushState("", document.title, window.location.pathname + window.location.search);
                }
            } catch (error) {
                console.error("Failed to load config from URL", error);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run only once on mount

    const signatureHtml = useMemo(() => generateSignatureHtml(signatureData), [signatureData]);

    const isDark = previewMode === 'dark';
    const bgColor = isDark ? 'bg-gray-800' : 'bg-white';
    const textColor = isDark ? 'text-gray-300' : 'text-gray-600';
    const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';
    const headerBorderColor = isDark ? 'border-gray-700' : 'border-gray-200/80';
    const mockTextColor = isDark ? 'text-gray-100' : 'text-gray-800';
    const recipientBg = isDark ? 'bg-gray-600' : 'bg-gray-200/80';


    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-bold text-gray-800">Live Preview</h3>
                 <div className="flex items-center gap-2 border p-1 rounded-full">
                    <button onClick={() => setPreviewMode('light')} className={`p-1.5 rounded-full ${previewMode === 'light' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}>
                        <Sun size={16} />
                    </button>
                    <button onClick={() => setPreviewMode('dark')} className={`p-1.5 rounded-full ${previewMode === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-500'}`}>
                        <Moon size={16} />
                    </button>
                 </div>
            </div>

            <div className={`rounded-xl border ${borderColor} shadow-inner overflow-hidden ${bgColor} transition-colors`}>
                {/* Email Client Mockup Header */}
                <div className={`px-4 py-3 border-b ${headerBorderColor}`}>
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`text-sm font-medium ${textColor}`}>To:</span>
                        <span className={`text-sm px-2 py-0.5 rounded ${recipientBg} ${mockTextColor}`}>example@email.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                         <span className={`text-sm font-medium ${textColor}`}>Subject:</span>
                         <span className={`text-sm ${mockTextColor}`}>Check out my new signature!</span>
                    </div>
                </div>

                {/* Email Body */}
                <div className="p-4 sm:p-6 text-sm">
                    <p className={textColor}>Hi there,</p>
                    <br />
                    <p className={textColor}>This is a preview of the generated email signature.</p>
                    <br />
                    <p className={textColor}>Best regards,</p>
                    <br />
                    
                    {/* Signature Render */}
                    <div 
                        id="signature-preview-for-export"
                        className="text-left"
                        dangerouslySetInnerHTML={{ __html: signatureHtml }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SignaturePreview;