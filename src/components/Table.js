
import React, { useEffect, useState } from "react";
import MaterialTable from 'material-table'
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { CardDetails } from "./CardDetails";
import axios from 'axios';

//CSS
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};



export const Table = () => {
    const urlApi = "https://raw.githubusercontent.com/s0nnyhu/yugioh/develop/data.json";

    const [cards, setCards] = useState([]);
    useEffect(() => {
        axios.get(urlApi)
            .then(response => {
                setCards(response.data);
            })
    }, [urlApi])

    const columns = [
        { title: 'Year', field: 'year', headerStyle: { fontSize: "16px", fontWeight: "700" }, filtering: false, },
        { title: 'Set Name', field: 'card_set', headerStyle: { fontSize: "16px", fontWeight: "700" }, filtering: false, },
        { title: 'Card #', field: 'card_id', headerStyle: { fontSize: "16px", fontWeight: "700" }, filtering: false, },
        { title: 'Card Name', field: 'card_name', headerStyle: { fontSize: "16px", fontWeight: "700" }, filtering: false, },
        { title: 'Rarity', field: 'rarity', headerStyle: { fontSize: "16px", fontWeight: "700" }, filtering: false, lookup: { 'DDS': 'DDS', 'and Sons': 'and Sons' }, render: rowData => <Chip variant="outlined" color="primary" label={rowData.rarity} /> },
        { title: 'Quantity', field: 'quantity', headerStyle: { fontSize: "16px", fontWeight: "700" }, filtering: false, },
        { title: 'Edition', field: 'card_edition', headerStyle: { fontSize: "16px", fontWeight: "700" }, filtering: false, },
        { title: 'Price', field: 'cardmarket_price', headerStyle: { fontSize: "16px", fontWeight: "700" }, filtering: false, },

        { title: 'Details', field: 'details', headerStyle: { fontSize: "16px", fontWeight: "700" }, filtering: false, render: rowData => <Button color="primary" onClick={() => handleOpen(rowData.name)}><RemoveRedEyeIcon /></Button> },
    ]

    const [isOpen, setIsOpen] = useState(false);
    const [selectedCardName, setSelectedCardName] = useState(null);

    const handleOpen = (cardName) => {
        setSelectedCardName(cardName);
        console.log(cardName);
        setIsOpen(!isOpen);
    };


    return (
        <div>
            <MaterialTable
                title=""
                data={cards}
                columns={columns}
                icons={tableIcons}
                options={{
                    paging: false,
                    filtering: true,
                    exportButton: true
                }}
            />
            <CardDetails
                isDialogOpened={isOpen}
                handleCloseDialog={() => setIsOpen(false)}
                cardName="Coucou"
            />
        </div>
    )
}