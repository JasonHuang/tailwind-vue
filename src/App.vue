<template>
  <div>
    <Navbar />
    <HeroSection />
    <FeaturesSection />
    <TestimonialsSection />
    <CTASection />
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import HeroSection from './components/HeroSection.vue';
import FeaturesSection from './components/FeaturesSection.vue';
import TestimonialsSection from './components/TestimonialsSection.vue';
import CTASection from './components/CTASection.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Navbar,
    HeroSection,
    FeaturesSection,
    TestimonialsSection,
    CTASection,
    Footer
  }
};
</script>