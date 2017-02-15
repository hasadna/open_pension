from django.contrib import admin
from modeltranslation.admin import TranslationAdmin

from pension.models import CashAndDeposit, GovernmentBonds, CommercialBonds, CorporateBonds, Shares, ETF, TrustFunds,\
    OptionWarrants, Options, Futures, StructuredProducts, NotNegotiableGovernmentBonds, NotNegotiableCommercialBonds,\
    NotNegotiableCorporateBonds, NotNegotiableShares, NotNegotiableInvestmentFunds, NotNegotiableOptionWarrants,\
    NotNegotiableOptions, NotNegotiableFutures, NotNegotiableStructuredProducts, Loans, DepositsOverThreeMonths,\
    LandRights, OtherInvestments, InvestmentsBalance, CostCoordinatedCorporateBonds,\
    NotNegotiableCostCoordinatedCorporateBonds, UnusedFramesBorrowers


class CashAndDepositAdmin(admin.ModelAdmin):
    model = CashAndDeposit
    list_display = ('name',)


class GovernmentBondsAdmin(admin.ModelAdmin):
    model = GovernmentBonds
    list_display = ('name',)


class CommercialBondsAdmin(admin.ModelAdmin):
    model = CommercialBonds
    list_display = ('name',)


class CorporateBondsAdmin(admin.ModelAdmin):
    model = CorporateBonds
    list_display = ('name',)


class SharesAdmin(admin.ModelAdmin):
    model = Shares
    list_display = ('name',)


class ETFAdmin(admin.ModelAdmin):
    model = ETF
    list_display = ('name',)


class TrustFundsAdmin(admin.ModelAdmin):
    model = TrustFunds
    list_display = ('name',)


class OptionWarrantsAdmin(admin.ModelAdmin):
    model = OptionWarrants
    list_display = ('name',)


class OptionsAdmin(admin.ModelAdmin):
    model = Options
    list_display = ('name',)


class FuturesAdmin(admin.ModelAdmin):
    model = Futures
    list_display = ('name',)


class StructuredProductsAdmin(admin.ModelAdmin):
    model = StructuredProducts
    list_display = ('name',)


class NotNegotiableGovernmentBondsAdmin(admin.ModelAdmin):
    model = NotNegotiableGovernmentBonds
    list_display = ('name',)


class NotNegotiableCommercialBondsAdmin(admin.ModelAdmin):
    model = NotNegotiableCommercialBonds
    list_display = ('name',)

class NotNegotiableCorporateBondsAdmin(admin.ModelAdmin):
    model = NotNegotiableCorporateBonds
    list_display = ('name',)


class NotNegotiableSharesAdmin(admin.ModelAdmin):
    model = NotNegotiableShares
    list_display = ('name',)


class NotNegotiableInvestmentFundsAdmin(admin.ModelAdmin):
    model = NotNegotiableInvestmentFunds
    list_display = ('name',)


class NotNegotiableOptionWarrantsAdmin(admin.ModelAdmin):
    model = NotNegotiableOptionWarrants
    list_display = ('name',)


class NotNegotiableOptionsAdmin(admin.ModelAdmin):
    model = NotNegotiableOptions
    list_display = ('name',)


class NotNegotiableFuturesAdmin(admin.ModelAdmin):
    model = NotNegotiableFutures
    list_display = ('name',)


class NotNegotiableStructuredProductsAdmin(admin.ModelAdmin):
    model = NotNegotiableStructuredProducts
    list_display = ('name',)


class LoansAdmin(admin.ModelAdmin):
    model = Loans
    list_display = ('name',)


class DepositsOverThreeMonthsAdmin(admin.ModelAdmin):
    model = DepositsOverThreeMonths


class LandRightsAdmin(admin.ModelAdmin):
    model = LandRights


class OtherInvestmentsAdmin(admin.ModelAdmin):
    model = OtherInvestments


class InvestmentsBalanceAdmin(admin.ModelAdmin):
    model = InvestmentsBalance


class CostCoordinatedCorporateBondsAdmin(admin.ModelAdmin):
    model = CostCoordinatedCorporateBonds
    list_display = ('name',)


class NotNegotiableCostCoordinatedCorporateBondsAdmin(admin.ModelAdmin):
    model = NotNegotiableCostCoordinatedCorporateBonds
    list_display = ('name',)


class UnusedFramesBorrowersAdmin(admin.ModelAdmin):
    model = UnusedFramesBorrowers


admin.site.register(CashAndDeposit, CashAndDepositAdmin)
admin.site.register(GovernmentBonds, GovernmentBondsAdmin)
admin.site.register(CommercialBonds, CommercialBondsAdmin)
admin.site.register(CorporateBonds, CorporateBondsAdmin)
admin.site.register(Shares, SharesAdmin)
admin.site.register(ETF, ETFAdmin)
admin.site.register(TrustFunds, TrustFundsAdmin)
admin.site.register(OptionWarrants, OptionWarrantsAdmin)
admin.site.register(Options, OptionsAdmin)
admin.site.register(Futures, FuturesAdmin)
admin.site.register(StructuredProducts, StructuredProductsAdmin)
admin.site.register(NotNegotiableGovernmentBonds, NotNegotiableGovernmentBondsAdmin)
admin.site.register(NotNegotiableCommercialBonds, NotNegotiableCommercialBondsAdmin)
admin.site.register(NotNegotiableCorporateBonds, NotNegotiableCorporateBondsAdmin)
admin.site.register(NotNegotiableShares, NotNegotiableSharesAdmin)
admin.site.register(NotNegotiableInvestmentFunds, NotNegotiableInvestmentFundsAdmin)
admin.site.register(NotNegotiableOptionWarrants, NotNegotiableOptionWarrantsAdmin)
admin.site.register(NotNegotiableOptions, NotNegotiableOptionsAdmin)
admin.site.register(NotNegotiableFutures, NotNegotiableFuturesAdmin)
admin.site.register(NotNegotiableStructuredProducts, NotNegotiableStructuredProductsAdmin)
admin.site.register(Loans, LoansAdmin)
admin.site.register(DepositsOverThreeMonths, DepositsOverThreeMonthsAdmin)
admin.site.register(LandRights, LandRightsAdmin)
admin.site.register(OtherInvestments, OtherInvestmentsAdmin)
admin.site.register(InvestmentsBalance, InvestmentsBalanceAdmin)
admin.site.register(NotNegotiableCostCoordinatedCorporateBonds, NotNegotiableCostCoordinatedCorporateBondsAdmin)
admin.site.register(UnusedFramesBorrowers, UnusedFramesBorrowersAdmin)
