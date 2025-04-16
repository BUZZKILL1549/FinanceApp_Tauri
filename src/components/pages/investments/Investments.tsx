import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import jsPDF from 'jspdf';

import InvestmentsForm from './InvestmentsForm';
import './Investments.css';

type InvestmentsPolicy = {
  financial_organization: string;
  name_of_financial_organization: string;
  branch_address: string;
  type_of_investment: string;
  investment_number: string;
  investment_holder: string;
  nominee: string;
  nominee_guardian: string;
  investment_amount: number;
  rate_of_interest: number;
  investment_date: string;
  investment_duration: string;
  maturity_date: string;
  maturity_amount: number;
};

function Investments() {
  const [investments, setInvestmentsData] = useState<InvestmentsPolicy[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchInvestmentsData = async () => {
    setLoading(true);
    try {
      const data: InvestmentsPolicy[] = await invoke('get_investments_data');
      setInvestmentsData(data);
    } catch (error) {
      console.error('Error fetching investments data: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestmentsData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>
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
      'Financial Organization',
      'Name of Financial Institution',
      'Branch Address',
      'Type of Investment',
      'Investment Number',
      'Investment Holder',
      'Nominee',
      'Nominee Guardian',
      'Investment Amount',
      'Rate of Interest', 
      'Investment Date',
      'Investment Duration',
      'Maturity Date',
      'Maturity Amount',
    ];

    const rows = investments.map((investment) =>
      [
        investment.financial_organization,
        investment.name_of_financial_organization, 
        investment.branch_address,
        investment.type_of_investment,
        investment.investment_number,
        investment.investment_holder,
        investment.nominee,
        investment.nominee_guardian,
        investment.investment_amount,
        investment.rate_of_interest, 
        investment.investment_date,
        investment.investment_duration,
        investment.maturity_date,
        investment.maturity_amount,
      ].join(',')
    );
    
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    const filename = 'investments_' + getDateTime() + '.csv';
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
    doc.text('Investments Table', 10, y);
    y += 10;

    doc.text('Investment Details', 10, y);
    y += 10;

    investments.forEach((investment, index) => {
      const data = `${index + 1}. ${investment.financial_organization}, ${investment.name_of_financial_organization}, ${investment.type_of_investment}, ${investment.investment_number}, ${investment.investment_holder}, ${investment.nominee}, ${investment.nominee_guardian}, ${investment.investment_amount}, ${investment.rate_of_interest}, ${investment.investment_date}, ${investment.investment_duration}, ${investment.maturity_date}, ${investment.maturity_amount}`;
      doc.text(data, 10, y, { maxWidth: 190 });
      y += 10;

      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });
    
    const filename = 'investments_' + getDateTime() + '.pdf';
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
            <th>Financial Organization</th>
            <th>Name of Financial Institution</th>
            <th>Branch Address</th>
            <th>Type of Investment</th>
            <th>Investment Number</th>
            <th>Investment Holder</th>
            <th>Nominee</th>
            <th>Nominee Guardian</th>
            <th>Investment Amount</th>
            <th>Rate of Interest</th>
            <th>Investment Date</th>
            <th>Investment Duration</th>
            <th>Maturity Date</th>
            <th>Maturity Amount</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((policy, index) => (
            <tr key={index}>
              <td>{policy.financial_organization}</td>
              <td>{policy.name_of_financial_organization}</td>
              <td>{policy.branch_address}</td>
              <td>{policy.type_of_investment}</td>
              <td>{policy.investment_number}</td>
              <td>{policy.investment_holder}</td>
              <td>{policy.nominee}</td>
              <td>{policy.nominee_guardian}</td>
              <td>{policy.investment_amount}</td>
              <td>{policy.rate_of_interest}</td>
              <td>{policy.investment_date}</td>
              <td>{policy.investment_duration}</td>
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
        <InvestmentsForm
          closeForm={() => setShowForm(false)}
          refreshData={fetchInvestmentsData}
        />
      )} 
    </div>
  );
}

export default Investments;
