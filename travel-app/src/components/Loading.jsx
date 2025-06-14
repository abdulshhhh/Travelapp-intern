import Lottie from 'lottie-react';
import loadingAnimation from '../../public/assets/loading.json';

export default function Loading() {
  return (
    <div className="loading-container" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#1a202c' // A dark background color
    }}>
      <div style={{ width: '250px', height: '250px' }}>
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
}
