from orator.migrations import Migration


class CreateMarketsTable(Migration):

    def up(self):
        """
        Run the migrations.
        """
        with self.schema.create('market') as table:
            table.increments('id')
            table.string('market_name')
            table.string('market_code')
            table.integer('country')
            table.date('created_date')
            table.timestamps()

    def down(self):
        """
        Revert the migrations.
        """
        self.schema.drop('markets')
