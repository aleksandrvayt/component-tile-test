
  // Функция для форматирования номера заявки
  export const formatNumber = (number: number): string => `№ ${number.toLocaleString()}`;
  
  // Форматирование даты и времени (ДД.ММ.ГГГГ ЧЧ:ММ)
  export const formatDateTime = (date: string): string => {
    const d = new Date(date);
    return d.toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };
  
  // Форматирование длительности
  export const formatDuration = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor(seconds / 3600);
    return days > 0 ? `${days} дней` : `${hours} часов`;
  };
  
  // Форматирование ФИО (Фамилия Имя Отчество)
  export const formatFullName = (lastName: string, firstName: string, middleName: string): string => {
    return `${lastName} ${firstName} ${middleName}`;
  };
  
  // Форматирование Фамилии с инициалами (Фамилия И.О.)
  export const formatShortName = (lastName: string, firstName: string, middleName: string): string => {
    return `${lastName} ${firstName[0]}. ${middleName[0]}.`;
  };
  