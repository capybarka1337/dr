import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useCalendar } from '../contexts/CalendarContext';

const BirthdayList: React.FC = () => {
  const { birthdays, selectedDate, getBirthdaysForDate, deleteBirthday } = useCalendar();
  const [editingId, setEditingId] = useState<string | null>(null);

  const selectedDateBirthdays = selectedDate ? getBirthdaysForDate(selectedDate) : [];
  const upcomingBirthdays = birthdays
    .map(birthday => ({
      ...birthday,
      dateObj: parseISO(birthday.date),
    }))
    .sort((a, b) => {
      const today = new Date();
      const aDaysUntil = Math.ceil((a.dateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      const bDaysUntil = Math.ceil((b.dateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return aDaysUntil - bDaysUntil;
    })
    .slice(0, 5);

  const handleDelete = (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот день рождения?')) {
      deleteBirthday(id);
    }
  };

  return (
    <div className="birthday-list">
      {selectedDate && selectedDateBirthdays.length > 0 && (
        <div className="birthday-list__section">
          <h3 className="birthday-list__section-title">
            Дни рождения {format(selectedDate, 'd MMMM', { locale: ru })}
          </h3>
          
          <div className="birthday-list__items">
            {selectedDateBirthdays.map(birthday => (
              <div key={birthday.id} className="birthday-list__item">
                <div className="birthday-list__item-content">
                  <h4 className="birthday-list__item-name">{birthday.name}</h4>
                  {birthday.notes && (
                    <p className="birthday-list__item-notes">{birthday.notes}</p>
                  )}
                </div>
                
                <div className="birthday-list__item-actions">
                  <button
                    onClick={() => setEditingId(birthday.id)}
                    className="birthday-list__edit-button"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(birthday.id)}
                    className="birthday-list__delete-button"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="birthday-list__section">
        <h3 className="birthday-list__section-title">
          Предстоящие дни рождения
        </h3>
        
        {upcomingBirthdays.length > 0 ? (
          <div className="birthday-list__items">
            {upcomingBirthdays.map(birthday => (
              <div key={birthday.id} className="birthday-list__item">
                <div className="birthday-list__item-content">
                  <h4 className="birthday-list__item-name">{birthday.name}</h4>
                  <p className="birthday-list__item-date">
                    {format(birthday.dateObj, 'd MMMM', { locale: ru })}
                  </p>
                  {birthday.notes && (
                    <p className="birthday-list__item-notes">{birthday.notes}</p>
                  )}
                </div>
                
                <div className="birthday-list__item-actions">
                  <button
                    onClick={() => setEditingId(birthday.id)}
                    className="birthday-list__edit-button"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(birthday.id)}
                    className="birthday-list__delete-button"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="birthday-list__empty">
            <p>Пока нет добавленных дней рождения</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayList;