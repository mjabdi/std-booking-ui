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
import { withStyles } from '@material-ui/core/styles';

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
    padding: "10px",
    transition: "all 0.4s ease-in-out",
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


const WhiteRadio = withStyles({
  root: {
    color: "#fff"
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
            color: "#777",
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
            <Grid item xs={12} md={6}>
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
                          packageName.startsWith(item.packageName) ? 
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
                          :
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
                        }
                        label={`Male - ${item.malePrice}`}
                      />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <FormControlLabel
                        control={
                          packageName.startsWith(item.packageName) ? 
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
                          :

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
            of your results with our GP and a <b>free prescription</b> for whatever
            medication which you may need.
          </div>

          {/* <Grid item xs={12}>
          <TextField
            style={{marginTop:"10px"}}
            id="notes"
            // error={state.notesError && state.package === "Others"}
            fullWidth
            // required={state.package === "Others"}
            label="Others"
            value={notes}
            onChange={notesChanged}
            multiline
            rows={4}
            placeholder="please enter your note here..."
            variant="outlined"
          />
        </Grid> */}
        </Grid>
      </div>
    </React.Fragment>
  );
}
