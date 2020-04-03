from orator.migrations import Migration


class CreateCountriesTable(Migration):

    def up(self):
        """
        Run the migrations.
        """
        with self.schema.create('country') as table:
            table.increments('id')
            table.string('name')
            table.string('ISO2_code')
            table.string('ISO3_code')
            table.string('continent_name')
            table.timestamps()

    def down(self):
        """
        Revert the migrations.
        """
        self.schema.drop('countries')
