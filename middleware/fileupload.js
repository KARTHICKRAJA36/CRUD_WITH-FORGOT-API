const multer=require("multer")
const storage=multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
})
const upload = multer({ storage });
module.exports = (req, res, next) => {
  upload.single('Resume')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      
      return res.status(500).json({ error: 'Server error' });
    }
    next();
  });
};


 