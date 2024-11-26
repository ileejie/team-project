<template>
    <div class="page-container">
        <NavBar />
        <div class="content-box">
            <Header />
            <div class="main-container">
                <AppMain />
            </div>
            <Footer />
        </div>
    </div>
</template>

<script setup>
import Header from './components/Header.vue'
import NavBar from './components/NavBar.vue'
import AppMain from './components/AppMain.vue'
import Footer from './components/Footer.vue'
</script>

<style lang="scss" scoped>
.page-container {
    min-height: 100vh;
    padding-left: 150px;
    overflow: hidden;

    .content-box {
        padding: 60px 0 40px;
        min-height: 100vh;

        .main-container {
            height: calc(100vh - 100px);
            padding: 10px;
            box-sizing: border-box;
        }
    }
}
</style>
