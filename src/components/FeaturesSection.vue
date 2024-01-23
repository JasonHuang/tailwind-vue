<template>
    <!-- Items -->
    <section class="max-w-7xl mx-auto mt-12">
        <div class="bg-white shadow-2xl rounded-xl pt-6">
            <h1 class="text-2xl font-bold font-nunito text-center ">Our Products</h1>
            <div v-for="( item, index ) in items" :key="item.id">
                <!--  Item 1  -->
                <div :class="index === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
                    class="flex flex-col items-center justify-center">
                    <div class="flex md:w-1/3 m-8 h-80 justify-start items-center cursor-pointer overflow-hidden border rounded-2xl hover:shadow-lg shadow-md "
                        @click="navigateToUrl(item.link)">
                        <img :src="item.image_url" alt=""
                            class="w-full h-full transform hover:scale-105 transition ease-out duration-300 object-cover">
                    </div>
                    <div class="flex flex-col justify-center space-y-4 w-full md:w-1/2 m-8">
                        <a :href="item.link" class="hover:text-darkGrayishBlue">
                            <h1 class="text-3xl font-nunito font-bold">{{ item.title.rendered }}</h1>
                        </a>
                        <a :href="item.link" class="hover:text-darkGrayishBlue">
                            <p class="w-full text-base font-nunito pr-10" v-html="item.excerpt.rendered">
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const items = ref([]);

async function fetchItems() {
    try {
        const response = await fetch('http://libofei.com/wp-json/wp/v2/posts?categories=19&per_page=2');
        const data = await response.json();
        for (const item of data) {
            item.image_url = await getMedia(item);
        }
        items.value = data;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getMedia(item) {
    if (item.featured_media === 0) {
        return null; // 或者返回默认图片的URL
    }
    const response = await fetch('http://libofei.com/wp-json/wp/v2/media/' + item.featured_media);
    const media = await response.json();
    return media.source_url;
}

function navigateToUrl(url) {
    window.location.href = url;
}

onMounted(fetchItems);
</script>