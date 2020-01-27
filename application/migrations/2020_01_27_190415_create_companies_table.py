from orator.migrations import Migration


class CreateCompaniesTable(Migration):

    def up(self):
        """
        Run the migrations.
        """
        with self.schema.create('company') as table:
            table.increments('id')
            table.string('company_name')
            table.string('company_local_number')
            table.string('country_lei')
            table.string('country')
            table.string('domain')
            table.string('company_type')
            table.date('create_date')
            table.timestamps()

    def down(self):
        """
        Revert the migrations.
        """
        self.schema.drop('companies')
