import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

import GlobalState from './GlobalState';
import { makeStyles , useTheme} from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import TimeService from './services/TimeService';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import dateformat from 'dateformat';

import {BrowserView, MobileView} from 'react-device-detect';


// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button'
// import { Mouse, Satellite } from '@material-ui/icons';
// import { BrowserView } from 'react-device-detect';

const useStyles = makeStyles((theme) => ({
    
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        // width: 500,
        // height: 450,
      },

      box: {
        //backgroundColor: "red",
        border: "1px solid #999",
        margin: "5px",
        padding: "5px",
        color: "#555",
        cursor: "pointer",
        "&:hover": {
            background: theme.palette.primary.light,
            // color: "#fff"
          },
      },

      boxMobile: {
        //backgroundColor: "red",
        border: "1px solid #999",
        margin: "5px",
        padding: "5px",
        color: "#555",
        cursor: "pointer"
      },

      boxSelected: {
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
        margin: "5px",
        padding: "5px",
        color: "#fff",
        cursor: "pointer",
      },

      boxDisable: {
        backgroundColor: "#999",
        border: "1px solid #ddd",
        margin: "5px",
        padding: "5px",
        color: "#ddd",
        cursor: "not-allowed"
        
      },

      title: {
        color : theme.palette.primary.main,
        marginBottom: "20px",
        fontWeight: "500"
      }

  }));

  
function isWeekend(date)
{
    return (date.getDay() === 0 || date.getDay() === 6) /// Weekend
}


export default function TimeForm() {
    const classes = useStyles();
    // const theme = useTheme();

    const [state, setState] = React.useContext(GlobalState);
    const [bookingTime, setTime] = React.useState(state.bookingTime ?? '');

    const [dataLoaded, setDataLoaded] =  React.useState(false);

    const emptyTimeSlots = [];
    for (var i=0; i<28; i++)
    {
      emptyTimeSlots.push(i);
    }

    const [timeSlots, setTimeSlots] = React.useState(emptyTimeSlots);

    useEffect(() => {
      window.scrollTo(0, 0)
    }, []);

    const LoadData = (date) => {

      setTimeSlots(emptyTimeSlots);
      setDataLoaded(false);

      // const dateStr = dateformat(date,'yyyy-mm-dd');

      const promise1 = TimeService.getTimeSlots(date);
  
      Promise.all([promise1]).then( (values) => {
  
        const timeSlotsTmp = values[0].data;

        // if (isWeekend(date) && dateStr !== '2020-12-27')
        // {
        //   for (var i=0 ; i < timeSlotsTmp.length ; i++)
        //   {
        //     if (parseInt(timeSlotsTmp[i].time.substr(0,2)) < 10 && timeSlotsTmp[i].time.indexOf('AM') > 0)
        //     {
        //       timeSlotsTmp[i].available = false;
        //     }
  
        //     if (parseInt(timeSlotsTmp[i].time.substr(0,2)) > 1 && parseInt(timeSlotsTmp[i].time.substr(0,2)) < 12 &&timeSlotsTmp[i].time.indexOf('PM') > 0)
        //     {
        //       timeSlotsTmp[i].available = false;
        //     }
        //   }
        // }

    
        if (beforeFeb())
        {
          timeSlotsTmp.forEach(time =>
            {
              time.available = false;
            });
        }

        setTimeSlots(timeSlotsTmp);
        setDataLoaded(true);
  
      }).catch( (err) =>
      {
        console.error(err);
      });
  }

    useEffect(() => {
      if (state.bookingDate && state.bookingDate !== 'undefined')
         LoadData(state.bookingDate);
    }, []);

    // useEffect(() => {
    //   var interval ;
    //   if (state.bookingDate && state.bookingDate !== 'undefined')
    //     {
    //       interval = setInterval(() => {
    //         LoadData(state.bookingDate);
    //       }, 2000);
    //     }

    //     return () => {
    //       if (interval)
    //         clearInterval(interval);
    //     }
        
    // }, []);

    



    const boxClicked = (key) =>
    {
        if (key)
        {
            setTime(key);
            setState({...state, bookingTime : key});
        }

    }

    const beforeFeb = () =>
    {
        const dateStr = dateformat(state.bookingDate, 'yyyy-mm-dd');
        return dateStr < '2021-02-01';
    }


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom className={classes.title}>
        Pick a Time
      </Typography>

      {dataLoaded ?  (
            
       
            <React.Fragment>



              {checkFullyBooked(timeSlots) &&  (

                <React.Fragment>
                  <div style={{fontSize:"1.2rem", paddingTop:"10px", paddingBottom:"10px", color:"#db0000" , fontWeight: "500", background:"#fff5f5"}}>
                     Sorry this day is already fully booked! 
                     <br/>Please choose an alternative day.
                     <br/> * All dates are fully booked until 1st February 2021. 
                  </div>
                   
                </React.Fragment>

              )}

              <BrowserView>
                  <div className={classes.root}>
                            <GridList cellHeight={60} className={classes.gridList} cols={4}>
                              {timeSlots.map((timeSlot) => (
                                <GridListTile key={timeSlot.time} cols={1}>
                                  <div 
                                      onClick= {() => {timeSlot.available? boxClicked(timeSlot.time) : boxClicked(null)}}
                                      className={(timeSlot.available) ? ((bookingTime === timeSlot.time)? classes.boxSelected : classes.box ): classes.boxDisable}>
                                      {timeSlot.time}
                                  </div>
                                </GridListTile>
                              ))}
                            </GridList>
                  </div>
              
              </BrowserView>

              <MobileView>

              <div className={classes.root}>
                            <GridList cellHeight={60} className={classes.gridList} cols={4}>
                              {timeSlots.map((timeSlot) => (
                                <GridListTile key={timeSlot.time} cols={1}>
                                  <div 
                                      onClick = {() => {timeSlot.available? boxClicked(timeSlot.time) : boxClicked(null)}}
                                      className={(timeSlot.available) ? ((bookingTime === timeSlot.time)? classes.boxSelected : classes.boxMobile ): classes.boxDisable}>
                                      {timeSlot.time}
                                  </div>
                                </GridListTile>
                              ))}
                            </GridList>
                  </div>

              </MobileView>

            </React.Fragment>
      ) : (
        <React.Fragment>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  >
                      <GridList cellHeight={60} className={classes.gridList} cols={4}>
                          {emptyTimeSlots.map((timeSlot) => (
                            <GridListTile key={timeSlot} cols={1}>
                                 <Skeleton variant="rect" width={120}  height={35} />
                            </GridListTile>
                          ))}
                        </GridList>
                  </Grid>

    </React.Fragment>

      ) }



    </React.Fragment>
  );
}

const checkFullyBooked = (timeSlots) =>
{
    let available = false;
    timeSlots.forEach(time => {
      if (time.available)
      {
        available = true;
      }
    });

    return !available;
}


