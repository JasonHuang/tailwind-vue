<script setup>

</script>

<template>
    <!-- Items -->
    <section class="max-w-7xl mx-auto mt-16">
        <div class="bg-white my-10 mx-16 px-10 py-6 shadow-2xl rounded-xl">
        <h1 class="text-2xl font-bold font-nunito text-center">Our Products</h1>
        <!--  Item 1  -->
        <div class="flex flex-col md:flex-row items-center px-6 md:py-10">
            <div
            class="w-full md:w-1/2 h-80 flex justify-start items-center md:pr-10"
            >
            <span
                class="bg-[url('../assets/item1.jpg')] bg-no-repeat bg-cover w-full rounded-2xl h-full"
            >
                &nbsp;
            </span>
            </div>
            <div class="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            <h1 class="text-3xl font-nunito font-bold">Item 1</h1>
            <p class="w-full text-lg font-nunito">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                voluptatum.
            </p>
            </div>
        </div>
        <!--  Item 2  -->
        <div class="flex flex-col md:flex-row-reverse items-center p-6">
            <div
            class="w-full md:w-1/2 h-80 flex justify-start items-center md:pr-4"
            >
            <span
                class="bg-[url('../assets/item1.jpg')] bg-no-repeat bg-cover w-full rounded-2xl h-full"
            >
                &nbsp;
            </span>
            </div>
            <div class="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            <h1 class="text-3xl font-nunito font-bold">Item 1</h1>
            <p class="w-full text-lg font-nunito">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                voluptatum.
            </p>
            </div>
        </div>
        </div>
    </section>
</template>