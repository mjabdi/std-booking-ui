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
import { FormControl, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Checkout from "./checkout";

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
    padding: "5px",
    transition: "all 0.4s ease-in-out",
    boxShadow: " 0 0 10px rgb(0 0 0 / 20%)",
    [theme.breakpoints.up("md")]: {
      minHeight: "130px",
    },
  },

  pageTitle: {
    color: theme.palette.primary.main,
    marginBottom: "15px",
  },
}));

const Packages = [
  {
    packageName: "Bronze",
    malePrice: "£250.00",
    femalePrice: "£250.00",
    color: "#aaa",
  },
  {
    packageName: "Silver",
    malePrice: "£325.00",
    femalePrice: "£375.00",
    color: "#00a1c5",
  },
  {
    packageName: "Gold",
    malePrice: "£475.00",
    femalePrice: "£490.00",
    color: "#ff7a11",
  },
  {
    packageName: "Platinium",
    malePrice: "£625.00",
    femalePrice: "£665.00",
    color: "#333",
  },
];

const Packages2 = [
  {
    packageName: "BLOOD SAMPLE AND URINE",
    desc: "HIV I&II, Syphilis IgM/IgG, Chlamydia, Gonorrhoea",
    price: "£350.00",
    color: "#3fc566",
  },
  {
    packageName: "BLOOD SAMPLE AND URINE OR SWAB",
    desc:
      "HIV I&II, Hepatitis B, Hepatitis C Antibodies, Hepatitis C Antigen, Syphilis IgM/IgG -",
    price: "£450.00",
    color: "#3fc566",
  },
];

const Individuals = [
  {
    packageName: "HIV TESTING",
    desc: "HIV I & II",
    price: "£46.00",
  },
  {
    packageName: "CHLAMYDIA TESTING",
    price: "£64.00",
  },
  {
    packageName: "SYPHILIS TESTING",
    price: "£52.00",
  },
  {
    packageName: "HERPES TESTING",
    desc: "Herpes I & II",
    price: "£75.00",
  },
  {
    packageName: "GONORRHOEA TESTING",
    price: "£64.00",
  },
  {
    packageName: "HEPATITIS A PROFILE TESTING",
    desc: "A",
    price: "£70.00",
  },
  {
    packageName: "HEPATITIS B PROFILE TESTING",
    desc: "B",
    price: "£110.00",
  },
  {
    packageName: "HEPATITIS C ANTIBODIES TESTING",
    desc: "C",
    price: "£85.00",
  },
  {
    packageName: "HPV TESTING",
    price: "£118.00",
  },
  {
    packageName: "BACTERIAL SWAB TESTING",
    price: "£50.00",
  },
];

const IndividualsCombo = [
  {
    packageName: "CHLAMYDIA, GONORRHOEA AND TRICHOMONAS",
    price: "£94.00",
  },
  {
    packageName: "HIV I & II WITH SYPHILIS",
    price: "£170.00",
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

  const packageClicked = (_packageName, gender, price) => {
    setPackageName(`${_packageName} (${gender})`);
    setPackagePrice({ ...state, packagePrice: price });

    setState((state) => ({
      ...state,
      packageName: `${_packageName} (${gender})`,
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
      _temp.push({
        packageName: _packageName,
        price: price,
      });
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
      _temp.push({
        packageName: _packageName,
        price: price,
      });
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
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
            fontWeight: "400",
            color: "#555",
            marginBottom: "20px",
          }}
        >
          Full STD Check Packages
        </div>

        <Grid
          container
          spacing={1}
          alignItems="baseline"
          style={{ marginTop: "10px" }}
        >
          {Packages.map((item) => (
            <Grid item xs={12} md={3}>
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
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <div style={{ fontWeight: "600", fontSize: "1.2rem" }}>
                      {item.packageName}
                    </div>
                  </Grid>

                  <Grid item>
                    <div style={{ marginTop: "10px" }}>
                      <FormControlLabel
                        control={
                          packageName.startsWith(item.packageName) ? (
                            <WhiteRadio
                              color="secondary"
                              checked={
                                packageName === `${item.packageName} (male)`
                              }
                              onClick={() =>
                                packageClicked(
                                  item.packageName,
                                  "male",
                                  item.malePrice
                                )
                              }
                            />
                          ) : (
                            <Radio
                              color="secondary"
                              checked={
                                packageName === `${item.packageName} (male)`
                              }
                              onClick={() =>
                                packageClicked(
                                  item.packageName,
                                  "male",
                                  item.malePrice
                                )
                              }
                            />
                          )
                        }
                        label={`Male - ${item.malePrice}`}
                      />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <FormControlLabel
                        control={
                          packageName.startsWith(item.packageName) ? (
                            <WhiteRadio
                              color="secondary"
                              checked={
                                packageName === `${item.packageName} (female)`
                              }
                              onClick={() =>
                                packageClicked(
                                  item.packageName,
                                  "female",
                                  item.femalePrice
                                )
                              }
                            />
                          ) : (
                            <Radio
                              color="secondary"
                              checked={
                                packageName === `${item.packageName} (female)`
                              }
                              onClick={() =>
                                packageClicked(
                                  item.packageName,
                                  "female",
                                  item.femalePrice
                                )
                              }
                            />
                          )
                        }
                        label={`Female - ${item.femalePrice}`}
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          ))}

          <div
            style={{
              textAlign: "center",
              width: "100%",
              fontSize: "1.2rem",
              fontWeight: "400",
              color: "#777",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            Why Choose a Package?
          </div>

          <div
            style={{
              textAlign: "center",
              width: "100%",
              fontWeight: "400",
              color: "#777",
            }}
          >
            Our STD Packages offer <b>excellent value</b> for our{" "}
            <b>premium service</b>. Included as standard: <b>A free review</b>{" "}
            of your results with our GP and a <b>free prescription</b> for
            whatever medication which you may need.
          </div>

        </Grid>
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          fontWeight: "400",
          color: "#555",
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
          <Grid item xs={12} md={6}>
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
                      color: packageName === item.packageName ? "#fff" : "#555",
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

      <Grid
        container
        spacing={1}
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        style={{ marginTop: "10px" }}
      >
        {Individuals.map((item) => (
          <Grid item xs={12} md={3}>
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
          <Grid item xs={12} md={4}>
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

        
                <div style={{backgroundColor:"#a0a0a0", color: "#fff", borderRadius:"4px", padding:"10px", fontSize:"1rem", marginTop:"20px", marginBottom:"10px", fontWeight:"400"}}>
                    A blood draw fee of <span style={{backgroundColor:"#f68529", padding:"1px 6px", fontWeight:"500", fontSize:"1.2rem"}}>£50</span> is payable for STI blood tests, urine tests and swabs carry no surcharge.
                </div>
      </Grid>

    </React.Fragment>
  );
}
