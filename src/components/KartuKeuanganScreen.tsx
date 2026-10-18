import React, { useState } from 'react';
import { dbManager } from '../database/db';
import { TagihanKeuangan } from '../types';
import { 
  Copy, 
  Check, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  Plus, 
  X,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const KartuKeuanganScreen: React.FC = () => {
  const [selectedBank, setSelectedBank] = useState<'BRI' | 'BCA' | 'BSI'>('BRI');
  const [bills, setBills] = useState<TagihanKeuangan[]>(() => dbManager.getTagihan());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedBill, setSelectedBill] = useState<TagihanKeuangan | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const filteredBills = bills.filter((b) => b.bank === selectedBank);

  const handleCopyVA = (va: string, id: string) => {
    navigator.clipboard.writeText(va.replace(/\s+/g, ''));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePay = (bill: TagihanKeuangan) => {
    dbManager.bayarTagihan(bill.id);
    setBills(dbManager.getTagihan());
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      setSelectedBill(null);
    }, 1500);
  };

  return (
    <div className="flex-1 px-5 pt-2 pb-6 overflow-y-auto no-scrollbar select-none">
      {/* 1. Bank Selector Tabs (BRI, BCA, BSI matching iPhone 17 - 4) */}
      <div className="grid grid-cols-3 gap-3 pb-4">
        {(['BRI', 'BCA', 'BSI'] as const).map((bank) => {
          const isActive = selectedBank === bank;
          return (
            <button
              key={bank}
              onClick={() => setSelectedBank(bank)}
              className={`py-2 rounded-2xl text-sm font-extrabold transition-all cursor-pointer shadow-sm text-center ${
                isActive
                  ? 'bg-white text-stone-900 shadow-md scale-102 border-2 border-amber-300'
                  : 'bg-white/80 hover:bg-white text-stone-700'
              }`}
            >
              {bank}
            </button>
          );
        })}
      </div>

      {/* Virtual Account Quick Banner */}
      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/20 text-white mb-3 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-amber-200 uppercase tracking-wider block font-bold">
            Virtual Account {selectedBank} Universitas Sanata Dharma
          </span>
          <span className="font-mono text-sm font-bold tracking-wider">
            131425 53646 76869
          </span>
        </div>
        <button
          onClick={() => handleCopyVA('131425 53646 76869', 'top-banner')}
          className="px-2.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-semibold flex items-center gap-1 transition-all"
        >
          {copiedId === 'top-banner' ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-300" />
              <span>Tersalin</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Salin</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Bill Items List (Matching layout in mockup) */}
      <div className="space-y-3">
        {filteredBills.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedBill(item)}
            className="bg-[#ededf0] rounded-[20px] px-5 py-3.5 flex items-center justify-between shadow-md border border-white/60 cursor-pointer hover:bg-white transition-all active:scale-[0.99] group"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-stone-900 font-mono tracking-wide">
                  {item.nomorVA}
                </span>
                {item.status === 'Lunas' && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    LUNAS
                  </span>
                )}
              </div>
              <p className="text-[11px] font-medium text-stone-500 mt-0.5">
                {item.deskripsi}
              </p>
            </div>

            {/* Price badge */}
            <div className="text-right shrink-0">
              <span className="text-xs font-bold text-stone-800 block">
                {item.perSksText || item.nominalFormatted}
              </span>
              <span className="text-[10px] text-[#cb6d32] font-semibold group-hover:underline">
                {item.status === 'Lunas' ? 'Lihat Bukti' : 'Bayar >'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Payment & VA Details Modal */}
      {selectedBill && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-stone-800 rounded-3xl p-5 max-w-sm w-full shadow-2xl animate-scaleIn">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-[#cb6d32] flex items-center justify-center font-bold text-xs">
                  {selectedBill.bank}
                </div>
                <h3 className="font-bold text-sm text-stone-800">Detail Tagihan Keuangan</h3>
              </div>
              <button
                onClick={() => setSelectedBill(null)}
                className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-4 space-y-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-[10px] font-bold uppercase text-stone-400 block mb-0.5">
                  Nomor Virtual Account {selectedBill.bank}
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-base font-bold text-stone-800 tracking-wider">
                    {selectedBill.nomorVA}
                  </span>
                  <button
                    onClick={() => handleCopyVA(selectedBill.nomorVA, selectedBill.id)}
                    className="p-1.5 rounded-lg bg-stone-200 text-stone-700 hover:bg-stone-300"
                    title="Salin Nomor VA"
                  >
                    {copiedId === selectedBill.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-stone-400 block text-[11px]">Rincian Pembayaran:</span>
                <p className="font-semibold text-stone-800 text-sm mt-0.5">
                  {selectedBill.deskripsi}
                </p>
              </div>

              <div className="flex justify-between py-1 border-t border-stone-100">
                <span className="text-stone-500">Tarif / Satuan:</span>
                <span className="font-semibold text-stone-800">{selectedBill.nominalFormatted}</span>
              </div>

              <div className="flex justify-between py-1 border-t border-stone-100">
                <span className="text-stone-500">Batas Pembayaran:</span>
                <span className="font-semibold text-rose-600">{selectedBill.jatuhTempo}</span>
              </div>

              <div className="flex justify-between py-1 border-t border-stone-100">
                <span className="text-stone-500">Status Pembayaran:</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                    selectedBill.status === 'Lunas'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {selectedBill.status}
                </span>
              </div>

              {selectedBill.tanggalBayar && (
                <div className="flex justify-between py-1 border-t border-stone-100">
                  <span className="text-stone-500">Tanggal Transaksi:</span>
                  <span className="font-medium text-stone-700">{selectedBill.tanggalBayar}</span>
                </div>
              )}
            </div>

            {paymentSuccess ? (
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-center text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pembayaran Sukses Disimpan ke Database!</span>
              </div>
            ) : selectedBill.status === 'Belum Bayar' ? (
              <button
                onClick={() => handlePay(selectedBill)}
                className="w-full py-3 bg-[#cb6d32] hover:bg-[#b85b23] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Simulasikan Pembayaran VA Sekarang</span>
              </button>
            ) : (
              <button
                onClick={() => setSelectedBill(null)}
                className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-2xl text-xs"
              >
                Tutup Rincian
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
