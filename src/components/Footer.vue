<script setup lang="ts">

</script>

<template>
    <!-- Footer -->
    <footer class="mx-auto bg-gray-800 h-48 mt-20">
        <div class="flex flex-row h-full">
        <div
            class="w-1/3 flex flex-col items-start justify-center space-y-4 px-10"
        >
            <a href="#">
            <img src="../assets/Logo_white_bg.svg" alt="" class="h-8" />
            </a>
            <div class="flex justify-center space-x-2">
            <a href="#">
                <img src="../assets/icon-facebook.svg" alt="" class="h-6" />
            </a>
            <!-- Link 2 -->
            <a href="#">
                <img src="../assets/icon-youtube.svg" alt="" class="h-6" />
            </a>
            <!-- Link 3 -->
            <a href="#">
                <img src="../assets/icon-twitter.svg" alt="" class="h-6" />
            </a>
            <!-- Link 4 -->
            <a href="#">
                <img src="../assets/icon-pinterest.svg" alt="" class="h-6" />
            </a>
            <!-- Link 5 -->
            <a href="#">
                <img src="../assets/icon-instagram.svg" alt="" class="h-6" />
            </a>
            </div>
        </div>
        <!-- List Container -->
        <div class="flex justify-around items-start space-x-32 p-6">
            <div class="flex flex-col space-y-3 text-white">
            <a href="#" class="hover:text-brightRed">Home</a>
            <a href="#" class="hover:text-brightRed">Pricing</a>
            <a href="#" class="hover:text-brightRed">Products</a>
            <a href="#" class="hover:text-brightRed">About</a>
            </div>
            <div class="flex flex-col space-y-3 text-white">
            <a href="#" class="hover:text-brightRed">Careers</a>
            <a href="#" class="hover:text-brightRed">Community</a>
            <a href="#" class="hover:text-brightRed">Privacy Policy</a>
            </div>
        </div>
        <div class="mx-auto flex justify-items-end items-center text-white">
            Copyright &copy; Techqik 2024, All Rights Reserved
        </div>
        </div>
    </footer>
</template>