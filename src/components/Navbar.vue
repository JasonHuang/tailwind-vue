<template>
    <header :class="{ 'bg-transparent': !scrolled, 'bg-white shadow-lg': scrolled }"
        class="shadow-xl fixed top-0 left-0 w-full transition duration-300 z-20">
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-[1.2em] lg:px-8 " aria-label="Global">
            <div class="flex lg:flex-1 justify-between items-center w-full">
                <a href="#" class="-m-1.5 p-1.5">
                    <span class="sr-only">TechQik Development</span>
                    <img class="h-7 w-auto" src="../assets/Logo.svg" alt="" />
                </a>
                <button type="button" id="menu-btn" @click="toggleMobileMenu"
                    :class="['block', 'hamburger', 'lg:hidden', 'focus:outline-none', { open: isMobileMenuOpen }]">
                    <span class="sr-only">Open main menu</span>
                    <span class="hamburger-top"></span>
                    <span class="hamburger-middle"></span>
                    <span class="hamburger-bottom"></span>
                </button>
            </div>
            <div class="hidden lg:flex lg:gap-x-12 ml-52">
                <div class="relative" v-for="menuItem in topLevelMenuItems" :key="menuItem.ID">
                    <a type="button" @click="toggleMenu(menuItem, $event)" :href="menuItem.url" @click.prevent=""
                        class="flex items-center gap-x-1 text-base font-bold leading-6 text-gray-900 hover:text-darkGrayishBlue cursor-pointer"
                        aria-expanded="false">
                        {{ menuItem.title }}
                        <svg v-if="menuItem.children?.length" class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clip-rule="evenodd" />
                        </svg>
                    </a>
                    <transition name="fade">
                        <div v-if="menuItem.isMenuVisible && menuItem.children?.length" :ref="getMenuRef(menuItem.ID)"
                            class="menu absolute z-10 mt-3 p-4 flex flex-nowrap flex-col items-start gap-y-3 rounded bg-white shadow-lg ring-1 ring-gray-900/5 w-28">
                            <a v-for="child in menuItem.children" :href="child.url" :key="child.ID"
                                class="text-sm font-semibold text-gray-900 hover:text-darkGrayishBlue">
                                {{ child.title }}
                            </a>
                        </div>
                    </transition>
                </div>

                <!--
            'Product' flyout menu, show/hide based on flyout menu state.

            Entering: "transition ease-out duration-200"
            From: "opacity-0 translate-y-1"
            To: "opacity-100 translate-y-0"
            Leaving: "transition ease-in duration-150"
            From: "opacity-100 translate-y-0"
            To: "opacity-0 translate-y-1"
            -->

                <!--a href="#" class="text-sm font-semibold leading-6 text-gray-900 hover:text-darkGrayishBlue">Features</a>
                <a href="#" class="text-sm font-semibold leading-6 text-gray-900 hover:text-darkGrayishBlue">Blog</a>
                <a href="#" class="text-sm font-semibold leading-6 text-gray-900 hover:text-darkGrayishBlue">About US</a-->
            </div>
            <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                <a href="#" class="text-sm font-semibold leading-6 text-gray-900 hover:text-darkGrayishBlue">Log in <span
                        aria-hidden="true">&rarr;</span></a>
            </div>
            <!-- Mobile Menu -->
            <div class="lg:hidden" style="z-index: 1">
                <div id="menu"
                    :class="['absolute', 'flex-col', 'self-end', 'py-8', 'mt-10', 'items-center', 'space-y-6', 'font-bold', 'bg-white', 'sm:w-auto', 'sm:self-center', 'left-6', 'right-6', 'drop-shadow-md', { flex: isMobileMenuOpen, hidden: !isMobileMenuOpen }]">
                    <a v-for="menuItem in topLevelMenuItems" :key="menuItem.ID" :href="menuItem.url">{{ menuItem.title
                    }}</a>
                </div>
            </div>
        </nav>
    </header>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface MenuItem {
    ID: number;
    title: string;
    url: string;
    menu_item_parent: number;
    menu_order: number;
    isMenuVisible: boolean;
    children: MenuItem[];
}

interface ApiResponse {
    [key: string]: any;
}

const isMobileMenuOpen = ref(false);
const topLevelMenuItems = ref<MenuItem[]>([]);
const scrolled = ref(false);

const fetchMenuItems = async () => {
    try {
        const response = await fetch('http://libofei.com/wp-json/techqik/v1/menu/primary');
        const data: ApiResponse[] = await response.json();
        topLevelMenuItems.value = constructMenu(data as MenuItem[]);
    } catch (error) {
        console.error('Error:', error);
    }
};

const constructMenu = (menuItems: MenuItem[]) => {
    const menuStructure: Record<number, MenuItem> = {};
    menuItems.forEach(item=> menuStructure[item.ID] = { ...item, children: [] });
    menuItems.forEach(item=> {
        if (item.menu_item_parent !== 0) {
            menuStructure[item.menu_item_parent].children.push(menuStructure[item.ID]);
        }
    });
    return Object.values(menuStructure).filter((item: MenuItem) => item.menu_item_parent === 0).sort((a: MenuItem, b: MenuItem) => a.menu_order - b.menu_order);
};

const handleScroll = () => {
    scrolled.value = window.scrollY > 0;
};

const getMenuRef = (itemID: number) => `menu-${itemID}`;

const handleOutsideClick = (e : MouseEvent) => {
    topLevelMenuItems.value.forEach(menuItem => {
        const menuRef  = getMenuRef(menuItem.ID);
        if (menuRef) {
            const menuElement = document.getElementById(menuRef);
            if (menuElement && !menuElement.contains(e.target as Node)) {
                menuItem.isMenuVisible = false;
            }
        }
    });
};

const toggleMenu = (menuItem: MenuItem, e: MouseEvent) => {
    menuItem.isMenuVisible = !menuItem.isMenuVisible;

    topLevelMenuItems.value.forEach(item => {
        if (item.ID !== menuItem.ID) {
            item.isMenuVisible = false;
        }
    });
    e.stopPropagation();
};

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

onMounted(() => {
    document.addEventListener('click', handleOutsideClick);
    window.addEventListener('scroll', handleScroll);
    fetchMenuItems();
});

onUnmounted(() => {
    document.removeEventListener('click', handleOutsideClick);
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-1rem);
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.fade-enter-active {
    transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}

.fade-leave-active {
    transition: opacity 0.15s ease-in, transform 0.15s ease-in;
}
</style>
