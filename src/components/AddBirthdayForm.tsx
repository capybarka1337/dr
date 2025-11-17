import React, { useState } from 'react';
import { useCalendar } from '../contexts/CalendarContext';

const AddBirthdayForm: React.FC = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const { addBirthday, selectedDate } = useCalendar();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Пожалуйста, введите имя');
      return;
    }

    if (!date) {
      setError('Пожалуйста, выберите дату');
      return;
    }

    try {
      addBirthday({
        name: name.trim(),
        date,
        notes: notes.trim() || undefined,
      });

      // Очищаем форму
      setName('');
      setNotes('');
      if (!selectedDate) {
        setDate('');
      }
    } catch (err) {
      setError('Ошибка при добавлении дня рождения');
    }
  };

  // Если выбрана дата в календаре, устанавливаем её как значение по умолчанию
  React.useEffect(() => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      setDate(dateStr);
    }
  }, [selectedDate]);

  return (
    <div className="add-birthday-form">
      <h3 className="add-birthday-form__title">
        Добавить день рождения
      </h3>
      
      <form onSubmit={handleSubmit} className="add-birthday-form__form">
        <div className="add-birthday-form__field">
          <label htmlFor="name" className="add-birthday-form__label">
            Имя *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="add-birthday-form__input"
            placeholder="Имя человека"
            required
          />
        </div>

        <div className="add-birthday-form__field">
          <label htmlFor="date" className="add-birthday-form__label">
            Дата рождения *
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="add-birthday-form__input"
            required
          />
        </div>

        <div className="add-birthday-form__field">
          <label htmlFor="notes" className="add-birthday-form__label">
            Заметки (необязательно)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="add-birthday-form__textarea"
            placeholder="Что подарить, интересный факт и т.д."
            rows={3}
          />
        </div>

        {error && <div className="add-birthday-form__error">{error}</div>}

        <button
          type="submit"
          className="add-birthday-form__button"
        >
          Добавить
        </button>
      </form>
    </div>
  );
};

export default AddBirthdayForm;