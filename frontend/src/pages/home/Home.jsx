// src/pages/home/index.tsx
import React from 'react';
import MainLayout from '../../components/common/MainLayout';
import HeroSection from '../../components/home/HeroSection';
import CategorySlider from '../../components/home/CategorySlide';
import PopularProducts from '../../components/home/PopularProducts';

export default function HomePage() {
  return (
    <MainLayout>    
      <main className="w-full bg-[#F9FAFB] text-[#1A1A1A] accent-[#3B82F6] dark:bg-[#1F2937] dark:text-[#F9FAFB] dark:accent-[#60A5FA]">
          <HeroSection />
          <CategorySlider />
          <PopularProducts />
      </main>
    </MainLayout>
  );
}