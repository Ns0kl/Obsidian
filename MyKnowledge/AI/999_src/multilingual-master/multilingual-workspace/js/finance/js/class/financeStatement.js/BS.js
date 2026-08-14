// BS
export class BS {
    constructor(assets, liability, net_assets) {
        this.assets = assets
        this.liability = liability
        this.net_assets = net_assets
    }
    toString() {
        return `assets:${this.assets} liability:${this.liability} net_assets:${this.net_assets}`
    }
}

// 資産
class assets extends BS {
    constructor(current_assets, non_current_assets, investments_and_other_assets) {
        this.current_assets = current_assets
        this.non_current_assets = non_current_assets
        this.investments_and_other_assets = investments_and_other_assets
    }
    toString() {
        return `current_assets:${this.current_assets} non_ccurent_assets:${this.non_current_assets} investments_and_other_assets:${this.investments_and_other_assets}`
    }
}

// 流動資産
class current_assets extends assets {
    constructor(cash,checking_accounts,savings_accounts,notice_account,time_deposits,installment_savings_account,trade_notes_receivable,trade_accounts_receivable,allowance_for_doubtful_accounts,marketable_securities,inventory) {
        //現金	
        this.cash = cash
        //当座預金	
        this.checking_accounts = checking_accounts
        //普通預金	
        this.savings_accounts = savings_accounts
        //通知預金	
        this.notice_account = notice_account
        //定期預金	
        this.time_deposits = time_deposits
        //定期積金	
        this.installment_savings_account = installment_savings_account
        //受取手形	
        this.trade_notes_receivable = trade_notes_receivable
        //売掛金	
        this.trade_accounts_receivable = trade_accounts_receivable
        //貸倒引当金	
        this.allowance_for_doubtful_accounts = allowance_for_doubtful_accounts
        //有価証券	
        this.marketable_securities = marketable_securities
        // 棚卸資産
        this.inventory = inventory
    }
    toString(){
        return `cash:${this.cash} checking_account:${this.checking_accounts} saving_account:${this.savings_accounts} notice_account:${this.notice_account} time_deposits:${this.time_deposits} time_deposits:${this.time_deposits} installment_savings_account:${this.installment_savings_account} trade_notes_receivable:${this.trade_notes_receivable} trade_accounts_receivable:${this.trade_accounts_receivable} allowance_for_doubtful_accounts:${this.allowance_for_doubtful_accounts} marketable_securities :${this.marketable_securities} investory:${this.inventory}`
    }
}

// 棚卸資産
class inventory extends current_assets {
    constructor(merchandise,finished_goods, work_in_process, raw_materials, stock_account, advance_payments_trade, advances_paid, loans_receivable, accounts_recievable_other, accrued_income, prepaid_expenses, suspense_payments, suspense_paid_consumption_tax) {
        // 商品
        this.merchandise = merchandise
        // 製品
        this.finished_goods = finished_goods
        // 仕掛品
        this.work_in_process = work_in_process
        // 原材料
        this,raw_materials = raw_materials
        // 貯蔵品
        this.stock_account = stock_account
        // 前渡金
        this.advance_payments_trade = advance_payments_trade
        // 立替金
        this.advances_paid = advances_paid
        // 短期貸付金
        this.loans_receivable = loans_receivable
        // 未収入金
        this.accounts_recievable_other = accounts_recievable_other
        // 未収収益
        this.accrued_income = accrued_income
        // 前払費用
        this.prepaid_expenses = prepaid_expenses
        // 仮払金
        this.suspense_payments = suspense_payments
        // 仮払消費税
        this.suspense_paid_consumption_tax = suspense_paid_consumption_tax
    }
    toString() {
        return `merchandise:${this.merchandise} finished_goods:${this.finished_goods} work_in_process:${this.work_in_process} raw_materials:${this.raw_materials} stock_account:${this.stock_account} advance_payments_trade:${this.advance_payments_trade} advances_paid:${this.advances_paid} loans_receivable:${this.loans_receivable} accounts_recievable_other:${this.accounts_recievable_other} accrued_income:${this.accrued_income} prepaid_expenses:${this.prepaid_expenses} suspense_payments:${this.suspense_payments} suspense_paid_consumption_tax:${this.suspense_paid_consumption_tax}`
    }
}

// 固定資産
class non_curent_assets extends assets {
    constructor(plant_and_equipment, intangible_assets) {
        this.plant_and_equipment = plant_and_equipment
        this.intangible_assets = intangible_assets
    }
    toString() {
        return `plant_and_equipment:${this.plant_and_equipment} intangible_assets:${this.intangible_assets}`
    }
}

// 有形固定資産
class plant_and_equipment extends non_curent_assets {
    constructor(buildings, buildings_and_accompanying_facilities, structures, machinery_and_equipment, vehicles, tools, land, construction_in_progress, accumulated_depreciation) {
        // 建物
        this.buildings = buildings
        // 建物付属設備
        this.buildings_and_accompanying_facilities = buildings_and_accompanying_facilities
        // 構築物
        this.structures = structures
        // 機械装置
        this.machinery_and_equipment = machinery_and_equipment
        // 車両運搬器具
        this.vehicles = vehicles
        // 工具器具備品
        this.tools = tools
        // 土地
        this.land = land
        // 建物仮勘定
        this.construction_in_progress = construction_in_progress
        // 減価償却累計額
        this.accumulated_depreciation = accumulated_depreciation
    }
    toString() {
        return `buildings:${this.buildings} buildings_and_accompanying_facilities: ${this.buildings_and_accompanying_facilities} structures:${this.structures} machinery_and_equipment:${this.machinery_and_equipment} vehicles:${this.vehicles} tools:${this.tools} land:${this.land} construction_in_progress:${this.construction_in_progress} accumulated_depreciation:${this.accumulated_depreciation}`
    }
}

// 無形固定資産
class intangible_assets extends non_curent_assets {
    constructor(goodwill, patents, leasehold_rights, telephone_subscription_right, software) {
        // 営業権
        this.goodwill = goodwill
        // 特許権
        this.patents = patents
        // 借地権
        this.leasehold_rights = leasehold_rights
        // 電話加入権
        this.telephone_subscription_right = telephone_subscription_right
        // ソフトウェア
        this.software = software
    }
    toString() {
        return `goodwill:${this.goodwill} patents:${this.patents} leasehold_rights:${this.leasehold_rights} telephone_subscription_right:${this.telephone_subscription_right} software:${this.software}`
    }
}

// 投資等
class investments_and_other_assets extends assets {
    constructor(investment_securities, investments_in_capital, long_term_loans_receivable, claims_provable_in_rehabilitation_and_other, guarantee_deposits, long_term_prepaid_expenses, insurance_funds, deferred_assets) {
        // 投資有価証券
        this.investment_securities = investment_securities
        // 出資金
        this.investments_in_capital = investments_in_capital
        // 長期貸付
        this.long_term_loans_receivable = long_term_loans_receivable
        // 破産債権等
        this.claims_provable_in_rehabilitation_and_other = claims_provable_in_rehabilitation_and_other
        // 差入保証金
        this.guarantee_deposits = guarantee_deposits
        // 長期前払金
        this.long_term_prepaid_expenses = long_term_prepaid_expenses
        // 保険積立金
        this.insurance_funds = insurance_funds
        // 繰越資産
        this.deferred_assets = deferred_assets
    }
    toString() {
        return `investment_securities:${this.investment_securities} investments_in_capital:${this.investments_in_capital} long_term_loans_receivable:${this.long_term_loans_receivable} claims_provable_in_rehabilitation_and_other :${this.claims_provable_in_rehabilitation_and_other} guarantee_deposits:${this.guarantee_deposits} long_term_prepaid_expenses:${this.long_term_prepaid_expenses} insurance_funds:${this.insurance_funds} deferred_assets:${this.deferred_assets}`
    }
}

// 繰越資産
class deferred_assets extends investments_and_other_assets {
    constructor(organization_costs, start_up_costs, development_expenses,experiment_and_research_expenses, stock_issuance_cost, bond_issuance_cost, bond_issuance_discount, withdrawals_by_owner) {
        // 創立費
        this.organization_costs = organization_costs
        // 開業費
        this.start_up_costs = start_up_costs
        // 開発費
        this.development_expenses = development_expenses
        // 試験研究費
        this.experiment_and_research_expenses = experiment_and_research_expenses
        // 新株発行費
        this.stock_issuance_cost = stock_issuance_cost
        // 社債発行費
        this.bond_issuance_cost = bond_issuance_cost
        // 社債発行差金
        this.bond_issuance_discount = bond_issuance_discount
        // 事業主貸
        this.withdrawals_by_owner = withdrawals_by_owner
    }
    toString() {
        return `organization_costs:${this.organization_costs} start_up_costs:${this.start_up_costs} development_expenses:${this.development_expenses} experiment_and_research_expenses:${this.experiment_and_research_expenses} stock_issuance_cost:${this.stock_issuance_cost} bond_issuance_cost:${this.bond_issuance_cost} bond_issuance_discount:${this.bond_issuance_discount} withdrawals_by_owner:${this.withdrawals_by_owner}`
    }
}

// 負債
class liability extends BS {
    constructor(current_liability, provision, non_current_liability) {
        this.current_liability = current_liability
        this.provision = provision
        this.non_current_liability = non_current_liability
    }
    toString() {
        return `current_liability:${this.current_liability} provision:${this.provision} non_current_liability:${this.non_current_liability} `
    }
}

// 流動負債
class current_liability extends liability {
    constructor(notes, accounts_payable, advance_received, short_item_loan_payable_long_term_debt_with_current_maturities, accounts_payable_other, accured_expenses ,withholdings, deferred_revenues, suspense_received_accures_consumption_tax, comsumption_tax_payable, income_taxes_payable) {
        // 支払手形
        this.notes = notes
        // 買掛金
        this.accounts_payble = accounts_payable
        // 前受金
        this.advance_received = advance_received
        // 短期借入金
        this.short_item_loan_payable_long_term_debt_with_current_maturities = short_item_loan_payable_long_term_debt_with_current_maturities
        // 未払金
        this.accounts_payable_other = accounts_payable_other
        // 未払費用
        this.accured_expenses = accured_expenses
        // 預り金
        this.withholdings = withholdings
        // 前受収益
        this.deferred_revenues = deferred_revenues
        // 仮受消費税
        this.suspense_received_accures_consumption_tax = suspense_received_accures_consumption_tax
        // 未払消費税
        this.comsumption_tax_payable = comsumption_tax_payable
        // 未払法人税等
        this.income_taxes_payable = income_taxes_payable
    }
    toString() {
        return `notes:${this.notes} accounts_payable:${this.accounts_payable} advance_received:${this.advance_received} short_item_loan_payable_long_term_debt_with_current_maturities:${this.short_item_loan_payable_long_term_debt_with_current_maturities} accounts_payable_other:${this.accounts_payable_other} accured_expenses:${this.accured_expenses} withholdings:${this.withholdings} deferred_revenues:${this.deferred_revenues} suspense_received_accures_consumption_tax :${this.suspense_received_accures_consumption_tax } comsumption_tax_payable:${this.comsumption_tax_payable} income_taxes_payable:${this.income_taxes_payable}`
    }
}

// 引当金
class provision extends liability {
    constructor(allowance_for_employee_bonuses, employee_pension_and_benefits) {
        // 賞与引当金
        this.allowance_for_doubtful_accounts = allowance_for_employee_bonuses
        // 退職金給付引当金
        this.employee_pension_and_benefits = employee_pension_and_benefits
    }
    toString() {
        return `allowance_for_doubtful_accounts:${this.allowance_for_doubtful_accounts} employee_pension_and_benefits:${this.employee_pension_and_benefits}`
    }
}

// 固定負債
class non_current_liability extends liability {
    constructor(bonds, long_term_debt, investments_by_owner) {
        // 社債
        this.bonds = bonds
        // 長期借入金
        this.long_term_debt = long_term_debt
        // 事業主借
        this.investments_by_owner = investments_by_owner
    }
    toString() {
        return `bonds:${this.bonds} long_term_debt:${this.long_term_debt} investments_by_owner:${this.investments_by_owner}`
    }
}

// 純資産部
class net_assets extends BS {
    constructor(capital_stock, capital_reserve, capital_surplus, legal_reserve_of_retained_earnings, voluntary_retained_earnings, retained_earnings, retained_earnings_brought_forawrd, capital) {
        // 資本金
        this.capital_stock = capital_stock
        // 資本準備金
        this.capital_reserve = capital_reserve
        // その他資本余剰金
        this.capital_surplus = capital_surplus
        // 利益準備金
        this.legal_reserve_of_retained_earnings = legal_reserve_of_retained_earnings
        // 任意積立金
        this.voluntary_retained_earnings = voluntary_retained_earnings
        // その他利益余剰金
        this.retained_earnings = retained_earnings
        // 繰越利益剰余金
        this.retained_earnings_brought_forawrd = retained_earnings_brought_forawrd
        // 元入金
        this.capital = capital
    }
    toString() {
        return `capital_stock:${this.capital_stock} capital_reserve:${this.capital_reserve} capital_surplus:${this.capital_surplus} legal_reserve_of_retained_earnings:${this.legal_reserve_of_retained_earnings} voluntary_retained_earnings:${this.voluntary_retained_earnings} retained_earnings:${this.retained_earnings} retained_earnings_brought_forawrd:${this.retained_earnings_brought_forawrd} capital:${this.capital}`
    }
}

