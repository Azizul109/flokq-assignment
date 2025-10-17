// routes/parts.js
const express = require('express');
const { Op } = require('sequelize');
const Part = require('../models/Part');
const { partSchema } = require('../validation/schemas');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all parts (public)
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let whereClause = {};

    // Filter by category if provided
    if (category && category !== 'all') {
      whereClause.category = category;
    }

    // Search by name or brand if provided
    if (search) {
      whereClause = {
        ...whereClause,
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { brand: { [Op.like]: `%${search}%` } }
        ]
      };
    }

    const parts = await Part.findAll({
      where: whereClause,
      order: [['created_at', 'DESC']],
    });

    res.json({
      success: true,
      data: parts,
      count: parts.length
    });
  } catch (error) {
    console.error('Get parts error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch parts' 
    });
  }
});

// Get single part (public)
router.get('/:id', async (req, res) => {
  try {
    const part = await Part.findByPk(req.params.id);
    
    if (!part) {
      return res.status(404).json({
        success: false,
        error: 'Part not found'
      });
    }

    res.json({
      success: true,
      data: part
    });
  } catch (error) {
    console.error('Get part error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch part'
    });
  }
});

// Create new part (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { error, value } = partSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    const part = await Part.create(value);
    
    res.status(201).json({
      success: true,
      message: 'Part created successfully',
      data: part
    });
  } catch (error) {
    console.error('Create part error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create part'
    });
  }
});

// Update part (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { error, value } = partSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    const part = await Part.findByPk(req.params.id);
    if (!part) {
      return res.status(404).json({
        success: false,
        error: 'Part not found'
      });
    }

    await part.update(value);
    
    res.json({
      success: true,
      message: 'Part updated successfully',
      data: part
    });
  } catch (error) {
    console.error('Update part error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update part'
    });
  }
});

// Delete part (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const part = await Part.findByPk(req.params.id);
    if (!part) {
      return res.status(404).json({
        success: false,
        error: 'Part not found'
      });
    }

    await part.destroy();
    
    res.json({
      success: true,
      message: 'Part deleted successfully'
    });
  } catch (error) {
    console.error('Delete part error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete part'
    });
  }
});

module.exports = router;