import multer from 'multer';



// file handller for runtime storage

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        console.log(file, "=============image file");
        cb(null, file.originalname);
    },
});

export const upload = multer({ storage: storage });

