import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Wifi, 
  Battery, 
  Signal, 
  Bell, 
  Database, 
  LogOut, 
  User as UserIcon,
  Shield,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ActiveScreen, NotificationItem } from '../types';
import { dbManager } from '../database/db';

interface HeaderBarProps {
  currentScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenDbManager: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentScreen,
  onNavigate,
  onOpenDbManager,
  onOpenNotifications,
  unreadCount = 0,
}) => {
  const { currentUser, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState('5:35');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  const getScreenTitle = (screen: ActiveScreen): string => {
    switch (screen) {
      case 'jadwal-kuliah':
        return 'Jadwal Kuliah';
      case 'nilai-semester':
        return 'Nilai Semester';
      case 'kartu-keuangan':
        return 'Kartu Keuangan';
      case 'poin-mahasiswa':
        return 'Poin Mahasiswa';
      case 'ktm':
        return 'KTM';
      case 'info-beasiswa':
        return 'Info Beasiswa';
      case 'biodata':
        return 'Biodata';
      case 'jadwal-dosen':
        return 'Jadwal Dosen';
      default:
        return '';
    }
  };

  const isSubScreen = currentScreen !== 'home';

  return (
    <div className="w-full text-white shrink-0 z-30 select-none">
      {/* iOS Status Bar (5:35, signal, wifi, battery) */}
      <div className="flex items-center justify-between px-6 pt-3 pb-1 text-xs font-semibold tracking-tight text-white/95">
        <span className="font-bold text-[13px]">{currentTime}</span>
        <div className="flex items-center gap-2">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <div className="flex items-center">
            <Battery className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Sub-screen Navigation Bar */}
      {isSubScreen && (
        <div className="flex items-center justify-between px-4 py-2 relative">
          <button
            onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-sm"
            aria-label="Kembali ke Beranda"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-bold tracking-wide text-white text-center flex-1">
            {getScreenTitle(currentScreen)}
          </h2>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenDbManager}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-amber-200 transition-all"
              title="Inspeksi Database"
            >
              <Database className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
