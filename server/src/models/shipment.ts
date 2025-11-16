import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./user";

class Shipment extends Model {
  public id!: number;
  public waybill!: string;
  public customerName!: string;
  public customerPhone!: string;
  public customerAddress!: string;
  public status!: string; 
  public userId!: number;
}

Shipment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    waybill: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "CREATED",
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "shipments",
    sequelize,
  }
);

User.hasMany(Shipment, { foreignKey: "userId" });
Shipment.belongsTo(User, { foreignKey: "userId" });

export default Shipment;
