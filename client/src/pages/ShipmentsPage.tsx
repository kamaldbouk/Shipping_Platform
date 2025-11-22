import { useState, useEffect } from "react";
import { shipmentAPI } from "../api/queries";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

interface Shipment {
  id: number;
  waybill: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  status: string;
  destinationWeather?: any;
}

function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [formData, setFormData] = useState({
    waybill: "",
    customerName: "",
    customerPhone: "",
    customerAddress: "",
  });

  const userName = localStorage.getItem("userName") || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    window.location.href = "/login";
  };

  const loadShipments = async (showLoadingOverlay = false) => {
    if (showLoadingOverlay) setLoading(true);
    setError("");
    try {
      const response = await shipmentAPI.getShipments(filterStatus, search);
      setShipments(response.data.shipments || []);
    } catch (err: any) {
      setError("Failed to load shipments");
    } finally {
      if (showLoadingOverlay) setLoading(false);
    }
  };

  useEffect(() => {
    loadShipments();
  }, [search, filterStatus]);

  const handleCreateShipment = async () => {
    if (
      !formData.customerName ||
      !formData.customerPhone ||
      !formData.customerAddress
    ) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await shipmentAPI.createShipment(
        formData.customerName,
        formData.customerPhone,
        formData.customerAddress
      );
      setShowCreateModal(false);
      setFormData({
        waybill: "",
        customerName: "",
        customerPhone: "",
        customerAddress: "",
      });
      loadShipments(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create shipment");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateShipment = async () => {
    if (!selectedShipment) return;

    try {
      setLoading(true);
      await shipmentAPI.updateShipment(selectedShipment.id, {
        customerName: formData.customerName || selectedShipment.customerName,
        customerPhone:
          formData.customerPhone || selectedShipment.customerPhone,
        customerAddress:
          formData.customerAddress || selectedShipment.customerAddress,
      });
      setShowEditModal(false);
      setSelectedShipment(null);
      loadShipments(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update shipment");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteShipment = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this shipment?")) {
      try {
        setLoading(true);
        await shipmentAPI.deleteShipment(id);
        loadShipments(true);
      } catch (err: any) {
        setError("Failed to delete shipment");
        setLoading(false);
      }
    }
  };

  const handleUpdateStatus = async () => {
    if (!newStatus || !selectedShipment) {
      setError("Please select a status");
      return;
    }

    try {
      setLoading(true);
      await shipmentAPI.updateShipment(selectedShipment.id, { status: newStatus });
      setShowStatusModal(false);
      setNewStatus("");
      setSelectedShipment(null);
      loadShipments(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const openStatusModal = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setNewStatus("");
    setShowStatusModal(true);
  };

  const openEditModal = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setFormData({
      waybill: shipment.waybill,
      customerName: shipment.customerName,
      customerPhone: shipment.customerPhone,
      customerAddress: shipment.customerAddress,
    });
    setShowEditModal(true);
  };

  const containerStyle = {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap" as const,
  };

  const searchContainerStyle = {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap" as const,
    alignItems: "flex-end",
  };

  const searchInputContainerStyle = {
    flex: 1,
    minWidth: "250px",
    marginBottom: "0",
  };

  const errorStyle = {
    color: "red",
    padding: "10px",
    backgroundColor: "#ffebee",
    borderRadius: "5px",
    marginBottom: "20px",
  };

  const shipmentListStyle = {
    display: "grid",
    gap: "15px",
  };

  const shipmentItemStyle = {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  };

  const shipmentHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    flexWrap: "wrap" as const,
  };

  const shipmentDetailStyle = {
    fontSize: "14px",
    marginBottom: "8px",
    color: "#666",
  };

  const actionsStyle = {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
    flexWrap: "wrap" as const,
  };

  return (
    <>
      {loading && <Loading />}
      <Navbar userName={userName} onLogout={handleLogout} />
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1>Shipments</h1>
          <Button
            text="Create New"
            onClick={() => setShowCreateModal(true)}
            type="primary"
          />
        </div>

      {error && <div style={errorStyle}>{error}</div>}

      <div style={searchContainerStyle}>
        <div style={searchInputContainerStyle}>
          <Input
            label=""
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or waybill..."
            containerStyle={{ marginBottom: "0" }}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            height: "40px",
            fontSize: "14px",
          }}
        >
          <option value="">All Status</option>
          <option value="CREATED">Created</option>
          <option value="IN_TRANSIT">In Transit</option>
          <option value="DELIVERED">Delivered</option>
        </select>
      </div>

      {shipments.length === 0 ? (
        <Card title="No Shipments">
          <p>No shipments found. Create one to get started.</p>
        </Card>
      ) : (
        <div style={shipmentListStyle}>
          {shipments.map((shipment) => (
            <div key={shipment.id} style={shipmentItemStyle}>
              <div style={shipmentHeaderStyle}>
                <h3>{shipment.waybill}</h3>
                <span
                  style={{
                    backgroundColor:
                      shipment.status === "DELIVERED" ? "#4caf50" : "#2196f3",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "12px",
                  }}
                >
                  {shipment.status}
                </span>
              </div>
              <div style={shipmentDetailStyle}>
                <strong>Name:</strong> {shipment.customerName}
              </div>
              <div style={shipmentDetailStyle}>
                <strong>Phone:</strong> {shipment.customerPhone}
              </div>
              <div style={shipmentDetailStyle}>
                <strong>Address:</strong> {shipment.customerAddress}
              </div>
              {shipment.destinationWeather && (
                <div style={shipmentDetailStyle}>
                  <strong>Weather:</strong> {shipment.destinationWeather.description} (
                  {shipment.destinationWeather.temperature}°C)
                </div>
              )}
              <div style={actionsStyle}>
                <Button
                  text="Edit"
                  onClick={() => openEditModal(shipment)}
                  type="primary"
                />
                <Button
                  text="Update Status"
                  onClick={() => openStatusModal(shipment)}
                  type="primary"
                />
                <Button
                  text="Delete"
                  onClick={() => handleDeleteShipment(shipment.id)}
                  type="secondary"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={showCreateModal}
        title="Create Shipment"
        onClose={() => setShowCreateModal(false)}
      >
        <Input
          label="Customer Name"
          type="text"
          value={formData.customerName}
          onChange={(e) =>
            setFormData({ ...formData, customerName: e.target.value })
          }
          placeholder="Enter customer name"
        />
        <Input
          label="Customer Phone"
          type="text"
          value={formData.customerPhone}
          onChange={(e) =>
            setFormData({ ...formData, customerPhone: e.target.value })
          }
          placeholder="Enter phone number"
        />
        <Input
          label="Customer Address"
          type="text"
          value={formData.customerAddress}
          onChange={(e) =>
            setFormData({ ...formData, customerAddress: e.target.value })
          }
          placeholder="Enter customer address"
        />
        <Button
          text={loading ? "Creating..." : "Create"}
          onClick={handleCreateShipment}
        />
      </Modal>

      <Modal
        isOpen={showEditModal}
        title="Edit Shipment"
        onClose={() => setShowEditModal(false)}
      >
        <Input
          label="Waybill"
          type="text"
          value={formData.waybill}
          onChange={(e) =>
            setFormData({ ...formData, waybill: e.target.value })
          }
          placeholder="Enter waybill number"
          disabled
        />
        <Input
          label="Customer Name"
          type="text"
          value={formData.customerName}
          onChange={(e) =>
            setFormData({ ...formData, customerName: e.target.value })
          }
          placeholder="Enter customer name"
        />
        <Input
          label="Customer Phone"
          type="text"
          value={formData.customerPhone}
          onChange={(e) =>
            setFormData({ ...formData, customerPhone: e.target.value })
          }
          placeholder="Enter phone number"
        />
        <Input
          label="Customer Address"
          type="text"
          value={formData.customerAddress}
          onChange={(e) =>
            setFormData({ ...formData, customerAddress: e.target.value })
          }
          placeholder="Enter customer address"
        />
        <Button
          text={loading ? "Updating..." : "Update"}
          onClick={handleUpdateShipment}
        />
      </Modal>

      <Modal
        isOpen={showStatusModal}
        title="Update Shipment Status"
        onClose={() => setShowStatusModal(false)}
      >
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Select New Status
          </label>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          >
            <option value="">-- Choose Status --</option>
            <option value="IN_TRANSIT">In Transit</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELED">Canceled</option>
          </select>
        </div>
        <Button
          text={loading ? "Updating..." : "Update Status"}
          onClick={handleUpdateStatus}
        />
      </Modal>
    </div>
    </>
  );
}

export default ShipmentsPage;
