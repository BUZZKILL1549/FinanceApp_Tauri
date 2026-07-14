import React, { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import './InsuranceForm.css';

type Props = {
  closeForm: () => void;
  refreshData: () => void;
};

interface InsuranceFormData {
  insuranceProvider: string;
  policyNumber: string;
  policyName: string;
  policyHolder: string;
  lifeInsured: string;
  sumAssured: string; 
  nominee: string;
  policyPaymentTerm: string;
  premiumPaymentFrequency: string; 
  lastPremiumPaid: string;
  nextPremiumDue: string;
  maturityDate: string;
  maturityAmount: string;
}

function InsuranceForm({ closeForm, refreshData }: Props) {
  const [formData, setFormData] = useState<InsuranceFormData>({
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateNumbers = () => {
    const sumAssuredNumber = parseFloat(formData.sumAssured);
    const policyPaymentTermNumber = parseInt(formData.policyPaymentTerm, 10);
    const maturityAmountNumber = parseFloat(formData.maturityAmount);

    if (!Number.isFinite(sumAssuredNumber) || sumAssuredNumber < 0) {
      alert('Please provide a valid Sum Assured.');
      return false;
    }
    if (!Number.isFinite(policyPaymentTermNumber) || policyPaymentTermNumber <= 0) {
      alert('Please provide a valid Policy Payment Term (years).');
      return false;
    }
    if (!Number.isFinite(maturityAmountNumber) || maturityAmountNumber < 0) {
      alert('Please provide a valid Maturity Amount.');
      return false;
    }
    if (!formData.premiumPaymentFrequency) {
      alert('Please select a premium payment frequency.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateNumbers()) return;

    setIsSubmitting(true);

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

      const sumAssuredNumber = parseFloat(sumAssured);
      const policyPaymentTermNumber = parseInt(policyPaymentTerm, 10);
      const premiumPaymentFrequencyNumber = parseInt(premiumPaymentFrequency, 10); // numeric option value
      const maturityAmountNumber = parseFloat(maturityAmount);

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

      alert('Insurance record added successfully.');
      refreshData();
      closeForm();
    } catch (error) {
      console.error('Failed to insert insurance data:', error);
      alert('Failed to add insurance record. See console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true" aria-label="Add insurance">
      <div className="popup-form">
        <h2>Add Insurance</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="insuranceProvider">Insurance Provider:</label>
            <input
              id="insuranceProvider"
              type="text"
              name="insuranceProvider"
              value={formData.insuranceProvider}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="policyNumber">Policy Number:</label>
            <input
              id="policyNumber"
              type="text"
              name="policyNumber"
              value={formData.policyNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="policyName">Policy Name:</label>
            <input
              id="policyName"
              type="text"
              name="policyName"
              value={formData.policyName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="policyHolder">Policy Holder:</label>
            <input
              id="policyHolder"
              type="text"
              name="policyHolder"
              value={formData.policyHolder}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lifeInsured">Life Insured:</label>
            <input
              id="lifeInsured"
              type="text"
              name="lifeInsured"
              value={formData.lifeInsured}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="sumAssured">Sum Assured:</label>
            <input
              id="sumAssured"
              type="number"
              name="sumAssured"
              value={formData.sumAssured}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="nominee">Nominee:</label>
            <input
              id="nominee"
              type="text"
              name="nominee"
              value={formData.nominee}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="policyPaymentTerm">Policy Payment Term (in years):</label>
            <input
              id="policyPaymentTerm"
              type="number"
              name="policyPaymentTerm"
              value={formData.policyPaymentTerm}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="premiumPaymentFrequency">Premium Payment Frequency:</label>
            <select
              id="premiumPaymentFrequency"
              name="premiumPaymentFrequency"
              value={formData.premiumPaymentFrequency}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Frequency
              </option>
              <option value="1">Annual</option>
              <option value="2">Bi-annual</option>
              <option value="3">Semi-annual</option>
            </select>
          </div>
          <div>
            <label htmlFor="lastPremiumPaid">Last Premium Paid:</label>
            <input
              id="lastPremiumPaid"
              type="date"
              name="lastPremiumPaid"
              value={formData.lastPremiumPaid}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="nextPremiumDue">Next Premium Due:</label>
            <input
              id="nextPremiumDue"
              type="date"
              name="nextPremiumDue"
              value={formData.nextPremiumDue}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="maturityDate">Maturity Date:</label>
            <input
              id="maturityDate"
              type="date"
              name="maturityDate"
              value={formData.maturityDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="maturityAmount">Maturity Amount:</label>
            <input
              id="maturityAmount"
              type="number"
              name="maturityAmount"
              value={formData.maturityAmount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="popup-buttons">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add'}
            </button>
            <button type="button" onClick={closeForm} disabled={isSubmitting}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InsuranceForm;