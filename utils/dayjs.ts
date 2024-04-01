import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import buddhistEra from "dayjs/plugin/buddhistEra";

dayjs.extend(customParseFormat);
dayjs.locale('th');
dayjs.extend(buddhistEra);
export default dayjs;
