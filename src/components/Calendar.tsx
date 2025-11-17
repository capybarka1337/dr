import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useCalendar } from '../contexts/CalendarContext';

const Calendar: React.FC = () => {
  const {
    currentMonth,
    selectedDate,
    getBirthdaysForDate,
    setCurrentMonth,
    setSelectedDate,
    nextMonth,
    previousMonth,
  } = useCalendar();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const handlePrevMonth = () => {
    previousMonth();
  };

  const handleNextMonth = () => {
    nextMonth();
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="calendar">
      <div className="calendar__header">
        <button
          onClick={handlePrevMonth}
          className="calendar__nav-button"
          aria-label="Предыдущий месяц"
        >
          ‹
        </button>
        
        <h2 className="calendar__title">
          {format(currentMonth, 'MMMM yyyy', { locale: ru })}
        </h2>
        
        <button
          onClick={handleNextMonth}
          className="calendar__nav-button"
          aria-label="Следующий месяц"
        >
          ›
        </button>
      </div>

      <div className="calendar__weekdays">
        {weekDays.map(day => (
          <div key={day} className="calendar__weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar__days">
        {monthDays.map(date => {
          const birthdays = getBirthdaysForDate(date);
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          const isCurrentDay = isToday(date);

          return (
            <button
              key={date.toISOString()}
              onClick={() => handleDateClick(date)}
              className={`
                calendar__day
                ${isSelected ? 'calendar__day--selected' : ''}
                ${isCurrentDay ? 'calendar__day--today' : ''}
                ${birthdays.length > 0 ? 'calendar__day--has-birthday' : ''}
              `}
            >
              <span className="calendar__day-number">
                {format(date, 'd')}
              </span>
              
              {birthdays.length > 0 && (
                <div className="calendar__birthday-indicator">
                  <span className="calendar__birthday-count">
                    {birthdays.length}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;