import React, { useState, useEffect} from 'react';
import {
  Calendar,
  BookOpen,
  Bell,
  MapPin,
  MessageSquare,
  ClipboardList,
  Menu,
  X,
  Clock,
  Users,
  Star,
  ChevronRight,
  GraduationCap,
 
  Download,
} from 'lucide-react';

// --- INTERFACES (No changes here) ---
interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}
interface TimeSlot {
  subject: string;
  time: string;
  room: string;
  type: string;
  assignedTo: string;
}
interface SemesterSchedule {
  [key: string]: TimeSlot[];


}
interface Notice {
  id: number;
  title: string;
  date: string;
  description: string;
  isNew: boolean;
  file_url?: string | null;
}
interface Event {
  id: string;
  name: string;
  date: string;
  image: string;
  registered: number;
}
interface Test {
  id: string;
  subject: string;
  date: string;
  time: string;
  //assignedTo: string;
  semester: string;
}
interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  content?: string;
  file_url?: string;
}


// --- CONSTANT DATA (No changes here) ---
const navItems: NavItem[] = [
  { id: 'timetable', label: 'Timetable', icon: Calendar },
  { id: 'notices', label: 'Academic Notices', icon: Bell },
  { id: 'ebooks', label: 'E-Books', icon: BookOpen },
  { id: 'events', label: 'Event Notices', icon: Users },
  { id: 'feedback', label: 'User Feedback', icon: MessageSquare },
  { id: 'tests', label: 'Test Schedules', icon: ClipboardList },
  { id: 'map', label: 'Campus Map', icon: MapPin },
];
const semesterSchedules: { [semester: string]: { [section: string]: { [day: string]: TimeSlot[] } } } = {
  '3rd': {
    'sec A': {
      'Monday': [
        { subject: 'Discrete Mathematics', time: '09:00 - 10:00', room: 'E-307', type: 'Lecture', assignedTo: 'MRS.CHANDRIMA RAYCHAUDHURI' },
        { subject: 'Data Structures', time: '10:00 - 11:00', room: 'E-307', type: 'Lecture', assignedTo: 'MRS, BIJOYETA ROY ' },
        { subject: 'Object Oriented Programming Using C++', time: '11:00 - 12:00', room: 'E-307', type: 'Lecture', assignedTo: 'MR. TAWAL K. KOIRALA ' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Program Elective I', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Tuesday': [
        { subject: 'Data Structures Lab', time: '09:00 - 11:00', room: 'DS Lab', type: 'Practical', assignedTo: 'MRS. BIJOYETA ROY/ MRS. SONAM LHAMU BHUTIA' },
        { subject: 'Program Elective I', time: '11:00 - 12:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '14:00 - 15:00', room: '', type: '', assignedTo: '' },
        { subject: 'Data Structures', time: '15:00 - 16:00', room: 'E-307', type: 'Lecture', assignedTo: 'MRS, BIJOYETA ROY ' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Wednesday': [
        { subject: 'Digital Design and Computer Organization', time: '09:00 - 10:00', room: 'E-307', type: 'Lecture', assignedTo: 'MR. SANJOY GHATAK' },
        { subject: 'Data Structures', time: '10:00 - 11:00', room: 'E-307', type: 'Lecture', assignedTo: 'MRS, BIJOYETA ROY ' },
        { subject: 'Discrete Mathematics', time: '11:00 - 12:00', room: 'E-307', type: 'Lecture', assignedTo: 'MRS.CHANDRIMA RAYCHAUDHURI' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective I', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Thursday': [
        { subject: 'Object Oriented Programming Using C++ Lab', time: '09:00 - 11:00', room: 'C++ Lab', type: 'Practical', assignedTo: 'MR. TAWAL K. KOIRALA/ DR. BARNALI DEY' },
        { subject: 'Discrete Mathematics', time: '11:00 - 12:00', room: 'E-307', type: 'Lecture', assignedTo: 'MRS.CHANDRIMA RAYCHAUDHURI' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '14:00 - 15:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective I', time: '15:00 - 16:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Friday': [
        { subject: 'Object Oriented Programming Using C++', time: '09:00 - 10:00', room: 'E-307', type: 'Lecture', assignedTo: 'MR. TAWAL K. KOIRALA ' },
        { subject: 'Digital Design and Computer Organization', time: '10:00 - 11:00', room: 'E-307', type: 'Lecture', assignedTo: 'MR. SANJOY GHATAK' },
        { subject: 'Data Structures', time: '11:00 - 12:00', room: 'E-307', type: 'Lecture', assignedTo: 'MRS, BIJOYETA ROY ' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '14:00 - 15:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Saturday': [
        { subject: 'Open Elective I', time: '09:00 - 10:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Digital Design and Computer Organization', time: '10:00 - 11:00', room: 'E-307', type: 'Lecture', assignedTo: 'MR. SANJOY GHATAK' },
        { subject: 'Discrete Mathematics', time: '11:00 - 12:00', room: 'E-307', type: 'Lecture', assignedTo: 'MRS.CHANDRIMA RAYCHAUDHURI' },
        { subject: 'Free', time: '12:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
    },
    'sec B': {
      'Monday': [
        { subject: 'Object Oriented Programming Using C++ Lab', time: '09:00 - 11:00', room: 'C++ Lab', type: 'Practical', assignedTo: 'MR. ISH NATH JHA/DR. BARNALI DEY' },
        { subject: 'Digital Design and Computer Organization', time: '11:00 - 12:00', room: 'E-307', type: 'Lecture', assignedTo: 'MS. SAYANTANI ROY ' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Discrete Mathematics', time: '14:00 - 15:00', room: 'E-307', type: 'Lecture', assignedTo: 'MR.SATYAJIT SARKAR' },
        { subject: 'Data Structures', time: '15:00 - 16:00', room: 'E-307', type: 'Lecture', assignedTo: 'MRS, BIJOYETA ROY' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Tuesday': [
        { subject: 'Discrete Mathematics', time: '09:00 - 10:00', room: 'E-307', type: 'Lecture', assignedTo: 'MR.SATYAJIT SARKAR' },
        { subject: 'Digital Design and Computer Organization', time: '10:00 - 11:00', room: 'E-307', type: 'Lecture', assignedTo: 'MS. SAYANTANI ROY ' },
        { subject: 'Program Elective I', time: '11:00 - 12:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective I', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Program Elective I', time: '16:00 - 17:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
      ],
      'Wednesday': [
        { subject: 'Data Structures', time: '09:00 - 10:00', room: 'E-307', type: 'Lecture', assignedTo: 'MRS, BIJOYETA ROY' },
        { subject: 'Discrete Mathematics', time: '10:00 - 11:00', room: 'E-307', type: 'Lecture', assignedTo: 'MR.SATYAJIT SARKAR' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '14:00 - 15:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Thursday': [
        { subject: 'Object Oriented Programming Using C++', time: '09:00 - 10:00', room: 'E-307', type: 'Lecture', assignedTo: 'MR. ISH NATH JHA ' },
        { subject: 'Data Structures', time: '10:00 - 11:00', room: 'E-307', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Discrete Mathematics', time: '11:00 - 12:00', room: 'E-307', type: 'Lecture', assignedTo: 'MR.SATYAJIT SARKAR' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective I', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Digital Design and Computer Organization', time: '16:00 - 17:00', room: 'E-307', type: 'Lecture', assignedTo: 'MS. SAYANTANI ROY ' },
      ],
      'Friday': [
        { subject: 'Object Oriented Programming Using C++', time: '09:00 - 10:00', room: 'E-307', type: 'Lecture', assignedTo: 'MR. ISH NATH JHA' },
        { subject: 'Data Structures Lab', time: '10:00 - 12:00', room: 'DS Lab', type: 'Practical', assignedTo: 'MRS. BIJOYETA ROY/ MRS. SONAM LHAMU BHUTIA' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Digital Design and Computer Organization', time: '14:00 - 15:00', room: 'E-307', type: 'Lecture', assignedTo: 'MS. SAYANTANI ROY ' },
        { subject: 'Program Elective I', time: '15:00 - 16:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Saturday': [
        { subject: 'Digital Design and Computer Organization', time: '09:00 - 10:00', room: 'E-307', type: 'Lecture', assignedTo: 'MS. SAYANTANI ROY ' },
        { subject: 'Data Structures', time: '10:00 - 11:00', room: 'E-307', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Object Oriented Programming Using C++', time: '11:00 - 12:00', room: 'E-307', type: 'Lecture', assignedTo: 'MR. ISH NATH JHA ' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective I', time: '14:00 - 13:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' }, // Assumed 2hr
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
    },
    'sec C': {
      'Monday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '10:00 - 11:00', room: '', type: '', assignedTo: '' },
        { subject: 'Digital Design and Computer Organization', time: '11:00 - 12:00', room: 'E-301', type: 'Lecture', assignedTo: 'DR. BARNALI DEY' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective I', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Digital Design and Computer Organization', time: '16:00 - 17:00', room: 'E-301', type: 'Lecture', assignedTo: 'sourav paul' },
      ],
      'Tuesday': [
        { subject: 'Discrete Mathematics', time: '09:00 - 10:00', room: 'E-301', type: 'Lecture', assignedTo: 'DR. RUSTAM ALI ' },
        { subject: 'Digital Design and Computer Organization', time: '10:00 - 11:00', room: 'E-301', type: 'Lecture', assignedTo: 'DR. BARNALI DEY' },
        { subject: 'Program Elective I', time: '11:00 - 12:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective I', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Wednesday': [
        { subject: 'Data Structures', time: '09:00 - 10:00', room: 'E-301', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Object Oriented Programming Using C++', time: '10:00 - 11:00', room: 'E-301', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Program Elective I', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Object Oriented Programming Using C++ Lab', time: '15:00 - 17:00', room: 'C++ Lab', type: 'Practical', assignedTo: 'sourav paul' },
      ],
      'Thursday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Digital Design and Computer Organization', time: '10:00 - 11:00', room: 'E-301', type: 'Lecture', assignedTo: 'DR. BARNALI DEY' },
        { subject: 'Discrete Mathematics', time: '11:00 - 12:00', room: 'E-301', type: 'Lecture', assignedTo: 'DR. RUSTAM ALI ' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective I', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Friday': [
        { subject: 'Data Structures Lab', time: '09:00 - 11:00', room: 'DS Lab', type: 'Practical', assignedTo: 'sourav paul' },
        { subject: 'Digital Design and Computer Organization', time: '11:00 - 12:00', room: 'E-301', type: 'Lecture', assignedTo: 'DR. BARNALI DEY' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Data Structures', time: '14:00 - 15:00', room: 'E-301', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Program Elective I', time: '15:00 - 16:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Saturday': [
        { subject: 'Object Oriented Programming Using C++', time: '09:00 - 10:00', room: 'E-301', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Discrete Mathematics', time: '10:00 - 11:00', room: 'E-301', type: 'Lecture', assignedTo: 'DR. RUSTAM ALI ' },
        { subject: 'Data Structures', time: '11:00 - 12:00', room: 'E-301', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective I', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Program Elective I', time: '15:00 - 16:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
    },
    'AIML': {
      'Monday': [
        { subject: 'Discrete Mathematics', time: '09:00 - 10:00', room: 'E-301', type: 'Lecture', assignedTo: 'DR. RUSTAM ALI ' },
        { subject: 'Machine Learning', time: '10:00 - 12:00', room: 'E-301', type: 'Lecture', assignedTo: 'MS. SAYANTANI ROY ' }, // Double slot
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Program Elective I', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Tuesday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '10:00 - 11:00', room: '', type: '', assignedTo: '' },
        { subject: 'Program Elective I', time: '11:00 - 12:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: 'sourav paul' },
        { subject: 'Open Elective I', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Machine Learning', time: '16:00 - 17:00', room: 'E-301', type: 'Lecture', assignedTo: 'MS. SAYANTANI ROY ' },
      ],
      'Wednesday': [
        { subject: 'Machine Learning', time: '09:00 - 11:00', room: 'E-301', type: 'Lecture', assignedTo: 'MS. SAYANTANI ROY ' }, // Double slot
        { subject: 'Discrete Mathematics', time: '11:00 - 12:00', room: 'E-301', type: 'Lecture', assignedTo: 'DR. RUSTAM ALI ' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Data Structures Lab', time: '14:00 - 16:00', room: 'DS Lab', type: 'Practical', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Thursday': [
        { subject: 'Object Oriented Programming Using C++ Lab', time: '09:00 - 11:00', room: 'C++ Lab', type: 'Practical', assignedTo: 'sourav paul' },
        { subject: 'Discrete Mathematics', time: '11:00 - 12:00', room: 'E-301', type: 'Lecture', assignedTo: 'DR. RUSTAM ALI ' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Data Structures', time: '14:00 - 15:00', room: 'E-301', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Open Elective I', time: '15:00 - 16:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Friday': [
        { subject: 'Machine Learning', time: '09:00 - 10:00', room: 'E-301', type: 'Lecture', assignedTo: 'MS. SAYANTANI ROY ' },
        { subject: 'Object Oriented Programming Using C++', time: '10:00 - 11:00', room: 'E-301', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Data Structures', time: '11:00 - 12:00', room: 'E-301', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Discrete Mathematics', time: '14:00 - 15:00', room: 'E-301', type: 'Lecture', assignedTo: 'DR. RUSTAM ALI ' },
        { subject: 'Program Elective I', time: '15:00 - 16:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Saturday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Object Oriented Programming Using C++', time: '10:00 - 11:00', room: 'E-301', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Data Structures', time: '11:00 - 12:00', room: 'E-301', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective I', time: '14:00 - 16:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' }, // Assumed 2hr
        { subject: 'Program Elective I', time: '16:00 - 17:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
      ],
    },
    'DS': {
      'Monday': [{ subject: 'Intro to Data Science', time: '09:00 - 10:00', room: 'DS Lab 1', type: 'Lecture', assignedTo: 'sourav paul' }, { subject: 'Database Management', time: '11:30 - 12:30', room: 'Room 402', type: 'Lecture', assignedTo: 'sourav paul' }],
      'Tuesday': [{ subject: 'Statistics for DS', time: '10:15 - 11:15', room: 'DS Lab 2', type: 'Practical', assignedTo: 'DR. AVIJIT PANJA' }],
      'Wednesday': [{ subject: 'Intro to Data Science', time: '09:00 - 10:00', room: 'DS Lab 1', type: 'Lecture', assignedTo: 'sourav paul' }, { subject: 'Database Management', time: '11:30 - 12:30', room: 'Room 402', type: 'Lecture', assignedTo: 'sourav paul' }],
      'Thursday': [{ subject: 'Statistics for DS Lab', time: '14:00 - 16:00', room: 'DS Lab 2', type: 'Practical', assignedTo: 'sourav paul' }],
      'Friday': [{ subject: 'Database Management', time: '10:15 - 11:15', room: 'Room 402', type: 'Lecture', assignedTo: 'sourav paul' }],
      'Saturday': [{ subject: 'Data Visualization', time: '10:00 - 12:00', room: 'DS Lab 1', type: 'Practical', assignedTo: 'sourav paul' }],
    },
  },
  '5th': {
    'sec A': {
      'Monday': [
        { subject: 'Computer Network Lab', time: '09:00 - 11:00', room: 'CN Lab', type: 'Practical', assignedTo: 'MR.KIRAN GAUTAM/DR. YOGESH SINGH' },
        { subject: 'Operating System', time: '11:00 - 12:00', room: 'A308', type: 'Lecture', assignedTo: 'MR. ASHIS PRADHAN' },
        { subject: 'Open Elective III', time: '12:00 - 13:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Quantitative Apptitude and Logical Reasoning-I', time: '14:00 - 15:00', room: 'A308', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Computer Networks', time: '15:00 - 16:00', room: 'A308', type: 'Lecture', assignedTo: 'MR. KIRAN GAUTAM ' },
        { subject: 'Formal Languages and Automata Theory', time: '16:00 - 17:00', room: 'A308', type: 'Lecture', assignedTo: 'DR. VIKASH KUMAR SINGH' },
      ],
      'Tuesday': [
        { subject: 'Programme Elective III', time: '09:00 - 10:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Computer Networks', time: '10:00 - 11:00', room: 'A308', type: 'Lecture', assignedTo: 'MR. KIRAN GAUTAM ' },
        { subject: 'Artificial Intelligence', time: '11:00 - 12:00', room: 'A308', type: 'Lecture', assignedTo: 'MR. SANJOY GHATAK ' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '14:00 - 15:00', room: '', type: '', assignedTo: '' },
        { subject: 'Formal Languages and Automata Theory', time: '15:00 - 16:00', room: 'A308', type: 'Lecture', assignedTo: 'DR. VIKASH KUMAR SINGH' },
        { subject: 'Open Elective III', time: '16:00 - 17:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
      ],
      'Wednesday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Programme Elective III', time: '10:00 - 11:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective III', time: '12:00 - 13:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: 'sourav paul' },
        { subject: 'Computer Networks', time: '14:00 - 15:00', room: 'A308', type: 'Lecture', assignedTo: 'MR. KIRAN GAUTAM ' },
        { subject: 'Artificial Intelligence', time: '15:00 - 16:00', room: 'A308', type: 'Lecture', assignedTo: 'MR. SANJOY GHATAK ' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Thursday': [
        { subject: 'Operating System', time: '09:00 - 10:00', room: 'A308', type: 'Lecture', assignedTo: 'MR. ASHIS PRADHAN' },
        { subject: 'Formal Languages and Automata Theory', time: '10:00 - 11:00', room: 'A308', type: 'Lecture', assignedTo: 'DR. VIKASH KUMAR SINGH' },
        { subject: 'Computer Networks', time: '11:00 - 12:00', room: 'A308', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Quantitative Apptitude and Logical Reasoning-I', time: '12:00 - 13:00', room: 'A308', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '14:00 - 15:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Programme Elective III', time: '16:00 - 17:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
      ],
      'Friday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '10:00 - 11:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective III', time: '12:00 - 13:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '14:00 - 15:00', room: '', type: '', assignedTo: '' },
        { subject: 'Formal Languages and Automata Theory', time: '15:00 - 16:00', room: 'A308', type: 'Lecture', assignedTo: 'DR. VIKASH KUMAR SINGH' },
        { subject: 'Computer Networks', time: '16:00 - 17:00', room: 'A308', type: 'Lecture', assignedTo: 'MR. KIRAN GAUTAM ' },
      ],
      'Saturday': [
        { subject: 'Artificial Intelligence', time: '09:00 - 10:00', room: 'A308', type: 'Lecture', assignedTo: 'MR. SANJOY GHATAK ' },
        { subject: 'Operating System', time: '10:00 - 11:00', room: 'A308', type: 'Lecture', assignedTo: 'MR. ASHIS PRADHAN' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: 'sourav paul' },
        { subject: 'Operating System Lab', time: '14:00 - 16:00', room: 'OS Lab', type: 'Practical', assignedTo: 'MR. ASHIS PRADHAN/MR. SANJOY GHATAK' },
        { subject: 'Computer Networks', time: '16:00 - 17:00', room: 'A308', type: 'Lecture', assignedTo: 'MR. KIRAN GAUTAM ' },
      ],
    },
    'sec B': {
      'Monday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Artificial Intelligence', time: '10:00 - 11:00', room: 'E-301', type: 'Lecture', assignedTo: 'MS. SAYANTANI ROY' },
        { subject: 'Formal Languages and Automata Theory', time: '11:00 - 12:00', room: 'E-301', type: 'Lecture', assignedTo: 'DR. VIKASH KUMAR SINGH' },
        { subject: 'Open Elective III', time: '12:00 - 13:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '14:00 - 15:00', room: '', type: '', assignedTo: '' },
        { subject: 'Quantitative Apptitude and Logical Reasoning-I', time: '15:00 - 16:00', room: 'E-301', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Computer Networks', time: '16:00 - 17:00', room: 'E-301', type: 'Lecture', assignedTo: 'MS. TANUJA SUBBA ' },
      ],
      'Tuesday': [
        { subject: 'Programme Elective III', time: '09:00 - 10:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Formal Languages and Automata Theory', time: '10:00 - 11:00', room: 'E-301', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '14:00 - 15:00', room: '', type: '', assignedTo: '' },
        { subject: 'Artificial Intelligence', time: '15:00 - 16:00', room: 'E-301', type: 'Lecture', assignedTo: 'MS. SAYANTANI ROY' },
        { subject: 'Operating System', time: '16:00 - 17:00', room: 'E-301', type: 'Lecture', assignedTo: 'MR. SOURAV PAUL ' },
      ],
      'Wednesday': [
        { subject: 'Computer Networks', time: '09:00 - 10:00', room: 'E-301', type: 'Lecture', assignedTo: 'MS. TANUJA SUBBA ' },
        { subject: 'Programme Elective III', time: '10:00 - 11:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Operating System', time: '11:00 - 12:00', room: 'E-301', type: 'Lecture', assignedTo: 'MR. SOURAV PAUL ' },
        { subject: 'Open Elective III', time: '12:00 - 13:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Artificial Intelligence', time: '14:00 - 15:00', room: 'E-301', type: 'Lecture', assignedTo: 'MS. SAYANTANI ROY' },
        { subject: 'Quantitative Apptitude and Logical Reasoning-I', time: '15:00 - 16:00', room: 'E-301', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Thursday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '10:00 - 11:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Operating System Lab', time: '12:00 - 14:00', room: 'OS Lab', type: 'Practical', assignedTo: 'MR. SOURAV PAUL / MR. SANJOY GHATAK' }, // 12-1 Lunch, 1-2 Lab? Assuming 2 hr block
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' }, // Included standard lunch break
        { subject: 'Formal Languages and Automata Theory', time: '14:00 - 15:00', room: 'E-301', type: 'Lecture', assignedTo: 'DR. VIKASH KUMAR SINGH' },
        { subject: 'Operating System', time: '15:00 - 16:00', room: 'E-301', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Programme Elective III', time: '16:00 - 17:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
      ],
      'Friday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Formal Languages and Automata Theory', time: '10:00 - 11:00', room: 'E-301', type: 'Lecture', assignedTo: 'DR. VIKASH KUMAR SINGH' },
        { subject: 'Computer Networks', time: '11:00 - 12:00', room: 'E-301', type: 'Lecture', assignedTo: 'MS. TANUJA SUBBA ' },
        { subject: 'Open Elective III', time: '12:00 - 13:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Computer Network Lab', time: '14:00 - 16:00', room: 'CN Lab', type: 'Practical', assignedTo: 'MS. TANUJA SUBBA/ MS. SAYANTANI ROY ' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Saturday': [
        { subject: 'Artificial Intelligence', time: '09:00 - 10:00', room: 'E-301', type: 'Lecture', assignedTo: 'MS. SAYANTANI ROY' },
        { subject: 'Operating System', time: '10:00 - 11:00', room: 'E-301', type: 'Lecture', assignedTo: 'MR. SOURAV PAUL ' },
        { subject: 'Computer Networks', time: '11:00 - 12:00', room: 'E-301', type: 'Lecture', assignedTo: 'MS. TANUJA SUBBA ' },
        { subject: 'Free', time: '12:00 - 17:00', room: '', type: '', assignedTo: '' }, // Assume free afternoon
      ],
    },
    'sec C': {
      'Monday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Computer Networks', time: '10:00 - 11:00', room: 'E-305', type: 'Lecture', assignedTo: 'MS. NITISHA PRADHAN' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective III', time: '12:00 - 13:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Formal Languages and Automata Theory', time: '14:00 - 15:00', room: 'E-305', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Operating System', time: '15:00 - 16:00', room: 'E-305', type: 'Lecture', assignedTo: 'MR. BIRAJ UPADHAYA' },
        { subject: 'Artificial Intelligence', time: '16:00 - 17:00', room: 'E-305', type: 'Lecture', assignedTo: 'DR. MOHANA S D' },
      ],
      'Tuesday': [
        { subject: 'Programme Elective III', time: '09:00 - 10:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Operating System', time: '10:00 - 11:00', room: 'E-305', type: 'Lecture', assignedTo: 'MR. BIRAJ UPADHAYA' },
        { subject: 'Quantitative Apptitude and Logical Reasoning-I', time: '11:00 - 12:00', room: 'E-305', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Computer Networks', time: '12:00 - 13:00', room: 'E-305', type: 'Lecture', assignedTo: 'MS. NITISHA PRADHAN' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '14:00 - 15:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective III', time: '16:00 - 17:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
      ],
      'Wednesday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Programme Elective III', time: '10:00 - 11:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Artificial Intelligence', time: '11:00 - 12:00', room: 'E-305', type: 'Lecture', assignedTo: 'DR. MOHANA S D' },
        { subject: 'Open Elective III', time: '12:00 - 13:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Operating System', time: '14:00 - 15:00', room: 'E-305', type: 'Lecture', assignedTo: 'MR. BIRAJ UPADHAYA' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Formal Languages and Automata Theory', time: '16:00 - 17:00', room: 'E-305', type: 'Lecture', assignedTo: 'sourav paul' },
      ],
      'Thursday': [
        { subject: 'Computer Networks', time: '09:00 - 10:00', room: 'E-305', type: 'Lecture', assignedTo: 'MS. NITISHA PRADHAN' },
        { subject: 'Formal Languages and Automata Theory', time: '10:00 - 11:00', room: 'E-305', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Operating System', time: '11:00 - 12:00', room: 'E-305', type: 'Lecture', assignedTo: 'MR. BIRAJ UPADHAYA' },
        { subject: 'Quantitative Apptitude and Logical Reasoning-I', time: '12:00 - 13:00', room: 'E-305', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Artificial Intelligence', time: '14:00 - 15:00', room: 'E-305', type: 'Lecture', assignedTo: 'DR. MOHANA S D' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Programme Elective III', time: '16:00 - 17:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
      ],
      'Friday': [
        { subject: 'Operating System Lab', time: '09:00 - 11:00', room: 'OS Lab', type: 'Practical', assignedTo: 'sourav paul' },
        { subject: 'Formal Languages and Automata Theory', time: '11:00 - 12:00', room: 'E-305', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Open Elective III', time: '12:00 - 13:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Computer Networks', time: '14:00 - 15:00', room: 'E-305', type: 'Lecture', assignedTo: 'MS. NITISHA PRADHAN' },
        { subject: 'Artificial Intelligence', time: '15:00 - 16:00', room: 'E-305', type: 'Lecture', assignedTo: 'DR. MOHANA S D' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Saturday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '10:00 - 11:00', room: '', type: '', assignedTo: '' },
        { subject: 'Computer Network Lab', time: '11:00 - 13:00', room: 'CN Lab', type: 'Practical', assignedTo: 'sourav paul' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '14:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
    },
    'AIML': {
      'Monday': [
        { subject: 'Formal Languages and Automata Theory', time: '09:00 - 10:00', room: 'E-214', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Operating System', time: '10:00 - 11:00', room: 'E-214', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Computer Networks', time: '11:00 - 12:00', room: 'E-214', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Open Elective III', time: '12:00 - 13:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Artificial Intelligence', time: '14:00 - 15:00', room: 'E-214', type: 'Lecture', assignedTo: 'MR. SHUBHOJIT PANDA' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Tuesday': [
        { subject: 'Programme Elective III', time: '09:00 - 10:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Formal Languages and Automata Theory', time: '10:00 - 11:00', room: 'E-214', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Computer Networks', time: '11:00 - 12:00', room: 'E-214', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Quantitative Apptitude and Logical Reasoning-I', time: '12:00 - 13:00', room: 'E-214', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Artificial Intelligence', time: '14:00 - 15:00', room: 'E-214', type: 'Lecture', assignedTo: 'MR. SHUBHOJIT PANDA' },
        { subject: 'Operating System', time: '15:00 - 16:00', room: 'E-214', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Open Elective III', time: '16:00 - 17:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
      ],
      'Wednesday': [
        { subject: 'Artificial Intelligence', time: '09:00 - 10:00', room: 'E-214', type: 'Lecture', assignedTo: 'MR. SHUBHOJIT PANDA' },
        { subject: 'Programme Elective III', time: '10:00 - 11:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Operating System', time: '11:00 - 12:00', room: 'E-214', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Open Elective III', time: '12:00 - 13:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '14:00 - 15:00', room: '', type: '', assignedTo: '' },
        { subject: 'Computer Networks', time: '15:00 - 16:00', room: 'E-214', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Formal Languages and Automata Theory', time: '16:00 - 17:00', room: 'E-214', type: 'Lecture', assignedTo: 'sourav paul' },
      ],
      'Thursday': [
        { subject: 'Computer Network Lab', time: '09:00 - 11:00', room: 'CN Lab', type: 'Practical', assignedTo: 'sourav paul' },
        { subject: 'Operating System', time: '11:00 - 12:00', room: 'E-214', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Quantitative Apptitude and Logical Reasoning-I', time: '12:00 - 13:00', room: 'E-214', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Artificial Intelligence', time: '14:00 - 15:00', room: 'E-214', type: 'Lecture', assignedTo: 'MR. SHUBHOJIT PANDA' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Programme Elective III', time: '16:00 - 17:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
      ],
      'Friday': [
        { subject: 'Computer Networks', time: '09:00 - 10:00', room: 'E-214', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Machine Learning Lab', time: '10:00 - 12:00', room: 'ML Lab', type: 'Practical', assignedTo: 'sourav paul' }, // Assuming ML lab
        { subject: 'Open Elective III', time: '12:00 - 13:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Formal Languages and Automata Theory', time: '14:00 - 15:00', room: 'E-214', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Saturday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '10:00 - 11:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '12:00 - 17:00', room: '', type: '', assignedTo: '' }, // Assume free afternoon
      ],
    },
    'DS': {
      'Monday': [{ subject: 'Advanced Databases', time: '10:15 - 11:15', room: 'DS Lab 5', type: 'Lecture', assignedTo: 'sourav paul' }],
      'Tuesday': [{ subject: 'Data Warehousing', time: '09:00 - 10:00', room: 'DS Lab 6', type: 'Lecture', assignedTo: 'sourav paul' }],
      'Wednesday': [{ subject: 'Project Work (DS)', time: '14:00 - 16:00', room: 'Project Lab', type: 'Project', assignedTo: 'sourav paul' }],
      'Thursday': [{ subject: 'Data Mining Lab', time: '14:00 - 16:00', room: 'DS Lab 6', type: 'Practical', assignedTo: 'sourav paul' }],
      'Friday': [{ subject: 'Project Work (DS)', time: '14:00 - 16:00', room: 'Project Lab', type: 'Project', assignedTo: 'sourav paul' }],
      'Saturday': [{ subject: 'Industry Connect Session', time: '11:00 - 13:00', room: 'Seminar Hall', type: 'Lecture', assignedTo: 'sourav paul' }],
    },
  },
  '7th': {
    'sec A': {
       'Monday': [
        { subject: 'Program Elective VIII', time: '09:00 - 10:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Program Elective VII', time: '10:00 - 11:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective IV / Minor(DS)', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Minor (Soft Computing)', time: '15:00 - 16:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Compiler Design', time: '16:00 - 17:00', room: 'E-305', type: 'Lecture', assignedTo: 'sourav paul' },
      ],
       'Tuesday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '10:00 - 11:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: 'sourav paul' },
        { subject: 'Minor (Information Retrieval)', time: '14:00 - 15:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' }, // Assuming IR Minor
        { subject: 'Compiler Design Lab', time: '15:00 - 18:00', room: 'CD Lab', type: 'Practical', assignedTo: 'sourav paul' }, // 3hr lab
      ],
       'Wednesday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Intelligent Systems Lab', time: '10:00 - 13:00', room: 'IS Lab', type: 'Practical', assignedTo: 'sourav paul' }, // 3hr lab
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective IV / Minor(DS)', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Compiler Design', time: '15:00 - 16:00', room: 'E-305', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Industrial Engineering Management', time: '16:00 - 17:00', room: 'E-305', type: 'Lecture', assignedTo: 'sourav paul' },
      ],
       'Thursday': [
        { subject: 'Program Elective VII', time: '09:00 - 10:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Compiler Design', time: '10:00 - 11:00', room: 'E-305', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Minor (Soft Computing)', time: '11:00 - 12:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Program Elective VIII', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Industrial Engineering Management', time: '16:00 - 17:00', room: 'E-305', type: 'Lecture', assignedTo: 'sourav paul' },
      ],
       'Friday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '10:00 - 11:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective IV / Minor(DS)', time: '12:00 - 13:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '14:00 - 15:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
       'Saturday': [
        { subject: 'Industrial Engineering Management', time: '09:00 - 10:00', room: 'E-305', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Minor (Soft Computing)', time: '10:00 - 11:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Compiler Design', time: '11:00 - 12:00', room: 'E-305', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Program Elective VIII', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Program Elective VII', time: '16:00 - 17:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
      ],
    },
    'sec B': {
       'Monday': [
        { subject: 'Program Elective VIII', time: '09:00 - 10:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Program Elective VII', time: '10:00 - 11:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Compiler Design', time: '11:00 - 12:00', room: 'E-315', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective IV / Minor(DS)', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Minor (Soft Computing)', time: '15:00 - 16:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Tuesday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Compiler Design Lab', time: '10:00 - 13:00', room: 'CD Lab', type: 'Practical', assignedTo: 'sourav paul' }, // 3hr lab
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: 'sourav paul' },
        { subject: 'Minor (Soft Computing/AI/DS)', time: '14:00 - 15:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' }, // Assuming SC
        { subject: 'Compiler Design', time: '15:00 - 16:00', room: 'E-315', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Industrial Engineering Management', time: '16:00 - 17:00', room: 'E-315', type: 'Lecture', assignedTo: 'sourav paul' },
      ],
      'Wednesday': [
        { subject: 'Industrial Engineering Management', time: '09:00 - 10:00', room: 'E-315', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Compiler Design', time: '10:00 - 11:00', room: 'E-315', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: 'sourav paul' },
        { subject: 'Open Elective IV / Minor(DS)', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Minor (Information Retrieval)', time: '15:00 - 16:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' }, // Assuming IR
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Thursday': [
        { subject: 'Program Elective VII', time: '09:00 - 10:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '10:00 - 11:00', room: '', type: '', assignedTo: '' },
        { subject: 'Minor (Soft Computing)', time: '11:00 - 12:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Program Elective VIII', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Intelligent Systems Lab', time: '15:00 - 18:00', room: 'IS Lab', type: 'Practical', assignedTo: 'sourav paul' }, // 3hr lab
      ],
      'Friday': [
        { subject: 'Open Elective IV / Minor(DS)', time: '09:00 - 10:00', room: 'Elective Room', type: 'Lecture', assignedTo: '' },
        { subject: 'Free', time: '10:00 - 11:00', room: '', type: '', assignedTo: '' },
        { subject: 'Industrial Engineering Management', time: '11:00 - 12:00', room: 'E-315', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '14:00 - 15:00', room: '', type: '', assignedTo: '' },
        { subject: 'Minor (Information Retrieval)', time: '15:00 - 16:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' }, // Assuming IR
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
      'Saturday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Minor (Soft Computing)', time: '10:00 - 11:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Program Elective VIII', time: '11:00 - 12:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Compiler Design', time: '14:00 - 15:00', room: 'E-315', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Program Elective VII', time: '15:00 - 16:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
    },
    'sec C': {
       'Monday': [
        { subject: 'Program Elective VIII', time: '09:00 - 10:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Program Elective VII', time: '10:00 - 11:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective IV', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Minor (Soft Computing)', time: '15:00 - 16:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
       'Tuesday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '10:00 - 11:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Minor (Information Retrieval/AI & DS)', time: '14:00 - 15:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' }, // Assuming IR/AD
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
       ],
       'Wednesday': [
        { subject: 'Compiler Design', time: '09:00 - 10:00', room: 'E-308', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Intelligent Systems Lab', time: '10:00 - 13:00', room: 'IS Lab', type: 'Practical', assignedTo: 'sourav paul' }, // 3hr lab
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective IV', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Minor (Information Retrieval)', time: '15:00 - 16:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' }, // Assuming IR
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
       ],
       'Thursday': [
        { subject: 'Program Elective VII', time: '09:00 - 10:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Compiler Design', time: '10:00 - 11:00', room: 'E-308', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Minor (Soft Computing)', time: '11:00 - 12:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Program Elective VIII', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Industrial Engineering Management', time: '16:00 - 17:00', room: 'E-308', type: 'Lecture', assignedTo: 'sourav paul' },
       ],
       'Friday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Industrial Engineering Management', time: '10:00 - 11:00', room: 'E-308', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective IV', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Compiler Design Lab', time: '15:00 - 18:00', room: 'CD Lab', type: 'Practical', assignedTo: 'sourav paul' }, // 3hr lab
       ],
       'Saturday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Minor (Soft Computing)', time: '10:00 - 11:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Program Elective VIII', time: '11:00 - 12:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Industrial Engineering Management', time: '14:00 - 15:00', room: 'E-308', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Program Elective VII', time: '15:00 - 16:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
       ],
    },
    'AIML': {
       'Monday': [
        { subject: 'Program Elective VIII', time: '09:00 - 10:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Program Elective VII', time: '10:00 - 11:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective IV / Minor(DS)', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Minor (Soft Computing)', time: '15:00 - 16:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' }, // Compiler Design for Core only?
      ],
       'Tuesday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '10:00 - 11:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: 'sourav paul' },
        { subject: 'Minor (AI)', time: '14:00 - 15:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' }, // Assuming AI Minor
        { subject: 'Compiler Design Lab', time: '15:00 - 18:00', room: 'CD Lab', type: 'Practical', assignedTo: 'sourav paul' }, // 3hr lab
      ],
       'Wednesday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Intelligent Systems Lab', time: '10:00 - 13:00', room: 'IS Lab', type: 'Practical', assignedTo: 'sourav paul' }, // 3hr lab
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective IV / Minor(DS)', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' }, // Compiler Design for Core only?
        { subject: 'Industrial Engineering Management', time: '16:00 - 17:00', room: 'E-315', type: 'Lecture', assignedTo: 'sourav paul' },
      ],
       'Thursday': [
        { subject: 'Program Elective VII', time: '09:00 - 10:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '10:00 - 11:00', room: '', type: '', assignedTo: '' }, // Compiler Design for Core only?
        { subject: 'Minor (Soft Computing)', time: '11:00 - 12:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Program Elective VIII', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Industrial Engineering Management', time: '16:00 - 17:00', room: 'E-315', type: 'Lecture', assignedTo: 'sourav paul' },
      ],
       'Friday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '10:00 - 11:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective IV / Minor(DS)', time: '12:00 - 13:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '14:00 - 15:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
       'Saturday': [
        { subject: 'Industrial Engineering Management', time: '09:00 - 10:00', room: 'E-315', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Minor (Soft Computing)', time: '10:00 - 11:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' }, // Compiler Design for Core only?
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Program Elective VIII', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Program Elective VII', time: '16:00 - 17:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
      ],
    },
    'DS': { // Using 7th Sem secA as placeholder for DS
       'Monday': [
        { subject: 'Program Elective VIII', time: '09:00 - 10:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Program Elective VII', time: '10:00 - 11:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective IV / Minor(DS)', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Minor (Soft Computing)', time: '15:00 - 16:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Compiler Design', time: '16:00 - 17:00', room: 'E-305', type: 'Lecture', assignedTo: 'sourav paul' },
      ],
       'Tuesday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '10:00 - 11:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Minor (DS)', time: '14:00 - 15:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' }, // Assuming DS Minor
        { subject: 'Compiler Design Lab', time: '15:00 - 18:00', room: 'CD Lab', type: 'Practical', assignedTo: 'sourav paul' }, // 3hr lab
      ],
       'Wednesday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: 'sourav paul' },
        { subject: 'Intelligent Systems Lab', time: '10:00 - 13:00', room: 'IS Lab', type: 'Practical', assignedTo: 'sourav paul' }, // 3hr lab
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective IV / Minor(DS)', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Compiler Design', time: '15:00 - 16:00', room: 'E-305', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Industrial Engineering Management', time: '16:00 - 17:00', room: 'E-305', type: 'Lecture', assignedTo: 'sourav paul' },
      ],
       'Thursday': [
        { subject: 'Program Elective VII', time: '09:00 - 10:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Compiler Design', time: '10:00 - 11:00', room: 'E-305', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Minor (Soft Computing)', time: '11:00 - 12:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Program Elective VIII', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Industrial Engineering Management', time: '16:00 - 17:00', room: 'E-305', type: 'Lecture', assignedTo: 'sourav paul' },
      ],
       'Friday': [
        { subject: 'Free', time: '09:00 - 10:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '10:00 - 11:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '11:00 - 12:00', room: '', type: '', assignedTo: '' },
        { subject: 'Open Elective IV / Minor(DS)', time: '12:00 - 13:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '14:00 - 15:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Free', time: '16:00 - 17:00', room: '', type: '', assignedTo: '' },
      ],
       'Saturday': [
        { subject: 'Industrial Engineering Management', time: '09:00 - 10:00', room: 'E-305', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Minor (Soft Computing)', time: '10:00 - 11:00', room: 'Minor Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Compiler Design', time: '11:00 - 12:00', room: 'E-305', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '12:00 - 13:00', room: '', type: '', assignedTo: '' },
        { subject: 'Lunch Break', time: '13:00 - 14:00', room: '', type: '', assignedTo: '' },
        { subject: 'Program Elective VIII', time: '14:00 - 15:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
        { subject: 'Free', time: '15:00 - 16:00', room: '', type: '', assignedTo: '' },
        { subject: 'Program Elective VII', time: '16:00 - 17:00', room: 'Elective Room', type: 'Lecture', assignedTo: 'sourav paul' },
      ],
    },
  },
};
  

const events: Event[] = [
  { id: '1', name: 'Tech Adrista 2025', date: 'Sept 15-17, 2024', image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300', registered: 234 },
  { id: '2', name: 'Athlima', date: 'Nov 25, 2024', image: 'https://images.pexels.com/photos/209948/pexels-photo-209948.jpeg?auto=compress&cs=tinysrgb&w=300', registered: 189 },
  { id: '3', name: 'Kaalrav', date: 'Mar 2, 2025', image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300', registered: 156 },
  { id: '4', name: 'Smit Mun',  date: 'Apr 10, 2025', image: 'https://ik.imagekit.io/prpmdncoe/smitmun9/smitmun_logo_black.png?updatedAt=1754418631009', registered: 66 },

];
const upcomingTests: Test[] = [
  { id: '1', subject: 'Discrete Mathematics', date: 'Oct 27, 2025', time: '1:30 PM - 3:00 PM',  semester: '3rd' },
  { id: '2', subject: 'Digital Design And Computer Organization', date: 'Oct 28, 2025', time: '1:30 PM - 3:00 PM', semester: '3rd' },
  { id: '3', subject: 'Data Structures', date: 'Oct 29, 2025', time: '1:30 PM - 3:00 PM', semester: '3rd' },
  { id: '4', subject: 'Object Oriented Concepts & Programming Using C++', date: 'Oct 30, 2025', time: '1:30 PM - 3:00 PM', semester: '3rd' },
  { id: '5', subject: 'Open Elective', date: 'Oct 31, 2025', time: '03:30 PM - 05:50 PM', semester: '3rd' },
  { id: '6', subject: 'Program Elective', date: 'Nov 1, 2025', time: '03:30 PM - 05:50 PM', semester: '3rd' },
  { id: '7', subject: 'Artificial Intelligence', date: 'Oct 27, 2025', time: '03:30 PM - 05:50 PM',semester: '5th' },
  { id: '8', subject: 'Project Management', date: 'Oct 27, 2025', time: '11:00 AM', semester: '7th' },
  { id: '9', subject: 'Formal Languages and Automata Theory', date: 'Oct 28, 2025', time: '03:30 PM - 05:50 PM',semester: '5th' },
  { id: '10', subject: 'Operating System', date: 'Oct 29, 2025', time: '03:30 PM - 05:50 PM', semester: '5th' },
  { id: '11', subject: 'Computer Networks', date: 'Oct 30, 2025', time: '03:30 PM - 05:50 PM', semester: '5th' },
  { id: '12', subject: 'Open Elective', date: 'Oct 31, 2025', time: '03:30 PM - 05:50 PM', semester: '5th' },
  { id: '13', subject: 'Program Elective', date: 'Nov 1, 2025', time: '03:30 PM - 05:50 PM', semester: '5th' },
];


function App() {
  const [activeSection, setActiveSection] = useState('timetable');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState('3rd');
  const [feedback, setFeedback] = useState({ subject: '', comments: '' });
  const [selectedEbookSemester, setSelectedEbookSemester] = useState('3rd');
  const [selectedSection, setSelectedSection] = useState('secA');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registrationForm, setRegistrationForm] = useState({ name: '', email: '' });
  const [notices, setNotices] = useState<Notice[]>([]);
  const handleOpenRegisterModal = (event: Event) => {
    setSelectedEvent(event);
    setIsRegisterModalOpen(true);
  };
  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
  

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...registrationForm,
          event_name: selectedEvent.name,
        }),
      });

      if (!response.ok) throw new Error('Registration failed');

      alert(`Successfully registered for ${selectedEvent.name}!`);
      setIsRegisterModalOpen(false); // Close the modal
      setRegistrationForm({ name: '', email: '' }); // Clear the form
      
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };


  const [ebooks, setEbooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleSemesterSelect = (semester: string) => {
    setSelectedSemester(semester);
    // When a new semester is picked, default to the first section available
    const firstSection = Object.keys(semesterSchedules[semester])[0];
    setSelectedSection(firstSection || '');
  };

  // This useEffect hook now fetches books based on the selected semester
  useEffect(() => {
    // Only fetch if the ebooks section is active to save resources
    if (activeSection === 'ebooks') {
      const semesterNumber = selectedEbookSemester.replace(/\D/g, ''); // Extracts '3' from '3rd'
      fetch(`/api/ebooks?semester=${semesterNumber}`)
        .then(res => res.json())
        .then(data => setEbooks(data))
        .catch(err => console.error("Failed to fetch ebooks:", err));
    }
  }, [activeSection, selectedEbookSemester]); // Re-runs when section or semester changes

  // Fetches academic notices when the 'notices' section is active
  useEffect(() => {
    if (activeSection === 'notices') {
      fetch('/api/notices') // Make the API call to your backend
        .then(res => res.json()) // Parse the JSON response
        .then(data => {
          console.log('--- Data received for notices:', data); // <-- ADD THIS LINE
          setNotices(data); 
        })
       
        //.then(data => setNotices(data)) // Update the 'notices' state
        
        .catch(err => console.error("Failed to fetch notices:", err)); // Handle errors
    }
  }, [activeSection]); // Re-run when activeSection changes
  // +++ END OF NEW HOOK +++


  // +++ ADD THIS NEW FUNCTION +++
  const handleBookSelect = async (bookId: number) => {
    try {
      const response = await fetch(`/api/ebooks/${bookId}`);
      if (!response.ok) {
        throw new Error('Book not found');
      }
      const bookDetails = await response.json();
      setSelectedBook(bookDetails); // Set the state with the full book details
    } catch (error) {
      console.error("Failed to fetch book details:", error);
    }
  };


  const handleFeedbackSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // Prevents the page from reloading

  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedback), // Send the feedback state as a JSON string
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // If successful:
    alert('Feedback submitted successfully! Thank you.');
    setFeedback({ subject: '', comments: '' }); // Clear the form

  } catch (error) {
    console.error('Failed to submit feedback:', error);
    alert('Failed to submit feedback. Please try again later.');
  }
};

  const renderContent = () => {
    // --- RENDER LOGIC (No changes here) ---
    switch (activeSection) {

    case 'timetable':
        // This array now includes Saturday
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const sections = Object.keys(semesterSchedules[selectedSemester] || {});
        const schedule = semesterSchedules[selectedSemester]?.[selectedSection]?.[selectedDay] || [];

        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {/* Semester Selection */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 rounded-lg"> <Calendar className="h-6 w-6 text-orange-600" /> </div>
              <div className="flex-grow"> <h2 className="text-2xl font-bold text-gray-900">Class Timetable</h2> </div>
              <div className="flex gap-2">
                {Object.keys(semesterSchedules).map((semester) => (
                  <button key={semester} onClick={() => handleSemesterSelect(semester)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedSemester === semester ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  > {semester} Semester </button>
                ))}
              </div>
            </div>

            {/* Section Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3"> Select Section for {selectedSemester} Semester </h3>
              <div className="flex flex-wrap gap-2">
                {sections.map((section) => (
                  <button key={section} onClick={() => { setSelectedSection(section); setSelectedDay('Monday'); }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedSection === section ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  > {section.toUpperCase()} </button>
                ))}
              </div>
            </div>

            {/* Day of the Week Selection */}
            <div className="mb-6 p-2 bg-gray-100 rounded-lg flex flex-wrap gap-1">
              {days.map((day) => (
                <button key={day} onClick={() => setSelectedDay(day)}
                  className={`flex-1 min-w-[80px] px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedDay === day ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200'
                  }`}
                > {day} </button>
              ))}
            </div>

            {/* Schedule Display */}
            <div className="space-y-4">
              {schedule.length > 0 ? (
                schedule.map((slot, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0 w-20 text-center">
                      <div className="text-sm font-medium text-orange-600">{slot.time.split(' - ')[0]}</div>
                      <div className="text-xs text-gray-500">{slot.time.split(' - ')[1]}</div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900">{slot.subject}</h3>
                      <p className="text-sm text-gray-600">{slot.room} • {slot.type}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                         <GraduationCap className="h-4 w-4" /> 
                        {slot.assignedTo} {/* Display the assignedTo data */}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        slot.type === 'Lecture' ? 'bg-blue-100 text-blue-800' : 
                        slot.type === 'Practical' ? 'bg-green-100 text-green-800' : 
                        'bg-purple-100 text-purple-800'
                      }`}> {slot.type} </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <p>No classes scheduled for this day.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'notices':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Bell className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Academic Notices</h2>
            </div>
            <div className="space-y-4">
              {/* Check if notices state is empty */}
              {notices.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No notices available.</p>
              ) : (
                notices.map((notice) => {
                  // Determine if it's a link or just a div
                  const Tag = notice.file_url ? 'a' : 'div';
                  const linkProps = notice.file_url ? { 
                    href: `http://localhost:3001${notice.file_url}`, 
                    target: '_blank', 
                    rel: 'noopener noreferrer' 
                  } : {};

                  return (
                    <Tag 
                      key={notice.id} 
                      className={`block p-4 border border-gray-200 rounded-lg transition-all ${
                        notice.file_url ? 'hover:border-orange-300 hover:shadow-sm cursor-pointer' : ''
                      }`}
                      {...linkProps}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          {notice.title}
                          {notice.isNew && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full font-medium">New</span>
                          )}
                        </h3>
                        {/* Format date for display */}
                        <span className="text-sm text-gray-500">{new Date(notice.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{notice.description}</p>
                    </Tag>
                  );
                })
              )}
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <div key={event.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{event.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{event.date}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{event.registered} registered</span>
                     <button
  onClick={() => handleOpenRegisterModal(event)}
  className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
>
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'feedback':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">User Feedback</h2>
            </div>
            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={feedback.subject}
                  onChange={(e) => setFeedback({ ...feedback, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Enter feedback subject"
                  required
                />
              </div>
              <div>
                <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
                  Comments
                </label>
                <textarea
                  id="comments"
                  rows={6}
                  value={feedback.comments}
                  onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                  placeholder="Share your thoughts and suggestions..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-700 transition-colors"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        );

      case 'tests':
        const testSemesters = Object.keys(semesterSchedules);
        const filteredTests = upcomingTests.filter(test => test.semester === selectedSemester);
        console.log(`Filtered tests for ${selectedSemester}:`, filteredTests);
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 rounded-lg">
                <ClipboardList className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-gray-900">Test Schedules For Sessional II</h2>
              </div>
              <div className="flex gap-2">
                {testSemesters.map((semester) => (
                  <button
                    key={semester}
                    onClick={() => setSelectedSemester(semester)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedSemester === semester
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {semester} Semester
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {selectedSemester} Semester Tests
              </h3>
            </div>
            <div className="space-y-4">
              {filteredTests.map((test) => (
                <div key={test.id} className="p-4 border border-gray-200 rounded-lg hover:border-orange-200 hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{test.subject}</h3>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      Upcoming
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {test.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {test.time}
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'ebooks':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              {/* Header Title */}
              <div className="p-2 bg-orange-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-gray-900">E-Books Library</h2>
              </div>
              
              {/* --- Semester Button Group --- */}
              <div className="flex gap-2">
                {['3rd', '5th', '7th'].map((semester) => (
                  <button
                    key={semester}
                    onClick={() => setSelectedEbookSemester(semester)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedEbookSemester === semester
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {semester} Semester
                  </button>
                ))}
              </div>
              {/* --- END OF BUTTON GROUP --- */}

            </div>
            
            {/* The Grid of Books */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {ebooks.map((book) => (
                <div 
                  key={book.id} 
                  className="group flex flex-col bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="relative overflow-hidden rounded-lg shadow-sm">
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="mt-4 flex-grow">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">{book.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{book.author}</p>
                  </div>
                  
                  {book.file_url && (
                    <div className="mt-4">
                      <a
                        href={`http://localhost:3001${book.file_url}`}
                        target="_blank" 
  rel="noopener noreferrer" 
                        className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

        
      case 'map':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Campus Map</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg p-4 border border-orange-100">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-5 w-5 text-orange-600" />
                  <h3 className="font-semibold text-gray-900">Sikkim Manipal Institute of Technology</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Majitar, Rangpo, East Sikkim - 737136</p>
                <a
                  href="https://www.google.com/maps/place/Sikkim+Manipal+Institute+of+Technology/@27.1654131,88.4842247,17z/data=!3m1!4b1!4m6!3m5!1s0x39e42bd36a87a0c1:0x40316934d603a11!8m2!3d27.1654083!4d88.486805!16s%2Fm%2F0270b2y?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                >
                  <MapPin className="h-4 w-4" />
                  Open in Google Maps
                </a>
              </div>
              <div className="bg-gray-100 rounded-lg h-96 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.159496732386!2d88.4842247249927!3d27.16541307655938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e42bd36a87a0c1%3A0x40316934d603a11!2sSikkim%20Manipal%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1678886000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center gap-3">
              <img 
                //src="https://smit.campusmall.in/media/logo/stores/141/SMITLogo_1.jpg"
                src="/smit_logo.png"
                alt="SMIT Logo" 
                className="w-20 h-20 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Digital Student Assistance App</h1>
                <p className="text-sm text-gray-600">Sikkim Manipal Institute of Technology</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">Welcome, Student</p>
              <p className="text-xs text-gray-600">January 15, 2025</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
          <div className="p-6 pt-20 lg:pt-6">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeSection === item.id
                        ? 'bg-orange-100 text-orange-800 border border-orange-200'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                    {activeSection === item.id && (
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-0">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

   
    <div className="min-h-screen bg-gray-50">
      {/* ... your header, sidebar, and main content ... */}

      {/* --- ADD THIS REGISTRATION MODAL --- */}
      {isRegisterModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Register for {selectedEvent.name}</h2>
              <p className="text-sm text-gray-600 mt-1">Fill in your details to confirm your spot.</p>
            </div>
            {/* Registration Form */}
            <form onSubmit={handleRegistrationSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={registrationForm.name}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={registrationForm.email}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* --- END OF REGISTRATION MODAL --- */}

      {/* ... your chatbot UI is here ... */}

    </div>
  );

      
    </div>
  );
}

export default App;