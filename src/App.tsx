import { modals } from '@mantine/modals';
import LoginModal from './components/modals/LoginModal';

function App() {
  const openModal = () => {
    modals.open({
      title: 'Log in',
      children: <LoginModal />,
    });
  };

  return (
    <div>
      <button onClick={openModal}>Open modal</button>
    </div>
  );
}

export default App;
