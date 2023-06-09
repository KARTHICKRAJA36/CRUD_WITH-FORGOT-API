const multer = require("multer")
const errors = require("../Messages/Error")
const responses = require("../Messages/Response")
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + '-' + uniqueSuffix);
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'));
  }
};

const upload = multer({ storage, fileFilter });
module.exports = (req, res, next) => {
  upload.single('Resume')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        status: errors.failure,
        message: err.message
      });
    }
    else if (err) {
      return res.status(500).json({
        status: errors.failure,
        message: err.message
      });
    }
    else if (!req.file) {
      return res.status(400).json({
        status: errors.failure,
        message: errors.nofile
      });
    }
    next();
  });
};


