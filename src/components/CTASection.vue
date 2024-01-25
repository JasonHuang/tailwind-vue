<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface MediaItem {
    ID: number;
    featured_media: number;
    source_url: string;
    title: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    link: string;
    image_url?: string;
}

const items = ref<MediaItem[]>([]);

async function fetchItems() {
    try {

        const response = await fetch(`http://libofei.com/wp-json/wp/v2/posts?categories=20&per_page=3`);
        const data: MediaItem[] = await response.json() as MediaItem[];
        for (const item of data) {
            item.image_url = await getMedia(item);
        }
        items.value = data;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getMedia(item: MediaItem): Promise<string | null> {
    if (item.featured_media === 0) {
        return null;
    }
    const response = await fetch(`http://libofei.com/wp-json/wp/v2/media/${item.featured_media}`);
    const media = await response.json() as MediaItem;
    return media.source_url;
}

const truncateText = (text: string, maxLength: number): string => {
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
                                :style="`background-image:url('${item.image_url}')`">
                            </div>
                        </a>
                        <a :href="item.link" class="hover:text-darkGrayishBlue">
                            <h1 class="text-2xl font-bold font-nunito text-center">
                                {{ truncateText(item.title.rendered, 20) }}
                            </h1>
                        </a>
                        <a :href="item.link" class="hover:text-darkGrayishBlue hover:underline">
                            <p class="text-center" v-html="truncateText(item.excerpt.rendered, 100)">

                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
