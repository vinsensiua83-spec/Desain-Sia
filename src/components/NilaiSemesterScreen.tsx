import React, { useState } from 'react';
import { dbManager } from '../database/db';
import { NilaiMataKuliah } from '../types';
import { Award, Plus, Sparkles, TrendingUp, X } from 'lucide-react';

export const NilaiSemesterScreen: React.FC = () => {
  const [grades, setGrades] = useState<NilaiMataKuliah[]>(() => dbManager.getNilai());
  const [showAddModal, setShowAddModal] = useState(false);

  const [newMatkul, setNewMatkul] = useState('');
  const [newSks, setNewSks] = useState(3);
  const [newGrade, setNewGrade] = useState<'A' | 'B+' | 'B' | 'C+' | 'C'>('A');

  const { ipk, totalSks, predikat } = dbManager.calculateIPK();

  const handleAddGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMatkul.trim()) return;

    let bobot = 4.0;
    if (newGrade === 'B+') bobot = 3.5;
    if (newGrade === 'B') bobot = 3.0;
    if (newGrade === 'C+') bobot = 2.5;
    if (newGrade === 'C') bobot = 2.0;

    dbManager.addNilai({
      mataKuliah: newMatkul.trim(),
      sks: Number(newSks),
      nilaiHuruf: newGrade,
      bobot,
      semester: 3,
      dosenPengampu: 'Dosen Pengampu',
      tahunAjaran: '2025/2026 Gasal',
    });

    setGrades(dbManager.getNilai());
    setShowAddModal(false);
    setNewMatkul('');
  };

  return (
    <div className="flex-1 px-5 pt-2 pb-6 overflow-y-auto no-scrollbar select-none">
      {/* 1. Large Circular IPK Gauge (Matching iPhone 17 - 3) */}
      <div className="flex flex-col items-center justify-center my-4">
        <div className="relative w-44 h-44 rounded-full flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-[6px] border-[#9f4f1d]/50" />
          
          {/* Inner circle fill with warm brownish-amber gradient */}
          <div className="w-38 h-38 rounded-full bg-gradient-to-br from-[#b85b23] to-[#994717] shadow-inner flex flex-col items-center justify-center text-white border-2 border-white/20">
            <span className="text-[13px] font-semibold tracking-wider text-amber-200">
              Indeks
            </span>
            <span className="text-4xl font-black tracking-tight text-white my-0.5">
              {ipk.toFixed(2)}
            </span>
            <span className="text-[13px] font-semibold tracking-wider text-amber-200">
              Prestasi
            </span>
          </div>
        </div>

        {/* Academic status summary badge */}
        <div className="mt-3 flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-white text-xs border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="font-semibold">{predikat}</span>
          <span className="text-amber-200/80">• {totalSks} SKS Ditempuh</span>
        </div>
      </div>

      {/* 2. Grades List Cards */}
      <div className="mt-4 space-y-3">
        {grades.map((item) => (
          <div
            key={item.id}
            className="bg-[#ededf0] rounded-[20px] px-5 py-3.5 flex items-center justify-between shadow-md border border-white/60 transition-transform active:scale-[0.99]"
          >
            <div>
              <h4 className="text-[13px] font-bold text-stone-800 leading-snug">
                {item.mataKuliah}
              </h4>
              <p className="text-[11px] font-medium text-stone-500 mt-0.5">
                Jumlah {item.sks} SKS
              </p>
            </div>

            {/* Letter Grade Circle Badge (Green for A/B) */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold text-base shadow-sm shrink-0 ${
                item.nilaiHuruf === 'A'
                  ? 'bg-[#15803d]'
                  : item.nilaiHuruf === 'B+' || item.nilaiHuruf === 'B'
                  ? 'bg-[#16a34a]'
                  : 'bg-amber-600'
              }`}
            >
              {item.nilaiHuruf}
            </div>
          </div>
        ))}
      </div>

      {/* Add Grade Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="mt-5 w-full py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-2 backdrop-blur-md border border-white/30 transition-all cursor-pointer shadow-sm"
      >
        <Plus className="w-4 h-4" />
        <span>Tambah Nilai Mata Kuliah (Simulasi KHS)</span>
      </button>

      {/* Add Grade Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-stone-800 rounded-3xl p-5 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-sm">Input Nilai Mata Kuliah</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddGrade} className="space-y-3 mt-3 text-xs">
              <div>
                <label className="block font-bold text-stone-600 mb-1">Mata Kuliah</label>
                <input
                  type="text"
                  value={newMatkul}
                  onChange={(e) => setNewMatkul(e.target.value)}
                  placeholder="Contoh: Kecerdasan Buatan"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
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
                <div>
                  <label className="block font-bold text-stone-600 mb-1">Nilai Huruf</label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                  >
                    <option value="A">A (4.00)</option>
                    <option value="B+">B+ (3.50)</option>
                    <option value="B">B (3.00)</option>
                    <option value="C+">C+ (2.50)</option>
                    <option value="C">C (2.00)</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#cb6d32] hover:bg-[#b55b23] text-white font-bold rounded-xl"
                >
                  Simpan ke Database
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
