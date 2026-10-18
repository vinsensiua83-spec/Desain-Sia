import React, { useState } from 'react';
import { dbManager } from '../database/db';
import { NotificationItem } from '../types';
import { Bell, CheckCheck, X, BookOpen, CreditCard, GraduationCap, Info } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onRefresh,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    dbManager.getNotifikasi()
  );

  if (!isOpen) return null;

  const handleMarkAllRead = () => {
    dbManager.markNotifikasiRead();
    setNotifications(dbManager.getNotifikasi());
    onRefresh();
  };

  const getIcon = (tipe: string) => {
    switch (tipe) {
      case 'akademik':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'keuangan':
        return <CreditCard className="w-4 h-4 text-emerald-600" />;
      case 'beasiswa':
        return <GraduationCap className="w-4 h-4 text-amber-600" />;
      default:
        return <Info className="w-4 h-4 text-stone-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-white text-stone-800 rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-scaleIn">
        {/* Header */}
        <div className="p-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-[#cb6d32] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-800">Notifikasi Akademik</h3>
              <p className="text-[10px] text-stone-500">Pemberitahuan portal mahasiswa</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 no-scrollbar text-xs">
          {notifications.length > 0 ? (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-2xl border transition-all ${
                  item.sudahDibaca
                    ? 'bg-stone-50 border-stone-200 text-stone-600'
                    : 'bg-amber-50/70 border-amber-200 text-stone-800 font-medium'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-white shadow-xs shrink-0 mt-0.5">
                    {getIcon(item.tipe)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-xs text-stone-900 leading-tight">
                        {item.judul}
                      </h5>
                      <span className="text-[9px] text-stone-400 font-mono">
                        {item.waktu}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                      {item.pesan}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-stone-400">
              <Bell className="w-8 h-8 mx-auto opacity-40 mb-2" />
              <p className="text-xs">Belum ada notifikasi baru.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
          <button
            onClick={handleMarkAllRead}
            className="text-[11px] text-[#cb6d32] hover:underline font-semibold flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Tandai Semua Dibaca</span>
          </button>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold rounded-xl text-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
