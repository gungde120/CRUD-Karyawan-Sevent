const Karyawan = require('../models/karyawan.js');

//Pembagian data kedalam request body dan request file
const Data = (req) => {
    const { nama_karyawan, alamat, email, no_telp } = req.body;
    let foto_profil = req.file ? req.file.filename : null;

    return { nama_karyawan, alamat, email, no_telp, foto_profil };
};

//Function untuk handle error agar tidak menulis repetisi error di setiap CRUD
const handleError = (res, error) => {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
};

//Get all data karyawan
exports.getAllKaryawan = async (req, res) => {
    try {
        // Get all
        const karyawan = await Karyawan.findAll();

        res.send({ karyawan });
    } catch (error) {
        handleError(res,error);
    }
};

//Get karyawan by id_karyawan
exports.getKaryawan = async (req, res) => {
    try {
      // Get the karyawan ID from the request parameters
        const id_karyawan = req.params.id;
    
        //Fetch data
        const karyawan = await Karyawan.findByPk(id_karyawan);
    
        if (!karyawan) {
            return res.status(404).send({ message: 'Example not found' });
        }
        
        res.send({ karyawan });
        } catch (error) {
            handleError(res,error);
    }
};

//create new data karyawan
exports.createKaryawan = async (req, res) => {
    try {
        //Menggunakan data yang sudah dideklarasikan di Data(req)
        const karyawan = await Karyawan.create(Data(req));
        res.send({ karyawan });
    } catch (error) {
        handleError(res,error);
    }
};

//Update data karyawan by id_karyawan
exports.updateKaryawan = async (req, res) => {
    try {
        const id_karyawan = req.params.id;

        //Fetch data
        const karyawan = await Karyawan.findByPk(id_karyawan);

        if (!karyawan) {
            return res.status(404).send({message : 'karyawan not found'});
        }

        //Menggunakan data yang sudah dideklarasikan di Data(req)
        const data = Data(req);

        if (!req.file) {
            data.foto_profil = karyawan.foto_profil;
        }

        Object.assign(karyawan, data);
        await karyawan.save();

        res.send({ karyawan });
    } catch (error) {
        handleError(res,error);
    }
};


//Delete data karyawan
exports.deleteKaryawan = async (req, res) => {
    try {
        const id_karyawan = req.params.id;

        const karyawan = await Karyawan.findByPk(id_karyawan);

        if (!karyawan) {
            return res.status(404).send({ message: 'Karyawan not found'});
        }

        //Delete a data
        await karyawan.destroy();

        res.send({ message: 'Karyawan deleted successfully' });
    } catch (error) {
        handleError(res,error);
    }
};

