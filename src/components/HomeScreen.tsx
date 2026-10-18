import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ActiveScreen, JadwalKuliah } from '../types';
import { dbManager } from '../database/db';
import {
  Bell,
  MoreHorizontal,
  FileText,
  GraduationCap,
  CreditCard,
  Award,
  Contact,
  BookOpen,
  ScanFace,
  Presentation,
  LogOut,
  Database,
  ExternalLink,
  Clock,
  MapPin,
  UserCheck,
  ChevronRight
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  onOpenNotifications: () => void;
  onOpenDbManager: () => void;
  unreadCount?: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenNotifications,
  onOpenDbManager,
  unreadCount = 0,
}) => {
  const { currentUser, logout } = useAuth();
  const [showMenuPopup, setShowMenuPopup] = useState(false);

  // Get current active schedule from DB (defaults to UI UX with Iwan)
  const allJadwal = dbManager.getJadwal();
  const todaySchedule: JadwalKuliah = allJadwal.find(
    (j) => j.mataKuliah.toLowerCase().includes('ui') || j.hari === 'Selasa'
  ) || allJadwal[0] || {
    id: 'jk-4',
    hari: 'Selasa',
    mataKuliah: 'UI UX',
    dosen: 'Iwan',
    jamMulai: '07:00',
    jamSelesai: '10:30',
    ruangan: 'K307',
    sks: 3,
  };

  const menuItems = [
    {
      id: 'jadwal-kuliah' as ActiveScreen,
      title: 'Jadwal Kuliah',
      icon: FileText,
      badge: '3 Hari Ini',
    },
    {
      id: 'nilai-semester' as ActiveScreen,
      title: 'Nilai Semester',
      icon: BookOpen,
      badge: 'IPK 3.92',
    },
    {
      id: 'kartu-keuangan' as ActiveScreen,
      title: 'Kartu Keuangan',
      icon: CreditCard,
      badge: '1 Tagihan',
    },
    {
      id: 'poin-mahasiswa' as ActiveScreen,
      title: 'Poin Mahasiswa',
      icon: Award,
      badge: '150 Poin',
    },
    {
      id: 'ktm' as ActiveScreen,
      title: 'KTM',
      icon: Contact,
      badge: 'Digital',
    },
    {
      id: 'info-beasiswa' as ActiveScreen,
      title: 'Info Beasiswa',
      icon: GraduationCap,
      badge: 'Dibuka',
    },
    {
      id: 'biodata' as ActiveScreen,
      title: 'Biodata',
      icon: ScanFace,
      badge: 'Lengkap',
    },
    {
      id: 'jadwal-dosen' as ActiveScreen,
      title: 'Jadwal Dosen',
      icon: Presentation,
      badge: 'Pak Iwan',
    },
  ];

  return (
    <div className="flex-1 px-5 pt-1 pb-6 overflow-y-auto no-scrollbar relative select-none">
      {/* 1. Top Profile Card */}
      <div className="bg-[#e9eaee] rounded-[24px] p-4 text-stone-800 shadow-md flex items-center justify-between relative">
        <div 
          onClick={() => onNavigate('biodata')} 
          className="flex items-center gap-3.5 cursor-pointer flex-1 group"
        >
          {/* Avatar */}
          <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 bg-stone-300 relative">
            <img
              src={
                currentUser?.photoUrl ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
              }
              alt={currentUser?.nama || 'Foto Mahasiswa'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>

          {/* Name & NIM */}
          <div className="overflow-hidden">
            <h1 className="text-[13px] font-extrabold uppercase tracking-tight text-stone-800 truncate leading-snug group-hover:text-[#cb6d32] transition-colors">
              {currentUser?.nama || 'VINSENSIUS BIMA NATA'}
            </h1>
            <p className="text-[11px] font-medium text-stone-500 font-mono">
              {currentUser?.nim || '245314051'}
            </p>
          </div>
        </div>

        {/* Right side icons (Notification Bell & 3 Dots) */}
        <div className="flex items-center gap-1.5 shrink-0 pl-2">
          <button
            onClick={onOpenNotifications}
            className="w-8 h-8 rounded-full hover:bg-stone-200/80 active:scale-95 flex items-center justify-center text-stone-600 transition-all relative"
            aria-label="Notifikasi"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 border border-white" />
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMenuPopup(!showMenuPopup)}
              className="w-8 h-8 rounded-full hover:bg-stone-200/80 active:scale-95 flex items-center justify-center text-stone-600 transition-all"
              aria-label="Menu Opsi"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {/* Dropdown Popup */}
            {showMenuPopup && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowMenuPopup(false)}
                />
                <div className="absolute right-0 top-10 w-48 bg-white rounded-2xl shadow-xl border border-stone-200/80 p-2 z-50 animate-scaleIn text-xs">
                  <div className="px-3 py-1.5 border-b border-stone-100 mb-1">
                    <p className="font-bold text-stone-800 truncate">{currentUser?.nama}</p>
                    <p className="text-[10px] text-stone-400 font-mono">NIM: {currentUser?.nim}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowMenuPopup(false);
                      onNavigate('biodata');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-100 flex items-center gap-2 text-stone-700"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-stone-500" />
                    <span>Profil & Biodata</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowMenuPopup(false);
                      onOpenDbManager();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-100 flex items-center gap-2 text-stone-700"
                  >
                    <Database className="w-3.5 h-3.5 text-amber-600" />
                    <span>Kelola Database</span>
                  </button>
                  <div className="my-1 border-t border-stone-100" />
                  <button
                    onClick={() => {
                      setShowMenuPopup(false);
                      logout();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 flex items-center gap-2 text-rose-600 font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar (Logout)</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 2. Jadwal Hari ini Title */}
      <div className="mt-5 mb-2.5 flex items-center justify-between">
        <h2 className="text-white text-sm font-semibold tracking-wide">
          Jadwal Hari ini
        </h2>
        <button
          onClick={() => onNavigate('jadwal-kuliah')}
          className="text-amber-100 text-xs hover:underline flex items-center gap-0.5"
        >
          <span>Lihat Semua</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3. Jadwal Hari ini Banner Card */}
      <div
        onClick={() => onNavigate('jadwal-kuliah')}
        className="rounded-[22px] overflow-hidden shadow-lg relative cursor-pointer group active:scale-[0.99] transition-all bg-stone-900 border border-white/20"
      >
        {/* Motherboard / Tech hardware background */}
        <div className="relative h-28 w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
            alt="Hardware Motherboard"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-110"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Card Top Text: Course Name & Lecturer */}
          <div className="absolute top-3.5 left-4 z-10">
            <h3 className="text-xl font-extrabold text-white tracking-wide drop-shadow-md">
              {todaySchedule.mataKuliah}
            </h3>
            <p className="text-xs text-amber-200 font-medium drop-shadow">
              {todaySchedule.dosen}
            </p>
          </div>
        </div>

        {/* Card Bottom Bar (Light warm gray matching mockup) */}
        <div className="bg-[#ededf0] px-4 py-2.5 flex items-center justify-between text-stone-800 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-stone-700">
            <Clock className="w-3.5 h-3.5 text-stone-500" />
            <span>{todaySchedule.jamMulai} - {todaySchedule.jamSelesai}</span>
          </div>
          <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-lg border border-stone-200 font-mono text-[11px] font-bold text-stone-800">
            <MapPin className="w-3 h-3 text-[#cb6d32]" />
            <span>{todaySchedule.ruangan}</span>
          </div>
        </div>
      </div>

      {/* 4. Menu Grid (8 Buttons in rounded light cards) */}
      <div className="mt-6 grid grid-cols-3 gap-3.5 sm:gap-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center p-3 rounded-[22px] bg-[#ededf0] hover:bg-white active:scale-95 transition-all shadow-md group text-center cursor-pointer border border-white/40"
            >
              {/* Icon Container with subtle light background */}
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 group-hover:bg-[#cb6d32]/15 flex items-center justify-center text-[#cb6d32] transition-colors mb-2">
                <Icon className="w-6 h-6 stroke-[1.8]" />
              </div>

              {/* Title */}
              <span className="text-[11px] font-bold text-stone-800 leading-tight line-clamp-2">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick University Quote / Info Footer */}
      <div className="mt-6 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center text-white">
        <p className="text-[11px] font-medium italic opacity-90">
          "Cerdas dan Berjiwa Humanis bersama Universitas Sanata Dharma"
        </p>
        <p className="text-[10px] text-amber-200/80 mt-0.5 font-mono">
          Semester 4 Gasal 2025/2026 • Status: Mahasiswa Aktif
        </p>
      </div>
    </div>
  );
};
