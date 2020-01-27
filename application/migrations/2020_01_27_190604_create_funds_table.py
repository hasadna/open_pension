from orator.migrations import Migration


class CreateFundsTable(Migration):

    def up(self):
        """
        Run the migrations.
        """
        with self.schema.create('fund') as table:
            table.increments('id')
            table.string('fund_name')
            table.integer('fund_number')
            table.integer('executive_body_id')
            table.boolean('is_active')
            table.date('create_date')
            table.date('update_date')
            table.timestamps()

    def down(self):
        """
        Revert the migrations.
        """
        self.schema.drop('funds')
