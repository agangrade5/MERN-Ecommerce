import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";
import HttpResponse from "../utils/HttpResponse.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const saveFile = async (file, folder, maxSize = 500000, oldFileName = null) => { // 500000 = 500kb
    if (!file) throw new HttpResponse("Please upload a file.", 422);

    if (file.size > maxSize) {
        throw new HttpResponse(`File is too large. Must be less than ${maxSize / 1000}kb.`, 422);
    }

    // Create uploads/folder if it doesn't exist
    const uploadDir = path.join(__dirname, `../uploads/${folder}`);
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Delete old file if provided
    if (oldFileName) {
        await deleteFile(oldFileName, folder);
    }

    const ext = path.extname(file.name);
    const baseName = path.basename(file.name, ext);
    const newFileName = `${baseName}-${uuid()}${ext}`;

    const uploadPath = path.join(uploadDir, newFileName);
    await file.mv(uploadPath);

    return newFileName;
};

export const deleteFile = async (fileName, folder = "") => {
    if (!fileName) return;

    const filePath = path.join(__dirname, `../uploads/${folder}`, fileName);
    if (fs.existsSync(filePath)) {
        try {
            fs.unlinkSync(filePath);
        } catch (err) {
            console.error(`Error deleting file: ${err.message}`);
        }
    }
};
