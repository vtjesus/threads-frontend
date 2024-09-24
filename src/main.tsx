import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import { BrowserRouter as Router } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import {Provider} from 'react-redux'
import store from './Redux/store.ts';

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
     refetchOnWindowFocus:false,
    }
 }
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
        <Toaster visibleToasts={1} position='top-right' richColors/>
      </Provider>
    </QueryClientProvider>
  </Router>
)
