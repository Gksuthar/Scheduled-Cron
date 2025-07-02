import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  console.error('Routing Error:', error);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>❌ Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p style={{ color: 'gray' }}>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
