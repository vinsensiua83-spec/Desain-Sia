import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ActiveScreen } from './types';
import { dbManager } from './database/db';
import { LoginScreen } from './components/LoginScreen';
import { HeaderBar } from './components/HeaderBar';
import { HomeScreen } from './components/HomeScreen';
import { JadwalKuliahScreen } from './components/JadwalKuliahScreen';
import { NilaiSemesterScreen } from './components/NilaiSemesterScreen';
import { KartuKeuanganScreen } from './components/KartuKeuanganScreen';
import { PoinMahasiswaScreen } from './components/PoinMahasiswaScreen';
import { KTMScreen } from './components/KTMScreen';
import { InfoBeasiswaScreen } from './components/InfoBeasiswaScreen';
import { BiodataScreen } from './components/BiodataScreen';
import { JadwalDosenScreen } from './components/JadwalDosenScreen';
import { DatabaseManagerModal } from './components/DatabaseManagerModal';
import { NotificationsModal } from './components/NotificationsModal';
import { 
  Home, 
  Calendar, 
  Award, 
  User, 
  Smartphone, 
  Maximize2, 
  Database,
  GraduationCap
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { isLoggedIn, isLoading, currentUser } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('home');
  const [showDbModal, setShowDbModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifCount, setUnreadNotifCount] = useState(2);
  const [isIPhoneFrame, setIsIPhoneFrame] = useState(true);

  // Sync notification unread count from db
  const refreshUnread = () => {
    const list = dbManager.getNotifikasi();
    const count = list.filter((n) => !n.sudahDibaca).length;
    setUnreadNotifCount(count);
  };

  useEffect(() => {
    refreshUnread();
  }, [currentScreen]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#cb6d32] flex flex-col items-center justify-center text-white p-4">
        <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center animate-bounce mb-3 shadow-lg">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <p className="font-bold text-sm tracking-wide">Memuat Database Mahasiswa...</p>
      </div>
    );
  }

  // 1. MUST LOGIN FIRST: If user is not authenticated, show LoginScreen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center p-0 sm:p-4 selection:bg-amber-500">
        {/* Device Frame Wrapper for Login */}
        <div
          className={`${
            isIPhoneFrame
              ? 'w-full max-w-[420px] h-[100dvh] sm:h-[844px] rounded-none sm:rounded-[48px] border-0 sm:border-[10px] border-stone-800 shadow-2xl relative overflow-hidden flex flex-col'
              : 'w-full max-w-lg min-h-screen sm:min-h-[750px] rounded-none sm:rounded-3xl shadow-2xl flex flex-col'
          }`}
        >
          {/* Dynamic Island on Phone mode */}
          {isIPhoneFrame && (
            <div className="hidden sm:block absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 pointer-events-none" />
          )}

          <LoginScreen onOpenDbManager={() => setShowDbModal(true)} />

          <DatabaseManagerModal
            isOpen={showDbModal}
            onClose={() => setShowDbModal(false)}
          />
        </div>

        {/* View Toggle Bar underneath on desktop */}
        <div className="hidden sm:flex items-center gap-3 mt-4 text-xs text-stone-400">
          <button
            onClick={() => setIsIPhoneFrame(!isIPhoneFrame)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-all"
          >
            {isIPhoneFrame ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span>{isIPhoneFrame ? 'Mode Layar Penuh' : 'Mode iPhone 17'}</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. LOGGED IN PORTAL INTERFACE
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            onNavigate={(screen) => setCurrentScreen(screen)}
            onOpenNotifications={() => setShowNotifications(true)}
            onOpenDbManager={() => setShowDbModal(true)}
            unreadCount={unreadNotifCount}
          />
        );
      case 'jadwal-kuliah':
        return <JadwalKuliahScreen />;
      case 'nilai-semester':
        return <NilaiSemesterScreen />;
      case 'kartu-keuangan':
        return <KartuKeuanganScreen />;
      case 'poin-mahasiswa':
        return <PoinMahasiswaScreen />;
      case 'ktm':
        return <KTMScreen />;
      case 'info-beasiswa':
        return <InfoBeasiswaScreen />;
      case 'biodata':
        return <BiodataScreen />;
      case 'jadwal-dosen':
        return <JadwalDosenScreen />;
      default:
        return (
          <HomeScreen
            onNavigate={(screen) => setCurrentScreen(screen)}
            onOpenNotifications={() => setShowNotifications(true)}
            onOpenDbManager={() => setShowDbModal(true)}
            unreadCount={unreadNotifCount}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center p-0 sm:p-4 selection:bg-amber-500">
      {/* Mobile Frame Container (Matching iPhone 17 1 to 9 visual style) */}
      <div
        className={`${
          isIPhoneFrame
            ? 'w-full max-w-[420px] h-[100dvh] sm:h-[844px] rounded-none sm:rounded-[48px] border-0 sm:border-[10px] border-stone-800 shadow-2xl relative overflow-hidden flex flex-col bg-[#cb6d32]'
            : 'w-full max-w-xl min-h-screen sm:min-h-[820px] rounded-none sm:rounded-3xl shadow-2xl flex flex-col bg-[#cb6d32] border border-white/20'
        }`}
      >
        {/* Dynamic Island pill on phone mode */}
        {isIPhoneFrame && (
          <div className="hidden sm:block absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 pointer-events-none" />
        )}

        {/* Top iOS Status Bar & Screen Title */}
        <HeaderBar
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onOpenDbManager={() => setShowDbModal(true)}
          onOpenNotifications={() => setShowNotifications(true)}
          unreadCount={unreadNotifCount}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {renderScreen()}
        </div>

        {/* Bottom Tab Bar (Quick Access Navigation) */}
        <div className="w-full bg-[#b85b23]/95 backdrop-blur-lg border-t border-white/20 px-4 py-2 flex items-center justify-around text-white shrink-0 z-30 select-none">
          <button
            onClick={() => setCurrentScreen('home')}
            className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-xl ${
              currentScreen === 'home'
                ? 'text-white font-bold scale-105'
                : 'text-amber-200/70 hover:text-white'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[10px]">Beranda</span>
          </button>

          <button
            onClick={() => setCurrentScreen('jadwal-kuliah')}
            className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-xl ${
              currentScreen === 'jadwal-kuliah'
                ? 'text-white font-bold scale-105'
                : 'text-amber-200/70 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span className="text-[10px]">Jadwal</span>
          </button>

          <button
            onClick={() => setCurrentScreen('nilai-semester')}
            className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-xl ${
              currentScreen === 'nilai-semester'
                ? 'text-white font-bold scale-105'
                : 'text-amber-200/70 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span className="text-[10px]">Nilai (KHS)</span>
          </button>

          <button
            onClick={() => setCurrentScreen('biodata')}
            className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-xl ${
              currentScreen === 'biodata'
                ? 'text-white font-bold scale-105'
                : 'text-amber-200/70 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="text-[10px]">Profil</span>
          </button>
        </div>

        {/* Home Indicator bar on mobile */}
        {isIPhoneFrame && (
          <div className="w-32 h-1 bg-white/40 rounded-full mx-auto my-1.5 shrink-0" />
        )}

        {/* Modals */}
        <DatabaseManagerModal
          isOpen={showDbModal}
          onClose={() => setShowDbModal(false)}
        />

        <NotificationsModal
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
          onRefresh={refreshUnread}
        />
      </div>

      {/* Viewport Frame Toggle Bar on desktop */}
      <div className="hidden sm:flex items-center gap-4 mt-4 text-xs text-stone-400">
        <button
          onClick={() => setIsIPhoneFrame(!isIPhoneFrame)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-all cursor-pointer shadow-sm"
        >
          {isIPhoneFrame ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
          <span>{isIPhoneFrame ? 'Ubah ke Layar Lebar' : 'Ubah ke Tampilan iPhone 17'}</span>
        </button>

        <button
          onClick={() => setShowDbModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-950/80 hover:bg-amber-900 border border-amber-600/40 text-amber-300 transition-all cursor-pointer shadow-sm"
        >
          <Database className="w-3.5 h-3.5" />
          <span>Buka Pengelola Database</span>
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
