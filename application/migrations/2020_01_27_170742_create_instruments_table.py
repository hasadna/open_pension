from orator.migrations import Migration


class CreateInstrumentsTable(Migration):

    def up(self):
        """
        Run the migrations.
        """
        with self.schema.create('instrument') as table:
            table.increments('id')
            table.string('industry')
            table.string('industry_name')
            table.string('industry_type')
            table.string('instrument_number')
            table.integer('issuer_number')
            table.integer('market')
            table.date('create_date')
            table.timestamps()

    def down(self):
        """
        Revert the migrations.
        """
        self.schema.drop('instrument')
