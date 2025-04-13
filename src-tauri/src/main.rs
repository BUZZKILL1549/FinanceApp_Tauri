// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use sqlite::Connection;
use tauri::Manager;

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
                MaturityAmount              INTEGER,
            );
            ",
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
                MaturityAmount              FLOAT,
            );
            ",
        )
        .map_err(|e| e.to_string())?;

    Ok(())
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
    policy_payment_term: u32,
    premium_payment_frequency: u32,
    last_premium_paid: String,
    next_premium_due: String,
    maturity_date: String,
    maturity_amount: u32,
) {
    let connection = Connection::open("app_data.sqlite").unwrap();

    let mut statement = connection
        .prepare(
            "
            INSERT INTO insurance (
                InsuranceProvider, PolicyNumber, PolicyName,
                PolicyHolder, LifeInsured, SumAssured, Nominee,
                PolicyPaymentTerm, PremiumPaymentFrequency, 
                LastPremiumPaid, NextPremiumDue, MaturityDate, MaturityAmount
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            ",
        )
        .map_err(|e| e.to_string());
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
) {
    let connection = Connection::open("app_data.sqlite").unwrap();

    let mut statement = connection
        .prepare(
            "
            INSERT INTO investments (
                FinancialOrganization, NameOfFinancialOrganization, BranchAddress,
                TypeOfInvestment, InvestmentNumber, investment_holder, Nominee,
                NomineeGuardian, InvestmentAmount, RateOfInterest, InvestmentDate,
                InvestmentDuration, MaturityDate, MaturityAmount
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            ",
        )
        .map_err(|e| e.to_string());
}

fn main() {
    finance_app_lib::run()
}
