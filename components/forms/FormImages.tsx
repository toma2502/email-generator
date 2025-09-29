
import React, { ChangeEvent, useCallback } from 'react';
import { useSignatureStore } from '../../store/useSignatureStore';
import { UploadCloud, Trash2 } from 'lucide-react';

const ImageUploader: React.FC<{
    label: string;
    imageSrc: string;
    onUpload: (base64: string) => void;
    onRemove: () => void;
}> = ({ label, imageSrc, onUpload, onRemove }) => {
    
    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                onUpload(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [onUpload]);

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border">
                    {imageSrc ? (
                        <img src={imageSrc} alt={`${label} preview`} className="w-full h-full object-contain" />
                    ) : (
                        <UploadCloud className="text-gray-400" />
                    )}
                </div>
                <div className="flex-1 space-y-2">
                    <label htmlFor={`${label}-upload`} className="cursor-pointer bg-white text-gray-700 text-sm font-semibold py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                        Upload Image
                    </label>
                    <input type="file" id={`${label}-upload`} accept="image/png, image/jpeg, image/gif" className="hidden" onChange={handleFileChange} />
                    {imageSrc && (
                        <button onClick={onRemove} className="flex items-center gap-1 text-red-600 text-sm font-medium hover:text-red-800 transition">
                            <Trash2 size={14} /> Remove
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const FormImages: React.FC = () => {
    const { logo, avatar, imageSize, imageRoundness, updateData } = useSignatureStore();

    return (
        <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-800">Images</h2>
            <div className="space-y-6">
                <ImageUploader
                    label="Logo"
                    imageSrc={logo}
                    onUpload={(base64) => updateData({ logo: base64 })}
                    onRemove={() => updateData({ logo: '' })}
                />
                <ImageUploader
                    label="Avatar"
                    imageSrc={avatar}
                    onUpload={(base64) => updateData({ avatar: base64 })}
                    onRemove={() => updateData({ avatar: '' })}
                />
            </div>
            <div>
                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Image Style</h3>
                 <div className="space-y-4">
                    <div>
                         <label htmlFor="imageSize" className="block text-sm font-medium text-gray-700 mb-1">Size: {imageSize}px</label>
                         <input
                            type="range"
                            id="imageSize"
                            min="24"
                            max="96"
                            value={imageSize}
                            onChange={(e) => updateData({ imageSize: Number(e.target.value) })}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                     <div>
                         <label htmlFor="imageRoundness" className="block text-sm font-medium text-gray-700 mb-1">Roundness: {imageRoundness}%</label>
                         <input
                            type="range"
                            id="imageRoundness"
                            min="0"
                            max="50"
                            value={imageRoundness}
                            onChange={(e) => updateData({ imageRoundness: Number(e.target.value) })}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default FormImages;
