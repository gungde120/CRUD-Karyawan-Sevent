const express = require('express');
const router = express.Router();
const karyawanController = require('../controllers/karyawan.controller');
const upload = require('../config/multer');

//Routes get all
router.get('/', karyawanController.getAllKaryawan);
//Get by id
router.get('/:id', karyawanController.getKaryawan);
//Create data
router.post('/', upload.single('foto_profil'), karyawanController.createKaryawan);
//Update data
router.put('/:id', upload.single('foto_profil'), karyawanController.updateKaryawan);
//Delete data
router.delete('/:id', karyawanController.deleteKaryawan);

module.exports = router;

