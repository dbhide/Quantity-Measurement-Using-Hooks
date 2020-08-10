import React from 'react';
import './App.css';
import QuantityMeasurement from './components/QuantityMeasurement'

function App() {

    return (
        <div>
            <div className="background-flex ">
                <h2 align="center" style={{marginTop: "7%"}}>Quantity Measurement</h2>
                <QuantityMeasurement/>
            </div>
        </div>
    );
}

export default App;
