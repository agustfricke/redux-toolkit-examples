import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo = ({ timestamp })  => {

    let timeAgo = ''; // Definimos variable con un string vacio

    if (timestamp) {
        // Si hay una fecha a travez del prop:
        const date = parseISO(timestamp) // Convertimos la fecha con parseISO
        const timePeriod = formatDistanceToNow(date) // Convertimos la fecha a algo mas usuario amigable, va a decir que esta se creo hace 5 o 1 minuto
        // Le pasamos esta constante al timeAgo
        timeAgo = `${timePeriod} ago`
    }

    return (
        <span>
            {timeAgo}
        </span>
    )

}
export default TimeAgo;
