import { useState, useEffect } from 'react';
import './App.css';

import useFetch from './hooks/useFetch';
import Table from './components/Table';
import ErrorComponent from './components/Error';

function App() {
  const [data, setData] = useState<any[] | undefined>([]);
  const { fetchCsvData } = useFetch();

  useEffect(() => {
    fetchCsvData('/data/data.csv', setData)
  }, []);

  console.log(data)

  return (
    <div className="App">
      {data ? (
        <Table users={data} />
      ) : (
        <ErrorComponent/>
      )}
    </div>
  );
}

export default App;
