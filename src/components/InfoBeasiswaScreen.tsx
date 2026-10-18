import React, { useState } from 'react';
import { dbManager } from '../database/db';
import { InfoBeasiswa } from '../types';
import { 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Users, 
  DollarSign, 
  ArrowRight 
} from 'lucide-react';

export const InfoBeasiswaScreen: React.FC = () => {
  const [scholarships, setScholarships] = useState<InfoBeasiswa[]>(() => dbManager.getBeasiswa());
  const [selectedItem, setSelectedItem] = useState<InfoBeasiswa | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);

  const handleApply = (id: string) => {
    dbManager.daftarBeasiswa(id);
    setScholarships(dbManager.getBeasiswa());
    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setSelectedItem(null);
    }, 1800);
  };

  return (
    <div className="flex-1 px-5 pt-2 pb-6 overflow-y-auto no-scrollbar select-none">
      {/* Scholarship Cards List (Matching iPhone 17 - 7) */}
      <div className="space-y-4">
        {scholarships.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="rounded-[22px] overflow-hidden shadow-lg bg-stone-900 border border-white/20 relative cursor-pointer group active:scale-[0.99] transition-all"
          >
            {/* Graduates Background Photo (Matching iPhone 17 - 7) */}
            <div className="relative h-28 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
                alt="Wisudawan Kelulusan Kampus"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

              {/* Title Overlay: "KIP KULIAH" */}
              <div className="absolute top-4 left-4 right-4 z-10 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-wider text-white drop-shadow-md">
                    {item.judul}
                  </h3>
                  <p className="text-xs text-amber-200 font-medium drop-shadow">
                    {item.penyelenggara}
                  </p>
                </div>

                {item.sudahDaftar && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white font-bold text-[10px] shadow-sm flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Terdaftar</span>
                  </span>
                )}
              </div>
            </div>

            {/* Card Footer Bar */}
            <div className="bg-[#ededf0] px-4 py-2.5 flex items-center justify-between text-stone-800 text-xs font-semibold">
              <div className="flex items-center gap-1.5 text-stone-600">
                <Calendar className="w-3.5 h-3.5 text-stone-500" />
                <span>Batas: {item.deadline}</span>
              </div>
              <span className="text-[#cb6d32] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Rincian & Syarat</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Scholarship Detail & Apply Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-stone-800 rounded-3xl p-5 max-w-sm w-full shadow-2xl animate-scaleIn max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-[#cb6d32] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-stone-800 leading-tight">
                    {selectedItem.judul}
                  </h3>
                  <span className="text-[10px] text-stone-500">
                    {selectedItem.penyelenggara}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-3 space-y-3 text-xs">
              <p className="text-stone-600 leading-relaxed">
                {selectedItem.deskripsi}
              </p>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80">
                <span className="font-bold text-[#cb6d32] block mb-1">
                  Cakupan Manfaat Beasiswa:
                </span>
                <p className="font-semibold text-stone-800 text-[11px]">
                  {selectedItem.cakupan}
                </p>
              </div>

              <div>
                <span className="font-bold text-stone-800 block mb-1">
                  Persyaratan Pendaftaran:
                </span>
                <ul className="space-y-1 text-stone-600 text-[11px]">
                  {selectedItem.syarat.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#cb6d32] mt-1.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between text-stone-500 text-[11px] pt-1 border-t border-stone-100">
                <span>Kuota Penerima:</span>
                <span className="font-bold text-stone-800">{selectedItem.kuota}</span>
              </div>
            </div>

            {applySuccess ? (
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-center text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pengajuan Berhasil Disimpan ke Database!</span>
              </div>
            ) : selectedItem.sudahDaftar ? (
              <div className="p-3 bg-stone-100 rounded-2xl text-stone-700 text-center text-xs font-semibold">
                Anda sudah mengirimkan berkas untuk beasiswa ini.
              </div>
            ) : (
              <button
                onClick={() => handleApply(selectedItem.id)}
                className="w-full py-3 bg-[#cb6d32] hover:bg-[#b85b23] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Daftar Beasiswa Ini Sekarang</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
