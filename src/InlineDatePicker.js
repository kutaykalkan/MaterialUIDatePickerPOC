import React, { useState } from "react";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { createStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import addDays from 'date-fns/addDays'
import isBefore from 'date-fns/isBefore'
import isAfter from 'date-fns/isAfter'

function InlineDatePicker(props) {
    let today = new Date();
    const [endDate, setEndDate] = useState(null);
    const [startDate, setStartDate] = useState(null);

    function disableDaysForEndDate(date){
        return isBefore(date, startDate) || isAfter(date, addDays(today, 1));
    }

    function disableDaysForStartDate(date){
        return isAfter(date, endDate) || isAfter(date, addDays(today, 1));
    }

    let divStyle = {
        marginTop: 50
    };

    const customTheme = createMuiTheme({
        palette: {
            primary: {
                main: '#2d7dab',
                light:  '#2d7dab',
                dark: '#2d7dab',
            },
            secondary: {
                main: '#2d7dab',
            },
        },
    })

    return (
        <div style={divStyle}>
            <MuiThemeProvider theme={customTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    label="Start Date"
                    format="MM/dd/yyyy"
                    disableToolbar={true}
                    value={startDate}
                    onChange={setStartDate}
                    shouldDisableDate={disableDaysForStartDate}
                />
            </MuiPickersUtilsProvider>
            </MuiThemeProvider>
            { ' ' }
            <MuiThemeProvider theme={customTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    label="End Date"
                    format="MM/dd/yyyy"
                    disableToolbar={true}
                    value={endDate}
                    onChange={setEndDate}
                    shouldDisableDate={disableDaysForEndDate}
                />
            </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        </div>
    );
}

const styles = createStyles(theme => ({
    dayWrapper: {
        position: "relative",
    },
    day: {
        width: 36,
        height: 36,
        fontSize: theme.typography.caption.fontSize,
        margin: "0 2px",
        color: "inherit",
    },
    customDayHighlight: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: "2px",
        right: "2px",
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: "50%",
    },
    nonCurrentMonthDay: {
        color: theme.palette.text.disabled,
    },
    highlightNonCurrentMonthDay: {
        color: "#676767",
    },
    highlight: {
        background: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    firstHighlight: {
        extend: "highlight",
        borderTopLeftRadius: "50%",
        borderBottomLeftRadius: "50%",
    },
    endHighlight: {
        extend: "highlight",
        borderTopRightRadius: "50%",
        borderBottomRightRadius: "50%",
    },
}));

export default withStyles(styles)(InlineDatePicker);
