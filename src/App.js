import './App.css';
import Checkout from './checkout';
import WelcomeForm from './WelcomeForm';
import AgreementForm from './AgreementForm';
import GlobalState from './GlobalState'; 
import React, { useEffect } from 'react';
import BookService from './services/BookService';
import theme from "./theme";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

const getPackageName = () =>
{
  const packageName = window.location.search.toLowerCase().substr(3)
  console.log(packageName)
  return packageName
}

function App() {
  const [state, setState] = React.useState({activeStep : 0, bookingDate: null, persons: [], indivisualTests: [], indivisualCombos: []});

  useEffect(() => {
    
   const packageName = getPackageName()
   if (packageName && packageName.length > 0)
   {
     setState(state => ({...state, urlPackageName: packageName}))
   }

  }, [])

  return (
    <GlobalState.Provider value={[state, setState]}>
            <MuiThemeProvider theme={theme}>
        <CssBaseline />

      <div className="App">

        {!state.getStarted && !state.urlPackageName && ( <WelcomeForm/> )}
        {state.getStarted && !state.agreed && !state.urlPackageName && ( <AgreementForm/>  )}
        {((state.getStarted && state.agreed) || state.urlPackageName )  && ( <Checkout/>  )}

       
      </div>
      </MuiThemeProvider>
    </GlobalState.Provider>
  );
}

export default App;
