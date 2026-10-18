import {
  User,
  JadwalKuliah,
  NilaiMataKuliah,
  TagihanKeuangan,
  PoinKegiatan,
  InfoBeasiswa,
  JadwalDosen,
  NotificationItem,
} from '../types';

const DB_STORAGE_KEY = 'USD_ACADEMIC_PORTAL_DATABASE_V1';
const AUTH_SESSION_KEY = 'USD_ACADEMIC_PORTAL_SESSION_V1';

export interface DatabaseSchema {
  users: User[];
  jadwalKuliah: JadwalKuliah[];
  nilaiSemester: NilaiMataKuliah[];
  tagihanKeuangan: TagihanKeuangan[];
  poinKegiatan: PoinKegiatan[];
  infoBeasiswa: InfoBeasiswa[];
  jadwalDosen: JadwalDosen[];
  notifikasi: NotificationItem[];
  lastUpdated: string;
}

// Initial seed data based on the provided screenshots for Vinsensius Restu Bima Nata (NIM: 245314051)
const DEFAULT_USER: User = {
  id: 'user-245314051',
  nim: '245314051',
  password: 'usd123', // Default initial password
  nama: 'Vinsensius Restu Bima Nata',
  jenisKelamin: 'Laki-laki',
  tempatTanggalLahir: 'OKU Timur, 3 Juni 2005',
  agama: 'Katolik',
  prodi: 'S1 Informatika',
  fakultas: 'Sains dan Teknologi',
  emailStudent: '245314051@student.usd.ac.id',
  emailLain: 'vinsensiua83@gmail.com',
  emailOrtu: 'dewaashura83@gmail.com',
  ipk: 3.92,
  poinKeaktifan: 150,
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  statusMahasiswa: 'Aktif',
  semester: 4,
  tahunMasuk: 2024,
  createdAt: '2024-08-15T08:00:00.000Z',
  updatedAt: new Date().toISOString(),
};

const DEFAULT_JADWAL: JadwalKuliah[] = [
  // Senin
  {
    id: 'jk-1',
    hari: 'Senin',
    mataKuliah: 'Algoritma optimisasi',
    dosen: 'Ir. Iwan S.T., M.Kom',
    jamMulai: '07:00',
    jamSelesai: '10:30',
    ruangan: 'K.204',
    sks: 3,
    catatan: 'Pertemuan 8: Dynamic Programming & Genetic Algorithms',
  },
  {
    id: 'jk-2',
    hari: 'Senin',
    mataKuliah: 'Pemrograman Perangkat Bergerak',
    dosen: 'Drs. Y.G. Hartono, M.T.',
    jamMulai: '11:00',
    jamSelesai: '13:30',
    ruangan: 'LBD.B',
    sks: 3,
    catatan: 'Praktikum Android Compose & State Management',
  },
  {
    id: 'jk-3',
    hari: 'Senin',
    mataKuliah: 'Kriptografi',
    dosen: 'Dr. Maria Goretti, M.Sc.',
    jamMulai: '14:00',
    jamSelesai: '16:30',
    ruangan: 'K.207',
    sks: 3,
    catatan: 'Elliptic Curve Cryptography & RSA Keys',
  },
  // Selasa
  {
    id: 'jk-4',
    hari: 'Selasa',
    mataKuliah: 'UI UX Design & Research',
    dosen: 'Iwan S.T., M.Kom',
    jamMulai: '07:00',
    jamSelesai: '10:30',
    ruangan: 'K307',
    sks: 3,
    catatan: 'Usability Testing & Design System Review',
  },
  {
    id: 'jk-5',
    hari: 'Selasa',
    mataKuliah: 'Analisis Proses Bisnis',
    dosen: 'Fransiscus Asisi, M.B.A.',
    jamMulai: '11:00',
    jamSelesai: '13:30',
    ruangan: 'K.205',
    sks: 3,
  },
  // Rabu
  {
    id: 'jk-6',
    hari: 'Rabu',
    mataKuliah: 'Pemrograman Web Lanjut',
    dosen: 'Bonaventura Satya, M.Cs.',
    jamMulai: '08:00',
    jamSelesai: '10:30',
    ruangan: 'LBD.A',
    sks: 3,
  },
  {
    id: 'jk-7',
    hari: 'Rabu',
    mataKuliah: 'Kecerdasan Buatan',
    dosen: 'Dr. A. Joko Santoso, M.Kom.',
    jamMulai: '13:00',
    jamSelesai: '15:30',
    ruangan: 'K.301',
    sks: 3,
  },
  // Kamis
  {
    id: 'jk-8',
    hari: 'Kamis',
    mataKuliah: 'Etika Profesi Informatika',
    dosen: 'Romo FX. Murti, S.J., Ph.D.',
    jamMulai: '09:00',
    jamSelesai: '11:30',
    ruangan: 'K.102',
    sks: 2,
  },
  // Jumat
  {
    id: 'jk-9',
    hari: 'Jumat',
    mataKuliah: 'Kapita Selekta Informatika',
    dosen: 'Ir. Iwan S.T., M.Kom',
    jamMulai: '07:30',
    jamSelesai: '10:00',
    ruangan: 'K.204',
    sks: 2,
  },
];

const DEFAULT_NILAI: NilaiMataKuliah[] = [
  {
    id: 'nl-1',
    mataKuliah: 'Algoritma Optimisasi',
    sks: 3,
    nilaiHuruf: 'A',
    bobot: 4.0,
    semester: 3,
    dosenPengampu: 'Ir. Iwan S.T., M.Kom',
    tahunAjaran: '2025/2026 Gasal',
  },
  {
    id: 'nl-2',
    mataKuliah: 'Analisis Proses Bisnis',
    sks: 3,
    nilaiHuruf: 'B',
    bobot: 3.0,
    semester: 3,
    dosenPengampu: 'Fransiscus Asisi, M.B.A.',
    tahunAjaran: '2025/2026 Gasal',
  },
  {
    id: 'nl-3',
    mataKuliah: 'Desain UI/UX',
    sks: 3,
    nilaiHuruf: 'A',
    bobot: 4.0,
    semester: 3,
    dosenPengampu: 'Iwan S.T., M.Kom',
    tahunAjaran: '2025/2026 Gasal',
  },
  {
    id: 'nl-4',
    mataKuliah: 'Kriptografi',
    sks: 3,
    nilaiHuruf: 'A',
    bobot: 4.0,
    semester: 3,
    dosenPengampu: 'Dr. Maria Goretti, M.Sc.',
    tahunAjaran: '2025/2026 Gasal',
  },
  {
    id: 'nl-5',
    mataKuliah: 'Pemrograman Perangkat Bergerak',
    sks: 3,
    nilaiHuruf: 'A',
    bobot: 4.0,
    semester: 3,
    dosenPengampu: 'Drs. Y.G. Hartono, M.T.',
    tahunAjaran: '2025/2026 Gasal',
  },
  {
    id: 'nl-6',
    mataKuliah: 'Basis Data Terdistribusi',
    sks: 3,
    nilaiHuruf: 'A',
    bobot: 4.0,
    semester: 2,
    dosenPengampu: 'Bonaventura Satya, M.Cs.',
    tahunAjaran: '2024/2025 Genap',
  },
  {
    id: 'nl-7',
    mataKuliah: 'Struktur Data & Algoritma',
    sks: 4,
    nilaiHuruf: 'A',
    bobot: 4.0,
    semester: 2,
    dosenPengampu: 'Ir. Iwan S.T., M.Kom',
    tahunAjaran: '2024/2025 Genap',
  },
];

const DEFAULT_TAGIHAN: TagihanKeuangan[] = [
  {
    id: 'tag-1',
    bank: 'BRI',
    nomorVA: '131425 53646 76869',
    deskripsi: 'Biaya Kuliah Tetap & Variabel (Semester 4)',
    nominal: 4600000,
    nominalFormatted: '200.000/Mk',
    perSksText: '200.000/Mk',
    status: 'Belum Bayar',
    jatuhTempo: '28 Februari 2026',
  },
  {
    id: 'tag-2',
    bank: 'BCA',
    nomorVA: '131425 53646 76869',
    deskripsi: 'Biaya Kuliah (Cicilan Tahap II)',
    nominal: 4600000,
    nominalFormatted: '200.000/Mk',
    perSksText: '200.000/Mk',
    status: 'Belum Bayar',
    jatuhTempo: '28 Februari 2026',
  },
  {
    id: 'tag-3',
    bank: 'BSI',
    nomorVA: '131425 53646 76869',
    deskripsi: 'Biaya Praktikum Laboratorium Komputer',
    nominal: 600000,
    nominalFormatted: '200.000/Mk',
    perSksText: '200.000/Mk',
    status: 'Lunas',
    jatuhTempo: '10 Januari 2026',
    tanggalBayar: '08 Januari 2026',
  },
  {
    id: 'tag-4',
    bank: 'BRI',
    nomorVA: '131425 53646 76869',
    deskripsi: 'Dana Kemahasiswaan & Asuransi Mahasiswa',
    nominal: 350000,
    nominalFormatted: '200.000/Mk',
    perSksText: '200.000/Mk',
    status: 'Lunas',
    jatuhTempo: '15 Januari 2026',
    tanggalBayar: '12 Januari 2026',
  },
  {
    id: 'tag-5',
    bank: 'BCA',
    nomorVA: '131425 53646 76869',
    deskripsi: 'Biaya Registrasi Semester Gasal',
    nominal: 1200000,
    nominalFormatted: '200.000/Mk',
    perSksText: '200.000/Mk',
    status: 'Lunas',
    jatuhTempo: '20 Agustus 2025',
    tanggalBayar: '18 Agustus 2025',
  },
];

const DEFAULT_POIN: PoinKegiatan[] = [
  {
    id: 'poin-1',
    namaKegiatan: 'Juara 2 Hackathon Nasional Gemastik 2025',
    tanggal: '12 Oktober 2025',
    poin: 45,
    kategori: 'Penalaran & Prestasi',
    status: 'Disetujui',
    keterangan: 'Tingkat Nasional Kementerian Riset dan Teknologi',
  },
  {
    id: 'poin-2',
    namaKegiatan: 'Ketua Panitia Workshop UI/UX & Mobile Dev USD',
    tanggal: '18 September 2025',
    poin: 35,
    kategori: 'Organisasi & Kepemimpinan',
    status: 'Disetujui',
    keterangan: 'HMJ Teknik Informatika Universitas Sanata Dharma',
  },
  {
    id: 'poin-3',
    namaKegiatan: 'Pengabdian Masyarakat: Literasi Digital SD Kanisius',
    tanggal: '05 Juli 2025',
    poin: 30,
    kategori: 'Pengabdian Masyarakat',
    status: 'Disetujui',
    keterangan: 'Pelatihan Scratch & Komputer Dasar bagi Siswa',
  },
  {
    id: 'poin-4',
    namaKegiatan: 'Peserta Seminar Internasional AI & Cybersecurity IEEE',
    tanggal: '24 Mei 2025',
    poin: 20,
    kategori: 'Ilmiah & Keilmuan',
    status: 'Disetujui',
    keterangan: 'Sertifikat Internasional Terakreditasi',
  },
  {
    id: 'poin-5',
    namaKegiatan: 'Anggota Aktif Paduan Suara Mahasiswa Cantus Firmus',
    tanggal: '15 April 2025',
    poin: 20,
    kategori: 'Minat & Bakat',
    status: 'Disetujui',
    keterangan: 'Konser Tahunan Driyarkara Auditorium',
  },
];

const DEFAULT_BEASISWA: InfoBeasiswa[] = [
  {
    id: 'bs-1',
    judul: 'KIP KULIAH MERDEKA',
    penyelenggara: 'Puslapdik Kemdikbudristek',
    deskripsi: 'Bantuan biaya pendidikan penuh dan tunjangan biaya hidup bulanan untuk mahasiswa berprestasi dari seluruh Indonesia.',
    deadline: '31 Maret 2026',
    kuota: '150 Mahasiswa USD',
    cakupan: '100% Bebas UKT + Uang Saku Rp 1.100.000/bulan',
    syarat: [
      'Mahasiswa aktif semester 1-4',
      'IPK minimal 3.00',
      'Memiliki KIP / Terdaftar di DTKS',
      'Surat Keterangan Penghasilan Orang Tua',
    ],
    statusPendaftaran: 'Buka',
    sudahDaftar: true,
  },
  {
    id: 'bs-2',
    judul: 'BEASISWA PRESTASI SANATA DHARMA',
    penyelenggara: 'Universitas Sanata Dharma Yogyakarta',
    deskripsi: 'Penghargaan beasiswa akademik bagi mahasiswa dengan pencapaian IPK tertinggi di program studi masing-masing.',
    deadline: '15 April 2026',
    kuota: '50 Mahasiswa',
    cakupan: 'Pemotongan 50% Biaya SKS selama 2 semester',
    syarat: [
      'Mahasiswa aktif Informatika semester 2-6',
      'IPK minimal 3.75',
      'Tidak sedang menerima beasiswa lain',
      'Melampirkan KHS dan Sertifikat Prestasi',
    ],
    statusPendaftaran: 'Buka',
    sudahDaftar: false,
  },
  {
    id: 'bs-3',
    judul: 'BEASISWA YAYASAN SANJAYA / VAN LITH',
    penyelenggara: 'Yayasan Sanjaya Driyarkara',
    deskripsi: 'Program bantuan pendidikan bagi mahasiswa berkarakter unggul dan memiliki komitmen pengabdian sosial kemasyarakatan.',
    deadline: '30 April 2026',
    kuota: '25 Mahasiswa',
    cakupan: 'Biaya Pendidikan & Pelatihan Kepemimpinan Ignasian',
    syarat: [
      'Surat rekomendasi dosen wali',
      'Essay komitmen kepemimpinan humanis',
      'Surat keterangan tidak mampu atau rekomendasi paroki',
    ],
    statusPendaftaran: 'Segera Ditutup',
    sudahDaftar: false,
  },
  {
    id: 'bs-4',
    judul: 'BEASISWA DJARUM BEASISWA PLUS',
    penyelenggara: 'Djarum Foundation',
    deskripsi: 'Program beasiswa plus pelatihan soft skills: Character Building, Leadership Development, Nation Building.',
    deadline: '20 Mei 2026',
    kuota: 'Terbuka Nasional',
    cakupan: 'Dana Beasiswa Rp 1.000.000/bulan selama 1 tahun + Pelatihan Karakter',
    syarat: [
      'Sedang menempuh semester 4',
      'IPK minimal 3.20 pada semester 3',
      'Aktif berorganisasi',
      'Lolos tes psikotes dan wawancara',
    ],
    statusPendaftaran: 'Buka',
    sudahDaftar: false,
  },
];

const DEFAULT_DOSEN: JadwalDosen[] = [
  {
    id: 'ds-1',
    namaDosen: 'Ir. Iwan S.T., M.Kom',
    gelar: 'Dosen Informatika & Kaprodi',
    hari: 'Senin',
    jamMulai: '07:00',
    jamSelesai: '10:30',
    ruangan: 'K307 / Ruang Dosen Lt. 3',
    mataKuliah: 'Algoritma Optimisasi & UI/UX',
    status: 'Ada di Ruangan',
    email: 'iwan@usd.ac.id',
    kontak: '+62 812-3456-7890',
  },
  {
    id: 'ds-2',
    namaDosen: 'Ir. Iwan S.T., M.Kom',
    gelar: 'Bimbingan Skripsi & Konsultasi',
    hari: 'Senin',
    jamMulai: '11:00',
    jamSelesai: '14:30',
    ruangan: 'K307 / R. Dosen',
    mataKuliah: 'Konsultasi Tugas Akhir & Magang',
    status: 'Ada di Ruangan',
    email: 'iwan@usd.ac.id',
    kontak: '+62 812-3456-7890',
  },
  {
    id: 'ds-3',
    namaDosen: 'Ir. Iwan S.T., M.Kom',
    gelar: 'Dosen Informatika',
    hari: 'Selasa',
    jamMulai: '07:00',
    jamSelesai: '10:30',
    ruangan: 'K307',
    mataKuliah: 'Desain UI UX',
    status: 'Mengajar',
    email: 'iwan@usd.ac.id',
    kontak: '+62 812-3456-7890',
  },
  {
    id: 'ds-4',
    namaDosen: 'Drs. Y.G. Hartono, M.T.',
    gelar: 'Dosen Pemrograman Mobile',
    hari: 'Senin',
    jamMulai: '11:00',
    jamSelesai: '13:30',
    ruangan: 'LBD.B / Ruang Lab',
    mataKuliah: 'Pemrograman Perangkat Bergerak',
    status: 'Ada di Ruangan',
    email: 'hartono@usd.ac.id',
    kontak: '+62 813-9876-5432',
  },
  {
    id: 'ds-5',
    namaDosen: 'Dr. Maria Goretti, M.Sc.',
    gelar: 'Dosen Keamanan Siber',
    hari: 'Rabu',
    jamMulai: '09:00',
    jamSelesai: '12:00',
    ruangan: 'K.207',
    mataKuliah: 'Kriptografi & Teori Informasi',
    status: 'Ada di Ruangan',
    email: 'mgoretti@usd.ac.id',
    kontak: '+62 811-2233-4455',
  },
];

const DEFAULT_NOTIFIKASI: NotificationItem[] = [
  {
    id: 'notif-1',
    judul: 'Kartu Rencana Studi (KRS) Telah Disetujui',
    pesan: 'Dosen Pembimbing Akademik telah menyetujui KRS Semester 4 Anda dengan total 21 SKS.',
    waktu: '10 menit yang lalu',
    sudahDibaca: false,
    tipe: 'akademik',
  },
  {
    id: 'notif-2',
    judul: 'Pengumuman Beasiswa KIP Kuliah',
    pesan: 'Pemberkasan beasiswa KIP Kuliah tahap verifikasi rekening sedang berlangsung.',
    waktu: '2 jam yang lalu',
    sudahDibaca: false,
    tipe: 'beasiswa',
  },
  {
    id: 'notif-3',
    judul: 'Tagihan Biaya Kuliah Semester 4',
    pesan: 'Batas akhir pembayaran biaya kuliah tahap I melalui VA BRI/BCA/BSI adalah 28 Februari 2026.',
    waktu: '1 hari yang lalu',
    sudahDibaca: true,
    tipe: 'keuangan',
  },
];

// Helper to broadcast changes to any listening components
type DBListener = (db: DatabaseSchema) => void;
const listeners = new Set<DBListener>();

export class AcademicDatabaseManager {
  private static instance: AcademicDatabaseManager;

  private constructor() {
    this.initDatabase();
  }

  public static getInstance(): AcademicDatabaseManager {
    if (!AcademicDatabaseManager.instance) {
      AcademicDatabaseManager.instance = new AcademicDatabaseManager();
    }
    return AcademicDatabaseManager.instance;
  }

  private initDatabase(): void {
    try {
      const existing = localStorage.getItem(DB_STORAGE_KEY);
      if (!existing) {
        this.saveState({
          users: [DEFAULT_USER],
          jadwalKuliah: DEFAULT_JADWAL,
          nilaiSemester: DEFAULT_NILAI,
          tagihanKeuangan: DEFAULT_TAGIHAN,
          poinKegiatan: DEFAULT_POIN,
          infoBeasiswa: DEFAULT_BEASISWA,
          jadwalDosen: DEFAULT_DOSEN,
          notifikasi: DEFAULT_NOTIFIKASI,
          lastUpdated: new Date().toISOString(),
        });
      }
    } catch (e) {
      console.warn('LocalStorage error, using in-memory state', e);
    }
  }

  public getRawData(): DatabaseSchema {
    try {
      const data = localStorage.getItem(DB_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to read database', e);
    }
    return {
      users: [DEFAULT_USER],
      jadwalKuliah: DEFAULT_JADWAL,
      nilaiSemester: DEFAULT_NILAI,
      tagihanKeuangan: DEFAULT_TAGIHAN,
      poinKegiatan: DEFAULT_POIN,
      infoBeasiswa: DEFAULT_BEASISWA,
      jadwalDosen: DEFAULT_DOSEN,
      notifikasi: DEFAULT_NOTIFIKASI,
      lastUpdated: new Date().toISOString(),
    };
  }

  private saveState(data: DatabaseSchema): void {
    data.lastUpdated = new Date().toISOString();
    try {
      localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(data));
      this.notifyListeners(data);
    } catch (e) {
      console.error('Failed to write database', e);
    }
  }

  public subscribe(listener: DBListener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  private notifyListeners(data: DatabaseSchema): void {
    listeners.forEach((listener) => {
      try {
        listener(data);
      } catch (err) {
        console.error('Listener notification error', err);
      }
    });
  }

  // --- AUTHENTICATION & USERS ---
  public authenticateUser(nimOrEmail: string, passwordAttempt: string): User | null {
    const db = this.getRawData();
    const query = nimOrEmail.trim().toLowerCase();
    const foundUser = db.users.find(
      (u) =>
        (u.nim.toLowerCase() === query ||
          u.emailStudent.toLowerCase() === query ||
          u.emailLain.toLowerCase() === query) &&
        u.password === passwordAttempt
    );

    if (foundUser) {
      this.setSession(foundUser);
      return foundUser;
    }
    return null;
  }

  public registerUser(newUserData: Partial<User> & { nim: string; password: string; nama: string }): User {
    const db = this.getRawData();
    const existing = db.users.find((u) => u.nim === newUserData.nim);
    if (existing) {
      throw new Error(`Mahasiswa dengan NIM ${newUserData.nim} sudah terdaftar.`);
    }

    const newUser: User = {
      id: `user-${newUserData.nim}`,
      nim: newUserData.nim,
      password: newUserData.password,
      nama: newUserData.nama,
      jenisKelamin: newUserData.jenisKelamin || 'Laki-laki',
      tempatTanggalLahir: newUserData.tempatTanggalLahir || 'Yogyakarta, 1 Januari 2005',
      agama: newUserData.agama || 'Katolik',
      prodi: newUserData.prodi || 'S1 Informatika',
      fakultas: newUserData.fakultas || 'Sains dan Teknologi',
      emailStudent: newUserData.emailStudent || `${newUserData.nim}@student.usd.ac.id`,
      emailLain: newUserData.emailLain || `${newUserData.nim}@gmail.com`,
      emailOrtu: newUserData.emailOrtu || 'wali.mahasiswa@gmail.com',
      ipk: newUserData.ipk ?? 3.85,
      poinKeaktifan: newUserData.poinKeaktifan ?? 120,
      photoUrl:
        newUserData.photoUrl ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      statusMahasiswa: 'Aktif',
      semester: newUserData.semester ?? 4,
      tahunMasuk: newUserData.tahunMasuk ?? 2024,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.users.push(newUser);
    this.saveState(db);
    this.setSession(newUser);
    return newUser;
  }

  public getSession(): User | null {
    try {
      const sessionStr = localStorage.getItem(AUTH_SESSION_KEY);
      if (sessionStr) {
        const sessionObj = JSON.parse(sessionStr);
        const db = this.getRawData();
        const user = db.users.find((u) => u.id === sessionObj.id);
        return user || null;
      }
    } catch (e) {
      console.warn('Session parse error', e);
    }
    return null;
  }

  public setSession(user: User): void {
    try {
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({ id: user.id, nim: user.nim }));
    } catch (e) {
      console.warn('Session write error', e);
    }
  }

  public clearSession(): void {
    try {
      localStorage.removeItem(AUTH_SESSION_KEY);
    } catch (e) {
      console.warn('Session remove error', e);
    }
  }

  public updatePassword(userId: string, oldPass: string, newPass: string): boolean {
    const db = this.getRawData();
    const user = db.users.find((u) => u.id === userId);
    if (!user) {
      throw new Error('User tidak ditemukan.');
    }
    if (user.password !== oldPass) {
      throw new Error('Password lama tidak sesuai!');
    }
    if (newPass.length < 4) {
      throw new Error('Password baru minimal 4 karakter.');
    }

    user.password = newPass;
    user.updatedAt = new Date().toISOString();
    this.saveState(db);
    return true;
  }

  public updateBiodata(userId: string, updates: Partial<User>): User {
    const db = this.getRawData();
    const index = db.users.findIndex((u) => u.id === userId);
    if (index === -1) {
      throw new Error('User tidak ditemukan.');
    }

    db.users[index] = {
      ...db.users[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.saveState(db);
    return db.users[index];
  }

  // --- JADWAL KULIAH ---
  public getJadwal(): JadwalKuliah[] {
    return this.getRawData().jadwalKuliah;
  }

  public addJadwal(item: Omit<JadwalKuliah, 'id'>): JadwalKuliah {
    const db = this.getRawData();
    const newItem: JadwalKuliah = {
      ...item,
      id: `jk-${Date.now()}`,
    };
    db.jadwalKuliah.push(newItem);
    this.saveState(db);
    return newItem;
  }

  // --- NILAI SEMESTER ---
  public getNilai(): NilaiMataKuliah[] {
    return this.getRawData().nilaiSemester;
  }

  public calculateIPK(): { ipk: number; totalSks: number; predikat: string } {
    const nilai = this.getNilai();
    if (nilai.length === 0) return { ipk: 0, totalSks: 0, predikat: '-' };

    let totalBobotXsks = 0;
    let totalSks = 0;

    for (const item of nilai) {
      totalBobotXsks += item.bobot * item.sks;
      totalSks += item.sks;
    }

    const ipk = totalSks > 0 ? Number((totalBobotXsks / totalSks).toFixed(2)) : 0;
    let predikat = 'Sangat Memuaskan';
    if (ipk >= 3.75) predikat = 'Dengan Pujian (Cum Laude)';
    else if (ipk >= 3.0) predikat = 'Sangat Memuaskan';
    else if (ipk >= 2.5) predikat = 'Memuaskan';

    return { ipk, totalSks, predikat };
  }

  public addNilai(item: Omit<NilaiMataKuliah, 'id'>): NilaiMataKuliah {
    const db = this.getRawData();
    const newItem: NilaiMataKuliah = {
      ...item,
      id: `nl-${Date.now()}`,
    };
    db.nilaiSemester.push(newItem);

    // Recalculate and update current user IPK
    const { ipk } = this.calculateIPK();
    const currentUser = this.getSession();
    if (currentUser) {
      const u = db.users.find((x) => x.id === currentUser.id);
      if (u) {
        u.ipk = ipk;
      }
    }

    this.saveState(db);
    return newItem;
  }

  // --- KARTU KEUANGAN ---
  public getTagihan(bank?: 'BRI' | 'BCA' | 'BSI'): TagihanKeuangan[] {
    const all = this.getRawData().tagihanKeuangan;
    if (bank) {
      return all.filter((t) => t.bank === bank);
    }
    return all;
  }

  public bayarTagihan(tagihanId: string): boolean {
    const db = this.getRawData();
    const bill = db.tagihanKeuangan.find((t) => t.id === tagihanId);
    if (!bill) return false;

    bill.status = 'Lunas';
    bill.tanggalBayar = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    // Add a receipt notification
    db.notifikasi.unshift({
      id: `notif-${Date.now()}`,
      judul: 'Pembayaran Berhasil Diverifikasi',
      pesan: `Pembayaran ${bill.deskripsi} melalui VA ${bill.bank} (${bill.nomorVA}) telah dikonfirmasi LUNAS.`,
      waktu: 'Baru saja',
      sudahDibaca: false,
      tipe: 'keuangan',
    });

    this.saveState(db);
    return true;
  }

  public addTagihan(item: Omit<TagihanKeuangan, 'id'>): TagihanKeuangan {
    const db = this.getRawData();
    const newItem: TagihanKeuangan = {
      ...item,
      id: `tag-${Date.now()}`,
    };
    db.tagihanKeuangan.push(newItem);
    this.saveState(db);
    return newItem;
  }

  // --- POIN KEAKTIFAN ---
  public getPoin(): PoinKegiatan[] {
    return this.getRawData().poinKegiatan;
  }

  public addPoin(item: Omit<PoinKegiatan, 'id' | 'status'>): PoinKegiatan {
    const db = this.getRawData();
    const newItem: PoinKegiatan = {
      ...item,
      id: `poin-${Date.now()}`,
      status: 'Disetujui', // Auto-approved in this student portal demo
    };
    db.poinKegiatan.unshift(newItem);

    // Sum total points
    const totalPoints = db.poinKegiatan
      .filter((p) => p.status === 'Disetujui')
      .reduce((sum, p) => sum + p.poin, 0);

    const currentUser = this.getSession();
    if (currentUser) {
      const u = db.users.find((x) => x.id === currentUser.id);
      if (u) {
        u.poinKeaktifan = totalPoints;
      }
    }

    db.notifikasi.unshift({
      id: `notif-${Date.now()}`,
      judul: 'Poin Keaktifan Mahasiswa Ditambahkan',
      pesan: `Kegiatan "${item.namaKegiatan}" telah disetujui. Anda memperoleh +${item.poin} poin.`,
      waktu: 'Baru saja',
      sudahDibaca: false,
      tipe: 'akademik',
    });

    this.saveState(db);
    return newItem;
  }

  // --- BEASISWA ---
  public getBeasiswa(): InfoBeasiswa[] {
    return this.getRawData().infoBeasiswa;
  }

  public daftarBeasiswa(beasiswaId: string): boolean {
    const db = this.getRawData();
    const item = db.infoBeasiswa.find((b) => b.id === beasiswaId);
    if (!item) return false;

    item.sudahDaftar = true;

    db.notifikasi.unshift({
      id: `notif-${Date.now()}`,
      judul: 'Pendaftaran Beasiswa Berhasil Disimpan',
      pesan: `Berkas pengajuan "${item.judul}" telah diterima sistem dan menunggu seleksi administrasi.`,
      waktu: 'Baru saja',
      sudahDibaca: false,
      tipe: 'beasiswa',
    });

    this.saveState(db);
    return true;
  }

  // --- JADWAL DOSEN ---
  public getJadwalDosen(): JadwalDosen[] {
    return this.getRawData().jadwalDosen;
  }

  // --- NOTIFIKASI ---
  public getNotifikasi(): NotificationItem[] {
    return this.getRawData().notifikasi;
  }

  public markNotifikasiRead(id?: string): void {
    const db = this.getRawData();
    if (id) {
      const item = db.notifikasi.find((n) => n.id === id);
      if (item) item.sudahDibaca = true;
    } else {
      db.notifikasi.forEach((n) => (n.sudahDibaca = true));
    }
    this.saveState(db);
  }

  // --- DATABASE TOOLS (RESET, EXPORT, IMPORT) ---
  public resetToFactory(): void {
    const defaultData: DatabaseSchema = {
      users: [DEFAULT_USER],
      jadwalKuliah: DEFAULT_JADWAL,
      nilaiSemester: DEFAULT_NILAI,
      tagihanKeuangan: DEFAULT_TAGIHAN,
      poinKegiatan: DEFAULT_POIN,
      infoBeasiswa: DEFAULT_BEASISWA,
      jadwalDosen: DEFAULT_DOSEN,
      notifikasi: DEFAULT_NOTIFIKASI,
      lastUpdated: new Date().toISOString(),
    };
    this.saveState(defaultData);
    this.setSession(DEFAULT_USER);
  }

  public exportDatabaseJson(): string {
    return JSON.stringify(this.getRawData(), null, 2);
  }

  public importDatabaseJson(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.users || !parsed.jadwalKuliah) {
        throw new Error('Format JSON database tidak valid');
      }
      this.saveState(parsed);
      return true;
    } catch (e) {
      console.error('Import error', e);
      return false;
    }
  }
}

export const dbManager = AcademicDatabaseManager.getInstance();
