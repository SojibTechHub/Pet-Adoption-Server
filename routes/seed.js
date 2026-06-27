const express = require('express');
const Pet = require('../models/Pet');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

const pets = [
  { name: 'Max', species: 'Dog', breed: 'Golden Retriever', age: '2 years', gender: 'Male', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop', healthStatus: 'Vaccinated, Healthy', vaccinationStatus: 'Fully vaccinated', location: 'New York, NY', adoptionFee: 50, description: 'Max is a friendly and energetic Golden Retriever who loves to play fetch and go on long walks. He is great with children and other pets. Fully trained and looking for an active family.' },
  { name: 'Luna', species: 'Cat', breed: 'Persian', age: '1.5 years', gender: 'Female', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=400&fit=crop', healthStatus: 'Healthy, Spayed', vaccinationStatus: 'Fully vaccinated', location: 'Los Angeles, CA', adoptionFee: 35, description: 'Luna is a gentle and affectionate Persian cat who enjoys lounging in sunny spots and cuddling on the couch. She is litter-trained and gets along well with other cats.' },
  { name: 'Charlie', species: 'Dog', breed: 'Beagle', age: '3 years', gender: 'Male', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop', healthStatus: 'Healthy, Neutered', vaccinationStatus: 'Vaccinated', location: 'Chicago, IL', adoptionFee: 45, description: 'Charlie is a curious and playful Beagle with a great sense of smell. He loves exploring the outdoors and is very food-motivated, making him easy to train.' },
  { name: 'Bella', species: 'Rabbit', breed: 'Holland Lop', age: '8 months', gender: 'Female', image: 'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=600&h=400&fit=crop', healthStatus: 'Healthy, Spayed', vaccinationStatus: 'Vaccinated', location: 'Houston, TX', adoptionFee: 25, description: 'Bella is a sweet Holland Lop bunny with floppy ears and a gentle personality. She loves fresh vegetables and hopping around her playpen. Great for first-time pet owners.' },
  { name: 'Rocky', species: 'Dog', breed: 'German Shepherd', age: '4 years', gender: 'Male', image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&h=400&fit=crop', healthStatus: 'Healthy, Neutered', vaccinationStatus: 'Fully vaccinated', location: 'Phoenix, AZ', adoptionFee: 60, description: 'Rocky is a loyal and protective German Shepherd who is well-trained in basic commands. He needs an experienced owner with a securely fenced yard. Great guard dog.' },
  { name: 'Daisy', species: 'Cat', breed: 'Siamese', age: '2 years', gender: 'Female', image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&h=400&fit=crop', healthStatus: 'Vaccinated, Healthy', vaccinationStatus: 'Fully vaccinated', location: 'San Francisco, CA', adoptionFee: 40, description: 'Daisy is a talkative and social Siamese cat who loves being the center of attention. She enjoys interactive toys and will follow you around the house.' },
  { name: 'Coco', species: 'Bird', breed: 'Cockatiel', age: '1 year', gender: 'Male', image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=400&fit=crop', healthStatus: 'Healthy', vaccinationStatus: 'Vaccinated', location: 'Miami, FL', adoptionFee: 30, description: 'Coco is a cheerful Cockatiel who loves to whistle and mimic sounds. He enjoys human interaction and can be trained to do simple tricks.' },
  { name: 'Oscar', species: 'Hamster', breed: 'Syrian', age: '6 months', gender: 'Male', image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&h=400&fit=crop', healthStatus: 'Healthy', vaccinationStatus: 'N/A', location: 'Seattle, WA', adoptionFee: 10, description: 'Oscar is a cute and active Syrian hamster who loves running on his wheel and exploring tunnels. Low-maintenance pet perfect for apartments and beginners.' },
  { name: 'Milo', species: 'Dog', breed: 'Corgi', age: '2 years', gender: 'Male', image: 'https://images.unsplash.com/photo-1587402092301-725e37c70fd8?w=600&h=400&fit=crop', healthStatus: 'Healthy, Neutered', vaccinationStatus: 'Fully vaccinated', location: 'Denver, CO', adoptionFee: 55, description: 'Milo is a adorable Pembroke Welsh Corgi with a big personality. He is smart, energetic, and loves to herd everything. Great with older children.' },
  { name: 'Simba', species: 'Cat', breed: 'Maine Coon', age: '3 years', gender: 'Male', image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&h=400&fit=crop', healthStatus: 'Vaccinated, Healthy', vaccinationStatus: 'Fully vaccinated', location: 'Boston, MA', adoptionFee: 50, description: 'Simba is a majestic Maine Coon with a luxurious coat and a gentle giant personality. He is great with dogs and children. Loves being brushed.' },
];

router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json({ message: 'User not found. Register first.' });

    const existing = await Pet.countDocuments();
    if (existing > 0) {
      await Pet.deleteMany({});
    }

    const petDocs = pets.map(p => ({
      ...p,
      ownerId: user._id,
      ownerEmail: user.email,
      status: 'available',
    }));

    await Pet.insertMany(petDocs);
    res.json({ message: `${pets.length} sample pets added!`, count: pets.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
