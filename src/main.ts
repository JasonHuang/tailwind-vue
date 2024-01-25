//import './assets/main.css'
import './assets/output.css';

import { createApp } from 'vue'
// import App from './App.vue'

// const app = createApp(App);
// app.mount('#app');
  
import NavbarVue from './components/Navbar.vue';
import FooterVue from './components/Footer.vue';
import HeroSectionVue from './components/HeroSection.vue';
import CTASectionVue from './components/CTASection.vue';
import FeaturesSectionVue from './components/FeaturesSection.vue';

const navbarApp = createApp(NavbarVue);
navbarApp.mount('#vue-navbar');

const heroSectionVue = createApp(HeroSectionVue);
heroSectionVue.mount('#vue-hero');

const featuresSectionVue = createApp(FeaturesSectionVue);
featuresSectionVue.mount('#vue-feature');

const ctaSectionVue = createApp(CTASectionVue);
ctaSectionVue.mount('#vue-cta');

const footerVue = createApp(FooterVue);
footerVue.mount('#vue-footer');