import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import './style/style.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import AppRoutes from './routes/AppRoutes.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster />
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </>
)
