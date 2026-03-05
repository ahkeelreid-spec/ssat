import React, { useState, useEffect } from 'react';

type Satellite = { id: string; name: string; operator: string; mbps_down: number; mbps_up: number; status: string; };

function SatelliteCard({ s }: { s: Satellite }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: 8, margin: 6, borderRadius: 6 }}>
      {s.name} ({s.operator}) - Down: {s.mbps_down} Mbps, Up: {s.mbps_up} Mbps - Status: {s.status}
    
  );
}

export default function App() {
  const [satellites, setSatellites] = useState<Satellite[]>([
    { id: 'KA-LEO-01', name: 'KA-LEO-01', operator: 'KA/LEO', mbps_down: 150, mbps_up: 50, status: 'OK' },
    { id: 'KU-GEO-01', name: 'KU-GEO-01', operator: 'KU/GEO', mbps_down: 200, mbps_up: 60, status: 'OK' },
    { id: 'STAR-1', name: 'Starlink-1', operator: 'Starlink', mbps_down: 120, mbps_up: 40, status: 'OK' },
    { id: 'HCX-1', name: 'HCX-1', operator: 'HCX', mbps_down: 90, mbps_up: 30, status: 'OK' }
  ]);
  const [selected, setSelected] = useState(satellites[0].id);
  const [threat, setThreat] = useState('None');

  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() < 0.1) {
        setThreat('DDoS detected');
      } else {
        setThreat('None');
      }
    }, 10000);
    return () => clearInterval(t);
  }, []);

  const current = satellites.find(s => s.id === selected) || satellites[0];
  const onChange = (e: React.ChangeEvent) => setSelected(e.target.value);

  const runScenario = () => alert('Scenario running: evaluate best paths and re-route if needed (demo).');

  return (
    <div style={{ padding: 12 }}>

  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <label>Satellite:</label>
    <select value={selected} onChange={onChange}>
      {satellites.map(s => (
        <option key={s.id} value={s.id}>{s.name} ({s.operator})</option>
      ))}
    </select>

    <span style={{ marginLeft: 'auto' }}>
      Threat: {threat}
    </span>
  </div>

  <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
    <div id="cesium-container" style={{ width: '66%', height: '60vh', background: '#eef', border: '1px solid #ccc' }}>
      <p style={{ textAlign: 'center', paddingTop: '28%' }}>3D Cesium globe placeholder (replace with actual Cesium viewer)</p>
    </div>

    <div style={{ width: '34%', display: 'flex', flexDirection: 'column' }}>
      {satellites.map(s => (
        <button key={s.id} onClick={() => setSelected(s.id)} style={{ margin: 6 }}>
          {s.name} {s.id === selected ? '(selected)' : ''}
        </button>
      ))}
      <button onClick={runScenario} style={{ marginTop: 12 }}>Run Scenario</button>
      <div style={{ marginTop: 8, padding: 8, border: '1px solid #ccc', borderRadius: 6 }}>
        <strong>Current Satellite</strong>
        <div>Name: {current?.name}</div>
        <div>Operator: {current?.operator}</div>
        <div>Latency: ~{Math.max(10, 100 - current?.mbps_down! * 0.2).toFixed(0)} ms</div>
      </div>
    </div>
  </div>

  <section style={{ marginTop: 16 }}>
    <h2>Telemetry</h2>
    <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
      {satellites.map(s => (
        <div key={s.id} style={{ border: '1px solid #ddd', padding: 8, borderRadius: 6 }}>
          <div><strong>{s.name}</strong></div>
          <div>Down: {s.mbps_down} Mbps</div>
          <div>Up: {s.mbps_up} Mbps</div>
          <div>Status: {s.status}</div>
        </div>
      ))}
    </div>
  </section>

  <section style={{ marginTop: 16 }}>
    <h2>Outputs</h2>
    <p>Placeholder 3D view. Cesium integration can be swapped in here. Features: 3D globe, satellite dropdown, per-satellite Mbps, threat flags, scenarios.</p>
  </section>
</div>
  );
}
