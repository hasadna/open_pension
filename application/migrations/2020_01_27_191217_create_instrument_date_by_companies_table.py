from orator.migrations import Migration


class CreateInstrumentDateByCompaniesTable(Migration):

    def up(self):
        """
        Run the migrations.
        """
        with self.schema.create('instrument_date_by_company') as table:
            table.increments('id')
            table.integer('investing_company')
            table.string('currency')
            table.float('duration')
            table.float('fair_value')
            table.integer('instrument_number')
            table.integer('fund_id')
            table.float('nominal_value')
            table.float('price')
            table.date('purchase_date')
            table.float('rate')
            table.float('rate_fund_holding')
            table.float('rate_instrument_type')
            table.float('rate_register')
            table.date('report_date')
            table.date('create_date')
            table.timestamps()

    def down(self):
        """
        Revert the migrations.
        """
        self.schema.drop('instrument_date_by_companies')
