import os
import glob
import pandas as pd
from django.utils import timezone

from django.core.management import BaseCommand, CommandError
from pension.models import Quarter, Instrument


class Command(BaseCommand):
    def handle(self, *args, **options):
        print('Importing..')
        data_csv = pd.read_csv('/Users/nirgalon/Downloads/pension_data_all.csv', index_col=False, header=0);



        # Read the content of the sheet
        for index, managing_body in enumerate(data_csv['managing_body']):
            print('index', index)
            print('managing_body', managing_body)

            data_csv['fund'][index]
            data_csv['fund_name'][index]
            # report_year = data_csv['report_year'][index]
            # report_qurater = data_csv['report_qurater'][index]
            instrument_type = data_csv['instrument_type'][index]
            instrument_sub_type = data_csv['instrument_sub_type'][index]
            instrument_id = data_csv['instrument_id'][index]
            orig_instrument_id = data_csv['orig_instrument_id'][index]
            instrument_name = data_csv['instrument_name'][index]
            issuer = data_csv['issuer'][index]
            activity_industry = data_csv['activity_industry'][index]
            currency = data_csv['currency'][index]
            fair_value = data_csv['fair_value'][index]
            market_cap = data_csv['market_cap'][index]
            rate_of_fund = data_csv['rate_of_fund'][index]
            rating_agency = data_csv['rating_agency'][index]
            reference_index = data_csv['reference_index'][index]
            intrest_rate = data_csv['intrest_rate'][index]
            date_of_purchase = data_csv['date_of_purchase'][index]
            average_of_duration = data_csv['average_of_duration'][index]
            date_of_revaluation = data_csv['date_of_revaluation'][index]
            rate = data_csv['rate'][index]
            yield = data_csv['yield'][index]
            rating = data_csv['rating'][index]
            par_value = data_csv['par_value'][index]
            tmp_name = data_csv['tmp_name'][index]
            underlying_asset = data_csv['underlying_asset'][index]
            type_of_asset = data_csv['type_of_asset'][index]
            rate_of_ipo = data_csv['rate_of_ipo'][index]
            liquidity = data_csv['liquidity'][index]
            asset_type = data_csv['asset_type'][index]


            quarter = Quarter.objects.get_or_create(
                year=data_csv['report_year'][index],
                month=data_csv['report_qurater'][index],
            )
            #
            # try:
            #     instrument, created = Instrument.objects.get_or_create(
            #         issuer_id=issuer_id,
            #         rating=rating,
            #         rating_agency=rating_agency,
            #         currency=currency,
            #         interest_rate=interest_rate,
            #         yield_to_maturity=yield_to_maturity,
            #         market_cap=market_cap,
            #         rate_of_investment_channel=rate_of_investment_channel,
            #         rate_of_fund=rate_of_fund,
            #         trading_floor=trading_floor,
            #         date_of_purchase=date_of_purchase,
            #         average_of_duration=average_of_duration,
            #         rate=rate,
            #         rate_of_ipo=rate_of_ipo,
            #         informer=informer,
            #         fair_value=fair_value,
            #         activity_industry=activity_industry,
            #         date_of_revaluation=date_of_revaluation,
            #         type_of_asset=type_of_asset,
            #         return_on_equity=return_on_equity,
            #         liabilities=liabilities,
            #         expiry_date_of_liabilities=expiry_date_of_liabilities,
            #         effective_rate=effective_rate,
            #         coordinated_cost=coordinated_cost,
            #         underlying_asset=underlying_asset,
            #         consortium=consortium,
            #         average_rate=average_rate,
            #         par_value=par_value,
            #         managing_body=managing_body_dict[managing_body],
            #         geographical_location=context,
            #         instrument_sub_type=instrument_dict[sheet_name],
            #         quarter=quarter[0],
            #     )
            #     print('created', instrument, created)
            # except ValueError as e:
            #     print('index', index)
            #     print('issuer_id', issuer_id)
            #     print('rating', rating)
            #     print('rating_agency', rating_agency)
            #     print('currency', currency)
            #     print('interest_rate', interest_rate)
            #     print('yield_to_maturity', yield_to_maturity)
            #     print('market_cap', market_cap)
            #     print('rate_of_investment_channel', rate_of_investment_channel)
            #     print('rate_of_fund', rate_of_fund)
            #     print('trading_floor', trading_floor)
            #     print('date_of_purchase', date_of_purchase)
            #     print('average_of_duration', average_of_duration)
            #     print('rate', rate)
            #     print('rate_of_ipo', rate_of_ipo)
            #     print('informer', informer)
            #     print('fair_value', fair_value)
            #     print('activity_industry', activity_industry)
            #     print('date_of_revaluation', date_of_revaluation)
            #     print('type_of_asset', type_of_asset)
            #     print('return_on_equity', return_on_equity)
            #     print('liabilities', liabilities)
            #     print('expiry_date_of_liabilities', expiry_date_of_liabilities)
            #     print('effective_rate', effective_rate)
            #     print('coordinated_cost', coordinated_cost)
            #     print('underlying_asset', underlying_asset)
            #     print('consortium', consortium)
            #     print('average_rate', average_rate)
            #     print('par_value', par_value)
            #     print('managing_body', managing_body_dict[managing_body])
            #     print('geographical_location', context)
            #     print('instrument_sub_type', instrument_dict[sheet_name])
            #     print('--------------------')
            #     raise(ValueError)

        print('Finish with {filename}'.format(filename=filename))
