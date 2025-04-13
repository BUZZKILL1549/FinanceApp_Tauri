import { useState } from 'react';
import jsPDF from 'jspdf';

import InsuranceForm from './InsuranceForm';
import './Insurance.css';

type InsurancePolicy = {
  insuranceProvider: string;
  policyNumber: string;
  policyName: string;
  policyHolder: string;
  lifeInsured: string;
  sumAssured: number;
  nominee: string;
  policyPaymentTerm: string;
  premiumPaymentFrequency: string;
  lastPremiumPaid: string;
  nextPremiumDue: string;
  maturityDate: string;
  maturityAmount: number;
};

function Insurance() {
  const [insurance, setInsurance] = useState<InsurancePolicy[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const downloadCSV = () => {
    const getDateTime = () => {
      const now = new Date();
      
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      
      return `${year}_${month}_${day}-${hours}_${minutes}`;
    };

    const headers = [
      'Insurance Provider',
      'Policy Number',
      'Policy Name',
      'Policy Holder',
      'Life Insured',
      'Sum Assured',
      'Nominee',
      'Policy Payment Term',
      'Premium Payment Frequency',
      'Last Premium Paid',
      'Next Premium Due',
      'Maturity Date',
      'Maturity Amount',
    ];

    const rows = insurance.map((policy) =>
      [
        policy.insuranceProvider,
        policy.policyNumber,
        policy.policyName,
        policy.policyHolder,
        policy.lifeInsured,
        policy.sumAssured.toString(),
        policy.nominee,
        policy.policyPaymentTerm,
        policy.premiumPaymentFrequency,
        policy.lastPremiumPaid,
        policy.nextPremiumDue,
        policy.maturityDate,
        policy.maturityAmount.toString(),
      ].join(',')
    );

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    const filename = 'insurance_' + getDateTime() + '.csv';
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = () => {
    const getDateTime = () => {
      const now = new Date();
      
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      
      return `${year}_${month}_${day}-${hours}_${minutes}`;
    };

    const doc = new jsPDF();
    let y = 10; 

    doc.setFontSize(12);
    doc.text('Insurance Table', 10, y);
    y += 10;

    doc.text(
      'Insurance Provider | Policy Number | Policy Name | Policy Holder | Life Insured | Sum Assured | Nominee | Policy Payment Term | Premium Payment Frequency | Last Premium Paid | Next Premium Due | Maturity Date | Maturity Amount',
      10,
      y,
      { maxWidth: 190 }
    );
    y += 10;

    insurance.forEach((policy, index) => {
      const data = `${index + 1}. ${policy.insuranceProvider}, ${policy.policyNumber}, ${policy.policyName}, ${policy.policyHolder}, ${policy.lifeInsured}, ${policy.sumAssured}, ${policy.nominee}, ${policy.policyPaymentTerm}, ${policy.premiumPaymentFrequency}, ${policy.lastPremiumPaid}, ${policy.nextPremiumDue}, ${policy.maturityDate}, ${policy.maturityAmount}`;
      doc.text(data, 10, y, { maxWidth: 190 });
      y += 10;

      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });
    
    const filename = 'insurance_' + getDateTime() + '.pdf';
    doc.save(filename);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Insurance Provider</th>
            <th>Policy Number</th>
            <th>Policy Name</th>
            <th>Policy Holder</th>
            <th>Life Insured</th>
            <th>Sum Assured</th>
            <th>Nominee</th>
            <th>Policy Payment Term</th>
            <th>Premium Payment Frequency</th>
            <th>Last Premium Paid</th>
            <th>Next Premium Due</th>
            <th>Maturity Date</th>
            <th>Maturity Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
          </tr>
        </tbody>
      </table>
      <div className="buttonCluster">
        <button onClick={() => setShowForm(true)}>Add More</button>
        <button onClick={downloadCSV}>Download as CSV</button>
        <button onClick={downloadPDF}>Download as PDF</button>
      </div>

      {showForm && (
        <InsuranceForm
          closeForm={() => setShowForm(false)}
        />
      )} 
    </div>
  );
}

export default Insurance;
