
import React, { useState, useCallback } from 'react';
import { Step } from './types';
import { useSignatureStore } from './store/useSignatureStore';
import StepSidebar from './components/StepSidebar';
import FormDetails from './components/forms/FormDetails';
import FormImages from './components/forms/FormImages';
import TemplatePicker from './components/forms/TemplatePicker';
import StyleControls from './components/forms/StyleControls';
import ExportPanel from './components/forms/ExportPanel';
import SignaturePreview from './components/SignaturePreview';
import { FileUp } from 'lucide-react';
import PromotionalBanner from './components/PromotionalBanner';

const App: React.FC = () => {
    const activeStep = useSignatureStore((state) => state.activeStep);
    const setActiveStep = useSignatureStore((state) => state.setActiveStep);
    const resetData = useSignatureStore((state) => state.resetData);
    const { firstName, lastName, importData } = useSignatureStore();
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const isCreateDisabled = !firstName || !lastName;

    const renderActiveStep = () => {
        switch (activeStep) {
            case Step.Details:
                return <FormDetails />;
            case Step.Images:
                return <FormImages />;
            case Step.Templates:
                return <TemplatePicker />;
            case Step.Styles:
                return <StyleControls />;
            case Step.Export:
                return <ExportPanel />;
            default:
                return <FormDetails />;
        }
    };
    
    const handleJsonImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target?.result as string);
                    // A simple check to see if it's a valid config
                    if (json.firstName && json.primaryColor) {
                        importData(json);
                        setActiveStep(Step.Details);
                    } else {
                        alert('Invalid configuration file.');
                    }
                } catch (error) {
                    console.error('Failed to parse JSON file', error);
                    alert('Failed to read configuration file.');
                }
            };
            reader.readAsText(file);
        }
    }, [importData, setActiveStep]);

    return (
        <div className="min-h-screen font-sans text-gray-800 bg-gray-100">
            <header className="bg-white shadow-sm lg:hidden sticky top-0 z-20">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">Signature Generator</h1>
                    <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                </div>
                {showMobileMenu && (
                     <div className="bg-white border-t">
                        <StepSidebar onStepClick={() => setShowMobileMenu(false)} />
                    </div>
                )}
            </header>
            
            <PromotionalBanner />

            <div className="flex flex-col lg:flex-row max-w-screen-2xl mx-auto p-4 lg:p-8 gap-8">
                {/* --- Left Sidebar --- */}
                <aside className="w-full lg:w-1/3 xl:w-1/4 hidden lg:block">
                     <div className="bg-white p-6 rounded-xl shadow-md sticky top-8">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">Signature Generator</h1>
                        <StepSidebar />
                        <div className="mt-6 border-t pt-4">
                            <label htmlFor="import-json" className="w-full cursor-pointer flex items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg">
                                <FileUp size={16} />
                                Import .sigconfig
                            </label>
                            <input type="file" id="import-json" accept=".sigconfig, .json" className="hidden" onChange={handleJsonImport} />
                        </div>
                     </div>
                </aside>
                 {/* --- Mobile/Tablet Form Container --- */}
                <div className="lg:hidden w-full bg-white p-6 rounded-xl shadow-md">
                     {renderActiveStep()}
                </div>


                {/* --- Right Content Area --- */}
                <main className="w-full lg:w-2/3 xl:w-3/4 flex flex-col gap-8">
                    {/* --- Form Section for larger screens --- */}
                    <div className="hidden lg:block bg-white p-8 rounded-xl shadow-md">
                        {renderActiveStep()}
                    </div>
                    
                    {/* --- Preview Section --- */}
                    <div className="bg-white p-4 sm:p-8 rounded-xl shadow-md">
                        <SignaturePreview />
                        
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <button
                                onClick={() => window.confirm('Are you sure you want to clear all fields?') && resetData()}
                                className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                            >
                                Clear all input fields
                            </button>
                            <button
                                onClick={() => setActiveStep(Step.Export)}
                                disabled={isCreateDisabled}
                                className="w-full sm:w-auto bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                            >
                                Create signature
                            </button>
                        </div>
                    </div>
                </main>
            </div>
            
            <PromotionalBanner />
        </div>
    );
};

export default App;
