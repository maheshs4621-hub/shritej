'use client';

import React from 'react';
import Link from 'next/link';
import { AyurvedaPage } from '../../components/AyurvedaPage';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export default function AyurvedaRoutePage() {
  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#2C2723] flex flex-col justify-between selection:bg-[#C9A24D]/30">
      <Navbar
        cartCount={0}
        wishlistCount={0}
        activeView="ayurveda"
        onNavigate={(view) => {
          if (view === 'home') {
            window.location.href = '/';
          } else {
            window.location.href = `/?view=${view}`;
          }
        }}
        openCart={() => { window.location.href = '/?view=cart'; }}
        onSearchOpen={() => { window.location.href = '/?view=products'; }}
      />

      <main className="flex-1">
        <AyurvedaPage onShopClick={() => { window.location.href = '/?view=products'; }} />
      </main>

      <Footer onNavigate={(view) => {
        if (view === 'home') {
          window.location.href = '/';
        } else {
          window.location.href = `/?view=${view}`;
        }
      }} />
    </div>
  );
}