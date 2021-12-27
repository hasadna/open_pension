import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlay, faChevronLeft, faSearch, faChevronDown, faChevronUp,} from '@fortawesome/free-solid-svg-icons';
import {faSquare, faCheckSquare} from "@fortawesome/free-regular-svg-icons";
import { faFacebookSquare, faTwitterSquare, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export const Play = () => <FontAwesomeIcon icon={faPlay} />
export const Checkbox = ({checked = false}) => <FontAwesomeIcon icon={checked ? faCheckSquare : faSquare} />
export const Checked = ({checked = false}) => <FontAwesomeIcon icon={faCheckSquare} />
export const UnChecked = () => <FontAwesomeIcon icon={faSquare} />
export const ArrowLeft = () => <FontAwesomeIcon icon={faChevronLeft} />
export const ArrowDown = () => <FontAwesomeIcon icon={faChevronDown} />
export const ArrowUp = () => <FontAwesomeIcon icon={faChevronUp} />
export const Facebook = () => <FontAwesomeIcon icon={faFacebookSquare} />
export const Twitter = () => <FontAwesomeIcon icon={faTwitterSquare} />
export const Linkedin = () => <FontAwesomeIcon icon={faLinkedinIn} />
export const Search = () => <FontAwesomeIcon icon={faSearch} />
