import axios from 'axios';
import { Routes } from './routes/Routes';
import { DatabaseContextProvider } from './contexts/DatabaseContext';
import '../i18nify';

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;

function App() {
  return (
    <DatabaseContextProvider>
      <Routes />
    </DatabaseContextProvider>
  );
}

export default App;
