// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rusqlite::{Connection, Result};

#[derive(serde::Serialize, Debug)]
struct Insurance {
    insurance_provider: String,
    policy_number: String,
    policy_name: String,
    policy_holder: String,
    life_insured: String,
    sum_assured: f64,
    nominee: String,
    policy_payment_term: i32,
    premium_payment_frequency: i32,
    last_premium_paid: String,
    next_premium_due: String,
    maturity_date: String,
    maturity_amount: i32,
}

#[tauri::command]
fn initialize_database() -> Result<(), String> {
    let connection = Connection::open("app_data.sqlite").map_err(|e| e.to_string())?;

    connection
        .execute(
            "
            CREATE TABLE IF NOT EXISTS insurance (
                InsuranceProvider           VARCHAR(60),
                PolicyNumber                VARCHAR(60),
                PolicyName                  VARCHAR(60),
                PolicyHolder                VARCHAR(60),
                LifeInsured                 VARCHAR(60),
                SumAssured                  FLOAT,
                Nominee                     VARCHAR(60),
                PolicyPaymentTerm           INTEGER,
                PremiumPaymentFrequency     INTEGER,
                LastPremiumPaid             TEXT,
                NextPremiumDue              TEXT,
                MaturityDate                TEXT,
                MaturityAmount              INTEGER
            );
            ",
            (),
        )
        .map_err(|e| e.to_string())?;

    connection
        .execute(
            "
            CREATE TABLE IF NOT EXISTS investments (
                FinancialOrganization       VARCHAR(60),
                NameOfFinancialOrganization VARCHAR(60),
                BranchAddress               TEXT,
                TypeOfInvestment            VARCHAR(60),
                InvestmentNumber            VARCHAR(60),
                InvestmentHolder            VARCHAR(60),
                Nominee                     VARCHAR(60),
                NomineeGuardian             VARCHAR(60),
                InvestmentAmount            FLOAT,
                RateOfInterest              FLOAT,
                InvestmentDate              TEXT,
                InvestmentDuration          FLOAT,
                MaturityDate                TEXT,
                MaturityAmount              FLOAT
            );
            ",
            (),
        )
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
fn get_insurance_data() -> Result<Vec<Insurance>, String> {
    let connection = Connection::open("app_data.sqlite").map_err(|e| e.to_string())?;

    let mut statement = connection
        .prepare(
            "
            SELECT InsuranceProvider, PolicyNumber, PolicyName, PolicyHolder, 
                   LifeInsured, SumAssured, Nominee, PolicyPaymentTerm, 
                   PremiumPaymentFrequency, LastPremiumPaid, NextPremiumDue, 
                   MaturityDate, MaturityAmount 
            FROM insurance;
            ",
        )
        .map_err(|e| e.to_string())?;

    let insurance_data = statement
        .query_map([], |row| {
            Ok(Insurance {
                insurance_provider: row.get(0)?,
                policy_number: row.get(1)?,
                policy_name: row.get(2)?,
                policy_holder: row.get(3)?,
                life_insured: row.get(4)?,
                sum_assured: row.get(5)?,
                nominee: row.get(6)?,
                policy_payment_term: row.get(7)?,
                premium_payment_frequency: row.get(8)?,
                last_premium_paid: row.get(9)?,
                next_premium_due: row.get(10)?,
                maturity_date: row.get(11)?,
                maturity_amount: row.get(12)?,
            })
        })
        .map_err(|e| e.to_string());

    let insurance_vec: Vec<Insurance> = insurance_data?
        .collect::<Result<Vec<_>, _>>()
        .map_err(|e| e.to_string())?;

    println!("Fetched insurance data: {:?}", insurance_vec);

    Ok(insurance_vec)
}

#[tauri::command]
fn insert_insurance(
    insurance_provider: String,
    policy_number: String,
    policy_name: String,
    policy_holder: String,
    life_insured: String,
    sum_assured: f64,
    nominee: String,
    policy_payment_term: i32,
    premium_payment_frequency: i32,
    last_premium_paid: String,
    next_premium_due: String,
    maturity_date: String,
    maturity_amount: i32,
) -> Result<(), String> {
    let connection = Connection::open("app_data.sqlite").map_err(|e| e.to_string())?;

    connection
        .execute(
            "INSERT INTO insurance (
            InsuranceProvider, PolicyNumber, PolicyName,
            PolicyHolder, LifeInsured, SumAssured, Nominee,
            PolicyPaymentTerm, PremiumPaymentFrequency, 
            LastPremiumPaid, NextPremiumDue, MaturityDate, MaturityAmount
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (
                insurance_provider,
                policy_number,
                policy_name,
                policy_holder,
                life_insured,
                sum_assured,
                nominee,
                policy_payment_term,
                premium_payment_frequency,
                last_premium_paid,
                next_premium_due,
                maturity_date,
                maturity_amount,
            ),
        )
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
fn insert_investments(
    financial_organization: String,
    name_of_financial_organization: String,
    branch_address: String,
    type_of_investment: String,
    investment_number: String,
    investment_holder: String,
    nominee: String,
    nominee_guardian: String,
    investment_amount: f64,
    rate_of_interest: f64,
    investment_date: String,
    investment_duration: f64,
    maturity_date: String,
    maturity_amount: u32,
) -> Result<(), String> {
    let connection = Connection::open("app_data.sqlite").unwrap();

    connection
        .execute(
            "
            INSERT INTO investments (
                FinancialOrganization, NameOfFinancialOrganization, BranchAddress,
                TypeOfInvestment, InvestmentNumber, investment_holder, Nominee,
                NomineeGuardian, InvestmentAmount, RateOfInterest, InvestmentDate,
                InvestmentDuration, MaturityDate, MaturityAmount
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            ",
            (
                financial_organization,
                name_of_financial_organization,
                branch_address,
                type_of_investment,
                investment_number,
                investment_holder,
                nominee,
                nominee_guardian,
                investment_amount,
                rate_of_interest,
                investment_date,
                investment_duration,
                maturity_date,
                maturity_amount,
            ),
        )
        .map_err(|e| e.to_string())?;

    Ok(())
}

fn main() {
    if let Err(error) = initialize_database() {
        eprintln!("Failed to initialize database: {}", error);
        std::process::exit(1);
    }

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            initialize_database,
            get_insurance_data,
            insert_insurance,
            insert_investments,
        ])
        .run(tauri::generate_context!())
        .expect("Error while running Tauri application");

    finance_app_lib::run()
}
