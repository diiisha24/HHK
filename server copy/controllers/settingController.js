import Admin from "../models/admin.js";
const adminSettings = async (req, res) => {
    try {
      const adminId = req.user._id; // Assuming your auth middleware sets req.user
      const admin = await Admin.findById(adminId).select('-password');
      const settings = {
        name: admin.username,
        email: admin.email,
        hotelName: admin.hotelName || 'Luxury Resort & Spa',
        contactEmail: admin.contactEmail || 'contact@luxuryresort.com',
        phone: admin.phone || '+1 (555) 123-4567',
        emailNotifications: admin.emailNotifications ?? true,
        smsNotifications: admin.smsNotifications ?? false,
      };
      res.status(200).json(settings);
    } catch (error) {
      res.status(500).json({ message: 'Server error fetching settings' });
    }
  };

export { adminSettings };