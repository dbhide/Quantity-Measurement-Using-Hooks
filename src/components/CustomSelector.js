import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function CustomSelector(props) {

    return (
        <TextField style={{width: props.width}} id="outlined-select-Units" select label={props.labelName}
                   onChange={props.onChange}
                   helperText="Please Select Units"
                   variant="outlined">

            {props.listData.map((option) => (
                <option value={option}>
                    {option}
                </option>
            ))}
        </TextField>
    )
}