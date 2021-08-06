import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import GlobalState from "./GlobalState";
import PersonsBox from "./PersonsBox";
import AntiBodyComponent from "./AntiBodyComponent";
import {
  Button,
  DialogActions,
  FormControl,
  FormLabel,
  Icon,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Checkout from "./checkout";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dialog from "@material-ui/core/Dialog";

import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  formControl: {
    textAlign: "justify",
  },

  FormTitle: {
    marginTop: "20px",
    marginBottom: "20px",
  },

  packageBox: {
    border: "2px solid",
    borderRadius: "4px",
    width: "100%",
    padding: "20px 5px",

    transition: "all 0.4s ease-in-out",
    boxShadow: " 0 0 10px rgb(0 0 0 / 20%)",
    [theme.breakpoints.up("xs")]: {
      minHeight: "170px",
    },

    cursor: "pointer",
  },

  pageTitle: {
    color: theme.palette.primary.main,
    marginBottom: "15px",
  },
}));

export const Packages = [
  {
    packageName: "Sexual Health Clinic - Bronze",
    title: "Bronze",
    malePrice: "£250.00",
    femalePrice: "£250.00",
    color: "#aaa",
    descriptions: [
      "Chlamydia and Gonorrhoea - Urine Sample",
      "Syphilis, HIV I/II Antibodies - Blood Sample",
    ],
  },
  {
    packageName: "Sexual Health Clinic - Silver",
    title: "Silver",
    malePrice: "£325.00",
    femalePrice: "£375.00",
    color: "#00a1c5",
    descriptions: [
      "Chlamydia, Gonorrhoea, Mycoplasma, Trichomoniasis, Ureaplasma, Gardnerella - Urine Sample",
      "Herpes I&II, Syphilis, HIV I/II Antibodies - Blood Sample",
      "Additional Bacterial Swab for Women; screening for Candida and Bacterial Vaginosis",
    ],
  },
  {
    packageName: "Sexual Health Clinic - Gold",
    title: "Gold",
    malePrice: "£475.00",
    femalePrice: "£490.00",
    color: "#ff7a11",
    descriptions: [
      "Chlamydia, Gonorrhoea, Mycoplasma, Trichomoniasis, Ureaplasma, Gardnerella, Herpes I&II - Urine Sample",
      "Syphilis, HIV I/II Antibodies, Hepatitis B & C - Blood Sample",
      "Additional Swab for Women; screening for Candida, BV, Fungi, Trichomoniasis, Ureaplasma and Gardnerella",
    ],
  },
  {
    packageName: "Sexual Health Clinic - Platinium",
    title: "Platinium",
    malePrice: "£625.00",
    femalePrice: "£665.00",
    color: "#333",
    descriptions: [
      "The same STD screenings are included in the Platinum Screen as our Gold Package, however with an Human Papilloma Virus (HPV) Swab including 16, 18 and High Risk types.",
    ],
  },
];

export const Packages2 = [
  {
    packageName: "BLOOD SAMPLE AND URINE",
    title: "BLOOD_SAMPLE_AND_URINE",
    desc: "HIV I&II, Syphilis IgM/IgG, Chlamydia, Gonorrhoea",
    price: "£350.00",
    color: "#3fc566",
  },
  {
    packageName: "BLOOD SAMPLE AND URINE OR SWAB",
    title: "BLOOD_SAMPLE_AND_URINE_OR_SWAB",
    desc:
      "HIV I&II, Hepatitis B, Hepatitis C Antibodies, Hepatitis C Antigen, Syphilis IgM/IgG -",
    price: "£450.00",
    color: "#94b8dd",
  },
];

const Individuals = [
  {
    packageName: "HIV TESTING",
    desc: "HIV I & II",
    price: "£49.00",
  },
  {
    packageName: "CHLAMYDIA TESTING",
    price: "£79.00",
  },
  {
    packageName: "SYPHILIS BLOOD TESTING",
    price: "£55.00",
  },
  // {
  //   packageName: "HERPES TESTING",
  //   desc: "Herpes I & II",
  //   price: "£92.50",
  // },
  {
    packageName: "GONORRHOEA TESTING",
    price: "£79.00",
  },
  {
    packageName: "HEPATITIS A PROFILE TESTING",
    desc: "A",
    price: "£87.00",
  },
  {
    packageName: "HEPATITIS B PROFILE TESTING",
    desc: "B",
    price: "£109.50",
  },
  {
    packageName: "HEPATITIS C ANTIBODIES TESTING",
    desc: "C",
    price: "£89.00",
  },
  {
    packageName: "HPV TESTING",
    price: "£200.00",
  },
  {
    packageName: "BACTERIAL SWAB TESTING",
    price: "£68.50",
  },
];

const IndividualsCombo = [
  {
    packageName: "CHLAMYDIA, GONORRHOEA AND TRICHOMONAS",
    price: "£114.00",
  },
  {
    packageName: "HIV I & II WITH SYPHILIS",
    price: "£190.00",
  },
];

const WhiteRadio = withStyles({
  root: {
    color: "#fff",
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default function PackageForm() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);

  const [packageName, setPackageName] = React.useState(state.packageName || "");
  const [packagePrice, setPackagePrice] = React.useState(
    state.packagePrice || 0
  );

  const [notes, setNotes] = React.useState(state.notes ?? "");

  const notesChanged = (event) => {
    setNotes(event.target.value);
    setState((state) => ({ ...state, notes: event.target.value }));
    setState((state) => ({ ...state, notesError: false }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packageClicked = (_packageName, price) => {
    setPackageName(`${_packageName}`);
    setPackagePrice({ ...state, packagePrice: price });

    setState((state) => ({
      ...state,
      packageName: `${_packageName}`,
      packagePrice: price,
    }));
  };

  const package2Clicked = (_packageName, price) => {
    setPackageName(`${_packageName}`);
    setPackagePrice({ ...state, packagePrice: price });

    setState((state) => ({
      ...state,
      packageName: `${_packageName}`,
      packagePrice: price,
    }));
  };

  const indivisualClicked = (checked, _packageName, price) => {
    if (checked) {
      setPackageName(`Indivisual Tests`);
      setPackagePrice({ ...state, packagePrice: 0 });
      setState((state) => ({
        ...state,
        packageName: `Indivisual Tests`,
        packagePrice: 0,
      }));

      const _temp = state.indivisualTests;
      if (_temp.findIndex((e) => e.packageName === _packageName) < 0) {
        _temp.push({
          packageName: _packageName,
          price: price,
        });
      }

      setState((state) => ({ ...state, indivisualTests: _temp }));
    } else {
      setState((state) => ({
        ...state,
        indivisualTests: state.indivisualTests.filter(
          (e) => e.packageName !== _packageName
        ),
      }));
    }
  };

  const indivisualComboClicked = (checked, _packageName, price) => {
    if (checked) {
      setPackageName(`Combo STD Checks`);
      setPackagePrice({ ...state, packagePrice: 0 });
      setState((state) => ({
        ...state,
        packageName: `Combo STD Checks`,
        packagePrice: 0,
      }));

      const _temp = state.indivisualCombos;
      if (_temp.findIndex((e) => e.packageName === _packageName) < 0) {
        _temp.push({
          packageName: _packageName,
          price: price,
        });
      }
      setState((state) => ({ ...state, indivisualCombos: _temp }));
    } else {
      setState((state) => ({
        ...state,
        indivisualCombos: state.indivisualCombos.filter(
          (e) => e.packageName !== _packageName
        ),
      }));
    }
  };

  const [infoItem, setInfoItem] = React.useState(null);
  const [showInfoDialog, setShowInfoDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setShowInfoDialog(false);
  };

  const showMoreInfoDialog = (item) => {
    setInfoItem(item);
    setShowInfoDialog(true);
  };

  return (
    <React.Fragment>
      <Typography className={classes.pageTitle} variant="h6" gutterBottom>
        Choose your Package
      </Typography>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 0px 20px #dadada",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
            fontWeight: "500",
            color: "#ff7a11",
            marginBottom: "20px",
          }}
        >
          Full STD Check Packages
        </div>


        <Alert severity="warning" style={{marginBottom:"15px", fontSize:"0.9rem" ,lineHeight:"1.5rem", textAlign:"justify"}}>
           Please note, when providing a <b>urine sample</b> you must have been holding your urine for <b>3 hours prior</b> to your appointment. If this isn’t possible, we will provide you with the sample container for you to drop back once you a sample has been provided.
           </Alert>



          <Alert severity="info">

            
        <div
            style={{
              textAlign: "center",
              width: "100%",
              fontSize: "1.2rem",
              fontWeight: "400",
              color: "#333",
              marginBottom: "20px",
              // marginTop: "20px",
            }}
          >
            Why Choose a Package?
          </div>

          <div
            style={{
              textAlign: "center",
              width: "100%",
              fontWeight: "400",
              color: "#333",
            }}
          >
            Our STD Packages offer <b>excellent value</b> for our{" "}
            <b>premium service</b>. Included as standard: <b>A free review</b>{" "}
            of your results with our GP and a <b>free prescription</b> for
            whatever medication which you may need.
          </div>
          </Alert>


        <Grid
          container
          spacing={1}
          alignItems="baseline"
          style={{ marginTop: "10px" }}
        >
          {Packages.map((item) => (
            <Grid item xs={6} sm={3} md={3}>
              <div
                className={classes.packageBox}
                style={
                  packageName?.startsWith(item.packageName)
                    ? {
                        borderColor: item.color,
                        color: "#fff",
                        backgroundColor: item.color,
                      }
                    : { borderColor: item.color, color: item.color }
                }
              >
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={1}
                >
                  <div
                    onClick={() =>
                      packageClicked(
                        item.packageName,
                        `${item.malePrice}(Male) - ${item.femalePrice}(Female)`
                      )
                    }
                    style={{ width: "97%" }}
                  >
                    <Grid item xs={12}>
                      <div style={{ fontWeight: "500", fontSize: "1.2rem" }}>
                        {item.title}
                      </div>
                    </Grid>

                    <Grid item xs={12}>
                      <div style={{ marginTop: "10px" }}>
                        {item.malePrice === item.femalePrice && (
                          <div
                            style={{
                              fontSize: "1rem",
                              marginTop: "22px",
                              marginBottom: "35px",
                              fontWeight: "600",
                            }}
                          >
                            {item.malePrice}
                          </div>
                        )}

                        {item.malePrice !== item.femalePrice && (
                          <React.Fragment>
                            <div
                              style={{
                                fontSize: "1rem",
                                fontWeight: "600",
                                marginTop: "0px",
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faMars}
                                style={{ fontSize: "1.5rem" }}
                                transform="left-4 down-1"
                              />{" "}
                              {item.malePrice}
                            </div>
                            <div
                              style={{
                                fontSize: "1rem",
                                fontWeight: "600",
                                marginTop: "5px",
                                marginBottom: "10px",
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faVenus}
                                style={{ fontSize: "1.5rem" }}
                                transform="left-6 down-1"
                              />{" "}
                              {item.femalePrice}
                            </div>
                          </React.Fragment>
                        )}
                      </div>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() =>
                          packageClicked(
                            item.packageName,
                            `${item.malePrice}(Male) - ${item.femalePrice}(Female)`
                          )
                        }
                      >
                        Select
                      </Button>
                    </Grid>
                  </div>

                  <Grid item xs={12} md={12} style={{ marginTop: "10px" }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => showMoreInfoDialog(item)}
                    >
                      More Info
                    </Button>
                  </Grid>
                </Grid>
              </div>

            </Grid>
          ))}


              <div
                style={{
                  textAlign: "left",
                  width: "100%",
                  fontWeight: "600",
                  color: "#333",
                  marginTop:"10px"
                }}
              >
                <Alert severity="info" style={{fontWeight: "500"}}>
                   packages carry NO extra charges for blood draw.
                </Alert>
        
              </div>
        </Grid>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "10px",
          boxShadow: "0px 0px 20px #dadada",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
            fontWeight: "500",
            color: "#ff7a11",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          FAST STD SCREENS RESULTS - IN 4 WORKING HOURS
        </div>
        <Grid
          container
          spacing={1}
          alignItems="baseline"
          style={{ marginTop: "10px" }}
        >
          {Packages2.map((item) => (
            <Grid item xs={12} sm={6}>
              <div
                className={classes.packageBox}
                style={
                  packageName === item.packageName
                    ? {
                        borderColor: item.color,
                        color: "#fff",
                        backgroundColor: item.color,
                      }
                    : { borderColor: item.color, color: item.color }
                }
                onClick={() => package2Clicked(item.packageName, item.price)}
              >
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <div
                      style={{
                        fontWeight: "600",
                        fontSize: "1rem",
                        color:
                          packageName === item.packageName ? "#fff" : "#00a1c5",
                        marginTop: "5px",
                      }}
                    >
                      {item.packageName}
                    </div>
                  </Grid>

                  <Grid item>
                    <div
                      style={{
                        fontWeight: "400",
                        fontSize: "0.9rem",
                        color:
                          packageName === item.packageName ? "#fff" : "#555",
                        marginTop: "10px",
                      }}
                    >
                      {item.desc}
                    </div>
                  </Grid>

                  <Grid item>
                    <div style={{ marginTop: "10px" }}>
                      <FormControlLabel
                        control={
                          packageName === item.packageName ? (
                            <WhiteRadio
                              color="secondary"
                              checked={packageName === `${item.packageName}`}
                              onClick={() =>
                                package2Clicked(item.packageName, item.price)
                              }
                            />
                          ) : (
                            <Radio
                              color="secondary"
                              checked={packageName === `${item.packageName}`}
                              onClick={() =>
                                package2Clicked(item.packageName, item.price)
                              }
                            />
                          )
                        }
                        label={
                          <span
                            style={{ fontSize: "1.5rem", fontWeight: "500" }}
                          >{`${item.price}`}</span>
                        }
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "400",
          color: "#555",
          marginBottom: "10px",
          marginTop: "20px",
        }}
      >
        Individual Tests
      </div>

      <div
        style={{
          textAlign: "center",
          width: "100%",
          fontWeight: "400",
          color: "#777",
          lineHeight: "1.4rem",
        }}
      >
        For peace of mind,{" "}
        <b>
          {" "}
          those currently presenting with symptoms should opt for a package{" "}
        </b>
        , which includes a follow-up appointment and treatment.
      </div>

      <div style={{
        color: "#f00000",
        fontSize:"1rem",
        fontWeight:"500",
        padding: "10px"

      }}
      >
        * PLEASE NOTE INDIVIDUAL BLOOD TESTS CARRY A <b>£50</b> BLOOD DRAW FEE
      </div>

      <Grid
        container
        spacing={1}
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        style={{ marginTop: "10px" }}
      >
        {Individuals.map((item) => (
          <Grid item  xs={6} sm={3} md={3}>
            <div
              className={classes.packageBox}
              style={
                state.indivisualTests?.findIndex(
                  (e) => e.packageName === item.packageName
                ) >= 0 && packageName.startsWith("Indivisual Tests")
                  ? {
                      borderColor: "#ff7a11",
                      color: "#fff",
                      backgroundColor: "#ff7a11",
                    }
                  : { borderColor: "#ff7a11", color: "#ff7a11" }
              }
              onClick={(event) =>
                indivisualClicked(
                  state.indivisualTests.findIndex(
                    (e) => e.packageName === item.packageName
                  ) < 0,
                  item.packageName,
                  item.price
                )
              }
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <div
                    style={{
                      fontWeight: "500",
                      fontSize: "0.9rem",
                      color:
                        packageName.startsWith("Indivisual Tests") &&
                        state.indivisualTests?.findIndex(
                          (e) => e.packageName === item.packageName
                        ) >= 0
                          ? "#fff"
                          : "#00a1c5",
                      marginTop: "5px",
                    }}
                  >
                    {item.packageName}
                  </div>
                </Grid>

                <Grid item>
                  <div style={{ marginTop: "10px" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="secondary"
                          checked={
                            state.indivisualTests?.findIndex(
                              (e) => e.packageName === item.packageName
                            ) >= 0 && packageName.startsWith("Indivisual Tests")
                          }
                          onChange={(event) =>
                            indivisualClicked(
                              event.target.checked,
                              item.packageName,
                              item.price
                            )
                          }
                        />
                      }
                      label={
                        <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                          {item.desc
                            ? `${item.desc}-${item.price}`
                            : `${item.price}`}
                        </span>
                      }
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        ))}
      </Grid>

      <div
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "400",
          color: "#555",
          marginBottom: "10px",
          marginTop: "20px",
        }}
      >
        Combo STD Checks
      </div>

      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="stretch"
        style={{ marginTop: "10px" }}
      >
        {IndividualsCombo.map((item) => (
          <Grid item xs={6} sm={4} md={4}>
            <div
              className={classes.packageBox}
              style={
                state.indivisualCombos?.findIndex(
                  (e) => e.packageName === item.packageName
                ) >= 0 && packageName.startsWith("Combo STD Checks")
                  ? {
                      borderColor: "#ff7a11",
                      color: "#fff",
                      backgroundColor: "#ff7a11",
                    }
                  : { borderColor: "#ff7a11", color: "#ff7a11" }
              }
              onClick={(event) =>
                indivisualComboClicked(
                  state.indivisualCombos.findIndex(
                    (e) => e.packageName === item.packageName
                  ) < 0,
                  item.packageName,
                  item.price
                )
              }
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <div
                    style={{
                      fontWeight: "500",
                      fontSize: "0.9rem",
                      color:
                        packageName.startsWith("Combo STD Checks") &&
                        state.indivisualCombos?.findIndex(
                          (e) => e.packageName === item.packageName
                        ) >= 0
                          ? "#fff"
                          : "#00a1c5",
                      marginTop: "5px",
                    }}
                  >
                    {item.packageName}
                  </div>
                </Grid>

                <Grid item>
                  <div style={{ marginTop: "10px" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="secondary"
                          checked={
                            state.indivisualCombos?.findIndex(
                              (e) => e.packageName === item.packageName
                            ) >= 0 && packageName.startsWith("Combo STD Checks")
                          }
                          onChange={(event) =>
                            indivisualComboClicked(
                              event.target.checked,
                              item.packageName,
                              item.price
                            )
                          }
                        />
                      }
                      label={
                        <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                          {item.desc
                            ? `${item.desc}-${item.price}`
                            : `${item.price}`}
                        </span>
                      }
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        ))}

        <div
          style={{
            backgroundColor: "#fff5f5",
            color: "#cc0000",
            borderRadius: "4px",
            padding: "10px",
            fontSize: "1.1rem",
            marginTop: "20px",
            marginBottom: "10px",
            fontWeight: "500",
            lineHeight:"1.8rem",
            textAlign: "center",
          }}
        >
        If you are attending for a blood test on a self request basis (not referred by our doctor, as part of a package or a health screen) a blood draw fee of <b>£50</b>  is payable in addition to the fee for your test.        </div>
      </Grid>

      {infoItem && (
        <Dialog onClose={handleCloseDialog} open={showInfoDialog}>
          <div
            style={{
              padding: "20px",
              backgroundColor: infoItem.color,
              color: "#fff",
            }}
          >
            <div style={{ fontSize: "1.2rem", fontWeight: "500" }}>
              {infoItem.title} Screen testing for:
            </div>

            <div>
              <ul>
                {infoItem.descriptions.map((desc) => (
                  <li
                    style={{
                      fontSize: "1.1rem",
                      lineHeight: "2rem",
                      fontWeight: "400",
                      marginTop: "20px",
                    }}
                  >
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <DialogActions>
            <Button onClick={handleCloseDialog} color="default">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
}
