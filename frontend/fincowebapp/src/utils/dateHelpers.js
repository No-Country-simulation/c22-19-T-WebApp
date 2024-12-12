export const getCompletedWeeksOfMonth = () => {
  // Obtener la fecha actual
  const now = new Date();

  // Array para almacenar las semanas
  const weeks = [];
  let weekCounter = 1;

  // Comenzar desde la semana actual y retroceder
  let currentWeekEnd = new Date(now);
  // Ajustar al final de la semana anterior (sábado)
  currentWeekEnd.setDate(currentWeekEnd.getDate() - currentWeekEnd.getDay() - 1);

  // Generar las últimas 4 semanas
  while (weeks.length < 4) {
    // Calcular el inicio de la semana (domingo)
    const currentWeekStart = new Date(currentWeekEnd);
    currentWeekStart.setDate(currentWeekStart.getDate() - 6);

    // Formatear las fechas en formato "YYYY-MM-DD"
    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };

    // Formatear el nombre de la semana
    const formatWeekName = (startDate, endDate) => {
      const startFormat = new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: 'short',
      }).format(startDate);
      const endFormat = new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: 'short',
      }).format(endDate);
      return `${startFormat} - ${endFormat}`;
    };

    weeks.unshift({
      id: weekCounter,
      name: formatWeekName(currentWeekStart, currentWeekEnd),
      startDate: formatDate(currentWeekStart),
      endDate: formatDate(currentWeekEnd),
    });

    weekCounter++;

    // Mover a la semana anterior
    currentWeekEnd.setDate(currentWeekStart.getDate() - 1);
  }

  return weeks;
};
