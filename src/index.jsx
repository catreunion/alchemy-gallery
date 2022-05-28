import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"

const theme = createTheme({
  // palette: {
  //   primary: {
  //     light: "#6ec6ff",
  //     main: "#2196f3",
  //     dark: "#0069c0",
  //     contrastText: "#fff"
  //   },
  //   secondary: {
  //     light: "#62eeff",
  //     main: "#00bbd3",
  //     dark: "#008ba2",
  //     contrastText: "#000"
  //   }
  // }
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
