<template>
    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Tambah Data Karyawan</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm mt-3">
                            <!-- Show image before edit -->
                            <img
                                v-show="!editimage"
                                class="rounded shadow"
                                src="/images/avatar.jpg"                     
                                style="object-fit: scale-down; width: 100%;"
                            >   
                            <!-- Show image after edit -->
                            <img
                                v-show="editimage"
                                class="rounded shadow"
                                :src="selectedImage"                         
                                style="object-fit: scale-down; width: 100%;"
                            >   
                            <!-- Input image file -->
                            <input type="file" ref="image" class="form-control-file shadow p-3 rounded" @change="uploadImage">
                        </div>
                        <div class="col-sm mt-4">
                            <!-- Form data. "!edit" displayed before editing, "edit" displayed while editing -->
                            <form>
                                <div class="form-group">
                                    <label for="validationDefault03">Nama</label>
                                    <input type="text" v-model="nama_karyawan" class="form-control shadow" id="validationDefault03" required>
                                </div>
                                <div class="form-group">
                                    <label for="validationDefault03">Alamat</label>
                                    <input type="text" v-model="alamat" class="form-control shadow" id="validationDefault03" required>
                                </div>
                                <div class="form-group">
                                    <label for="validationDefault03">Email</label>
                                    <input type="text" v-model="email" class="form-control shadow" id="validationDefault03" required>
                                </div>
                                <div class="form-group">
                                    <label for="validationDefault03">No. Telepon</label>
                                    <input type="number" v-model="no_telp" class="form-control shadow" id="validationDefault03" required>
                                </div>
                                
                                <div v-show="isEmptyValue">
                                    <small>
                                        Mohon isi data dengan benar
                                    </small>
                                </div>

                                <button type="submit" class="btn btn-primary mt-3" @click="addKaryawan" >Tambah</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "detail_karyawan",
    components: {
    },
    data() {
        return {
            karyawan: {},
            selectedImage: '',
            editimage: false,
            isEmptyValue: false,
            validValue: false,

            nama_karyawan: '',
            alamat: '',
            email: '',
            no_telp: ''
            };
    },
    methods: {
        uploadImage(event) {
            const input = event.target;
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                // For get image place in folder
                this.selectedImage = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
            }
            this.editimage = true;
            //For get image file
            this.imageFile = this.$refs.image.files[0];
        },
        

    //Handle add karyawan    
    async addKaryawan() {
        if(this.nama_karyawan === '' || this.alamat === '' || this.email === '' || this.no_telp === '') {
            this.isEmptyValue = true;
        } else {
            this.isEmptyValue = false;

            const formData = new FormData();
            //Declared form data
            formData.append("nama_karyawan", this.nama_karyawan);
            formData.append("alamat", this.alamat);
            formData.append("email", this.email);
            formData.append("no_telp", this.no_telp);
            //Using image file
            formData.append("foto_profil", this.imageFile);

            try {
            //put method API
            axios.post("http://localhost:8081/karyawan/", formData ,
            {
                headers: {
                'Content-Type': 'multipart/form-data'
            }
            });

            this.$router.push("/");

            } catch (error) {
                this.errorMessage = error.message;
            }
        }
        // this.selectedImage = '';
    }
    },  
}
</script>