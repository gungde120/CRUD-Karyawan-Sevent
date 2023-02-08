const multer = require('multer');

//Konfigurasi folder images
const storage = multer.diskStorage({
    //Lokasi images
    destination: function(req, file, cb) {
        // cb(null, 'app/public/images');
        cb(null, '../sevent-frontend/public/images');
    },
    //Modifikasi nama images
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + file.originalname);
    }
});

//Filter format images. Jika tidak sesuai maka data yang terinput adalah null
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

//Proses upload
const upload = multer({
    storage,
    fileFilter,
    limits: {
      // Custom batas ukuran file = 5 MB
      fileSize: 1024 * 1024 * 5
    }
});

module.exports = upload;