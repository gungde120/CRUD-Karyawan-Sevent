<template>
    <div id="sidebar-container" class="bg-dark d-none d-md-block" :class="{'sidebar-collapsed': collapsed, 'sidebar-expanded': !collapsed}" style="height:100%; min-height:100vh; width: fit-content;font-size: small;">
        <!-- d-* hiddens the Sidebar in smaller devices. Its itens can be kept on the Navbar 'Menu' -->
        <!-- Bootstrap List Group -->
        <ul class="list-group sticky-top">
            <!-- Separator with title -->
            <li v-show="!collapsed" class="bg-dark list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                <small v-show="!collapsed" >MAIN MENU</small>
            </li>
            <!-- /END Separator -->
            <!-- Menu with submenu -->
            <a href="#" class="bg-dark list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-start align-items-center text-white">
                    <span class="bi bi-compass fa-fw ml-1 mr-1"></span>
                    <small class="ml-4" v-show="!collapsed">Dashboard</small>
                </div>
            </a>
            
            <!-- Separator with title -->
            <li v-show="!collapsed" class="bg-dark list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                <small v-show="!collapsed">DATA</small>
            </li>
            <!-- /END Separator -->
            <a href="/" class="bg-dark list-group-item list-group-item-action">
                <div class="text-white d-flex w-100 justify-content-start align-items-center">
                    <span class="fa fa-table fa-fw ml-1 mr-1"></span>
                    <small class="ml-4" v-show="!collapsed">Data Karyawan</small>
                </div>
            </a>
            <a href="#" class="bg-dark list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-start align-items-center">
                    <span class="fa fa-table fa-fw ml-1 mr-1"></span>
                    <small class="ml-4" v-show="!collapsed">Data Keuangan</small>
                </div>
            </a>
            <a href="#" class="bg-dark list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-start align-items-center">
                    <span class="fa fa-table fa-fw ml-1 mr-1"></span>
                    <small class="ml-4" v-show="!collapsed">Data Venue</small>
                </div>
            </a>
            <a href="#" class="bg-dark list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-start align-items-center">
                    <span class="fa fa-table fa-fw ml-1 mr-1"></span>
                    <small class="ml-4" v-show="!collapsed">Data Event</small>
                </div>
            </a>
            <a href="#" class="bg-dark list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-start align-items-center">
                    <span class="fa fa-table fa-fw ml-1 mr-1"></span>
                    <small class="ml-4" v-show="!collapsed">Data Berita</small>
                </div>
            </a>
            

            <!-- Separator without title -->
            <li v-show="!collapsed" class="bg-dark list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                <small v-show="!collapsed"> </small>
            </li>
            <!-- /END Separator -->
            <a @click="sidebarCollapse" class="bg-dark list-group-item list-group-item-action" style="cursor: pointer;">
                <div class="text-white d-flex w-100 justify-content-start align-items-center">
                    <span v-show="!collapsed" class="bi bi-arrows-angle-contract fa-fw ml-1 mr-1" ></span>
                    <span v-show="collapsed" class="bi bi-arrows-angle-expand fa-fw ml-1 mr-1" ></span>
                    <span class="ml-4" v-show="!collapsed">Collapse</span>
                </div>
            </a>
        </ul><!-- List Group END-->
    </div><!-- sidebar-container END -->
</template>

<script>
export default {
    data() {
        return{
            collapsed: false,
        }
    },
    methods: {
        sidebarCollapse() {
            this.collapsed = !this.collapsed
            }
    }
};


</script>

<style>
    .sidebar-collapsed .menu-collapsed {
        display: none;
    }
</style>