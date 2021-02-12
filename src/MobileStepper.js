import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";

const StyledMobileStepper = withStyles({
  root: {
    maxWidth: "100%",
    flexGrow: 1
  },
  progress: {
    width: "100%"
  }
})(MobileStepper);

export default StyledMobileStepper;