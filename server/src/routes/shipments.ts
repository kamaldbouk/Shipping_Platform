import express from "express";
import { requireAuth } from "../middleware/auth";
import {
  createShipment,
  getShipments,
  getShipmentById,
  updateShipment,
  deleteShipment,
} from "../controllers/shipmentController";

const router = express.Router();

router.post("/", requireAuth, createShipment);
router.get("/", requireAuth, getShipments);
router.get("/:id", requireAuth, getShipmentById);
router.put("/:id", requireAuth, updateShipment);
router.delete("/:id", requireAuth, deleteShipment);

export default router;
