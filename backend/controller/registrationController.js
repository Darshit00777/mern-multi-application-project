import Registration from "../model/Registration.js";

// Static users for login
const users = [
    { username: "admin", password: "admin123" },
    { username: "student", password: "student123" }
];

// LOGIN
export const login = (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (user) {
        return res.json({
            success: true,
            message: "Login successful"
        });
    }

    res.status(401).json({
        success: false,
        message: "Invalid username or password"
    });
};

// INSERT
export const insertRegistration = async (req, res) => {
    try {
        const data = {
            ...req.body,
            hobbies: req.body.hobbies
                ? JSON.parse(req.body.hobbies)
                : [],
            photo: req.file ? req.file.filename : ""
        };

        const result = await Registration.create(data);

        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// DISPLAY ALL
export const getRegistrations = async (req, res) => {
    try {
        const result = await Registration.find();
        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// SEARCH
export const searchRegistration = async (req, res) => {
    try {
        const key = req.params.key;

        const result = await Registration.find({
            $or: [
                { name: { $regex: key, $options: "i" } },
                { email: { $regex: key, $options: "i" } }
            ]
        });

        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// UPDATE
export const updateRegistration = async (req, res) => {
    try {
        const data = {
            ...req.body,
            hobbies: req.body.hobbies
                ? JSON.parse(req.body.hobbies)
                : []
        };

        if (req.file) {
            data.photo = req.file.filename;
        }

        const result = await Registration.findByIdAndUpdate(
            req.params.id,
            data,
            { new: true, runValidators: true }
        );

        if (!result) {
            return res.json({
                message: "Registration not found"
            });
        }

        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// DELETE
export const deleteRegistration = async (req, res) => {
    try {
        const result = await Registration.findByIdAndDelete(
            req.params.id
        );

        if (!result) {
            return res.json({
                message: "Registration not found"
            });
        }

        res.json({
            message: "Registration deleted successfully"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};
