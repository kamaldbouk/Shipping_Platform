import { useState } from "react";

interface NavbarProps {
  userName: string;
  onLogout: () => void;
}

function Navbar({ userName, onLogout }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navbarStyle = {
    backgroundColor: "#1b8a8a",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    fontFamily: "Poppins, sans-serif",
  };

  const leftSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  };

  const logoStyle = {
    width: "40px",
    height: "40px",
    backgroundImage: `url(/logo.png)`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    fontFamily: "Poppins, sans-serif",
  };

  const userMenuStyle = {
    position: "relative" as const,
  };

  const userButtonStyle = {
    backgroundColor: "transparent",
    color: "white",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    padding: "10px 15px",
    borderRadius: "5px",
    transition: "background-color 0.2s",
  };

  const dropdownStyle = {
    position: "absolute" as const,
    top: "50px",
    right: "0",
    backgroundColor: "white",
    color: "#333",
    borderRadius: "5px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    minWidth: "150px",
    zIndex: 100,
  };

  const dropdownItemStyle = {
    padding: "12px 20px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
    transition: "background-color 0.2s",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setDropdownOpen(false);
    onLogout();
  };

  return (
    <div style={navbarStyle}>
      <div style={leftSectionStyle}>
        <div style={logoStyle}></div>
        <div style={titleStyle}>Pixel-38 Shipments</div>
      </div>

      <div style={userMenuStyle}>
        <button
          style={userButtonStyle}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {userName} ▼
        </button>
        {dropdownOpen && (
          <div style={dropdownStyle}>
            <div
              style={dropdownItemStyle}
              onClick={handleLogout}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f5f5f5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
