import { useState, useEffect } from 'react';
import './App.css';

import useFetch from './hooks/useFetch';
import Table from './components/Table';

function App() {
  const [data, setData] = useState<any[] | undefined>([]);
  const { fetchCsvData } = useFetch();

  useEffect(() => {
    fetchCsvData('/data/file.csv', setData)
  }, []);

  console.log(data)

  return (
    <div className="App">
      {data && data.length > 0 && <Table users={data} />}
      {data === undefined && <p>Invalid CSV</p>}
    </div>
  );
}

export default App;
