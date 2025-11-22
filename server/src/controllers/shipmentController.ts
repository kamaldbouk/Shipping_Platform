import Shipment from "../models/shipment";
import { getWeatherByAddress } from "../utils/weatherService";

const generateWaybill = () => {
  return `WB-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
};

export const createShipment = async (req: any, res: any) => {
  try {
    const { customerName, customerPhone, customerAddress } = req.body;

    if (!customerName || !customerPhone || !customerAddress) {
      return res.status(400).json({ message: "All fields required" });
    }

    const weatherData = await getWeatherByAddress(customerAddress);

    const waybill = generateWaybill();
    const shipment = await Shipment.create({
      waybill,
      customerName,
      customerPhone,
      customerAddress,
      userId: req.userId,
      status: "CREATED",
      destinationWeather: weatherData,
    });

    res.status(201).json({
      message: "Shipment created",
      shipment: shipment.toJSON(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating shipment" });
  }
};

export const getShipments = async (req: any, res: any) => {
  try {
    const { status, search } = req.query;
    const where: any = { userId: req.userId };

    if (status) {
      where.status = status;
    }

    const shipments = await Shipment.findAll({ where });

    let filtered = shipments;
    if (search) {
      const searchLower = (search as string).toLowerCase();
      filtered = shipments.filter(
        (s) =>
          s.customerName.toLowerCase().includes(searchLower) ||
          s.waybill.toLowerCase().includes(searchLower) ||
          s.customerPhone.includes(searchLower)
      );
    }

    res.json({
      message: "Shipments retrieved",
      count: filtered.length,
      shipments: filtered.map((s) => s.toJSON()),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving shipments" });
  }
};

export const getShipmentById = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const shipment = await Shipment.findOne({
      where: { id, userId: req.userId },
    });

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.json({
      message: "Shipment retrieved",
      shipment: shipment.toJSON(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving shipment" });
  }
};

export const updateShipment = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { customerName, customerPhone, customerAddress, status } = req.body;

    const shipment = await Shipment.findOne({
      where: { id, userId: req.userId },
    });

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    if (customerName) shipment.customerName = customerName;
    if (customerPhone) shipment.customerPhone = customerPhone;
    if (customerAddress) {
      shipment.customerAddress = customerAddress;
      const weatherData = await getWeatherByAddress(customerAddress);
      shipment.destinationWeather = weatherData;
    }
    if (status) shipment.status = status;

    await shipment.save();

    res.json({
      message: "Shipment updated",
      shipment: shipment.toJSON(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating shipment" });
  }
};

export const deleteShipment = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const shipment = await Shipment.findOne({
      where: { id, userId: req.userId },
    });

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    await shipment.destroy();

    res.json({ message: "Shipment deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting shipment" });
  }
};
