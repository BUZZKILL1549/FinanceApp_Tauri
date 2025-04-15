import React, { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import './InvestmentsForm.css';

type Props = {
  closeForm: () => void;
  refreshData: () => void;
};

function InvestmentsForm({ closeForm, refreshData }: Props) {
  const [formData, setFormData] = useState({
    financialOrganization: '',
    nameOfFinancialOrganization: '',
    branchAddress: '',
    typeOfInvestment: '',
    investmentNumber: '',
    investmentHolder: '',
    nominee: '',
    nomineeGuardian: '',
    investmentAmount: '',
    rateOfInterest: '',
    investmentDate: '',
    investmentDuration: '',
    maturityDate: '',
    maturityAmount: '',
  });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const {
        financialOrganization,
        nameOfFinancialOrganization,
        branchAddress,
        typeOfInvestment,
        investmentNumber,
        investmentHolder,
        nominee,
        nomineeGuardian,
        investmentAmount,
        rateOfInterest,
        investmentDate,
        investmentDuration,
        maturityDate,
        maturityAmount
      } = formData;

      const investmentAmountNumber = parseFloat(investmentAmount);
      const rateOfInterestNumber = parseFloat(rateOfInterest);
      const investmentDurationNumber = parseFloat(investmentDuration);
      const maturityAmountNumber = parseFloat(maturityAmount);

      await invoke('insert_investments', {
        financialOrganization,
        nameOfFinancialOrganization,
        branchAddress,
        typeOfInvestment,
        investmentNumber,
        investmentHolder,
        nominee,
        nomineeGuardian,
        investmentAmount: investmentAmountNumber,
        rateOfInterest: rateOfInterestNumber,
        investmentDate,
        investmentDuration: investmentDurationNumber,
        maturityDate,
        maturityAmount: maturityAmountNumber
      });

      console.log('Investments data inserted successfully');
      refreshData();
      closeForm();
    } catch (error) {
      console.error('Failed to insert insurance data: ', error);
    }
  };
 
  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <h2>Add Investment</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Financial Organization</label>
            <input
              type="text"
              name="financialOrganization"
              value={formData.financialOrganization}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Name of Financial Institution: </label>
            <input
              type="text"
              name="nameOfFinancialOrganization"
              value={formData.nameOfFinancialOrganization}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Branch Address: </label>
            <input
              type="text"
              name="branchAddress"
              value={formData.branchAddress}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Type of Investment: </label>
            <input
              type="text"
              name="typeOfInvestment"
              value={formData.typeOfInvestment}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Investment Number: </label>
            <input
              type="text"
              name="investmentNumber"
              value={formData.investmentNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Investment Holder: </label>
            <input
              type="text"
              name="investmentHolder"
              value={formData.investmentHolder}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Nominee: </label>
            <input
              type="text"
              name="nominee"
              value={formData.nominee}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Nominee Guardian: </label>
            <input
              type="text"
              name="nomineeGuardian"
              value={formData.nomineeGuardian}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Investment Amount: </label>
            <input
              type="number"
              name="investmentAmount"
              value={formData.investmentAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Rate of Interest (in %): </label>
            <input
              type="number"
              name="rateOfInterest"
              value={formData.rateOfInterest}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Investment Date: </label>
            <input
              type="date"
              name="investmentDate"
              value={formData.investmentDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Investment Duration (in months): </label>
            <input
              type="text"
              name="investmentDuration"
              value={formData.investmentDuration}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Maturity Date: </label>
            <input
              type="date"
              name="maturityDate"
              value={formData.maturityDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Maturity Amount: </label>
            <input
              type="number"
              name="maturityAmount"
              value={formData.maturityAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="popup-buttons">
            <button type="submit">Add</button>
            <button type="button" onClick={closeForm}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InvestmentsForm;
