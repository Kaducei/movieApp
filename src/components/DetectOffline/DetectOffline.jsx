import { Detector } from 'react-detect-offline';
import { Alert } from 'antd';

function DetectorOffline({ children }) {
  return (
    <Detector
      render={({ online }) =>
        online ? children : <Alert message="Error" description="Have no network" type="error" showIcon />
      }
    />
  );
}
export default DetectorOffline;
