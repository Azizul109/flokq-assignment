// routes/parts.js
const express = require("express");
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");
const Part = require("../models/Part");
const { partSchema } = require("../validation/schemas");
const { authenticateToken } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

// Helper function to get image URL
const getImageUrl = (req, filename) => {
  if (!filename) return null;
  return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
};

// Get all parts (public)
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    let whereClause = {};

    // Filter by category if provided
    if (category && category !== "all") {
      whereClause.category = category;
    }

    // Search by name or brand if provided
    if (search) {
      whereClause = {
        ...whereClause,
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { brand: { [Op.like]: `%${search}%` } },
        ],
      };
    }

    const parts = await Part.findAll({
      where: whereClause,
    });

    res.json({
      success: true,
      data: parts,
      count: parts.length,
    });
  } catch (error) {
    console.error("Get parts error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch parts",
    });
  }
});

// Get single part (public)
router.get("/:id", async (req, res) => {
  try {
    const part = await Part.findByPk(req.params.id);

    if (!part) {
      return res.status(404).json({
        success: false,
        error: "Part not found",
      });
    }

    res.json({
      success: true,
      data: part,
    });
  } catch (error) {
    console.error("Get part error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch part",
    });
  }
});

// Create new part (protected) - with file upload
router.post(
  "/",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      // Validate other fields
      const { error, value } = partSchema.validate(req.body);
      if (error) {
        // If there's a file uploaded but validation failed, delete it
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({
          success: false,
          error: error.details[0].message,
        });
      }

      const { name, brand, price, stock, category, description } = value;

      // Handle image upload
      let image_url = null;
      if (req.file) {
        image_url = getImageUrl(req, req.file.filename);
      }

      const part = await Part.create({
        name,
        brand,
        price,
        stock,
        category,
        description,
        image_url,
      });

      res.status(201).json({
        success: true,
        message: "Part created successfully",
        data: part,
      });
    } catch (error) {
      // If there's a file uploaded but creation failed, delete it
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      console.error("Create part error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to create part",
      });
    }
  }
);

// Update part (protected) - with file upload
router.put(
  "/:id",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      // Validate other fields
      const { error, value } = partSchema.validate(req.body);
      if (error) {
        // If there's a file uploaded but validation failed, delete it
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({
          success: false,
          error: error.details[0].message,
        });
      }

      const part = await Part.findByPk(req.params.id);
      if (!part) {
        // If there's a file uploaded but part not found, delete it
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(404).json({
          success: false,
          error: "Part not found",
        });
      }

      // Handle image upload - if new file is uploaded
      let image_url = part.image_url;
      if (req.file) {
        // Delete old image if exists
        if (part.image_url) {
          const oldFilename = part.image_url.split("/").pop();
          const oldPath = path.join(__dirname, "../uploads", oldFilename);
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        }
        image_url = getImageUrl(req, req.file.filename);
      }

      await part.update({
        ...value,
        image_url,
      });

      res.json({
        success: true,
        message: "Part updated successfully",
        data: part,
      });
    } catch (error) {
      // If there's a file uploaded but update failed, delete it
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      console.error("Update part error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to update part",
      });
    }
  }
);

// Delete part (protected)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const part = await Part.findByPk(req.params.id);
    if (!part) {
      return res.status(404).json({
        success: false,
        error: "Part not found",
      });
    }

    // Delete associated image file if exists
    if (part.image_url) {
      const filename = part.image_url.split("/").pop();
      const filePath = path.join(__dirname, "../uploads", filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await part.destroy();

    res.json({
      success: true,
      message: "Part deleted successfully",
    });
  } catch (error) {
    console.error("Delete part error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete part",
    });
  }
});

module.exports = router;
