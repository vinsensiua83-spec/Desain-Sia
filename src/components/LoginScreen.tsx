import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  Lock, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  LogIn, 
  Database, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

interface LoginScreenProps {
  onOpenDbManager?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onOpenDbManager }) => {
  const { login, register } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [nim, setNim] = useState('245314051');
  const [password, setPassword] = useState('usd123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Registration state
  const [regNim, setRegNim] = useState('');
  const [regNama, setRegNama] = useState('');
  const [regProdi, setRegProdi] = useState('S1 Informatika');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Forgot password modal
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!nim.trim()) {
      setErrorMessage('Nomor Induk Mahasiswa (NIM) wajib diisi.');
      return;
    }
    if (!password) {
      setErrorMessage('Kata sandi / Password wajib diisi.');
      return;
    }

    setLoading(true);
    // Add realistic authentication delay
    setTimeout(async () => {
      const res = await login(nim.trim(), password);
      setLoading(false);
      if (!res.success) {
        setErrorMessage(res.error || 'NIM atau password salah.');
      }
    }, 450);
  };

  const handleQuickDemo = async () => {
    setNim('245314051');
    setPassword('usd123');
    setLoading(true);
    setErrorMessage(null);
    setTimeout(async () => {
      await login('245314051', 'usd123');
      setLoading(false);
    }, 350);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!regNim.trim() || !regNama.trim() || !regPassword) {
      setErrorMessage('Semua field wajib diisi!');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Konfirmasi password tidak cocok!');
      return;
    }
    if (regPassword.length < 4) {
      setErrorMessage('Password minimal 4 karakter!');
      return;
    }

    setLoading(true);
    const res = await register({
      nim: regNim.trim(),
      nama: regNama.trim(),
      prodi: regProdi,
      password: regPassword,
    });
    setLoading(false);

    if (res.success) {
      setSuccessMessage('Akun mahasiswa berhasil didaftarkan dan login otomatis!');
    } else {
      setErrorMessage(res.error || 'Pendaftaran gagal');
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-between bg-[#cb6d32] text-white p-5 sm:p-7 relative overflow-hidden select-none">
      {/* Decorative ambient blur circles */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-orange-950/30 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with university crest & DB status */}
      <div className="relative z-10 flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-amber-100 block leading-tight">
              UNIVERSITAS SANATA DHARMA
            </span>
            <span className="text-[10px] text-amber-200/80 font-medium">
              Cerdas & Humanis • Yogyakarta
            </span>
          </div>
        </div>

        {onOpenDbManager && (
          <button
            onClick={onOpenDbManager}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-[11px] font-medium text-white transition-all shadow-sm"
            title="Kelola Database"
          >
            <Database className="w-3.5 h-3.5 text-amber-200" />
            <span className="hidden sm:inline">Database</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>
        )}
      </div>

      {/* Main Login / Register Card Container */}
      <div className="relative z-10 my-auto py-4">
        {/* Header Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
            {isRegisterMode ? 'Registrasi Mahasiswa' : 'Portal Akademik Mahasiswa'}
          </h1>
          <p className="text-amber-100/90 text-xs sm:text-sm mt-1 max-w-xs mx-auto">
            {isRegisterMode
              ? 'Daftarkan data diri Anda ke database akademik'
              : 'Silakan masuk menggunakan NIM & Password SIA'}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/95 text-stone-800 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl border border-white/60 max-w-sm mx-auto">
          {/* Feedback messages */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <div className="flex-1 font-medium">{successMessage}</div>
            </div>
          )}

          {!isRegisterMode ? (
            /* --- LOGIN FORM --- */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                  Nomor Induk Mahasiswa (NIM)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                    placeholder="Contoh: 245314051"
                    className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-semibold text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#cb6d32] focus:bg-white transition-all shadow-inner"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                    Password SIA
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[11px] text-[#cb6d32] hover:text-[#a85220] font-semibold"
                  >
                    Lupa Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="w-full pl-10 pr-11 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-semibold text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#cb6d32] focus:bg-white transition-all shadow-inner"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer text-stone-600 font-medium select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#cb6d32] focus:ring-[#cb6d32] border-stone-300"
                  />
                  <span>Ingat sesi saya</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#cb6d32] to-[#b3561c] hover:from-[#b95e25] hover:to-[#a14913] active:scale-[0.98] text-white font-bold rounded-2xl shadow-lg shadow-orange-950/20 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer disabled:opacity-70"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Memverifikasi Database...</span>
                  </div>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Masuk ke SIA</span>
                  </>
                )}
              </button>

              {/* Fast 1-Click Demo Login */}
              <div className="pt-2">
                <div className="relative flex py-1.5 items-center">
                  <div className="flex-grow border-t border-stone-200"></div>
                  <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                    Atau Akses Cepat Demo
                  </span>
                  <div className="flex-grow border-t border-stone-200"></div>
                </div>

                <button
                  type="button"
                  onClick={handleQuickDemo}
                  className="w-full mt-1.5 py-2.5 px-3 bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 rounded-xl text-xs font-semibold flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-2 text-left">
                    <div className="w-6 h-6 rounded-lg bg-amber-200 flex items-center justify-center text-amber-800">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="leading-tight text-[11px] font-bold">Vinsensius Restu Bima Nata</div>
                      <div className="text-[10px] text-stone-500 font-normal">NIM: 245314051 • S1 Informatika</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Switch to Register */}
              <div className="text-center pt-2 text-xs text-stone-500">
                Belum punya akun mahasiswa?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegisterMode(true);
                    setErrorMessage(null);
                  }}
                  className="font-bold text-[#cb6d32] hover:underline"
                >
                  Daftar Akun Baru
                </button>
              </div>
            </form>
          ) : (
            /* --- REGISTER FORM --- */
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                  Nomor Induk Mahasiswa (NIM)
                </label>
                <input
                  type="text"
                  value={regNim}
                  onChange={(e) => setRegNim(e.target.value)}
                  placeholder="Contoh: 245314099"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#cb6d32]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                  Nama Lengkap Mahasiswa
                </label>
                <input
                  type="text"
                  value={regNama}
                  onChange={(e) => setRegNama(e.target.value)}
                  placeholder="Contoh: Yohanes Surya Pratama"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#cb6d32]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                  Program Studi
                </label>
                <select
                  value={regProdi}
                  onChange={(e) => setRegProdi(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#cb6d32]"
                >
                  <option value="S1 Informatika">S1 Informatika</option>
                  <option value="S1 Sistem Informasi">S1 Sistem Informasi</option>
                  <option value="S1 Teknik Elektro">S1 Teknik Elektro</option>
                  <option value="S1 Matematika">S1 Matematika</option>
                  <option value="S1 Psikologi">S1 Psikologi</option>
                  <option value="S1 Akuntansi">S1 Akuntansi</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min. 4 karakter"
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#cb6d32]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                    Konfirmasi
                  </label>
                  <input
                    type="password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Ulangi password"
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#cb6d32]"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 bg-[#cb6d32] hover:bg-[#b55b23] text-white font-bold rounded-2xl shadow-md text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {loading ? 'Menyimpan Akun...' : 'Daftar & Masuk ke Database'}
              </button>

              <div className="text-center pt-1 text-xs text-stone-500">
                Sudah memiliki akun?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegisterMode(false);
                    setErrorMessage(null);
                  }}
                  className="font-bold text-[#cb6d32] hover:underline"
                >
                  Kembali ke Login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 text-center text-amber-100/75 text-[11px] pt-3">
        <div className="flex items-center justify-center gap-1.5 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-200" />
          <span>Sistem Informasi Akademik Terenkripsi & Terintegrasi</span>
        </div>
        <p className="mt-0.5 text-[10px] text-amber-200/60">
          © {new Date().getFullYear()} Universitas Sanata Dharma • All Rights Reserved
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-stone-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-stone-100 animate-scaleIn">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#cb6d32] flex items-center justify-center mb-3">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-800">Bantuan Akses Akun SIA</h3>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              Untuk akun demo bawaan (NIM: <span className="font-bold text-stone-800">245314051</span>), password default adalah:
            </p>
            <div className="mt-3 p-3 bg-stone-100 rounded-2xl flex items-center justify-between border border-stone-200">
              <span className="text-xs text-stone-500 font-medium">Default Password:</span>
              <span className="font-mono text-sm font-bold text-[#cb6d32] bg-white px-3 py-1 rounded-lg border border-amber-200">
                usd123
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-3 leading-relaxed">
              Anda juga dapat mengganti password kapan saja melalui menu <span className="font-semibold text-stone-700">Biodata &gt; Login SIA</span> setelah masuk.
            </p>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setPassword('usd123');
                  setShowForgotModal(false);
                }}
                className="flex-1 py-2.5 bg-[#cb6d32] text-white rounded-xl text-xs font-bold hover:bg-[#b85b23] transition-all"
              >
                Gunakan Password Ini
              </button>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="py-2.5 px-4 bg-stone-100 text-stone-600 rounded-xl text-xs font-semibold hover:bg-stone-200 transition-all"
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
