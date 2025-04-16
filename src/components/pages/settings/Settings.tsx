import './Settings.css';

function Settings() {
  return (
    <div className="settingsOptions">
      <h2>Settings</h2>
      <div className="cloudStorage">
        <h3>Cloud Storage</h3>
        <p>Choose Cloud Storage Provider</p>
      </div>
      <div className="otherStorage">
        <h3>Other storage</h3>
        <p>Choose other storage</p>
      </div>
    </div>
  );
}

export default Settings;
