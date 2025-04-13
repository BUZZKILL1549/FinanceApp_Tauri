import { useState } from 'react';

import InsuranceForm from './InsuranceForm';
import './Insurance.css';

function Insurance() {
  const [showForm, setShowForm] = useState(false);

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
        <button onClick={ () => setShowForm(true) }>Add More</button>
        <button onClick={ () => console.log('csv') }>Download as CSV</button>
        <button onClick={ () => console.log('pdf') }>Download as PDF</button>
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
