import React, { useState } from 'react';
import { dbManager } from '../database/db';
import { PoinKegiatan } from '../types';
import { Award, Plus, Sparkles, CheckCircle2, X, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PoinMahasiswaScreen: React.FC = () => {
  const [pointsList, setPointsList] = useState<PoinKegiatan[]>(() => dbManager.getPoin());
  const [showAddModal, setShowAddModal] = useState(false);

  const [namaKegiatan, setNamaKegiatan] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [poin, setPoin] = useState(25);
  const [kategori, setKategori] = useState('Penalaran & Keilmuan');

  // Total points calculation from DB
  const totalPoints = pointsList.reduce((acc, curr) => acc + curr.poin, 0);

  const handleAddPoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaKegiatan.trim()) return;

    const formattedDate = tanggal
      ? new Date(tanggal).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });

    dbManager.addPoin({
      namaKegiatan: namaKegiatan.trim(),
      tanggal: formattedDate,
      poin: Number(poin),
      kategori,
    });

    setPointsList(dbManager.getPoin());
    setShowAddModal(false);
    setNamaKegiatan('');

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // safe fallback
    }
  };

  return (
    <div className="flex-1 px-5 pt-2 pb-6 overflow-y-auto no-scrollbar select-none">
      {/* 1. Circular Poin Keaktifan Gauge (Matching iPhone 17 - 5) */}
      <div className="flex flex-col items-center justify-center my-4">
        <div className="relative w-44 h-44 rounded-full flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-[6px] border-[#9f4f1d]/50" />

          {/* Inner circle fill with warm brownish-amber gradient */}
          <div className="w-38 h-38 rounded-full bg-gradient-to-br from-[#b85b23] to-[#994717] shadow-inner flex flex-col items-center justify-center text-white border-2 border-white/20">
            <span className="text-[13px] font-semibold tracking-wider text-amber-200">
              Poin
            </span>
            <span className="text-4xl font-black tracking-tight text-white my-0.5">
              {totalPoints}
            </span>
            <span className="text-[13px] font-semibold tracking-wider text-amber-200">
              Keaktifan
            </span>
          </div>
        </div>

        {/* Status qualification badge */}
        <div className="mt-3 flex items-center gap-2 px-3.5 py-1 bg-white/15 backdrop-blur-md rounded-full text-white text-xs border border-white/20 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
          <span>Syarat Kelulusan Terpenuhi (Target Min: 100 Poin)</span>
        </div>
      </div>

      {/* 2. White Table Container for Activities (Matching layout in iPhone 17 - 5) */}
      <div className="bg-[#ededf0] rounded-[24px] p-5 shadow-lg border border-white/60">
        {/* Table Header */}
        <div className="grid grid-cols-12 text-[11px] font-bold text-stone-700 pb-2.5 border-b-2 border-stone-300">
          <span className="col-span-6">Nama Kegiatan</span>
          <span className="col-span-4 text-center">Tanggal</span>
          <span className="col-span-2 text-right">Poin</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-stone-300/80">
          {pointsList.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 py-3.5 text-xs text-stone-800 items-center group hover:bg-white/40 rounded-lg px-1 transition-colors"
            >
              <div className="col-span-6 pr-2">
                <p className="font-bold text-stone-900 leading-snug truncate" title={item.namaKegiatan}>
                  {item.namaKegiatan}
                </p>
                <span className="text-[10px] text-stone-500 block truncate">
                  {item.kategori}
                </span>
              </div>
              <div className="col-span-4 text-center text-[11px] text-stone-600 font-medium">
                {item.tanggal}
              </div>
              <div className="col-span-2 text-right font-extrabold text-[#cb6d32] text-sm">
                +{item.poin}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Button to submit new activity */}
      <button
        onClick={() => setShowAddModal(true)}
        className="mt-5 w-full py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-2 backdrop-blur-md border border-white/30 transition-all cursor-pointer shadow-sm"
      >
        <Plus className="w-4 h-4" />
        <span>Ajukan Sertifikat / Kegiatan Baru</span>
      </button>

      {/* Add Activity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-stone-800 rounded-3xl p-5 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-sm">Input Bukti Keaktifan</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPoint} className="space-y-3 mt-3 text-xs">
              <div>
                <label className="block font-bold text-stone-600 mb-1">Nama Kegiatan / Prestasi</label>
                <input
                  type="text"
                  value={namaKegiatan}
                  onChange={(e) => setNamaKegiatan(e.target.value)}
                  placeholder="Contoh: Juara Lomba UI/UX Design"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-600 mb-1">Kategori</label>
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                >
                  <option value="Penalaran & Prestasi">Penalaran & Prestasi</option>
                  <option value="Organisasi & Kepemimpinan">Organisasi & Kepemimpinan</option>
                  <option value="Pengabdian Masyarakat">Pengabdian Masyarakat</option>
                  <option value="Minat & Bakat">Minat & Bakat</option>
                  <option value="Kerohanian & Kepedulian Sosial">Kerohanian & Kepedulian Sosial</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-stone-600 mb-1">Tanggal</label>
                  <input
                    type="date"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-600 mb-1">Bobot Poin</label>
                  <input
                    type="number"
                    min={5}
                    max={100}
                    value={poin}
                    onChange={(e) => setPoin(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#cb6d32] hover:bg-[#b55b23] text-white font-bold rounded-xl"
                >
                  Simpan ke Poin Mahasiswa
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
