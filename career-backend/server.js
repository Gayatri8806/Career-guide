const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// DB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("✅ DB Connected"))
.catch(err => console.log("❌ DB Error:", err));

// Schema
const User = mongoose.model("User", {
    email: String,
    password: String
});

// REGISTER
app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existing = await User.findOne({ email });

        if (existing) {
            return res.json({ success: true, message: "Already exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        await User.create({ email, password: hash });

        res.json({ success: true, message: "Registered" });

    } catch (err) {
        res.json({ success: false, message: "Error" });
    }
});

// LOGIN
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.json({ success: false, message: "Wrong password" });
        }

        res.json({ success: true, message: "Login success" });

    } catch (err) {
        res.json({ success: false, message: "Error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));