interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ isOpen, title, children, onClose }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  const overlayStyle = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "5px",
    maxWidth: "500px",
    width: "90%",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  const closeButtonStyle = {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "28px",
    cursor: "pointer",
    color: "#666",
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>{title}</h2>
          <button style={closeButtonStyle} onClick={onClose}>
            ×
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
