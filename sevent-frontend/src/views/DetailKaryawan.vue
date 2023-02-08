<template>
    <div class="row" style="min-height: 100vh;">
        <div class="col-mr-auto">
            <!-- Display sidebar from sidebar component -->
            <Sidebar/>
        </div>

        <div class="col">
            <div class="container"> 
                <h4 class="pt-3 pl-3">
                    <!-- Back to list button -->
                    <a href="/" class="btn btn-dark mr-3">
                        <span class="bi bi-arrow-left fa-fw ml-1 text-white" ></span>
                    </a> 
                    Detail <strong> Karyawan</strong>
                </h4>
                <div class="row">
                    <div class="col-sm mt-3">
                        <!-- Show image before edit -->
                        <img
                            v-show="!editimage"
                            class="rounded shadow"
                            :src="'/images/' + karyawan.foto_profil"                       
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
                        <input v-show="edit" type="file" ref="image" class="form-control-file shadow p-3 rounded" @change="uploadImage">
                    </div>
                    <div class="col-sm mt-4">
                        <!-- Form data. "!edit" displayed before editing, "edit" displayed while editing -->
                        <form>
                            <div class="form-group">
                                <label for="validationDefault03">Nama</label>
                                <div v-show="!edit" id="disabledTextInput" class="form-control">{{ karyawan.nama_karyawan }}</div>
                                <input v-show="edit" type="text" v-model="karyawan.nama_karyawan" class="form-control shadow" id="validationDefault03" required>
                            </div>
                            <div class="form-group">
                                <label for="validationDefault03">Alamat</label>
                                <div v-show="!edit" id="disabledTextInput" class="form-control">{{ karyawan.alamat }}</div>
                                <input v-show="edit" type="text" v-model="karyawan.alamat" class="form-control shadow" id="validationDefault03" required>
                            </div>
                            <div class="form-group">
                                <label for="validationDefault03">Email</label>
                                <div v-show="!edit" id="disabledTextInput" class="form-control">{{ karyawan.email }}</div>
                                <input v-show="edit" type="email" v-model="karyawan.email" class="form-control shadow" id="validationDefault03" required>
                            </div>
                            <div class="form-group">
                                <label for="validationDefault03">No. Telepon</label>
                                <div v-show="!edit" id="disabledTextInput" class="form-control">{{ karyawan.no_telp }}</div>
                                <input v-show="edit" type="number" v-model="karyawan.no_telp" class="form-control shadow" id="validationDefault03" required>
                            </div>

                            <div v-show="isEmptyValue">
                                <small class="text-danger">
                                    Mohon isi data dengan benar
                                </small>
                            </div>

                            <!-- Displayed while editing -->
                            <button v-show="edit" class="btn btn-success mr-3 mt-4" @click="updateKaryawan">Simpan</button>
                            <button v-show="edit" @click="editing" class="btn btn-danger mr-3 mt-4">Batal</button>
                        </form>
                    </div>
                </div>
                
                <div class="text-right mt-4 pb-5">
                    <!-- Displayed before editing -->
                    <button v-show="!edit" @click="editing" class="btn btn-primary mr-3">Edit</button>
                    <button v-show="!edit" class="btn btn-danger mr-3" data-toggle="modal" data-target=".bd-example-modal-lg1">Delete</button>
                </div>

                <!-- Modal for delete -->
                <div class="modal fade bd-example-modal-lg1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Apakah anda ingin menghapus data ini?</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" @click="deleteKaryawan(karyawan.id_karyawan)" data-dismiss="modal">Hapus</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
//Imports
import axios from 'axios';
import Sidebar from '../components/Sidebar.vue';

export default {
    name: "detail_karyawan",
    components: {
        Sidebar
    },
    data() {
        return {
            karyawan: {},
            selectedImage: '',
            editimage: false,
            edit: false,
            isEmptyValue: false,
            };
    },
    methods: {
        // Stored data
        setKaryawan(data) {
            this.karyawan = data;
        },
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
        //Function for edit button
        editing() {
            this.edit = !this.edit;
            this.editimage = false;
        },

    //Handle update karyawan    
    async updateKaryawan() {
        if(this.karyawan.nama_karyawan === '' || this.karyawan.alamat === '' || this.karyawan.email === '' || this.karyawan.no_telp === '') {
            this.isEmptyValue = true;
        } else {
            this.isEmptyValue = false;
            const formData = new FormData();
            //Declared form data
            formData.append("nama_karyawan", this.karyawan.nama_karyawan);
            formData.append("alamat", this.karyawan.alamat);
            formData.append("email", this.karyawan.email);
            formData.append("no_telp", this.karyawan.no_telp);
            //Using image file
            formData.append("foto_profil", this.imageFile);

            try {
            //put method API
            axios.put("http://localhost:8081/karyawan/" + this.$route.params.id, formData ,
            {
                headers: {
                'Content-Type': 'multipart/form-data'
            }
            });

            } catch (error) {
                this.errorMessage = error.message;
            }
            this.edit = false;
            this.selectedImage = '';
            
        }
        this.isEmptyValue = false;
    },

    deleteKaryawan(id) {
        try {
            axios.delete("http://localhost:8081/karyawan/" + id);
            this.$router.push("/");
        }
        catch(error) {
            console.log(error);
        }
    }
    },  

    mounted() {
        //For get data karyawan by id_karyawan
        axios
        .get("http://localhost:8081/karyawan/" + this.$route.params.id)
        .then((response) => 
        this.setKaryawan(response.data.karyawan))
        .catch((error) => console.log(error));
    },
}

</script>