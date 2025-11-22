interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: "primary" | "secondary";
}

function Button({ text, onClick, type = "primary" }: ButtonProps) {
  const buttonStyle = {
    primary: {
      backgroundColor: "#1b8a8a",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
    secondary: {
      backgroundColor: "#6c757d",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <button style={buttonStyle[type]} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
