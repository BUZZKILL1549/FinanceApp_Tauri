import React, { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import './InsuranceForm.css';

type Props = {
  closeForm: () => void;
};

function InsuranceForm({ closeForm }: Props) {
  const [formData, setFormData] = useState({
    insuranceProvider: '',
    policyNumber: '',
    policyName: '',
    policyHolder: '',
    lifeInsured: '',
    sumAssured: '',
    nominee: '',
    policyPaymentTerm: '',
    premiumPaymentFrequency: '',
    lastPremiumPaid: '',
    nextPremiumDue: '',
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
        insuranceProvider,
        policyNumber,
        policyName,
        policyHolder,
        lifeInsured,
        sumAssured,
        nominee,
        policyPaymentTerm,
        premiumPaymentFrequency,
        lastPremiumPaid,
        nextPremiumDue,
        maturityDate,
        maturityAmount,
      } = formData;

      // Convert form values to appropriate types where necessary
      const sumAssuredNumber = parseFloat(sumAssured);
      const policyPaymentTermNumber = parseInt(policyPaymentTerm, 10);
      const premiumPaymentFrequencyNumber = parseInt(premiumPaymentFrequency, 10);
      const maturityAmountNumber = parseFloat(maturityAmount);

      // Call the Tauri backend command to insert insurance data
      await invoke('insert_insurance', {
        insuranceProvider,
        policyNumber,
        policyName,
        policyHolder,
        lifeInsured,
        sumAssured: sumAssuredNumber,
        nominee,
        policyPaymentTerm: policyPaymentTermNumber,
        premiumPaymentFrequency: premiumPaymentFrequencyNumber,
        lastPremiumPaid,
        nextPremiumDue,
        maturityDate,
        maturityAmount: maturityAmountNumber,
      });

      console.log('Insurance data inserted successfully');
      closeForm(); // Close the form after successful submission
    } catch (error) {
      console.error('Failed to insert insurance data:', error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <h2>Add Insurance</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Insurance Provider: </label>
            <input
              type="text"
              name="insuranceProvider"
              value={formData.insuranceProvider}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Policy Number: </label>
            <input
              type="text"
              name="policyNumber"
              value={formData.policyNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Policy Name: </label>
            <input
              type="text"
              name="policyName"
              value={formData.policyName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Policy Holder: </label>
            <input
              type="text"
              name="policyHolder"
              value={formData.policyHolder}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Life Insured: </label>
            <input
              type="text"
              name="lifeInsured"
              value={formData.lifeInsured}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Sum Assured: </label>
            <input
              type="number"
              name="sumAssured"
              value={formData.sumAssured}
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
            <label>Policy Payment Term (in years): </label>
            <input 
              type="number"
              name="policyPaymentTerm"
              value={formData.policyPaymentTerm}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Premium Payment Frequency: </label>
            <input 
              type="text"
              name="premiumPaymentFrequency"
              value={formData.premiumPaymentFrequency}
              onChange={handleChange}
              placeholder="Annual/Bi-annual/Semi-annual"
              required 
            />
          </div>
          <div>
            <label>Last Premium Paid: </label>
            <input
              type="date"
              name="lastPremiumPaid"
              value={formData.lastPremiumPaid}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Next Premium Due: </label>
            <input 
              type="date"
              name="nextPremiumDue"
              value={formData.nextPremiumDue}
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

export default InsuranceForm;
