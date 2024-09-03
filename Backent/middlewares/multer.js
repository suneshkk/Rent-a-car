import multer from "multer";

// file handller for runtime storage

export const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        console.log(file, "=============image file");
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });
