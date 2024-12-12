
import RequestTile from './components/RequestTile';
import requestData from './data.json';
import { RequestDataType } from './types';

const requests: RequestDataType[] = requestData as RequestDataType[]

function App() {
  return (
    <div className="p-4 flex flex-wrap gap-4">
      {requests.map((data) => (
        <RequestTile key={data.id} data={data} />
      ))}
    </div>
  );
}

export default App;
