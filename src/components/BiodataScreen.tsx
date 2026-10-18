import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  KeyRound, 
  Mail, 
  User as UserIcon, 
  CheckCircle2, 
  AlertCircle, 
  Edit3, 
  Save, 
  X,
  Lock
} from 'lucide-react';

export const BiodataScreen: React.FC = () => {
  const { currentUser, updatePassword, updateProfile } = useAuth();

  // Password change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passLoading, setPassLoading] = useState(false);
  const [passError, setPassError] = useState<string | null>(null);
  const [passSuccess, setPassSuccess] = useState<string | null>(null);

  // Profile edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editEmailLain, setEditEmailLain] = useState(currentUser?.emailLain || '');
  const [editEmailOrtu, setEditEmailOrtu] = useState(currentUser?.emailOrtu || '');
  const [editTempatLahir, setEditTempatLahir] = useState(currentUser?.tempatTanggalLahir || '');

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(null);
    setPassSuccess(null);

    if (!oldPassword || !newPassword || !confirmPassword) {
      setPassError('Harap isi semua kolom password!');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPassError('Ketik kembali password baru tidak cocok!');
      return;
    }
    if (newPassword.length < 4) {
      setPassError('Password baru minimal 4 karakter!');
      return;
    }

    setPassLoading(true);
    const res = await updatePassword(oldPassword, newPassword);
    setPassLoading(false);

    if (res.success) {
      setPassSuccess('Password SIA berhasil diperbarui di database!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPassSuccess(null), 4000);
    } else {
      setPassError(res.error || 'Password lama tidak sesuai!');
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      emailLain: editEmailLain,
      emailOrtu: editEmailOrtu,
      tempatTanggalLahir: editTempatLahir,
    });
    setShowEditModal(false);
  };

  return (
    <div className="flex-1 px-5 pt-2 pb-6 overflow-y-auto no-scrollbar select-none text-stone-800">
      {/* 1. Header Profile Photo & Title (Matching iPhone 17 - 8) */}
      <div className="flex flex-col items-center justify-center my-2 text-center">
        <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-white shadow-lg bg-blue-700 relative">
          <img
            src={
              currentUser?.photoUrl ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
            }
            alt={currentUser?.nama || 'Foto Mahasiswa'}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-base font-extrabold uppercase tracking-tight text-white mt-2 drop-shadow leading-tight">
          {currentUser?.nama || 'Vinsensius Restu Bima Nata'}
        </h2>
        <span className="font-mono text-xs font-bold text-amber-200 mt-0.5">
          {currentUser?.nim || '245314051'}
        </span>
      </div>

      {/* 2. Main White Container (Matching layout in iPhone 17 - 8) */}
      <div className="mt-4 bg-[#f8d7b3] rounded-3xl overflow-hidden shadow-xl border border-white/40 divide-y-2 divide-[#cb6d32]/25">
        
        {/* Section A: Data Mahasiswa */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#cb6d32]/30">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 text-center flex-1">
              Data mahasiswa
            </h3>
            <button
              onClick={() => {
                setEditEmailLain(currentUser?.emailLain || '');
                setEditEmailOrtu(currentUser?.emailOrtu || '');
                setEditTempatLahir(currentUser?.tempatTanggalLahir || '');
                setShowEditModal(true);
              }}
              className="text-[10px] text-[#cb6d32] hover:text-[#994717] font-bold flex items-center gap-1"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-1.5 text-xs text-stone-900">
            <div className="grid grid-cols-12">
              <span className="col-span-5 text-stone-700 font-medium">Nomor Induk Mahasiswa</span>
              <span className="col-span-1">:</span>
              <span className="col-span-6 font-bold font-mono">{currentUser?.nim || '245314051'}</span>
            </div>

            <div className="grid grid-cols-12">
              <span className="col-span-5 text-stone-700 font-medium">Nama</span>
              <span className="col-span-1">:</span>
              <span className="col-span-6 font-bold">{currentUser?.nama || 'Vinsensius Restu Bima nata'}</span>
            </div>

            <div className="grid grid-cols-12">
              <span className="col-span-5 text-stone-700 font-medium">Jeniskelamin</span>
              <span className="col-span-1">:</span>
              <span className="col-span-6 font-medium">{currentUser?.jenisKelamin || 'Laki-laki'}</span>
            </div>

            <div className="grid grid-cols-12">
              <span className="col-span-5 text-stone-700 font-medium">Tempat / Tanggal Lahir</span>
              <span className="col-span-1">:</span>
              <span className="col-span-6 font-medium">{currentUser?.tempatTanggalLahir || 'OKU Timur, 3 Juni 2005'}</span>
            </div>

            <div className="grid grid-cols-12">
              <span className="col-span-5 text-stone-700 font-medium">Agama</span>
              <span className="col-span-1">:</span>
              <span className="col-span-6 font-medium">{currentUser?.agama || 'Katolik'}</span>
            </div>

            <div className="grid grid-cols-12">
              <span className="col-span-5 text-stone-700 font-medium">Program Studi</span>
              <span className="col-span-1">:</span>
              <span className="col-span-6 font-semibold">{currentUser?.prodi || 'S1 Informatika'}</span>
            </div>
          </div>
        </div>

        {/* Section B: Login SIA dan Login Internet */}
        <div className="p-4 sm:p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 text-center mb-3">
            Login SIA dan Login Internet
          </h3>

          {passError && (
            <div className="mb-3 p-2.5 bg-rose-100/90 border border-rose-300 rounded-xl text-rose-800 text-[11px] flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{passError}</span>
            </div>
          )}

          {passSuccess && (
            <div className="mb-3 p-2.5 bg-emerald-100/90 border border-emerald-300 rounded-xl text-emerald-800 text-[11px] flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{passSuccess}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-2 text-xs">
            <div className="grid grid-cols-12 items-center">
              <span className="col-span-5 text-stone-700 font-medium">Username</span>
              <span className="col-span-1">:</span>
              <span className="col-span-6 font-mono font-bold text-stone-900">
                {currentUser?.nim || '245314051'}
              </span>
            </div>

            <div className="grid grid-cols-12 items-center">
              <label className="col-span-5 text-stone-700 font-medium">
                Ketik Password Lama
              </label>
              <span className="col-span-1">:</span>
              <div className="col-span-6">
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Password lama"
                  className="w-full px-2.5 py-1.5 bg-white/90 border border-stone-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#cb6d32]"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 items-center">
              <label className="col-span-5 text-stone-700 font-medium">
                Ketik Password Baru
              </label>
              <span className="col-span-1">:</span>
              <div className="col-span-6">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 4 karakter"
                  className="w-full px-2.5 py-1.5 bg-white/90 border border-stone-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#cb6d32]"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 items-center">
              <label className="col-span-5 text-stone-700 font-medium">
                Ketik Kembali Password Baru
              </label>
              <span className="col-span-1">:</span>
              <div className="col-span-6">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password"
                  className="w-full px-2.5 py-1.5 bg-white/90 border border-stone-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#cb6d32]"
                />
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="submit"
                disabled={passLoading}
                className="py-1.5 px-4 bg-[#cb6d32] hover:bg-[#b85b23] text-white font-bold rounded-xl text-xs shadow-sm transition-all cursor-pointer disabled:opacity-60 inline-flex items-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>{passLoading ? 'Menyimpan...' : 'Perbarui Password'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Section C: Email (Matching iPhone 17 - 8) */}
        <div className="p-4 sm:p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 text-center mb-2.5">
            Email
          </h3>

          <div className="space-y-1.5 text-xs text-stone-900">
            <div className="grid grid-cols-12">
              <span className="col-span-5 text-stone-700 font-medium">Alamat Email Student</span>
              <span className="col-span-1">:</span>
              <span className="col-span-6 font-medium break-all text-[#994717]">
                {currentUser?.emailStudent || '245314051@student.usd.ac.id'}
              </span>
            </div>

            <div className="grid grid-cols-12">
              <span className="col-span-5 text-stone-700 font-medium">Alamat Email Lain</span>
              <span className="col-span-1">:</span>
              <span className="col-span-6 font-medium break-all">
                {currentUser?.emailLain || 'vinsensiua83@gmail.com'}
              </span>
            </div>

            <div className="grid grid-cols-12">
              <span className="col-span-5 text-stone-700 font-medium">Email Orangtua/Wali</span>
              <span className="col-span-1">:</span>
              <span className="col-span-6 font-medium break-all">
                {currentUser?.emailOrtu || 'dewaashura83@gmail.com'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-stone-800 rounded-3xl p-5 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-sm text-stone-800">Edit Data Biodata Mahasiswa</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 mt-3 text-xs">
              <div>
                <label className="block font-bold text-stone-600 mb-1">
                  Tempat / Tanggal Lahir
                </label>
                <input
                  type="text"
                  value={editTempatLahir}
                  onChange={(e) => setEditTempatLahir(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-600 mb-1">
                  Alamat Email Lain (Pribadi)
                </label>
                <input
                  type="email"
                  value={editEmailLain}
                  onChange={(e) => setEditEmailLain(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-600 mb-1">
                  Email Orang Tua / Wali
                </label>
                <input
                  type="email"
                  value={editEmailOrtu}
                  onChange={(e) => setEditEmailOrtu(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#cb6d32] hover:bg-[#b55b23] text-white font-bold rounded-xl"
                >
                  Simpan Perubahan
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
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
