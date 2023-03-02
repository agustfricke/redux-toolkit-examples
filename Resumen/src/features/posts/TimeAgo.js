
import { parseISO, formatDistanceToNow } from 'date-fns';

// Psamos el timestamp como pprop
const TimeAgo = ({ timestamp }) => {
    let timeAgo = '' // decalramos variable
    if (timestamp) { // Si hay timestamp creamos el date
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date) 
        timeAgo = `${timePeriod} ago` // ir a postList
    }

    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    )
}
export default TimeAgo