import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Bug,
  CheckCircle2,
  Circle,
  HelpCircle,
  PackagePlus,
  ScrollText,
  Timer,
  XCircle,
} from 'lucide-react';

export const status_options = [
  {
    value: 'รอคัดกรอง',
    label: 'รอคัดกรอง',
    icon: HelpCircle,
  },
  {
    value: 'รอจับคู่ตะกร้า',
    label: 'รอจับคู่ตะกร้า',
    icon: HelpCircle,
  },
  {
    value: 'กำลังจัดยา',
    label: 'กำลังจัดยา',
    icon: Circle,
  },
  {
    value: 'กำลังตรวจสอบ',
    label: 'กำลังตรวจสอบ',
    icon: Timer,
  },
  {
    value: 'รอเรียกคิว',
    label: 'รอเรียกคิว',
    icon: Timer,
  },
  {
    value: 'พักตะกร้า',
    label: 'พักตะกร้า',
    icon: XCircle,
  },
  {
    value: 'กำลังจ่ายยา',
    label: 'กำลังจ่ายยา',
    icon: XCircle,
  },
  {
    value: 'จ่ายยาสำเร็จ',
    label: 'จ่ายยาสำเร็จ',
    icon: CheckCircle2,
  },
];

export const type_options = [
  {
    value: 'A',
    label: 'A',
    icon: Bug,
  },
  {
    value: 'B',
    label: 'B',
    icon: PackagePlus,
  },
  {
    value: 'C',
    label: 'C',
    icon: ScrollText,
  },
  {
    value: 'D',
    label: 'D',
    icon: ScrollText,
  },
];

export const delivery_options = [
  {
    value: 'โรงพยาบาล',
    label: 'โรงพยาบาล',
    icon: ArrowDown,
  },
  {
    value: 'เซ็ลทัลพาซ่าอุดรธานี',
    label: 'เซ็ลทัลพาซ่าอุดรธานี',
    icon: ArrowRight,
  },
  {
    value: 'Telemed',
    label: 'Telemed',
    icon: ArrowUp,
  },
  {
    value: 'ร้านขายยา',
    label: 'ร้านขายยา',
    icon: ArrowUp,
  },
];
