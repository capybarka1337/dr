import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

interface Birthday {
  id: string;
  name: string;
  date: string; // ISO string
  userId: string;
  notes?: string;
}

interface CalendarContextType {
  birthdays: Birthday[];
  currentMonth: Date;
  selectedDate: Date | null;
  addBirthday: (birthday: Omit<Birthday, 'id' | 'userId'>) => void;
  updateBirthday: (id: string, birthday: Partial<Birthday>) => void;
  deleteBirthday: (id: string) => void;
  getBirthdaysForDate: (date: Date) => Birthday[];
  getBirthdaysForMonth: (date: Date) => Birthday[];
  setCurrentMonth: (date: Date) => void;
  setSelectedDate: (date: Date | null) => void;
  nextMonth: () => void;
  previousMonth: () => void;
  getDaysInMonth: () => Date[];
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};

interface CalendarProviderProps {
  children: ReactNode;
}

export const CalendarProvider: React.FC<CalendarProviderProps> = ({ children }) => {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    // Загружаем дни рождения из localStorage
    const savedBirthdays = localStorage.getItem('birthdays');
    if (savedBirthdays) {
      try {
        setBirthdays(JSON.parse(savedBirthdays));
      } catch (error) {
        console.error('Error loading birthdays:', error);
        localStorage.removeItem('birthdays');
      }
    }
  }, []);

  useEffect(() => {
    // Сохраняем дни рождения в localStorage
    localStorage.setItem('birthdays', JSON.stringify(birthdays));
  }, [birthdays]);

  const addBirthday = (birthday: Omit<Birthday, 'id' | 'userId'>) => {
    const newBirthday: Birthday = {
      ...birthday,
      id: Date.now().toString(),
      userId: 'current-user', // В реальном приложении здесь будет ID текущего пользователя
    };
    setBirthdays(prev => [...prev, newBirthday]);
  };

  const updateBirthday = (id: string, updates: Partial<Birthday>) => {
    setBirthdays(prev =>
      prev.map(birthday =>
        birthday.id === id ? { ...birthday, ...updates } : birthday
      )
    );
  };

  const deleteBirthday = (id: string) => {
    setBirthdays(prev => prev.filter(birthday => birthday.id !== id));
  };

  const getBirthdaysForDate = (date: Date): Birthday[] => {
    return birthdays.filter(birthday => {
      try {
        const birthdayDate = parseISO(birthday.date);
        return isSameDay(birthdayDate, date);
      } catch {
        return false;
      }
    });
  };

  const getBirthdaysForMonth = (date: Date): Birthday[] => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    
    return birthdays.filter(birthday => {
      try {
        const birthdayDate = parseISO(birthday.date);
        return birthdayDate >= monthStart && birthdayDate <= monthEnd;
      } catch {
        return false;
      }
    });
  };

  const nextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  const previousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  const getDaysInMonth = (): Date[] => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    return eachDayOfInterval({ start: monthStart, end: monthEnd });
  };

  return (
    <CalendarContext.Provider
      value={{
        birthdays,
        currentMonth,
        selectedDate,
        addBirthday,
        updateBirthday,
        deleteBirthday,
        getBirthdaysForDate,
        getBirthdaysForMonth,
        setCurrentMonth,
        setSelectedDate,
        nextMonth,
        previousMonth,
        getDaysInMonth,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};