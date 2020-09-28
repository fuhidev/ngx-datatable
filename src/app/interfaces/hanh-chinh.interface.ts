export interface TinhTPEntity {
  maTinhTP: string;
  tenTinhTP: string;
  quanHuyens: QuanHuyenEntity[];
  stt: number;
}

export interface QuanHuyenEntity {
  maQuanHuyen: string;
  tenQuanHuyen: string;
  maTinhTP: string;
  phuongXas: PhuongXaEntity[];
  stt: number;
}

export interface PhuongXaEntity {
  maPhuongXa: string;
  tenPhuongXa: string;
  maQuanHuyen: string;
  stt: number;
}
