
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
    const urlCardListApi = "https://raw.githubusercontent.com/s0nnyhu/yugioh/develop/data.json";
    const urlEndpointYugiohApi = 'https://db.ygoprodeck.com/api/v7';
    const [cards, setCards] = useState([]);
    useEffect(() => {
        axios.get(urlCardListApi)
            .then(response => {
                setCards(response.data);
            })
    }, [urlCardListApi])

    const getRarityStyle = (type) => {
        let bg = "";
        if (type == 'Starlight Rare') {
            bg = "#5353ff"
        } else if (type == "Ghost Rare") {
            bg = "#dadada"
        } else if (type == "Ultra Rare") {
            bg = "#fee021"
        } else {
            bg = "transparent"
        }

        return { backgroundColor: bg, color: "black" }
    }
    const columns = [
        { title: 'Year', field: 'year', headerStyle: { fontSize: "16px", fontWeight: "700" }, filtering: false, width: "10%" },
        { title: 'Set Name', field: 'card_set', headerStyle: { fontSize: "16px", fontWeight: "700" }, filtering: false, width: "20%" },
        { title: 'Card #', field: 'card_id', headerStyle: { fontSize: "16px", fontWeight: "700" }, filtering: false, width: "10%" },
        { title: 'Card Name', field: 'card_name', headerStyle: { fontSize: "16px", fontWeight: "700" }, width: "10%", filtering: false, width: "30%" },
        { title: 'Rarity', field: 'rarity', headerStyle: { fontSize: "16px", fontWeight: "700" }, filtering: false, render: rowData => <Chip variant="outlined" style={getRarityStyle(rowData.rarity)} label={rowData.rarity} />, type: 'html' },
        { title: 'Quantity', field: 'quantity', headerStyle: { fontSize: "16px", fontWeight: "700" }, filtering: false, width: "10%" },
        { title: 'Edition', field: 'card_edition', headerStyle: { fontSize: "16px", fontWeight: "700" }, filtering: false, width: "10%" },
        {
            title: 'Price', field: 'cardmarket_price', headerStyle: { fontSize: "16px", fontWeight: "700" }, filtering: false, width: "10%", render: rowData => rowData.cardmarket_price + ' €',
            customSort: (a, b) =>
                a.cardmarket_price - b.cardmarket_price
        },

        { title: 'Details', field: 'details', headerStyle: { fontSize: "16px", fontWeight: "700" }, filtering: false, sorting: false, render: rowData => <Button color="primary" onClick={() => handleOpen(rowData.card_name)}><RemoveRedEyeIcon /></Button> },
    ]

    const [isOpen, setIsOpen] = useState(false);
    const [card, setCard] = useState([]);

    const handleOpen = (cardName) => {
        setIsOpen(!isOpen);
        setCard([]);
        if (!isOpen) {
            console.log(cardName);
            fetch(urlEndpointYugiohApi + '/cardinfo.php?name=' + cardName)
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    setCard(json);
                })
        }
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
                card={card}
            />
        </div>
    )
}