interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "20px",
    marginBottom: "20px",
    backgroundColor: "#f9f9f9",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>{title}</h2>
      <div>{children}</div>
    </div>
  );
}

export default Card;
