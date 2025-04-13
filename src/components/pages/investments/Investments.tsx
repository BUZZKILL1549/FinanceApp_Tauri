import { useState } from 'react';

import InvestmentsForm from './InvestmentsForm';
import './Investments.css';

function Investments() {
  const [showForm, setShowForm] = useState(false);

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
        <button onClick={ () => setShowForm(true) }>Add More</button>
        <button onClick={ () => console.log('csv') }>Download as CSV</button>
        <button onClick={ () => console.log('pdf') }>Download as PDF</button>
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
