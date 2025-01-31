import React from 'react';

interface ToggleSwitchProps {
  name: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ name, checked, onChange, label, description, error, disabled,required }) => (
    <div className="mb-4">
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          name={name}
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          required={required}
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-disabled:bg-gray-100 dark:bg-gray-700 transition-colors">
          <div
            className={`absolute top-1 left-1 w-4 h-4 bg-white border border-gray-300 rounded-full transition-transform duration-300 ${
              checked ? "translate-x-5" : ""
            } dark:border-gray-600`}
          ></div>
        </div>
        <span className="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300">
          {required && <span className="text-red-500 ml-1">*</span>} {label}
        </span>
      </label>
      {description && (
        <p className="text-gray-400 text-xs max-w-80 mt-1">{description}</p>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
export default ToggleSwitch;