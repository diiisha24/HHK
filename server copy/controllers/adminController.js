import Admin from "../models/admin.js";
import generateToken from "../config/jwt.js";

// Login Admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (admin && (await admin.matchPassword(password))) {
      const token = generateToken(res, admin._id);
      res.status(200).json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

// Register New Admin
const registerAdmin = async (req, res) => {
  const { username, email, password, name, hotelName, contactEmail, phone } = req.body;

  try {
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({
      username,
      email,
      password,
      name,
      hotelName,
      contactEmail,
      phone,
    });

    if (admin) {
      const token = generateToken(res, admin._id);
      res.status(201).json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        token,
      });
    } else {
      res.status(400).json({ message: "Invalid admin data" });
    }
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Admin Profile
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      name: admin.name,
      hotelName: admin.hotelName,
      contactEmail: admin.contactEmail,
      phone: admin.phone,
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Admin Profile (Settings)
const updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.admin._id;
    const { name, email, hotelName, contactEmail, phone } = req.body;

    if (!email || !contactEmail) {
      return res.status(400).json({ message: "Email fields are required" });
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { 
        name,
        email,
        hotelName,
        contactEmail,
        phone,
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ 
      message: "Profile updated successfully",
      admin: {
        _id: updatedAdmin._id,
        username: updatedAdmin.username,
        email: updatedAdmin.email,
        name: updatedAdmin.name,
        hotelName: updatedAdmin.hotelName,
        contactEmail: updatedAdmin.contactEmail,
        phone: updatedAdmin.phone,
      }
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error updating profile" });
  }
};

// Logout Admin
const logoutAdmin = async (req, res) => {
  try {
    res.cookie("jwt", "", { 
      httpOnly: true,
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error during logout" });
  }
};

export { loginAdmin, getAdminProfile, logoutAdmin, registerAdmin, updateAdminProfile };