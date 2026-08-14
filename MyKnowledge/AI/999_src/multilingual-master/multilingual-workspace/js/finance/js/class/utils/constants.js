
// BS
const BS = '貸借対照表';
const ASSETS = '資産';
const LIABILITY = '負債';
const NET_ASSETS = '純資産';
// 資産
const CURRENT_ASSETS = '流動資産';
const NON_CURRENT_ASSETS = '固定資産';
const INVESTMENTS_AND_OTHER_ASSETS = '投資等';
// 流動資産
const CASH = '現金';
const CHECKING_ACCOUNTS = '当座預金';
const SAVINGS_ACCOUNTS = '普通預金';
const NOTICE_ACCOUNT = '通知預金';
const TIME_DEPOSITS = '定期預金';
const INSTALLMENT_SAVINGS_ACCOUNT = '定期積金';
const TRADE_NOTES_RECEIVABLE = '受取手形';
const TRADE_ACCOUNTS_RECEIVABLE = '売掛金';
const ALLOWANCE_FOR_DOUBTFUL_ACCOUNTS = '貸倒引当金';
const MARKETABLE_SECURITIES = '有価証券';
const INVENTORY = '棚卸資産';
// 棚卸資産
const MERCHANDISE = '商品';
const FINISHED_GOODS = '製品';
const WORK_IN_PROCESS = '仕掛品';
const RAW_MATERIALS = '原材料';
const STOCK_ACCOUNT = '貯蔵品';
const ADVANCE_PAYMENTS_TRADE = '前渡金';
const ADVANCES_PAID = '立替金';
const LOANS_RECEIVABLE = '短期貸付金';
const ACCOUNTS_RECIEVABLE_OTHER = '未収入金';
const ACCRUED_INCOME = '未収収益';
const PREPAID_EXPENSES = '前払費用';
const SUSPENSE_PAYMENTS = '仮払金';
const SUSPENSE_PAID_CONSUMPTION_TAX = '仮払消費税';
// 固定資産
const PLANT_AND_EQUIPMENT = '有形固定資産';
const INTANGIBLE_ASSETS = '無形固定資産';
// 有形固定資産
const BUILDINGS = '建物';
const BUILDINGS_AND_ACCOMPANYING_FACILITIES = '建物付属設備';
const STRUCTURES = '構築物';
const MACHINERY_AND_EQUIPMENT = '機械装置';
const VEHICLES = '車両運搬具';
const TOOLS = '工具器具備品';
const LAND = '土地';
const CONSTRUCTION_IN_PROGRESS = '建物仮勘定';
const ACCUMULATED_DEPRECIATION = '減価償却累計額';
// 無形固定資産
const GOODWILL = '営業権';
const PATENTS = '特許権';
const LEASEHOLD_RIGHTS = '借地権';
const TELEPHONE_SUBSCRIPTION_RIGHT = '電話加入権';
const SOFTWARE = 'ソフトウェア';
// 投資等
const INVESTMENT_SECURITIES = '投資有価証券';
const INVESTMENTS_IN_CAPITAL = '出資金';
const LONG_TERM_LOANS_RECEIVABLE = '長期貸付金';
const CLAIMS_PROVABLE_IN_REHABILITATION_AND_OTHER = '破産債権等';
const GUARANTEE_DEPOSITS = '差入保証金';
const LONG_TERM_PREPAID_EXPENSES = '長期前払金';
const INSURANCE_FUNDS = '保険積立金';
const DEFERRED_ASSETS = '繰越資産';
// 繰越資産
const ORGANIZATION_COSTS = '創立費';
const START_UP_COSTS = '開業費';
const DEVELOPMENT_EXPENSES = '開発費';
const EXPERIMENT_AND_RESEARCH_EXPENSES = '試験研究費';
const STOCK_ISSUANCE_COST = '新株発行費';
const BOND_ISSUANCE_COST = '社債発行費';
const BOND_ISSUANCE_DISCOUNT = '社債発行差金';
const WITHDRAWALS_BY_OWNER = '事業主貸';
// 負債
const CURRENT_LIABILITY = '流動負債';
const PROVISION = '引当金';
const NON_CURRENT_LIABILITY = '固定負債';
// 流動負債
const NOTES = '支払手形';
const ACCOUNTS_PAYABLE = '買掛金';
const ADVANCE_RECEIVED = '前受金';
const SHORT_ITEM_LOAN_PAYABLE_LONG_TERM_DEBT_WITH_CURRENT_MATURITIES = '短期借入金';
const ACCOUNTS_PAYABLE_OTHER = '未払金';
const ACCURED_EXPENSES = '未払費用';
const WITHHOLDINGS = '預り金';
const DEFERRED_REVENUES = '前受金';
const SUSPENSE_RECEIVED_ACCURES_CONSUMPTION_TAX = '仮受消費税';
const COMSUMPTION_TAX_PAYABLE = '未払消費税';
const INCOME_TAXES_PAYABLE = '未払法人税等';
// 引当金
const ALLOWANCE_FOR_EMPLOYEE_BONUSES = '賞与引当金';
const EMPLOYEE_PENSION_AND_BENEFITS = '退職金給付引当金';
// 固定負債
const BONDS = '社債';
const LONG_TERM_DEBT = '長期借入金';
const INVESTMENTS_BY_OWNER = '事業主借';
// 純資産部
const CAPITAL_STOCK = '資本金';
const CAPITAL_RESERVE = '資本準備金';
const CAPITAL_SURPLUS = 'その他資本剰余金';
const LEGAL_RESERVE_OF_RETAINED_EARNINGS = '利益準備金';
const VOLUNTARY_RETAINED_EARNINGS = '任意積立金';
const RETAINED_EARNINGS = 'その他利益余剰金';
const RETAINED_EARNINGS_BROUGHT_FORAWRD = '繰越利益剰余金';
const CAPITAL = '元入金';


// PL
const PL = '損益計算書';
const COST_OF_SALES = '売上関連';
const SELLING = '販管費及び一般管理費';
const NON_OPERATING_INCOME = '営業外収益';
const EXTRAORDINARY_INCOME = '特別損益';
const TAX = '税金';
// 売上原価関連
const SALES = '売上';
const PURCHASES = '仕入';
// 販管費及び一般管理費
const DIRECTORS_COMPENSATIONS = '役員報酬';
const SALARIES_EXPENSE = '給料';
const OTHER_SALARIES = '雑給';
const SEASONAL_BONUSES = '賞与';
const EMPLOYEE_RETIREMENT_ALLOWANCE = '退職金';
const TRAVELING_EXPENSE = '旅行交通費';
const ADVERTISING_EXPENSE = '広告宣伝費';
const ENTERTAINMENT_EXPENSE = '交際費';
const WELFARE_EXPENSE = '福利厚生費';
const PAYROLL_TAXES_EXPENSE = '法定福利費';
const PACKING_AND_DELIVERY_EXPENSES = '荷造運送費';
const COMMUNICATION_EXPENSES = '通信費';
const CONFERENCE_EXPENSES = '会議費';
const UTILITIES_EXPENSE = '水道光熱費';
const SUPPLIES_EXPENSES = '消耗品費';
const LIBRARY_EXPENSE = '新聞図書費';
const TAXES_AND_DUES = '租税公課';
const RENTS = '地代家賃';
const COMMISSION_FEE = '支払手数料';
const DONATIONS_EXPENSE = '寄付金';
const REPAIRS_EXPENSE = '修繕費';
const INSURANCE_EXPENSE = '支払保険料';
const RENT_EXPENSE = '賃貸料';
const DEPRECIATION_EXPENSE = '減価償却費';
const MEMBERSHIP_FEE = '諸会費';
const MISCELLANEOUS_EXPENSE = '雑費';
// 営業外収益
const INTEREST_INCOME = '受取利息';
const INTEREST_EXPENSE = '支払利息';
const DIVIDEND_INCOME = '受取配当金';
const LOSS_ON_SALES_OF_NOTES_PAYABLE = '手形売却損';
const GAIN_ON_SALES_OF_SECURITIES = '有価証券売却益';
const LOSS_ON_SALES_OF_SECURITIES = '有価証券売却損';
const LOSS_ON_VALUATION_OF_INVESTMENT_SECURITIES = '有価証券評価損';
const NET_FOREIGN_CURRENCY_TRANSLATION_GAIN = '為替差益';
const FOREIGN_EXCHANGE_LOSSES = '為替差損';
const MISCELLANEOUS_INCOME = '雑収入';
const MISCELLANEOUS_LOSS = '雑損失';
const RENT_INCOME = '受取賃料';
// 特別損益
const GAIN_ON_BAD_DEBTS_RECOVERED = '償却債権取立益';
const GAIN_ON_SALES_OF_PROPERTY = '固定資産売却益';
const LOSS_ON_SALES_OF_PROPERTY = '固定資産売却損';
const LOSS_ON_DISPOSAL_OF_PROPERTY = '固定資産除去損';
const GAIN_ON_PRIOR_PERIOD_ADJUSTMENT = '前期損益修正益';
const LOSS_ON_PRIOR_PERIOD_ADJUSTMENT = '前期損益修正損';
// 税金等
const INCOME_TAXES_CURRENT = '法人税、住民税及び事業税';

