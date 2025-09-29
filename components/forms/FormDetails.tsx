import React, { ChangeEvent } from 'react';
import { useSignatureStore } from '../../store/useSignatureStore';
import { isValidEmail, isValidUrl } from '../../helpers/validators';

const InputField: React.FC<{
    label: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    type?: string;
}> = ({ label, name, value, onChange, placeholder, required, type = 'text' }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
        />
    </div>
);

const FormDetails: React.FC = () => {
    const data = useSignatureStore();
    const { updateData } = data;

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('socials.')) {
            const socialName = name.split('.')[1];
            updateData({ socials: { ...data.socials, [socialName]: value } });
        } else {
            updateData({ [name]: value });
        }
    };
    
    const addressCharCount = data.address.length;
    const addressMaxLength = 225;

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Your Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="First Name" name="firstName" value={data.firstName} onChange={handleChange} required />
                <InputField label="Last Name" name="lastName" value={data.lastName} onChange={handleChange} required />
                <InputField label="Job Title" name="jobTitle" value={data.jobTitle} onChange={handleChange} />
                <InputField label="Department" name="department" value={data.department} onChange={handleChange} />
                <InputField label="Company Name" name="companyName" value={data.companyName} onChange={handleChange} />
                <InputField label="Office Phone" name="officePhone" type="tel" value={data.officePhone} onChange={handleChange} />
                <InputField label="Mobile Phone" name="mobilePhone" type="tel" value={data.mobilePhone} onChange={handleChange} />
                <InputField label="Website URL" name="websiteUrl" type="url" value={data.websiteUrl} onChange={handleChange} />
                <InputField label="Email Address" name="email" type="email" value={data.email} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                    id="address"
                    name="address"
                    value={data.address}
                    onChange={handleChange}
                    rows={3}
                    maxLength={addressMaxLength}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                />
                 <p className={`text-sm mt-1 ${addressCharCount >= addressMaxLength ? 'text-red-500' : 'text-gray-500'}`}>
                    {addressCharCount}/{addressMaxLength}
                </p>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="LinkedIn" name="socials.linkedIn" value={data.socials.linkedIn} onChange={handleChange} />
                    <InputField label="Facebook" name="socials.facebook" value={data.socials.facebook} onChange={handleChange} />
                    <InputField label="Instagram" name="socials.instagram" value={data.socials.instagram} onChange={handleChange} />
                    <InputField label="X / Twitter" name="socials.twitter" value={data.socials.twitter} onChange={handleChange} />
                    <InputField label="YouTube" name="socials.youtube" value={data.socials.youtube} onChange={handleChange} />
                    <InputField label="TikTok" name="socials.tiktok" value={data.socials.tiktok} onChange={handleChange} />
                </div>
            </div>
        </div>
    );
};

export default FormDetails;