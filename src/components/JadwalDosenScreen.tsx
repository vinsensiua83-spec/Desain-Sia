import React, { useState } from 'react';
import { DayOfWeek, JadwalDosen } from '../types';
import { dbManager } from '../database/db';
import { Clock, MapPin, MessageSquare, Phone, Mail, User, CheckCircle2, X } from 'lucide-react';

export const JadwalDosenScreen: React.FC = () => {
  const [activeDay, setActiveDay] = useState<DayOfWeek>('Senin');
  const [lecturers] = useState<JadwalDosen[]>(() => dbManager.getJadwalDosen());
  const [selectedDosen, setSelectedDosen] = useState<JadwalDosen | null>(null);

  const days: DayOfWeek[] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  const filtered = lecturers.filter((d) => d.hari === activeDay);

  return (
    <div className="flex-1 px-5 pt-2 pb-6 overflow-y-auto no-scrollbar select-none">
      {/* 1. Day Selector Tabs (Senin, Selasa, Rabu...) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3">
        {days.map((day) => {
          const isActive = activeDay === day;
          return (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-white text-stone-900 shadow-md scale-102'
                  : 'bg-white/80 hover:bg-white text-stone-700'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* 2. Lecturer Schedule Cards (Matching iPhone 17 - 9) */}
      <div className="mt-2 space-y-4">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedDosen(item)}
              className="rounded-[22px] overflow-hidden shadow-lg bg-stone-900 border border-white/20 transition-transform active:scale-[0.99] cursor-pointer group"
            >
              {/* Motherboard / Tech hardware background */}
              <div className="relative h-28 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
                  alt="Motherboard background"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

                <div className="absolute top-3.5 left-4 right-4 z-10 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-white tracking-wide leading-tight drop-shadow-md">
                      {item.namaDosen}
                    </h3>
                    <p className="text-xs text-amber-200 font-medium mt-0.5 drop-shadow">
                      {item.mataKuliah}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md border ${
                      item.status === 'Ada di Ruangan'
                        ? 'bg-emerald-500/80 text-white border-emerald-300/40'
                        : 'bg-amber-500/80 text-white border-amber-300/40'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Card Footer Bar */}
              <div className="bg-[#ededf0] px-4 py-2.5 flex items-center justify-between text-stone-800 text-xs font-semibold">
                <div className="flex items-center gap-1.5 text-stone-700">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  <span>
                    {item.jamMulai} - {item.jamSelesai}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-white px-2.5 py-0.5 rounded-lg border border-stone-200 font-mono text-[11px] font-bold text-stone-800">
                  <MapPin className="w-3 h-3 text-[#cb6d32]" />
                  <span>{item.ruangan}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white/90 rounded-3xl p-6 text-center text-stone-700 shadow-md">
            <User className="w-8 h-8 mx-auto text-amber-700/60 mb-2" />
            <h4 className="font-bold text-sm">Tidak Ada Jadwal Dosen</h4>
            <p className="text-xs text-stone-500 mt-1">
              Tidak ada jadwal bimbingan/dosen pada hari {activeDay}.
            </p>
          </div>
        )}
      </div>

      {/* Lecturer Details / Consultation Request Modal */}
      {selectedDosen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-stone-800 rounded-3xl p-5 max-w-sm w-full shadow-2xl animate-scaleIn">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-bold text-sm text-stone-800">{selectedDosen.namaDosen}</h3>
                <p className="text-[11px] text-stone-500">{selectedDosen.gelar}</p>
              </div>
              <button
                onClick={() => setSelectedDosen(null)}
                className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-3 space-y-2.5 text-xs">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-500">Mata Kuliah:</span>
                  <span className="font-bold text-stone-800">{selectedDosen.mataKuliah}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Waktu Konsultasi:</span>
                  <span className="font-semibold text-stone-800">
                    {selectedDosen.hari}, {selectedDosen.jamMulai} - {selectedDosen.jamSelesai}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Lokasi / Ruangan:</span>
                  <span className="font-bold text-[#cb6d32]">{selectedDosen.ruangan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Status Saat Ini:</span>
                  <span className="font-bold text-emerald-700">{selectedDosen.status}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-stone-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>Email: {selectedDosen.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <span>WhatsApp: {selectedDosen.kontak}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <a
                href={`https://wa.me/6281234567890?text=Halo%20${encodeURIComponent(selectedDosen.namaDosen)}%2C%20saya%20Vinsensius%20(245314051)%20ingin%20konsultasi`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Hubungi Dosen</span>
              </a>
              <button
                onClick={() => setSelectedDosen(null)}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl text-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
