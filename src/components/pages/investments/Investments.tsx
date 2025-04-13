import { useState } from 'react';
import jsPDF from 'jspdf';

import InvestmentsForm from './InvestmentsForm';
import './Investments.css';

type InvestmentsPolicy = {
  financialOrganization: string;
  nameOfFinancialOrganization: string;
  branchAddress: string;
  typeOfInvestment: string;
  investmentNumber: string;
  investmentHolder: string;
  nominee: string;
  nomineeGuardian: string;
  investmentAmount: number;
  rateOfInterest: number;
  investmentDate: string;
  investmentDuration: string;
  maturityDate: string;
  maturityAmount: number;
};

function Investments() {
  const [investments, setInvestments] = useState<InvestmentsPolicy[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

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
        investment.financialOrganization,
        investment.nameOfFinancialOrganization, 
        investment.branchAddress,
        investment.typeOfInvestment,
        investment.investmentNumber,
        investment.investmentHolder,
        investment.nominee,
        investment.nomineeGuardian,
        investment.investmentAmount,
        investment.rateOfInterest, 
        investment.investmentDate,
        investment.investmentDuration,
        investment.maturityDate,
        investment.maturityAmount,
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
      const data = `${index + 1}. ${investment.financialOrganization}, ${investment.nameOfFinancialOrganization}, ${investment.typeOfInvestment}, ${investment.investmentAmount}, ${investment.maturityDate}`;
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
        <InvestmentsForm
          closeForm={() => setShowForm(false)}
        />
      )} 
    </div>
  );
}

export default Investments;
