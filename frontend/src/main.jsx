import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store.js';
import { Provider } from 'react-redux'
import { ThemeProvider } from "./components/theme-provider.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
       <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
