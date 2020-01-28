from Models.instrument import Instrument
from datetime import datetime

instrument = Instrument()
instrument.industry = 2
instrument.industry_name = 2
instrument.industry_type = 2
instrument.instrument_number = 2
instrument.issuer_number = 2
instrument.market = 2
instrument.create_date = datetime.now()
instrument.save()

print(instrument.id)
