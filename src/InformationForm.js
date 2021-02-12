import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";
import GlobalState from "./GlobalState";
import * as EmailValidator from "email-validator";

import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import PersonsBox from "./PersonsBox";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import AntiBodyComponent from "./AntiBodyComponent";

import { format, addMinutes } from "date-fns";

import dateformat from "dateformat";
import { enGB } from "date-fns/locale";
import DateField from "./DateField";
import Alert from "@material-ui/lab/Alert";
import Fade from "react-reveal/Fade";


class UTCUtils extends DateFnsUtils {
  locale = enGB;
  // format(date, formatString) {
  //   return format(new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 ), formatString,enGB);
  // }

  // getCalendarHeaderText(date){
  //   return dateformat(date, 'mmmm yyyy');
  // }

  // getDayText(date)
  // {
  //   return dateformat(date, 'd');
  // }
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    textAlign: "left",
  },

  FormTitle: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  Box: {
    backgroundColor: "#f1f1f1",
    padding: "10px",
    //maxWidth: "300px",
    borderRadius: "10px",
    boxShadow: "2px 4px #ddd",
    marginTop: "5px",
    marginBottom: "15px",
    textAlign: "left",
  },

  pageTitle: {
    color: theme.palette.primary.main,
    marginBottom: "15px",
  },
}));

export default function InformationForm() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);
  const [fullname, setFullname] = React.useState(state.fullname ?? "");
  const [email, setEmail] = React.useState(state.email ?? "");
  const [retypeEmail, setRetypeEmail] = React.useState(state.retypeEmail ?? "");
  const [emailConfirmed, setEmailConfirmed] = React.useState(
    state.emailConfirmed ?? false
  );

  const [phone, setPhone] = React.useState(state.phone ?? "");

  const [notes, setNotes] = React.useState(state.notes ?? "");

  const notesChanged = (event) => {
    setNotes(event.target.value);
    setState((state) => ({ ...state, notes: event.target.value }));
    setState((state) => ({ ...state, notesError: false }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const emailConfirmedChanged = (event) => {
    setEmailConfirmed(event.target.checked);
    setState((state) => ({ ...state, emailConfirmed: event.target.checked }));
    setState((state) => ({ ...state, emailConfirmedError: false }));
  };

  const fullnameChanged = (event) => {
    setFullname(event.target.value);
    setState((state) => ({ ...state, fullname: event.target.value }));
    if (event.target.value && event.target.value.trim().length > 0) {
      setState((state) => ({ ...state, fullnameError: false }));
    }
  };

  const emailChanged = (event) => {
    setEmail(event.target.value);
    setState((state) => ({ ...state, email: event.target.value }));
    if (event.target.value && EmailValidator.validate(event.target.value)) {
      setState((state) => ({ ...state, emailError: false }));
    }
  };

  const retypeEmailChanged = (event) => {
    setRetypeEmail(event.target.value);
    setState((state) => ({ ...state, retypeEmail: event.target.value }));
    if (event.target.value && EmailValidator.validate(event.target.value)) {
      setState((state) => ({ ...state, retypeEmailError: false }));
    }
  };

  const phoneChanged = (event) => {
    setPhone(event.target.value);
    setState((state) => ({ ...state, phone: event.target.value }));
    if (event.target.value && event.target.value.trim().length >= 6) {
      setState((state) => ({ ...state, phoneError: false }));
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom className={classes.pageTitle}>
        Enter your Info
      </Typography>

      
      <Fade down>
      <div>
        <Alert
          severity="info"
          style={{
            marginBottom: "15px",
            fontSize: "0.95rem",
            lineHeight: "1.5rem",
            textAlign: "justify",
          }}
        >
          We care about your privacy, you don't have to enter your email address or mobile number, but if you provide us with an email address, we can send you the confirmation email and details of your appointment .
        </Alert>
      </div>
      </Fade>

      <Grid
        container
        spacing={4}
        alignItems="baseline"
        style={{ marginTop: "10px" }}
      >
        <Grid item xs={12} md={6}>
          <TextField
            error={state.fullnameError ? true : false}
            required
            id="fullname"
            label="Full Name"
            fullWidth
            autoComplete="name"
            value={fullname}
            onChange={fullnameChanged}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            error={state.phoneError ? true : false}
            id="phone"
            label="Mobile Number (optional)"
            fullWidth
            autoComplete="tel"
            value={phone}
            onChange={phoneChanged}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            error={state.emailError ? true : false}
            id="email"
            label="Email Address (optional)"
            fullWidth
            autoComplete="email"
            type="email"
            value={email}
            onChange={emailChanged}
            // helperText = 'This email address is where you will receive your results. Please tick the box below to confirm that this is a private email address to which you are happy for us to send your results.'
          />
        </Grid>

        {/* <Grid item xs={12} md={6}>
          <TextField
            error={state.retypeEmailError ? true : false}
            required
            id="retypeEmail"
            label="Retype Email Address"
            fullWidth
            autoComplete="email"
            type="email"
            value={retypeEmail}
            onChange={retypeEmailChanged}
            // helperText = 'This email address is where you will receive your results. Please tick the box below to confirm that this is a private email address to which you are happy for us to send your results.'
          />
        </Grid> */}

        {/* <Grid item xs={12} className={classes.formControl} >
          <FormControlLabel className={classes.formControl}  style={ {color: state.emailConfirmedError ? "red" : ''}} 
            control={<Checkbox className={classes.formControl} style={ {color: state.emailConfirmedError ? "red" : ''}}  color="secondary" name="emailConfirmCheckBox" checked={emailConfirmed} onChange={emailConfirmedChanged} />}
             label={<span style={{ fontSize: '0.8rem' }}>{`I confirm that this is a private email address to which I am happy for you to send my results.`} </span>}
          />
          <p>{'* Please take care when entering your information, and double check that everything entered on this form is correct.'}</p>
        </Grid> */}

        <Grid item xs={12}>
          <TextField
            style={{ marginTop: "10px" }}
            id="notes"
            // error={state.notesError && state.package === "Others"}
            fullWidth
            // required={state.package === "Others"}
            label="Notes (optional)"
            value={notes}
            onChange={notesChanged}
            multiline
            rows={4}
            placeholder="If there's anything you want to tell the doctor beforehand, enter it here..."
            variant="outlined"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
