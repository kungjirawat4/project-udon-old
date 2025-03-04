// import 'dayjs/locale/th';

// import dayjs from 'dayjs';
// import buddhistEra from 'dayjs/plugin/buddhistEra'; // ใช้งาน buddhistEra plugin เพื่อแปลงเป็น พ.ศ.

// dayjs.extend(buddhistEra);

// /* 07 กุมภาพันธ์ 2566 */
// export const DateLongTH = (date: Date) => {
//   dayjs.locale('th');
//   return dayjs(date).format('DD MMMM BBBB');
// };

// /* 07 ก.พ. 2566 */
// export const DateTimeLongTH = (date: Date) => {
//   dayjs.locale('th');
//   return dayjs(date).format('DD MMMM BBBB hh:mm');
// };

// /* 07 ก.พ. 2566 */
// export const DateShortTH = (date: Date) => {
//   dayjs.locale('th');
//   return dayjs(date).format('DD MMM BB');
// };

// /* 07 ก.พ. 2566 */
// export const DateTimeShortTH = (date: Date) => {
//   dayjs.locale('th');
//   return dayjs(date).format('DD MMM BB hh:mm');
// };

// /* 07 February 2023 */
// export const DateLongEN = (date: Date) => {
//   dayjs.locale('en');
//   return dayjs(date).format('DD MMMM YYYY');
// };

// /* 07 February 2023 */
// export const DateTimeLongEN = (date: Date) => {
//   dayjs.locale('en');
//   return dayjs(date).format('DD MMMM YYYY hh:mm');
// };

// /* 07 Feb 23 */
// export const DateShortEN = (date: Date) => {
//   dayjs.locale('en');
//   return dayjs(date).format('DD MMM YY');
// };

// /* 07 ก.พ. 2566 */
// export const TimeShortTH = (date: Date) => {
//   dayjs.locale('th');
//   return dayjs(date).format('YYYY-MM-DDTHH:mm:ss');
// };

// /* 07 ก.พ. 2566 */
// export const TimeShortEN = (date: Date) => {
//   dayjs.locale('en');
//   return dayjs(date).format('hh:mm');
// };

// export const DateTime = dayjs;

// export const THB = (amount: number | any) => {
//   new Intl.NumberFormat('th-TH', {
//     style: 'currency',
//     currency: 'THB',
//   }).format(amount);
// };

// export const isDateBeforeToday = (date: Date) => {
//   return new Date(date.toDateString()) < new Date(new Date().toDateString());
// };

// // isDateBeforeToday(new Date(2016, 11, 16));

import 'dayjs/locale/th';

import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra'; // ใช้งาน buddhistEra plugin เพื่อแปลงเป็น พ.ศ.

dayjs.extend(buddhistEra);

/* 07 กุมภาพันธ์ 2566 */
export const DateMateTH = (date: Date) => {
  dayjs.locale('th');
  return dayjs(date).format('BBBBMMDD');
};

/* 07 กุมภาพันธ์ 2566 */
export const DateLongTH = (date: Date) => {
  dayjs.locale('th');
  return dayjs(date).format('DD MMMM BBBB');
};

/* 07 ก.พ. 2566 */
export const DateTimeLongTH = (date: Date) => {
  dayjs.locale('th');
  return dayjs(date).format('DD MMMM BBBB HH:mm');
};

export const DateTimeLongTH7 = (date: Date) => {
  dayjs.locale('th');
  return dayjs(date).add(-7, 'hour').format('DD MMMM BBBB HH:mm');
};
export const TimeOnlyTH = (date: Date) => {
  dayjs.locale('th');
  return dayjs(date).format('HH:mm');
};
export const TimeOnlyTH1 = (date: Date) => {
  dayjs.locale('th');
  return dayjs(date).format('HH:mm:ss');
};
export const TimeOnlyTH7 = (date: Date) => {
  dayjs.locale('th');
  return dayjs(date).add(-7, 'hour').format('HH:mm');
};

// export const DateTimeLongTH77 = (date: Date) => {
//   dayjs.locale('th');
//   return dayjs(date).add(-2, 'hour').format('DD MMMM BBBB HH:mm');
// };

/* 07 ก.พ. 2566 */
export const DateShortTH = (date: Date) => {
  dayjs.locale('th');
  return dayjs(date).format('DD MMM BB');
};

/* 07 ก.พ. 2566 */
export const DateTimeShortTH = (date: Date) => {
  dayjs.locale('th');
  return dayjs(date).format('DD MMM BB hh:mm');
};

/* 07 February 2023 */
export const DateLongEN = (date: Date) => {
  dayjs.locale('en');
  return dayjs(date).format('DD MMMM YYYY');
};

/* 07 February 2023 */
export const DateTimeLongEN = (date: Date) => {
  dayjs.locale('en');
  return dayjs(date).format('DD MMMM YYYY hh:mm');
};

/* 07 Feb 23 */
export const DateShortEN = (date: Date) => {
  dayjs.locale('en');
  return dayjs(date).format('DD MMM YY');
};

/* 07 ก.พ. 2566 */
export const TimeShortTH = (date: Date) => {
  dayjs.locale('th');
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ss');
};

/* 07 ก.พ. 2566 */
export const TimeShortEN = (date: Date) => {
  dayjs.locale('en');
  return dayjs(date).format('hh:mm');
};

export const DateTime = dayjs;

export const THB = (amount: number | any) => {
  new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(amount);
};

export const isDateBeforeToday = (date: Date) => {
  return new Date(date.toDateString()) < new Date(new Date().toDateString());
};

const today = new Date();
const dd = today.getDate();
const mm = today.getMonth() + 1;
const yyyy = today.getFullYear();
export const fullDate = `${yyyy}-${mm}-${dd}`;
export const utcDate = new Date(fullDate);

export const startOfDay = new Date(utcDate.setHours(0, 0, 0, 0)); // เริ่มต้นวันเวลา 00:00:00
export const endOfDay = new Date(utcDate.setHours(23, 59, 59, 999)); // สิ้นสุดวันเวลา 23:59:59

export const dayjsNow = dayjs();
export const dayjsStartDate = dayjsNow.startOf('day');
export const dayjsEndDate = dayjsNow.endOf('day');
