import { AlertCircle } from 'lucide-react';

export default function InputField({ label, name, type = 'text', value, onChange, error, placeholder }) {
    return (
        <div>
            <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">
                {label} *
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full border px-4 py-3 ${
                    error ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:border-blue-600 focus:ring-blue-600`}
            />
            {error && (
                <div className="mt-1 flex items-center text-sm text-red-500">
                    <AlertCircle className="mr-1 h-4 w-4" />
                    {error}
                </div>
            )}
        </div>
    );
}
