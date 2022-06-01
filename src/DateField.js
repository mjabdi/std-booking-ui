import PropTypes from 'prop-types';


import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';


import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


import dateformat from 'dateformat';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';




const useStyles = makeStyles((theme) => ({

  loadingBox: {
    
  }

}));


const DateField = ({title, value, dateChanged, error}) => {

    const [day, setDay] = React.useState('');
    const [month, setMonth] = React.useState('');
    const [year, setYear] = React.useState('');

    const [dayArray, setDayArray] = React.useState([]);
    const [monthArray, setMonthArray] = React.useState([]);
    const [yearArray, setYearArray] = React.useState([]);

        const updateDate = (dd,mm,yyyy) =>
        {
            let dayStr = `${dd}`;
            let monthStr = `${mm + 1}`;
            

            if (dayStr.length === 1)
            {
                dayStr = `0${dayStr}`;
            }

            if (monthStr.length === 1)
            {
                monthStr = `0${monthStr}`;
            }

            dateChanged(`${yyyy}-${monthStr}-${dayStr}`);
            

        }

        const handleDayChanged = (event) => {
            setDay(event.target.value);
            updateDate(event.target.value,month,year);
        };

        const handleMonthChanged = (event) => {
            setMonth(event.target.value);
            updateDate(day, event.target.value, year);
        };

        const handleYearChanged = (event) => {
            setYear(event.target.value);
            updateDate(day,month,event.target.value);
        };

        useEffect ( () => 
        {
            if (value && value.length === 10)
            {
                const d = parseInt(value.substr(8,2));
                const m = parseInt(value.substr(5,2));
                const y = parseInt(value.substr(0,4));

                setDay(d);
                setMonth(m-1);
                setYear(y);
            }
           

        }, [value]);

      useEffect( () => {

        const days = [];
        const months = [];
        const years = [];


        for (var i = 1 ; i <= 31; i++)
        {
            days.push(i);
        }

        for ( i = 0 ; i < 12; i++)
        {
            months.push(dateformat(new Date(2020,i,5), 'mmmm'));
        }

        for ( i = 1900 ; i < new Date().getFullYear(); i++)
        {
            years.push(i);
        }

       
        setDayArray(days);
        setMonthArray(months);
        setYearArray(years);

      } , [])


      const handleYearClicked = (event) => {
          if (!year)
          {
              setYear(2000)
          }
      }
    
  return (

    <React.Fragment>

        
    <div style={{position:"relative", border:`1px solid ${error ? 'red' : '#ddd'}` , borderRadius:"10px", padding:"20px", paddingBottom: "50px", marginTop: "20px"}}>

        <div style={{position:"absolute", top: "-15px", left : "15px", backgroundColor:"#fff", color : `${error ? 'red' : '#555'}`, padding:"5px" , paddingLeft:"10px", paddingRight:"10px" }}>
               {title} * 
       </div>

    

        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={2}
        >


            <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                    <InputLabel  id="day-label">Day</InputLabel>
                    <Select
                        
                        labelId="day-label"
                        id="day-select"
                        value={day}
                        onChange={handleDayChanged}
                        >
                        {
                            dayArray.map( item => (
                                <MenuItem value={item}>{item}</MenuItem>
                            )
                        )} 
                    </Select>
                </FormControl>


            </Grid>

            <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                    <InputLabel  id="month-label">Month</InputLabel>
                    <Select
                        labelId="month-label"
                        id="month-select"
                        value={month}
                        onChange={handleMonthChanged}
                        >
                        {
                            monthArray.map( (item , index) => (
                                <MenuItem value={index}>{item}</MenuItem>
                            )
                        )} 
                    </Select>
                </FormControl>

                
            </Grid>

            <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                    <InputLabel  id="day-label">Year</InputLabel>
                    <Select
                    labelId="year-label"
                    id="year-select"
                    value={year}
                    onChange={handleYearChanged}
                    onFocus={handleYearClicked}
                    >
                    {
                        yearArray.map( item => (
                            <MenuItem value={item}>{item}</MenuItem>
                        )
                    )} 
                
                    </Select>
                </FormControl>
            </Grid>
        </Grid>

        </div>
    </React.Fragment>
  );
}


DateField.propTypes = {
    title : PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    dateChanged: PropTypes.func.isRequired,
    error: PropTypes.bool
  };

export default DateField;




