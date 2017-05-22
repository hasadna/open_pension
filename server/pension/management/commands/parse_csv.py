import os
import csv
import string
import re
from django.core.management import BaseCommand, CommandError
from yapsy.PluginManager import PluginManager


class Command(BaseCommand):
    fields = {
        "שם המנפיק/שם נייר ערך": 'managing_body',
        'מספר ניע': 'fund',
        "זירת מסחר": 'market_place',
        "ספק מידע": 'information_provider',
        "מספר מנפיק": 'issuer',
        "ענף מסחר": 'commercial_sectors',
        "דירוג": 'ranking',
        "שם מדרג": 'there_hierarchy',
        "תאריך רכישה": 'purchase_date',
        'מחמ': 'average_life_spend',
        "סוג מטבע": 'currency_type',
        "שיעור ריבית": 'interest_rate',
        "תשואה לפידיון": 'yield_to_maturity',
        "ערך נקוב": 'denominated_value',
        "שער": 'gate',
        "שווי שוק": 'market_value',
        "שעור מערך נקוב מונפק": 'issued_par_rate',
        "שעור מנכסי אפיק ההשקעה": 'rate_assets',
        "שעור מסך נכסי השקעה": 'total_assets_investment',
        "קונסורציום כן/לא": 'consortium',
        "שיעור ריבית ממוצע": 'average_interest_rate',
        "שווי הוגן": 'fair_value',
        "תנאי ושיעור ריבית": 'terms_and_interest ',
        "ריבית אפקטיבית": 'effective_interest',
        "עלות מתואמת": 'adjusted_cost',
        "שעור מנכסי השקעה": 'rate_of_investment_assets',
        "נכס הבסיס": 'the _underlying',
        "ספק המידע": 'information_provider',
        "סכום ההתחייבות": 'amount_of_liability',
        "תאריך סיום ההתחייבות": 'date_commitment',
        "שעור תשואה במהלך התקופה": 'rate_of_return_during_period',
        "תאריך שערוך אחרון": 'last_revaluation_Date',
        "אופי הנכס": 'type_of_property',
        "שווי משוערך": 'revalued',
        "מספר הנייר": 'several_paper',
        "שם המדרג": 'rating_given',
        "שעור הריבית": 'interest_rate',
        "תשואה לפדיון": 'yield_to_maturity',
        "בישראל": "in_israel",
        "צמודות מדד": "cpi",
        "לא צמודות": "no_cpi",
        "צמודות למטח": "foreign_coin_related",
        "אחר": "other",
        "בחול": "not_in_israel",
        "חברות ישראליות בחול": "israel_company_out_state",
        "חברות זרות בחול": "foreign_company_out_state",
        "מדדים כולל מניות": "madad_with_stocks",
        "שח/מטח": "nis_foreign",
        "ריבית": "intereset",
        "סחורות": "merchendise",
        "מניב": "yield",
        "לא מניב": "not_yield",
        "כתבי אופציות בישראל": "warrants_in_israel",
        "כתבי אופציה בישראל": "warrants_in_israel",
        "כתבי אופציה בחול": "warrants_not_in_israel",
        "צמוד מדד": "cpi",
        "לא צמוד": "no_cpi",
        "אגח קונצרני של חברות ישראליות": "concern_agach_for_israeli_company",
        "מטח/מטח": "foreign_key__foreign_key",
        "מטבע": "currency",
        "קרן מובטחת": "principle_fund",
        "קרן לא מובטחת": "un_principle_fund",
        "מוצרים מאוגחים": "agached_products",
        "שכבת חוב (Tranch) בדרוג AA- ומעלה": "tranch_rating_of_aa_or_higher",
        "שכבת חוב (Tranch) בדרוג BBB- עד A+": "tranch_bbb_rating_to_a_plus",
        "שכבת חוב (Tranch) בדרוג BB+ ומטה": "tranch_bbb_rating_to_a_plus",
        "שכבת הון (Equity Tranch)": "equity_tranch",
        "קרנות הון סיכון": "venture_capital_fund",
        "קרנות גידור": "hedge_fund",
        "קרנות נדלן": "real_estate_fund",
        "קרנות השקעה אחרות": "stock_fund",
        "קרנות הון סיכון בחול": "oversea_venture_capital_fund",
        "קרנות גידור בחול": "oversea_hedge_fund",
        "קרנות נדלן בחול": "oversea_real_estate_fund",
        "קרנות השקעה אחרות בחול": "oversea_stock_fund",
        "תעודות חוב מסחריות של חברות ישראליות": "commercial_bonds_for_israeli_companies",
        "תעודות חוב מסחריות של חברות זרות": "commercial_bonds_for_foreign_companies",
        "חץ": "hetz",
        "ערד": "arad",
        "מירון": "miron",
        "פיקדונות חשכל": "deposit_accountant_general",
        "אגח של ממשלת ישראל שהונפקו בחול": "israel_governmental_bonds_produced_oversea",
        "אגח לא סחיר שהנפיקו ממשלות זרות בחול": "non_trade_foreign_governmental_bonds_produced_oversea",
        "יתרת מזומנים ועוש בשח": "nis_cash_balance",
        "יתרת מזומנים ועוש נקובים במטח": "foreign_currency_cash_balance",
        "פחק/פרי": "pachak_perry",
        "פקמ לתקופה של עד שלושה חודשים": "three_months_short_term_deposit",
        "פקדון צמוד מדד עד שלושה חודשים": "three_months_deposit_linked_to_the_index",
        "פקדון צמוד מטח עד שלושה חודשים (פצמ)": "three_months_foreign_currency_deposit",
        "פקדונות במטח עד 3 חודשים": "three_months_linked_foreign_currency_deposit",
        "יתרות מזומנים ועוש נקובים במטח": "cash_balance_current_account_in_foreign_currency",
        "פקדונות במטח עד שלושה חודשים": "three_months_deposit_in_foreign_currency",
        "תל אביב 25": "tlv_25",
        "תל אביב 75": "tlv_75",
        "מניות היתר": "extra_stocks",
        "call 001 אופציות": "options_001",
        "אגח קונצרני של חברות זרות": "concern_bond_of_foreign_countries",
        "נקוב במטח": "written_in_foreign_key",
        "צמודי מטח": "linked_foreign_coin",
        "תעודות השתתפות בקרנות נאמנות בישראל": "certificate_of_participation_in_israel_funds_classification",
        "תעודות השתתפות בקרנות נאמנות בחול": "certificate_of_participation_in_overseas_funds_classification",
        "צמודות למדד": "cpi",
        "גליל": "galil",
        "מלווה קצר מועד": "short_term_loan",
        "שחר": "shachar",
        "גילון": "gilon",
        "צמודות לדולר": "dollar_linked",
        "אגח שהנפיקו ממשלות זרות בחול": "dollar_linked",
        "שמחקות מדדי מניות בישראל": "	mimic_stock_rates_in_israel",
        "שמחקות מדדים אחרים בישראל": "mimic_other_rates_in_israel",
        "שמחקות מדדים אחרים בחול": "mimic_other_rates_oversees",
        "שמחקות מדדי מניות בחול": "mimic_stock_rates_oversees",
        "שמחקות מדדי מניות": "mimic_stock_rates",
        "שמחקות מדדים אחרים": "mimic_other_rates",
        "short": "short",
        "מעלות": "degrees",
        "שקל חדש": "nis",
        "כנגד חסכון עמיתים/מבוטחים": "against_fund_amitim",
        "מבוטחות במשכנתא או תיקי משכנתאות": "insured_in_mortgage_or_mortgage_folders",
        "מובטחות בערבות בנקאית": "insured_by_bank_support",
        "מובטחות בבטחונות אחרים": "insured_by_other_support",
        "מובטחות בשיעבוד כלי רכב": "insured_by_lined_vehicle",
        "הלוואות לסוכנים": "loans_to_agents",
        "מובטחות בתזרים עמלות": "insured_by_fees_workflow",
        "בטחונות אחרים": "other_insurance",
        "הלוואות לעובדים ונושאי משרה": "loans_to_employees",
        "לא מובטחות": "un_insured",
        "מובטחות במשכנתא או תיקי משכנתאות": "insured_in_mortgage_or_mortgage_folders",
    }

    global_contexts = {
        "in_israel",
        "not_in_israel"
    }

    pluginManager = PluginManager()

    plugins = {
        'אג"ח-קונצרני': 'agach',
        'אופציות': 'options',
        'השקעה-בחברות-מוחזקות': 'invest-in-held-companies',
        'השקעות-אחרות': 'other-investments',
        'זכויות-מקרקעין': 'real-estate-copyrights',
        'יתרת-התחייבות-להשקעה': 'balance-of-investment-commitment',
        'כתבי-אופציה': 'warrants',
        'לא-סחיר---אג"ח-קונצרני': "agach-non-marketable",
        'לא-סחיר---אופציות': "options-non-marketable",
        'לא-סחיר---חוזים-עתידיים': "future-contracts-non-marketable",
        'לא-סחיר---כתבי-אופציה': "warrants-contracts-non-marketable",
        'לא-סחיר---מוצרים-מובנים': "built-in-products-non-marketable",
        'לא-סחיר---מניות': "non-marketable-stocks",
        'לא-סחיר---קרנות-השקעה': "non-marketable-investment-fund",
        'לא-סחיר---תעודות-חוב-מסחריות': "non-marketable-certificate-of-indebtedness",
        'לא-סחיר--תעודות-התחייבות-ממשלתי': "non-marketable-governmental-liability-certificate",
        'מוצרים-מובנים': "built-in-products",
        'מזומנים': "cash-flow",
        'מניות': "stocks",
        'עלות-מתואמת-אג"ח-קונצרני-ל.סחיר': "un-negotiable-adjusted-cost-of-corporate-bonds",
        'עלות-מתואמת-אג"ח-קונצרני-סחיר': "negotiable-adjusted-cost-of-corporate-bonds",
        'עלות-מתואמת-מסגרות-אשראי-ללווים': "adjusted-cost-of-credit-facilities-to-borrowers",
        'פקדונות-מעל-3-חודשים': "deposits-over-three-months",
        'קרנות-נאמנות': "mutual-funds",
        'תעודות-התחייבות-ממשלתיות': "government-debt-certificates",
        'תעודות-חוב-מסחריות': "commercial-debt-certificates",
        'תעודות-סל': "etf",
        'הלוואות': 'loans',
        'חוזים-עתידיים': 'future-contracts',
    }

    def add_arguments(self, parser):
        parser.add_argument('--source', type=str)
        parser.add_argument('--destination', type=str)
        parser.add_argument('--plugin_id', type=str)

    def handle(self, *args, **options):
        path = options['source']
        destination = options['destination']
        specific_plugin = options['plugin_id']

        self.pluginManager.setPluginPlaces(
            ["pension/management/commands/plugins"])
        self.pluginManager.collectPlugins()

        for file in os.listdir(path):
            split_file = file.split('-')
            del split_file[-1]
            plugin_id = "-".join(split_file).strip().replace(' ', '-')
            if plugin_id not in self.plugins:
                # No matching plugin. Skipping.
                continue

            plugin_id = self.plugins[plugin_id]

            if specific_plugin is not None and plugin_id != specific_plugin:
                continue

            plugin = self.pluginManager.getPluginByName(plugin_id).plugin_object
            print(self.normalize(path + "/" + file, plugin))

    def normalize(self, path, plugin):
        """
        Normalize the file content.

        :param path:
            The path of the file.

        :param plugin:
            The plugin object which handle the body.

        :return:
            The human readable, relatively, CSV file.
        """
        metadata = {'number': '', 'date': ''}
        csv_file = open(path, 'r').read()
        rows = csv_file.split("\n")
        fields = []

        for i, value in enumerate(rows):
            if i == 0:
                metadata['date'] = self.get_kupa_date(value)
            elif i == 3:
                metadata['number'] = self.get_kupa_number(value)
            elif i == 7:
                fields = self.get_fields(value)
                plugin.fieldsLength = len(fields)
            elif i >= 11:
                if self.should_skip_line(value):
                    continue

                plugin.parseBody(self, value[1:])

        fields.append('global_context')
        fields.append('local_context')
        return ','.join(fields) + "\n" + "\n".join(plugin.body)

    def get_kupa_date(self, row):
        """
        Get the kupa number from the first row.

        :param row:
            The first row.

        :return:
            The kupa date.
        """
        for element in row.split(','):
            if re.compile("[0-9]*/[0-9]*/[0-9]*").match(element):
                # Found the date. No need to extra iteration.
                return element

    def get_kupa_number(self, row):
        """
        Get the date of the kupa.

        :param row:
            The content of the file.

        :return:
            The kupa number.
        """
        for element in row.split(','):
            if element.isdigit():
                # Found the kupa number. No need for extra iteration.
                return element

    def get_fields(self, row):
        """
        Get the fields from the csv file.

        :param row:
            The content of the file

        :return:
            The metadata of the file
        """
        fields = row.split(",")

        new_fields = []
        for i, field in enumerate(fields):

            if field.strip() == '':
                # An empty fields cannot be added as a field in the CSV header.
                continue

            new_fields.append(self.english_text(field))

        return new_fields

    def english_text(self, field):
        """
        Get the english field representation of the hebrew.

        :param field:
            The hebrew field.

        :return:
            The english field for the hebrew term.
        """
        clear_field_name = field.strip().replace('"', '')

        if clear_field_name not in self.fields:
            # print("The field " + clear_field_name + " does not exists in the "
            #                                         "field name")
            return ''

        return self.fields[clear_field_name]

    def is_context(self, row, empty_column):
        """
        Check if the current line is a line context.

        :param row:
            The row to check if it a context row or not.
        :param empty_column:
            Define which column should be empty inorder to decide if this is a
            context row or not.
        :return:
            The text context of boolean when not found.
        """

        # Might not be good for numbers with comma. Let's hold hand and pray for
        # the best.
        columns = row.split(',')
        if columns[empty_column] == "":
            return columns[0].replace('"', '').replace("'", '')
        return False


    def is_global_context(self, context):
        """
        Check if the given context is a global context

        : param context:
            The name of the context

        :return:
            The text context of boolean when not found.
        """
        return context in self.global_contexts

    def should_skip_line(self, value):
        """
        Check if the line should be skipped or not.

        :param value:
            The current line.
        :return:
            True or false.
        """
        skipping_text = 'בעל ענין/צד קשור *'
        if skipping_text in value:
            return True

        if value.replace(',', '') == "":
            return True

        return False
