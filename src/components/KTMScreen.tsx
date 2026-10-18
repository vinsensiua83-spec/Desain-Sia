import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Download, 
  RotateCw, 
  QrCode, 
  Check, 
  ShieldCheck, 
  GraduationCap,
  Sparkles,
  Barcode
} from 'lucide-react';

export const KTMScreen: React.FC = () => {
  const { currentUser } = useAuth();
  const [isFlipped, setIsFlipped] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const nim = currentUser?.nim || '245314051';
  const nama = currentUser?.nama || 'VINSENSIUS RESTU BIMA NATA';
  const prodi = currentUser?.prodi || 'S1 - Informatika';

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="flex-1 px-5 pt-3 pb-6 overflow-y-auto no-scrollbar select-none flex flex-col justify-between">
      {/* 1. KTM Card Container with 3D Flip */}
      <div className="my-auto py-2">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative w-full aspect-[1.586/1] rounded-[22px] overflow-hidden shadow-2xl cursor-pointer group transition-all duration-500 perspective-1000 border-2 border-amber-300/60"
        >
          {!isFlipped ? (
            /* FRONT SIDE OF KTM (Matching iPhone 17 - 6) */
            <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-amber-600 via-amber-700 to-yellow-600 text-white p-4 flex flex-col justify-between">
              {/* Decorative background guilloche / geometric overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-amber-400/30 rounded-full blur-2xl" />

              {/* Top Banner: Logo & University Name */}
              <div className="relative z-10 flex items-center justify-between border-b border-amber-300/40 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-900/60 border border-amber-200/50 flex items-center justify-center text-amber-200 font-black text-xs shadow-inner">
                    USD
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black tracking-widest uppercase text-amber-100 leading-tight">
                      UNIVERSITAS SANATA DHARMA
                    </h4>
                    <span className="text-[8px] text-amber-200/90 italic block font-medium">
                      Cerdas & Humanis • Yogyakarta
                    </span>
                  </div>
                </div>

                <div className="px-2 py-0.5 rounded-md bg-amber-950/50 border border-amber-300/30 text-[9px] font-extrabold uppercase tracking-wider text-amber-200">
                  e-KTM
                </div>
              </div>

              {/* Middle: Student Details & Official Photo */}
              <div className="relative z-10 flex items-center justify-between gap-3 my-auto">
                <div className="flex-1 pr-1">
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white drop-shadow leading-tight">
                    {nama}
                  </h3>
                  <p className="text-[11px] font-mono font-bold text-amber-200 tracking-wider mt-1">
                    NIM: {nim}
                  </p>
                  <p className="text-[10px] font-semibold text-amber-100/90 mt-0.5">
                    {prodi}
                  </p>
                  <p className="text-[9px] text-amber-200/70 mt-1 font-mono">
                    Berlaku s/d: Agustus 2028
                  </p>
                </div>

                {/* Formal Blue Background Student Photo */}
                <div className="w-20 h-26 rounded-xl overflow-hidden border-2 border-white/80 shadow-md shrink-0 bg-blue-700 relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
                    alt={nama}
                    className="w-full h-full object-cover filter contrast-105"
                  />
                  {/* Holographic USD watermark */}
                  <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-amber-300/50 border border-white flex items-center justify-center text-[7px] font-black text-amber-950">
                    USD
                  </div>
                </div>
              </div>

              {/* Bottom: Barcode & Disclaimer */}
              <div className="relative z-10 pt-1.5 border-t border-amber-300/30 flex items-center justify-between text-[8px] text-amber-100/80">
                <div className="font-mono tracking-widest text-[10px] font-bold text-amber-100">
                  ||||| | |||| ||| ||||||| |
                </div>
                <span className="italic text-[7px] text-right max-w-[190px] leading-tight">
                  e-KTM ini adalah identitas resmi mahasiswa Universitas Sanata Dharma
                </span>
              </div>
            </div>
          ) : (
            /* BACK SIDE OF KTM */
            <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-stone-900 to-stone-800 text-stone-200 p-4 flex flex-col justify-between">
              <div className="text-center border-b border-stone-700 pb-2">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                  KETENTUAN PENGGUNAAN KARTU MAHASISWA
                </span>
              </div>

              <div className="space-y-1.5 text-[8px] text-stone-300 my-auto">
                <p>1. Kartu ini sah sebagai bukti mahasiswa aktif Universitas Sanata Dharma.</p>
                <p>2. Digunakan untuk akses perpustakaan, laboratorium, dan presensi kuliah.</p>
                <p>3. Dilarang meminjamkan kartu ini kepada pihak lain.</p>
                <p>4. Jika menemukan kartu ini, harap kembalikan ke Biro Administrasi Akademik USD.</p>
              </div>

              <div className="pt-2 border-t border-stone-700 flex items-center justify-between text-[8px]">
                <div className="font-mono text-amber-300">{nim}</div>
                <div className="text-right text-stone-400">Yogyakarta, Indonesia</div>
              </div>
            </div>
          )}
        </div>

        {/* Flip Hint */}
        <p className="text-center text-xs text-amber-100/90 mt-3 font-medium flex items-center justify-center gap-1.5">
          <RotateCw className="w-3.5 h-3.5" />
          <span>Ketuk kartu untuk melihat sisi {isFlipped ? 'depan' : 'belakang'}</span>
        </p>

        {/* Action Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowQrModal(true)}
            className="py-3 px-4 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-2 backdrop-blur-md border border-white/30 transition-all shadow-sm"
          >
            <QrCode className="w-4 h-4 text-amber-200" />
            <span>Tampilkan QR Presensi</span>
          </button>

          <button
            onClick={handleDownload}
            className="py-3 px-4 rounded-2xl bg-white text-stone-900 hover:bg-stone-100 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Tersimpan di Galeri</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#cb6d32]" />
                <span>Unduh e-KTM</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* QR Code Modal for campus access */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-stone-800 rounded-3xl p-6 max-w-xs w-full text-center shadow-2xl animate-scaleIn">
            <h3 className="font-bold text-sm text-stone-800">QR Code Presensi Kampus</h3>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Scan di gerbang kampus & ruang perpustakaan
            </p>

            <div className="my-4 p-4 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200 inline-block">
              {/* Generated simulated QR visual */}
              <div className="w-44 h-44 bg-white p-2 rounded-xl shadow-inner flex flex-col items-center justify-center border border-stone-100">
                <QrCode className="w-36 h-36 text-stone-800" />
                <span className="font-mono text-[10px] font-bold text-[#cb6d32] mt-1">
                  NIM: {nim}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-emerald-700 bg-emerald-50 py-1.5 px-3 rounded-full font-bold inline-block">
              Status: Mahasiswa Aktif Valid
            </p>

            <button
              onClick={() => setShowQrModal(false)}
              className="mt-4 w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs"
            >
              Tutup QR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
