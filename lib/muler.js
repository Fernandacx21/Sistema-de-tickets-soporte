const multer = require('multer');
const path = require('path');

module.exports = multer({
    storage: multer.diskStorage({
        fileFilter: (req, file, cb) => {
            let ext = path.extname(file.originalname);
            if (ext !== '.pdf') {
                return cb(new Error('Only pdf files are allowed'));
            }
            cb(null, true);
        }
    })
});