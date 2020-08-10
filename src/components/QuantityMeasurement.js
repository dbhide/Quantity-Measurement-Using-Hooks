import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CustomSelector from "./CustomSelector";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";

function QuantityMeasurement() {
    const [mainUnits, setMainUnits] = useState([]);
    const [subUnits, setSubUnits] = useState([]);
    const [firstTextFieldValue, setFirstTextFieldValue] = useState('');
    const [secondTextFieldValue, setSecondTextFieldValue] = useState('');
    const [firstSubUnit, setFirstSubUnit] = useState('');
    const [secondSubUnit, setSecondSubUnit] = useState('');
    const[selectedUnits, setSelectedUnits] = useState('');

    const getUnit = () =>{
        Axios.get("http://localhost:8080/unit/type").then((response)=>{
            console.log(response);
            setMainUnits(response.data);
        }).catch((error)=>{
            console.log(error);
        })
    }

    const getFirstSubUnits = event => {
        setFirstSubUnit(event.target.value)
        console.log("selected First SubUnits " +firstSubUnit);
    }

    const getSecondSubUnits = event => {
        setSecondSubUnit(event.target.value)
        console.log("selected Second SubUnits " +secondSubUnit);
    }

    const getSubUnit = event => {
        setSelectedUnits(event.target.value);
        console.log("selected MainUnits " +selectedUnits);
        getSubUnits(event.target.value).then(response => {
            console.log(response)
            setSubUnits(response.data)
        })
            .catch(error => {
                console.log(error);
            })
    }

    const getSubUnits = (selectedUnits) =>{
        return Axios({
            method: "get",
            url: `http://localhost:8080/unit/type/${selectedUnits}`,
        })
    }

    const convertFromFirstToSecondUnit = event => {
        setFirstTextFieldValue(event.target.value);
        getConvertedValue(event.target.value, firstSubUnit, secondSubUnit,).then((response) => {
            setSecondTextFieldValue(response.data.value)
            console.log(response);
        })
    }

    const convertFromSecondToFirstUnit = event => {
        setSecondTextFieldValue(event.target.value);
        getConvertedValue(event.target.value, secondSubUnit, firstSubUnit).then((response) => {
            setFirstTextFieldValue(response.data.value)
            console.log(response);
        })
    }

    const getConvertedValue = (value1, firstSubUnit1, secondSubUnit1) =>{
        const conversionDTO = {
            value: value1,
            firstUnitType: firstSubUnit1,
            secondUnitType: secondSubUnit1,
        }
        return Axios.post("http://localhost:8080/unit/converter", conversionDTO)
    }

    useEffect(() =>{
        getUnit()
    },[]);

    return(
        <Card className="Root">
            <CardContent>
                <div className="Component-Container">
                    <CustomSelector width="450px" labelName="Main Units" onChange={getSubUnit}
                                         listData={mainUnits}/>
                </div>
                <div className="Component-Container">
                    <TextField required id="outlined-required" variant="outlined"
                               helperText="Please Enter Value To Convert"
                               onChange={convertFromFirstToSecondUnit}
                               value={firstTextFieldValue}
                    />
                    <span className="InlineDiv">=</span>
                    <TextField required id="outlined-required" variant="outlined"
                               value={secondTextFieldValue} onChange={convertFromSecondToFirstUnit}
                               helperText="Please Enter Value To Convert"/>
                </div>
                <div className="Component-Container">
                    <CustomSelector labelName="Sub Units"
                                         onChange={getFirstSubUnits}
                                         listData={subUnits}
                    />
                    <CustomSelector labelName="Sub Units"
                                         onChange={getSecondSubUnits}
                                         listData={subUnits}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default QuantityMeasurement