const Sequelize = require('sequelize');
const db = require('../config/db');

//Deklarasi tabel karyawans dan fieldnya beserta tipe data
const Karyawan = db.define('karyawan', {
    id_karyawan: {
        type: Sequelize.INTEGER,
        //Primary key dan auto increment khusus id
        primaryKey: true,
        autoIncrement: true
    },
    nama_karyawan: { type: Sequelize.STRING, allowNull: false },
    alamat: { type: Sequelize.STRING, allowNull: false },
    email: {  type: Sequelize.STRING, allowNull: false },
    no_telp: { type: Sequelize.STRING, allowNull: false },
    foto_profil: { type: Sequelize.STRING, allowNull: true }
});

//Jika database masih kosong, tabel akan terbentuk secara otomatis
db.sync({force: false});

module.exports = Karyawan;