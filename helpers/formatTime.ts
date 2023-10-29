export function updateTimes(time: number) {
  let message: string;
  const now = Math.floor((new Date()).getTime() / 1000);
  // Calculamos la diferencia respecto a la fecha actual
  let diff = now - (time / 1000)
  // En función del valor mostramos el dato en segundos, minutos, horas o días
  if (diff < 60) {
    message = 'Hace ' + diff + ' segundos';
    return message
  }
  diff = Math.floor(diff / 60);
  if (diff < 60) {
    message = 'Hace ' + diff + ' minutos';
    return message
  }
  diff = Math.floor(diff / 60);
  if (diff < 24) {
    message = 'Hace ' + diff + ' horas';
    return message
  }
  diff = Math.floor(diff / 24);
  message = 'Hace ' + diff + ' días';
  return message
}
