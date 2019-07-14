import logging

LOGGER_NAME = 'open_pension'
DEFAULT_FORMAT = '%(asctime)s [%(levelname)s] %(module)s.%(funcName)s.%(lineno)d: %(message)s'


def get_logger():
    return logging.getLogger(LOGGER_NAME)


def init_logger(log_path=None, logging_level=logging.DEBUG):
    logger = get_logger()
    logger.setLevel(logging_level)
    log_format = logging.Formatter(DEFAULT_FORMAT)

    c_handler = logging.StreamHandler()
    c_handler.setFormatter(log_format)
    logger.addHandler(c_handler)
    if log_path:
        f_handler = logging.FileHandler(log_path)
        f_handler.setFormatter(log_format)
        logger.addHandler(f_handler)


