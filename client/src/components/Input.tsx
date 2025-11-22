interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  containerStyle?: React.CSSProperties;
}

function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled = false,
  containerStyle: customContainerStyle,
}: InputProps) {
  const containerStyle = {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column" as const,
    ...customContainerStyle,
  };

  const labelStyle = {
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: "bold",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        style={inputStyle}
      />
    </div>
  );
}

export default Input;
