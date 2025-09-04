import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LocationProvider } from './context/LocationContext.jsx'
import { DataProvider } from './context/DataContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ToastContainer } from 'react-toastify'
import ScrollToTop from 'react-scroll-to-top'


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <LocationProvider>
            <DataProvider>
                <CartProvider>
                    <App />
                    <ScrollToTop color='white' smooth style={{ backgroundColor: '#fa2d37', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </CartProvider>
            </DataProvider>
        </LocationProvider>
    </StrictMode>,
)
