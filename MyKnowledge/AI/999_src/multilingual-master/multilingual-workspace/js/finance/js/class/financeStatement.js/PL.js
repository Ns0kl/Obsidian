
// PL
class PL {
    constructor(cost_of_sales, selling, non_operationg_income, extraordinary_income, tax) {
        // 売上関連
        this.cost_of_sales = cost_of_sales
        // 販管費及び一般管理費
        this.selling = selling
        // 営業外収益
        this.non_operationg_income = non_operationg_income
        // 特別損益
        this.extraordinary_income = extraordinary_income
        // 税金
        this.tax = tax
    }
    toString() {
        return `cost_of_sales:${this.cost_of_sales} selling:${this.selling} non_operationg_income:${this.non_operationg_income} extraordinary_income:${this.extraordinary_income} tax:${this.tax}`
    }
}

// 売上原価関連
class cost_of_sales extends PL {
    constructor(sales, purchases) {
        // 売上
        this.sales = sales
        // 仕入
        this.purchases = purchases
    }
    toString() {
        return `sales:${this.sales} purchases:${this.purchases}`
    }
}

// 販管費及び一般管理費
class selling extends PL {
    constructor(directors_compensations, salaries_expense, other_salaries, seasonal_bonuses, employee_retirement_allowance, traveling_expense, advertising_expense,entertainment_expense, welfare_expense, payroll_taxes_expense, packing_and_delivery_expenses, communicatin_expenses, conference_expenses, utilities_expense, upplies_expenses, library_expense, taxes_and_dues, rents, commission_fee, donations_expense, repairs_expense, insurance_expense, rent_expense, depreciation_expense, membership_fee, miscellaneous_expense) {
        // 役員報酬
        this.directors_compensations = directors_compensations
        // 給料
        this.salaries_expense = salaries_expense
        // 雑給
        this.other_salaries = other_salaries
        // 賞与
        this.seasonal_bonuses = seasonal_bonuses
        // 退職金
        this.employee_retirement_allowance = employee_retirement_allowance
        // 旅行交通費
        this.traveling_expense = traveling_expense
        // 広告宣伝費
        this.advertising_expense = advertising_expense
        // 交際費
        this.entertainment_expense = entertainment_expense
        // 福利厚生費
        this.welfare_expense = welfare_expense
        // 法定福利費
        this.payroll_taxes_expense = payroll_taxes_expense
        // 荷造運送費
        this.packing_and_delivery_expenses = packing_and_delivery_expenses
        // 通信費
        this.communicatin_expenses = communicatin_expenses
        // 会議費
        this.conference_expenses = conference_expenses
        // 水道光熱費
        this.utilities_expense = utilities_expense
        // 消耗品費
        this.upplies_expenses = upplies_expenses
        // 新聞図書費
        this.library_expense = library_expense
        // 租税公課
        this.taxes_and_dues = taxes_and_dues
        // 地代家賃
        this.rents = rents
        // 支払手数料
        this.commission_fee = commission_fee
        // 寄付金
        this.donations_expense = donations_expense
        // 修繕費
        this.repairs_expense = repairs_expense
        // 支払保険料
        this.insurance_expense = insurance_expense
        // 賃貸料
        this.rent_expense = rent_expense
        // 減価償却費
        this.depreciation_expense = depreciation_expense
        // 諸会費
        this.membership_fee = membership_fee
        // 雑費
        this.miscellaneous_expense = miscellaneous_expense
    }
    toString() {
        return `directors_compensations:${this.directors_compensations} salaries_expense:${this.salaries_expense} other_salaries:${this.other_salaries} seasonal_bonuses:${this.seasonal_bonuses} employee_retirement_allowance:${this.employee_retirement_allowance} traveling_expense:${this.traveling_expense} advertising_expense:${this.advertising_expense} entertainment_expense:${this.entertainment_expense} welfare_expense:${this.welfare_expense} payroll_taxes_expense:${this.payroll_taxes_expense} packing_and_delivery_expenses:${this.packing_and_delivery_expenses} communicatin_expenses:${this.communicatin_expenses} conference_expenses:${this.conference_expenses} utilities_expense:${this.utilities_expense} upplies_expenses:${this.upplies_expenses} library_expense:${this.library_expense} taxes_and_dues:${this.taxes_and_dues} rents:${this.rents} commission_fee:${this.commission_fee} donations_expense:${this.donations_expense} repairs_expense:${this.repairs_expense} insurance_expense:${this.insurance_expense} rent_expense:${this.rent_expense} depreciation_expense:${this.depreciation_expense} membership_fee:${this.membership_fee} miscellaneous_expense:${this.miscellaneous_expense}`
    }
}

// 営業外収益
class non_operationg_income extends PL {
    constructor(interest_income, interest_expense, dividend_income, loss_on_sales_of_notes_payable, gain_on_sales_of_securities, loss_on_sakes_of_securities, loss_on_valuation_of_investment_securities, net_foreign_currency_translation_gain, foreign_excharge_losses, miscellaneous_income, miscellaneous_loss, rent_income) {
        // 受取利息
        this.interest_income = interest_income
        // 支払利息
        this.interest_expense = interest_expense
        // 受取配当金
        this.dividend_income = dividend_income
        // 手形売却損
        this.loss_on_sales_of_notes_payable = loss_on_sales_of_notes_payable
        // 有価証券売却益
        this.gain_on_sales_of_securities = gain_on_sales_of_securities
        // 有価証券売却損
        this.loss_on_sakes_of_securities = loss_on_sakes_of_securities
        // 有価証券評価損
        this.loss_on_valuation_of_investment_securities = loss_on_valuation_of_investment_securities
        // 為替差益
        this.net_foreign_currency_translation_gain = net_foreign_currency_translation_gain
        // 為替差損
        this.foreign_excharge_losses = foreign_excharge_losses
        // 雑収入
        this.miscellaneous_income = miscellaneous_income
        // 雑損失
        this.miscellaneous_loss = miscellaneous_loss
        // 受取賃料
        this.rent_income = rent_income
    }
    toString() {
        return `interest_income:${this.interest_income} interest_expense:${this.interest_expense} dividend_income:${this.dividend_income} loss_on_sales_of_notes_payable:${this.loss_on_sales_of_notes_payable} gain_on_sales_of_securities:${this.gain_on_sales_of_securities} gain_on_sales_of_securities:${this.gain_on_sales_of_securities} loss_on_sakes_of_securities:${this.loss_on_sakes_of_securities} loss_on_sakes_of_securities:${this.loss_on_sakes_of_securities} loss_on_valuation_of_investment_securities:${this.loss_on_valuation_of_investment_securities} net_foreign_currency_translation_gain:${this.net_foreign_currency_translation_gain} foreign_excharge_losses:${this.foreign_excharge_losses} miscellaneous_income:${this.miscellaneous_income} miscellaneous_loss:${this.miscellaneous_loss} rent_income:${this.rent_income}`
    }
}

// 特別損益
class extraordinary_income extends PL {
    constructor(gain_on_bad_debts_recovered, gain_on_sales_of_property, loss_on_sales_of_property, loss_on_disposal_of_property, gain_on_prior_period_adjustment, loss_on_prior_period_adjustment) {
        // 償却債権取立益
        this.gain_on_bad_debts_recovered = gain_on_bad_debts_recovered
        // 固定資産売却益
        this.gain_on_sales_of_property = gain_on_sales_of_property
        // 固定資産売却損
        this.loss_on_sales_of_property = loss_on_sales_of_property
        // 固定資産除去損
        this.loss_on_disposal_of_property = loss_on_disposal_of_property
        // 前期損益修正益
        this.gain_on_prior_period_adjustment = gain_on_prior_period_adjustment
        // 前期損益修正損
        this.loss_on_prior_period_adjustment = loss_on_prior_period_adjustment
    }
    toString() {
        return `gain_on_bad_debts_recovered:${this.gain_on_bad_debts_recovered} gain_on_sales_of_property:${this.gain_on_sales_of_property} loss_on_sales_of_property:${this.loss_on_sales_of_property} loss_on_disposal_of_property:${this.loss_on_disposal_of_property} gain_on_prior_period_adjustment:${this.gain_on_prior_period_adjustment} loss_on_prior_period_adjustment:${this.loss_on_prior_period_adjustment}`
    }
}

// 税金等
class tax extends PL {
    constructor(income_taxes_current) {
        // 法人税、住民税及び事業税
        this.income_taxes_current = income_taxes_current
    }
    toString() {
        return `income_taxes_current:${this.income_taxes_current}`
    }
}
