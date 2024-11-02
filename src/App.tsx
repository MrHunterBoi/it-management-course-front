import { modals } from '@mantine/modals';
import LoginModal from './components/modals/LoginModal';
import PoemsList from './components/dashboard/PoemsList';

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

      <PoemsList />
    </div>
  );
}

export default App;
