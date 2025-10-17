// database/migrate.js
const sequelize = require("./connection");
const mysql = require("mysql2/promise");
require("dotenv").config();

const createDatabase = async () => {
  try {
    // Create database if it doesn't exist
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    console.log("✅ Database created or already exists");
    await connection.end();

    // Import models
    const User = require("../models/User");
    const Part = require("../models/Part");

    // Sync all models
    await sequelize.sync({ force: false });
    console.log("✅ All models were synchronized successfully.");

    // Create sample data
    await createSampleData();

    process.exit(0);
  } catch (error) {
    console.error("❌ Database migration failed:", error);
    process.exit(1);
  }
};

const createSampleData = async () => {
  try {
    const User = require("../models/User");
    const Part = require("../models/Part");

    // Check if sample data already exists
    const userCount = await User.count();
    const partCount = await Part.count();

    if (userCount === 0) {
      // Create sample user
      await User.create({
        name: "Admin User",
        email: "admin@autoparts.com",
        password_hash: "admin123", // Will be hashed by the model hook
      });
      console.log("✅ Sample user created");
    }

    if (partCount === 0) {
      // Create sample parts
      const sampleParts = [
        {
          name: "Engine Oil Filter",
          brand: "Bosch",
          price: 12.99,
          stock: 45,
          category: "filters",
          description: "High-quality engine oil filter for optimal performance",
        },
        {
          name: "Brake Pads Set",
          brand: "Brembo",
          price: 89.99,
          stock: 23,
          category: "brakes",
          description: "Premium brake pads for reliable stopping power",
        },
        {
          name: "Air Filter",
          brand: "K&N",
          price: 24.99,
          stock: 34,
          category: "filters",
          description: "Performance air filter for improved airflow",
        },
        {
          name: "Spark Plugs (4-pack)",
          brand: "NGK",
          price: 35.99,
          stock: 67,
          category: "ignition",
          description: "Iridium spark plugs for better fuel efficiency",
        },
        {
          name: "Car Battery",
          brand: "Optima",
          price: 199.99,
          stock: 12,
          category: "electrical",
          description: "High-performance AGM battery",
        },
      ];

      await Part.bulkCreate(sampleParts);
      console.log("✅ Sample parts created");
    }
  } catch (error) {
    console.error("Error creating sample data:", error);
  }
};

createDatabase();
