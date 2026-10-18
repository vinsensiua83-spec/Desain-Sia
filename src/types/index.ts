export interface User {
  id: string;
  nim: string;
  password: string; // Stored securely in database
  nama: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  tempatTanggalLahir: string;
  agama: string;
  prodi: string;
  fakultas: string;
  emailStudent: string;
  emailLain: string;
  emailOrtu: string;
  ipk: number;
  poinKeaktifan: number;
  photoUrl: string;
  statusMahasiswa: 'Aktif' | 'Cuti' | 'Lulus';
  semester: number;
  tahunMasuk: number;
  createdAt: string;
  updatedAt: string;
}

export type DayOfWeek = 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu';

export interface JadwalKuliah {
  id: string;
  hari: DayOfWeek;
  mataKuliah: string;
  dosen: string;
  jamMulai: string;
  jamSelesai: string;
  ruangan: string;
  sks: number;
  bgImage?: string;
  catatan?: string;
}

export interface NilaiMataKuliah {
  id: string;
  mataKuliah: string;
  sks: number;
  nilaiHuruf: 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'E';
  bobot: number;
  semester: number;
  dosenPengampu: string;
  tahunAjaran: string;
}

export interface TagihanKeuangan {
  id: string;
  bank: 'BRI' | 'BCA' | 'BSI';
  nomorVA: string;
  deskripsi: string;
  nominal: number;
  nominalFormatted: string;
  perSksText?: string;
  status: 'Lunas' | 'Belum Bayar';
  jatuhTempo: string;
  tanggalBayar?: string;
}

export interface PoinKegiatan {
  id: string;
  namaKegiatan: string;
  tanggal: string;
  poin: number;
  kategori: string;
  status: 'Disetujui' | 'Menunggu' | 'Ditolak';
  keterangan?: string;
}

export interface InfoBeasiswa {
  id: string;
  judul: string;
  penyelenggara: string;
  deskripsi: string;
  deadline: string;
  kuota: string;
  cakupan: string;
  syarat: string[];
  bgImage?: string;
  statusPendaftaran: 'Buka' | 'Segera Ditutup' | 'Tutup';
  sudahDaftar?: boolean;
}

export interface JadwalDosen {
  id: string;
  namaDosen: string;
  gelar: string;
  hari: DayOfWeek;
  jamMulai: string;
  jamSelesai: string;
  ruangan: string;
  mataKuliah: string;
  status: 'Ada di Ruangan' | 'Mengajar' | 'Tidak Ada';
  email: string;
  kontak: string;
  bgImage?: string;
}

export interface NotificationItem {
  id: string;
  judul: string;
  pesan: string;
  waktu: string;
  sudahDibaca: boolean;
  tipe: 'akademik' | 'keuangan' | 'pengumuman' | 'beasiswa';
}

export type ActiveScreen =
  | 'home'
  | 'jadwal-kuliah'
  | 'nilai-semester'
  | 'kartu-keuangan'
  | 'poin-mahasiswa'
  | 'ktm'
  | 'info-beasiswa'
  | 'biodata'
  | 'jadwal-dosen';
