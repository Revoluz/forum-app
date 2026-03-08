import PropTypes from 'prop-types';

function FormInput({ label, type, placeholder, value, onChange, required }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-notion-text dark:text-slate-200">
        {label}
      </span>
      <input
        className="form-input w-full h-10 px-3 rounded-notion  border dark:border-slate-600  text-sm focus:border-notion-gray focus:ring-0 dark:focus:border-slate-400 transition-colors"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </label>
  );
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

FormInput.defaultProps = {
  type: 'text',
  placeholder: '',
  required: false,
};

export default FormInput;
