const express = require('express');
const Adoption = require('../models/Adoption');
const Pet = require('../models/Pet');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { petId, pickupDate, message } = req.body;

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    if (pet.ownerId.toString() === req.user.id) {
      return res.status(400).json({ message: 'You cannot adopt your own pet' });
    }
    if (pet.status === 'adopted') {
      return res.status(400).json({ message: 'This pet has already been adopted' });
    }

    const existing = await Adoption.findOne({ petId, userId: req.user.id });
    if (existing) {
      return res.status(400).json({ message: 'You already have a pending request for this pet' });
    }

    const adoption = new Adoption({
      petId,
      userId: req.user.id,
      userName: req.user.name,
      userEmail: req.user.email,
      petName: pet.name,
      pickupDate,
      message,
    });

    await adoption.save();
    res.status(201).json(adoption);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/my', auth, async (req, res) => {
  try {
    const adoptions = await Adoption.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/pet/:petId', auth, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.petId);
    if (!pet || pet.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const adoptions = await Adoption.find({ petId: req.params.petId }).sort({ createdAt: -1 });
    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const adoption = await Adoption.findById(req.params.id).populate('petId');

    if (!adoption) {
      return res.status(404).json({ message: 'Adoption request not found' });
    }

    const pet = await Pet.findById(adoption.petId._id);
    if (pet.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (status === 'approved') {
      const alreadyApproved = await Adoption.findOne({ petId: adoption.petId._id, status: 'approved' });
      if (alreadyApproved) {
        return res.status(400).json({ message: 'This pet already has an approved request' });
      }
      await Pet.findByIdAndUpdate(adoption.petId._id, { status: 'adopted' });
    }

    adoption.status = status;
    await adoption.save();
    res.json(adoption);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/reject', auth, async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id).populate('petId');
    if (!adoption) {
      return res.status(404).json({ message: 'Adoption request not found' });
    }
    const pet = await Pet.findById(adoption.petId._id);
    if (pet.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    adoption.status = 'rejected';
    await adoption.save();
    res.json(adoption);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id);
    if (!adoption) {
      return res.status(404).json({ message: 'Adoption request not found' });
    }
    if (adoption.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await Adoption.findByIdAndDelete(req.params.id);
    res.json({ message: 'Adoption request cancelled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
