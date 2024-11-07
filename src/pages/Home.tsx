import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Link to="/stories">Stories</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/profile/settings">Settings</Link>
    </div>
  );
};

export default Home;
