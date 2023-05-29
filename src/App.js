import { CssBaseline, ThemeProvider } from "@mui/material";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";

import TopBar from "./scenes/global/TopBar";
import SideBar from "./scenes/global/SideBar";

import SignIn from "./auth/SignIn";

import Customers from "./scenes/bank/Customers";
import CustomerForm from "./scenes/bank/CustomersForm";
import Account from "./scenes/bank/Account";
import OperationHistory from "./scenes/bank/OperationHistory";
import AccountDetails from "./scenes/bank/AccountDetails";

function App() {
  const location = useLocation();
  const showBars = !['/signin', '/signup'].includes(location.pathname);
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div className="app">
          {showBars && <SideBar />}
          {showBars && <CssBaseline />}
          <main className="content">
            {showBars && <TopBar />}
            <Routes>
              <Route path="/" element={<Customers />} />
              <Route path="/addcustomer" element={<CustomerForm />} />

              <Route path="/accounts/:customerId" element={<Account />} />
              <Route path="/accounts/:customerId/:accountId" element={<OperationHistory />} />
              <Route path="/operations/:customerId/:accountId" element={<AccountDetails />} />

              <Route path="/signin" element={<SignIn />} />

              <Route path="/*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App