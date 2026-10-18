import React, { useState } from 'react';
import { dbManager, DatabaseSchema } from '../database/db';
import { 
  Database, 
  RefreshCw, 
  Download, 
  Upload, 
  Check, 
  X, 
  Table, 
  ShieldAlert, 
  FileCode,
  Layers
} from 'lucide-react';

interface DatabaseManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatabaseManagerModal: React.FC<DatabaseManagerModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'tables' | 'json' | 'backup'>('tables');
  const [dbData, setDbData] = useState<DatabaseSchema>(() => dbManager.getRawData());
  const [jsonText, setJsonText] = useState(() => dbManager.exportDatabaseJson());
  const [copied, setCopied] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const refreshState = () => {
    const raw = dbManager.getRawData();
    setDbData(raw);
    setJsonText(JSON.stringify(raw, null, 2));
  };

  const handleResetFactory = () => {
    if (window.confirm('Reset database ke data awal bawaan Universitas Sanata Dharma?')) {
      dbManager.resetToFactory();
      refreshState();
      setStatusMsg('Database berhasil direset ke pengaturan awal.');
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveJson = () => {
    const success = dbManager.importDatabaseJson(jsonText);
    if (success) {
      refreshState();
      setStatusMsg('Struktur database berhasil diperbarui!');
      setTimeout(() => setStatusMsg(null), 3000);
    } else {
      alert('Format JSON tidak valid!');
    }
  };

  const tableSummary = [
    { name: 'users (Mahasiswa & Akun Login)', count: dbData.users.length, desc: 'Akun NIM, password, dan biodata' },
    { name: 'jadwalKuliah (Jadwal Perkuliahan)', count: dbData.jadwalKuliah.length, desc: 'Mata kuliah harian & ruangan' },
    { name: 'nilaiSemester (KHS & Transkrip)', count: dbData.nilaiSemester.length, desc: 'Nilai huruf, SKS, dan indeks prestasi' },
    { name: 'tagihanKeuangan (Virtual Account)', count: dbData.tagihanKeuangan.length, desc: 'Tagihan VA BRI, BCA, BSI' },
    { name: 'poinKegiatan (Keaktifan)', count: dbData.poinKegiatan.length, desc: 'Rekapitulasi poin sertifikat dan lomba' },
    { name: 'infoBeasiswa (Beasiswa Kampus)', count: dbData.infoBeasiswa.length, desc: 'Informasi beasiswa & status daftar' },
    { name: 'jadwalDosen (Jadwal Konsultasi)', count: dbData.jadwalDosen.length, desc: 'Jadwal temu dosen di ruangan' },
    { name: 'notifikasi (Pemberitahuan)', count: dbData.notifikasi.length, desc: 'Notifikasi akademik & transaksi' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 select-none">
      <div className="bg-white text-stone-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scaleIn border border-stone-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">Pengelola Database Akademik</h3>
              <p className="text-[10px] text-stone-400">Penyimpanan Persisten (Local Persistent Engine)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-3 pt-2 gap-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('tables')}
            className={`px-3 py-2 rounded-t-xl transition-all ${
              activeTab === 'tables'
                ? 'bg-white text-stone-900 border-t border-x border-stone-200 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Ringkasan Tabel ({tableSummary.length})
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`px-3 py-2 rounded-t-xl transition-all ${
              activeTab === 'json'
                ? 'bg-white text-stone-900 border-t border-x border-stone-200 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            JSON Raw Data
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`px-3 py-2 rounded-t-xl transition-all ${
              activeTab === 'backup'
                ? 'bg-white text-stone-900 border-t border-x border-stone-200 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Backup & Reset
          </button>
        </div>

        {/* Status notification */}
        {statusMsg && (
          <div className="px-4 py-2 bg-emerald-50 text-emerald-800 text-xs font-semibold border-b border-emerald-200 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar text-xs">
          {activeTab === 'tables' && (
            <div className="space-y-2">
              <div className="text-[11px] text-stone-500 pb-1">
                Data tersimpan di perangkat secara persisten. Perubahan data login, nilai, dan jadwal langsung tersinkronisasi.
              </div>
              {tableSummary.map((t, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between"
                >
                  <div>
                    <h5 className="font-bold text-stone-800 font-mono text-[11px]">{t.name}</h5>
                    <p className="text-[10px] text-stone-500">{t.desc}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-[#cb6d32] font-black text-xs font-mono">
                    {t.count}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-stone-500">Editor JSON Database Langsung:</span>
                <button
                  onClick={handleCopyJson}
                  className="px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-[10px] flex items-center gap-1"
                >
                  <FileCode className="w-3 h-3" />
                  <span>{copied ? 'Tersalin!' : 'Salin JSON'}</span>
                </button>
              </div>
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                rows={12}
                className="w-full font-mono text-[11px] p-3 bg-stone-900 text-emerald-400 rounded-2xl border border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                onClick={handleSaveJson}
                className="w-full py-2.5 bg-stone-800 hover:bg-stone-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Simpan Perubahan JSON ke Database</span>
              </button>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
                <h5 className="font-bold text-xs mb-1">Status Database Persisten:</h5>
                <p className="text-[11px] text-amber-800/90 leading-relaxed">
                  Semua transaksi autentikasi (login dengan NIM: 245314051), jadwal, nilai, dan biodata disimpan dalam storage browser.
                </p>
                <div className="mt-2 text-[10px] font-mono text-stone-600">
                  Terakhir diperbarui: {new Date(dbData.lastUpdated).toLocaleString('id-ID')}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <h5 className="font-bold text-xs text-stone-800">Reset ke Pengaturan Awal</h5>
                <p className="text-[11px] text-stone-600">
                  Kembalikan data akun Vinsensius Restu Bima Nata (password: usd123) serta jadwal dan nilai bawaan.
                </p>
                <button
                  onClick={handleResetFactory}
                  className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Database ke Default</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white font-bold rounded-xl text-xs cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
