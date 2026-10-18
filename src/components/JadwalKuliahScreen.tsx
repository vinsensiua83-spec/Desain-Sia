import React, { useState } from 'react';
import { DayOfWeek, JadwalKuliah } from '../types';
import { dbManager } from '../database/db';
import { Clock, MapPin, Plus, BookOpen, User, Check, X } from 'lucide-react';

export const JadwalKuliahScreen: React.FC = () => {
  const [activeDay, setActiveDay] = useState<DayOfWeek>('Senin');
  const [courses, setCourses] = useState<JadwalKuliah[]>(() => dbManager.getJadwal());
  const [showAddModal, setShowAddModal] = useState(false);

  // New course form
  const [newMataKuliah, setNewMataKuliah] = useState('');
  const [newDosen, setNewDosen] = useState('Ir. Iwan S.T., M.Kom');
  const [newJamMulai, setNewJamMulai] = useState('07:00');
  const [newJamSelesai, setNewJamSelesai] = useState('10:30');
  const [newRuangan, setNewRuangan] = useState('K.204');
  const [newSks, setNewSks] = useState(3);

  const days: DayOfWeek[] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  const filteredCourses = courses.filter((c) => c.hari === activeDay);

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMataKuliah.trim()) return;

    const created = dbManager.addJadwal({
      hari: activeDay,
      mataKuliah: newMataKuliah.trim(),
      dosen: newDosen.trim(),
      jamMulai: newJamMulai,
      jamSelesai: newJamSelesai,
      ruangan: newRuangan.trim(),
      sks: Number(newSks),
    });

    setCourses(dbManager.getJadwal());
    setShowAddModal(false);
    setNewMataKuliah('');
  };

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

      {/* 2. Course Cards List */}
      <div className="mt-2 space-y-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="rounded-[22px] overflow-hidden shadow-lg bg-stone-900 border border-white/20 transition-transform active:scale-[0.99]"
            >
              {/* Card Header & Background */}
              <div className="relative h-28 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
                  alt="Motherboard background"
                  className="w-full h-full object-cover filter brightness-90 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

                <div className="absolute top-3.5 left-4 right-4 z-10">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-extrabold text-white tracking-wide leading-tight drop-shadow-md">
                        {course.mataKuliah}
                      </h3>
                      <p className="text-xs text-amber-200 font-medium mt-0.5 drop-shadow">
                        {course.dosen}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/80 text-white backdrop-blur-sm border border-amber-300/40">
                      {course.sks} SKS
                    </span>
                  </div>

                  {course.catatan && (
                    <p className="text-[10px] text-stone-300 line-clamp-1 mt-1">
                      {course.catatan}
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer Bar */}
              <div className="bg-[#ededf0] px-4 py-2.5 flex items-center justify-between text-stone-800 text-xs font-semibold">
                <div className="flex items-center gap-1.5 text-stone-700">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  <span>
                    {course.jamMulai} - {course.jamSelesai}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-white px-2.5 py-0.5 rounded-lg border border-stone-200 font-mono text-[11px] font-bold text-stone-800">
                  <MapPin className="w-3 h-3 text-[#cb6d32]" />
                  <span>{course.ruangan}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white/90 rounded-3xl p-6 text-center text-stone-700 shadow-md">
            <BookOpen className="w-8 h-8 mx-auto text-amber-700/60 mb-2" />
            <h4 className="font-bold text-sm">Tidak Ada Jadwal Kuliah</h4>
            <p className="text-xs text-stone-500 mt-1">
              Tidak ada perkuliahan pada hari {activeDay}.
            </p>
          </div>
        )}
      </div>

      {/* Button to add schedule to database */}
      <button
        onClick={() => setShowAddModal(true)}
        className="mt-5 w-full py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-2 backdrop-blur-md border border-white/30 transition-all cursor-pointer shadow-sm"
      >
        <Plus className="w-4 h-4" />
        <span>Tambah Jadwal Baru di Database</span>
      </button>

      {/* Add Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-stone-800 rounded-3xl p-5 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-sm">Tambah Jadwal {activeDay}</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCourse} className="space-y-3 mt-3 text-xs">
              <div>
                <label className="block font-bold text-stone-600 mb-1">Mata Kuliah</label>
                <input
                  type="text"
                  value={newMataKuliah}
                  onChange={(e) => setNewMataKuliah(e.target.value)}
                  placeholder="Contoh: Pemrograman Mobile"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-600 mb-1">Dosen Pengampu</label>
                <input
                  type="text"
                  value={newDosen}
                  onChange={(e) => setNewDosen(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-stone-600 mb-1">Jam Mulai</label>
                  <input
                    type="time"
                    value={newJamMulai}
                    onChange={(e) => setNewJamMulai(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-600 mb-1">Jam Selesai</label>
                  <input
                    type="time"
                    value={newJamSelesai}
                    onChange={(e) => setNewJamSelesai(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-stone-600 mb-1">Ruangan</label>
                  <input
                    type="text"
                    value={newRuangan}
                    onChange={(e) => setNewRuangan(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-600 mb-1">SKS</label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={newSks}
                    onChange={(e) => setNewSks(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#cb6d32] hover:bg-[#b55b23] text-white font-bold rounded-xl"
                >
                  Simpan ke Jadwal
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-600 font-semibold rounded-xl"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
