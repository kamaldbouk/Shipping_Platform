function Loading() {
  const overlayStyle = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  };

  const spinnerStyle = {
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #1b8a8a",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 1s linear infinite",
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={overlayStyle}>
        <div style={spinnerStyle}></div>
      </div>
    </>
  );
}

export default Loading;
