
import React, { useRef, useState, useCallback, useMemo } from 'react';
import { useSignatureStore } from '../../store/useSignatureStore';
import { generateSignatureHtml } from '../../helpers/signatureTemplates';
import { toPng } from 'html-to-image';
import { Copy, Download, Image as ImageIcon, Link as LinkIcon, FileJson, Mail } from 'lucide-react';

const ExportButton: React.FC<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    status?: string;
}> = ({ icon, label, onClick, status }) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200 transition-colors w-full"
    >
        {icon}
        <span className="mt-2 text-sm font-semibold text-gray-700">{status || label}</span>
    </button>
);


const ExportPanel: React.FC = () => {
    const signatureData = useSignatureStore();
    const [copyStatus, setCopyStatus] = useState('');
    const previewRef = useRef<HTMLDivElement>(null);

    // Memoize generated HTML to avoid re-computing on every render
    const signatureHtml = useMemo(() => generateSignatureHtml(signatureData), [signatureData]);
    
    // This is a bit of a hack to get a ref to the preview element
    // In a real app, you might use a context or forwardRef
    React.useEffect(() => {
        const previewElement = document.getElementById('signature-preview-for-export');
        if (previewElement) {
            (previewRef as React.MutableRefObject<HTMLDivElement>).current = previewElement as HTMLDivElement;
        }
    }, []);

    const showStatusMessage = (setter: React.Dispatch<React.SetStateAction<string>>, message: string, originalLabel: string) => {
        setter(message);
        setTimeout(() => setter(originalLabel), 2000);
    };

    const handleCopyHtml = useCallback(() => {
        navigator.clipboard.writeText(signatureHtml).then(() => {
            showStatusMessage(setCopyStatus, 'Copied!', 'Copy HTML');
        });
    }, [signatureHtml]);

    const handleDownloadHtml = useCallback(() => {
        const blob = new Blob([signatureHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'signature.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [signatureHtml]);

    const handleDownloadPng = useCallback(() => {
        if (previewRef.current === null) {
            return;
        }
        toPng(previewRef.current, { cacheBust: true, pixelRatio: 2 })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = 'signature.png';
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.error('oops, something went wrong!', err);
            });
    }, []);

    const handleDownloadJson = useCallback(() => {
        const { activeStep, setActiveStep, updateData, resetData, importData, ...exportableData } = signatureData;
        const jsonString = JSON.stringify(exportableData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'signature.sigconfig';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [signatureData]);

    const handleShareLink = useCallback(() => {
        const { activeStep, ...exportableData } = signatureData;
        const jsonString = JSON.stringify(exportableData);
        const base64 = btoa(jsonString);
        const url = `${window.location.origin}${window.location.pathname}#config=${base64}`;
        navigator.clipboard.writeText(url).then(() => {
           alert('Shareable link copied to clipboard!');
        });
    }, [signatureData]);

    const handleTestEmail = useCallback(() => {
        const subject = "Test my new email signature";
        const body = "This is a test email to check my new signature. To install, copy the signature from the generator and paste it into your email client's signature settings.\n\n--";
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, []);


    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Export Your Signature</h2>
            <p className="text-sm text-gray-600">Your signature is ready! Use one of the options below to start using it.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <ExportButton icon={<Copy size={24} className="text-blue-600"/>} label="Copy HTML" onClick={handleCopyHtml} status={copyStatus} />
                <ExportButton icon={<Download size={24} className="text-green-600"/>} label="Download .html" onClick={handleDownloadHtml} />
                <ExportButton icon={<ImageIcon size={24} className="text-purple-600"/>} label="Download .png" onClick={handleDownloadPng} />
                <ExportButton icon={<FileJson size={24} className="text-orange-600"/>} label="Download .sigconfig" onClick={handleDownloadJson} />
                <ExportButton icon={<LinkIcon size={24} className="text-indigo-600"/>} label="Share Link" onClick={handleShareLink} />
                <ExportButton icon={<Mail size={24} className="text-teal-600"/>} label="Test Email" onClick={handleTestEmail} />
            </div>
             <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800">How to use</h4>
                <p className="text-sm text-blue-700 mt-1">
                    The easiest way is to use <strong>Copy HTML</strong> and paste it directly into the signature editor of your email client (like Gmail, Outlook, or Apple Mail).
                </p>
            </div>
        </div>
    );
};

export default ExportPanel;
