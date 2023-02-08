<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white navbar-fixed-top">
        <a href="/" class="navbar-brand">
            <img id="profile-img" src="/images/sevent.png" style="width: 80px;" />
        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li  class="nav-item">
                <a class="nav-link" data-toggle="modal" data-target=".bd-about-modal-lg" style="cursor: pointer;">About</a>
            </li>
            </ul>
        </div>
    </nav>

    <div class="modal fade bd-about-modal-lg" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">About</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Web ini merupakan aplikasi sederhana yang dapat melakukan <strong>CRUD Data Karyawan</strong>.
                    <br>
                    <br>
                    Aplikasi dibagi menjadi 2 sisi yaitu Front-End dan Back-End, serta menggunakan 2 PORT yang berbeda. <strong>Back-End</strong> berbasis <strong>Node.js</strong> 
                    dengan menggunakan framework Express.js dan library Sequelize agar dapat membuat dan mengelola tabel tanpa menggunakan Raw SQL Query. Back-End bekerja pada PORT 8081.
                    <br>
                    <br>
                    <strong>Front-End</strong> dibangun menggunakan framework <strong>Vue.js</strong> yang berbasis full JavaScript, berisi 3 views yaitu Tabel List Karyawan, Detail Karyawan, dan Tambah Karyawan.
                    Pada bagian detail Karyawan, dapat dilakukan edit dan hapus data. Front-End berjalan pada PORT 8080.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>