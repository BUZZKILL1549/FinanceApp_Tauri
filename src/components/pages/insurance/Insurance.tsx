import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import jsPDF from 'jspdf';

import InsuranceForm from './InsuranceForm';
import './Insurance.css';

type InsurancePolicy = {
  insurance_provider: string;
  policy_number: string;
  policy_name: string;
  policy_holder: string;
  life_insured: string;
  sum_assured: number;
  nominee: string;
  policy_payment_term: number;
  premium_payment_frequency: number;
  last_premium_paid: string;
  next_premium_due: string;
  maturity_date: string;
  maturity_amount: number;
};

function Insurance() {
  const [insurance, setInsuranceData] = useState<InsurancePolicy[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInsuranceData = async () => {
    setLoading(true);
    try {
      const data: InsurancePolicy[] = await invoke('get_insurance_data');
      setInsuranceData(data);
    } catch (error) {
      console.error('Error fetching insurance data: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsuranceData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

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
        policy.insurance_provider,
        policy.policy_number,
        policy.policy_name,
        policy.policy_holder,
        policy.life_insured,
        policy.sum_assured.toString(),
        policy.nominee,
        policy.policy_payment_term,
        policy.premium_payment_frequency,
        policy.last_premium_paid,
        policy.next_premium_due,
        policy.maturity_date,
        policy.maturity_amount.toString(),
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
      const data = `${index + 1}. ${policy.insurance_provider}, ${policy.policy_number}, ${policy.policy_name}, ${policy.policy_holder}, ${policy.life_insured}, ${policy.sum_assured}, ${policy.nominee}, ${policy.policy_payment_term}, ${policy.premium_payment_frequency}, ${policy.last_premium_paid}, ${policy.next_premium_due}, ${policy.maturity_date}, ${policy.maturity_amount}`;
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
          {insurance.map((policy, index) => (
            <tr key={index}>
              <td>{policy.insurance_provider}</td>
              <td>{policy.policy_number}</td>
              <td>{policy.policy_name}</td>
              <td>{policy.policy_holder}</td>
              <td>{policy.life_insured}</td>
              <td>{policy.sum_assured}</td>
              <td>{policy.nominee}</td>
              <td>{policy.policy_payment_term}</td>
              <td>{policy.premium_payment_frequency}</td>
              <td>{policy.last_premium_paid}</td>
              <td>{policy.next_premium_due}</td>
              <td>{policy.maturity_date}</td>
              <td>{policy.maturity_amount}</td>
            </tr>
          ))}
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
          refreshData={fetchInsuranceData}
        />
      )} 
    </div>
  );
}

export default Insurance;
