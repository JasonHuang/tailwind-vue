<script setup>
import { ref, onMounted } from 'vue';
const items = ref([]);

async function fetchItems() {
    try {
        const response = await fetch('http://libofei.com/wp-json/wp/v2/posts?categories=20&per_page=3');
        const data = await response.json();
        for (const item of data) {
            item.image_url = await getMedia(item);
            console.log(item.image_url);
        }
        items.value = data;
        console.log(items.value);
        // const mediaFetchPromises = data.map(async (item) => {
        //     item.image_url = await getMedia(item);
        //     return item;
        // });

        // items.value = await Promise.all(mediaFetchPromises);
    } catch (error) {
        console.error('Error:', error);
    }
    console.log(items.value);
}

async function getMedia(item) {
    if (item.featured_media === 0) {
        return null; // 或者返回默认图片的URL
    }
    const response = await fetch('http://libofei.com/wp-json/wp/v2/media/' + item.featured_media);
    const media = await response.json();
    return media.source_url;
}

const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

onMounted(fetchItems);
</script>

<template>
    <!-- Cards -->
    <section class="max-w-7xl mx-auto">
        <div class="bg-white my-10 mx-6 px-10 pt-6 pb-10 shadow-2xl rounded-xl">
            <h1 class="text-2xl font-bold font-nunito text-center pb-5">
                Projects in dev
            </h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- Card 1 -->
                <div class="bg-gray-100 rounded-xl p-6" v-for="item in items" :key="item.ID">
                    <div class="flex flex-col justify-center items-center space-y-6">
                        <a :href="item.link" class="hover:text-darkGrayishBlue">

                            <div class="bg-no-repeat bg-cover w-40 h-40 rounded-full"
                                :style="['background-image:url(' + item.image_url + ')']">
                            </div>
                        </a>
                        <a :href="item.link" class="hover:text-darkGrayishBlue">

                            <h1 class="text-2xl font-bold font-nunito text-center">
                                {{ truncateText(item.title.rendered, 20) }}
                            </h1>
                        </a>
                        <a :href="item.link" class="hover:text-darkGrayishBlue">

                            <p class="text-center" v-html="truncateText(item.excerpt.rendered, 100)">

                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>