import React from "react";
import {Grid} from "@mui/material";
import {Input} from '../Input';

interface Props {
    deposit: number | undefined;
    spreadFrom: number | undefined;
    spreadTo: number | undefined;
    onChange: (value: string, type: "deposit" | "spread_from" | "spread_to") => void;
}

export const Inputs: React.FC<Props> = ({onChange, deposit, spreadFrom, spreadTo}) => {

    return (
        <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Input label={'Депозит'} type={"deposit"} onChange={onChange} value={deposit}/>
            <Input label={'Спред от'} type={"spread_from"} onChange={onChange} value={spreadFrom}/>
            <Input label={'Спред до'} type={"spread_to"} onChange={onChange} value={spreadTo}/>
        </Grid>
    )
};