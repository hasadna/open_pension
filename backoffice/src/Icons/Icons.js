import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFile, faDatabase, faClock, faTasks, faChevronCircleDown, faChevronLeft, faChevronRight, faHome,
  faUsers, faCopy, faChartBar, faUpload
} from '@fortawesome/free-solid-svg-icons';

export const File = () => <FontAwesomeIcon icon={faFile} />
export const Database = () => <FontAwesomeIcon icon={faDatabase} />
export const Clock = () => <FontAwesomeIcon icon={faClock} />
export const Tasks = () => <FontAwesomeIcon icon={faTasks} />
export const CircleArrowDown = () => <FontAwesomeIcon icon={faChevronCircleDown} />
export const ArrowLeft = () => <FontAwesomeIcon icon={faChevronLeft} />
export const ArrowRight = () => <FontAwesomeIcon icon={faChevronRight} />
export const Home = () => <FontAwesomeIcon icon={faHome} />
export const Users = () => <FontAwesomeIcon icon={faUsers} />
export const Copy = () => <FontAwesomeIcon icon={faCopy} />
export const Charts = () => <FontAwesomeIcon icon={faChartBar} />
export const Upload = () => <FontAwesomeIcon icon={faUpload} />
