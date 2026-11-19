
import express from "express";
import multer from "multer";

import {
    login,
    insertRegistration,
    getRegistrations,
    searchRegistration,
    updateRegistration,
    deleteRegistration
} from "../controller/registrationController.js";

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"));
        }
    }
});

// LOGIN
router.post("/login", login);

// INSERT
router.post("/", upload.single("photo"), insertRegistration);

// DISPLAY ALL
router.get("/", getRegistrations);

// SEARCH
router.get("/search/:key", searchRegistration);

// UPDATE
router.put("/:id", upload.single("photo"), updateRegistration);

// DELETE
router.delete("/:id", deleteRegistration);

export default router;
