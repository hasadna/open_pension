from abc import ABCMeta, abstractmethod


class SourceInterface(metaclass=ABCMeta):
    def __init__(self, output_path: str):
        self.output_path = output_path

    @abstractmethod
    def get_annual(self, year: int):
        pass

    @abstractmethod
    def get_quarterly(self, year: int):
        pass
