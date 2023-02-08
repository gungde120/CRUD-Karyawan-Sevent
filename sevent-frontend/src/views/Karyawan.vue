<template>
  <div class="row" style="min-height: 100vh;">
    <div class="col-mr-auto">
      <!-- Display sidebar from sidebar component -->
      <Sidebar/>
    </div>

    <div class="col">
      <div class="container">
        <div class="row mb-3">
          <div class="col mt-3">
                <h4>
                    List <strong>Karyawan</strong>
                </h4>

                <div class="row mt-3">
                  <div class="col">
                    <!-- Searchbar -->
                    <input
                        v-model="search"
                        type="search"
                        class="form-control text-center"
                        style="max-width: 30rem"
                        placeholder="Search.."
                        aria-label="Cari"
                        aria-describedby="basic-addon1"
                        />
                  </div>

                  <div class="col text-right">
                    <!-- Add data button -->
                    <button class="btn btn-primary" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target=".bd-example-modal-lg" style="height: fit-content;">
                      Tambah Data
                    </button>

                  </div>
                  <AddKaryawan/>
                </div>    
          </div> 
        </div>

        <!-- Table -->
        <div class="table-responsive table-bordered">
          <table class="table table-hover">
            <!-- Table header -->
            <thead class="text-center">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Foto Profil</th>
                <th scope="col">Nama Karyawan</th>
                <th scope="col">Alamat</th>
                <th scope="col">Email</th>
                <th scope="col">Nomor Telepon</th>
              </tr>
            </thead>
            <!-- Table body -->
            <tbody>
              <!-- Using v-for for loop through id_karyawan. If clicked go to detail karyawan page -->
              <tr v-for="karyawan in paginateData" :key="karyawan.id_karyawan" @click="detail(karyawan.id_karyawan)" style="cursor: pointer;" >
                  <th class="text-center">{{ karyawan.id_karyawan }}</th>
                  <td class="text-center" style="width: 10%">
                    <img
                      :src="'/images/' + karyawan.foto_profil"  
                      class="img-fluid shadow"                             
                      style="object-fit: scale-down; width: 30%;"
                    >                               
                  </td>
                  <td>{{ karyawan.nama_karyawan }}</td>
                  <td>{{ karyawan.alamat }}</td>
                  <td>{{ karyawan.email }}</td>
                  <td>{{ karyawan.no_telp }}</td>                                     
              </tr>
            </tbody>
          </table>

          <!-- For pagination button -->
          <div class="pagination-container mt-3 mb-3">
            <button class="pagination-button" v-if="currentPage > 1" @click="previousPage">Previous</button>                           
            <span class="pagination-page-number" v-for="n in totalPages" :key="n" @click="goToPage(n)" :class="{ 'active': n === currentPage }">{{ n }}</span>
            <button class="pagination-button" v-if="currentPage < totalPages" @click="nextPage">Next</button>
                        
            <select v-model="itemsPerPage" class="pagination-button">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>

            <div class="data-length">
              {{ paginateData.length }} of {{ karyawan.length }} data
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
// Imports
import Sidebar from '../components/Sidebar.vue';
import AddKaryawan from './AddKaryawan.vue';
import axios from "axios";

export default {
  name: "karyawan",
  components: {
    Sidebar,
    AddKaryawan
  },
  data() {
    return {
      karyawan: [],
      search: '',
      currentPage: 1,
      itemsPerPage: 20,
    };
  },
  mounted() {
    // For get all data then stored in karyawan[]
    axios
        .get("http://localhost:8081/karyawan")
        .then((response) => 
            this.setKaryawan(response.data.karyawan),
        )
        .catch((error) => console.log(error));
  },
  methods: {
    
    //Stored in karyawan[]
    setKaryawan(data) {
      this.karyawan = data;
    },
    //Get id from id_karyawan on the table body
    detail(id) {
      this.$router.push(`/karyawan/${id}`)
    },

    //Handle pagination
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(n) {
      this.currentPage = n;
    },
  },
  computed: {
    //Filter search all string in data
    filteredData() {
      if(this.search) {
        return this.karyawan.filter(karyawan => {
          return Object.values(karyawan).some(val => {
            return String(val).toLowerCase().includes(this.search.toLowerCase())
            })
          });
        } 
        else {
          return this.karyawan;
        }
    },

    //Handle pagination
    paginateData() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredData.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage)
    },
  }
};

</script>
