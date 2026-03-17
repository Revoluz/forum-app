import LoadingBar from '@dimasmds/react-redux-loading-bar';

function Loading() {
  return (
    <LoadingBar
      style={{
        backgroundColor: '#2eaadc',
        height: '3px',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    />
  );
}

export default Loading;
