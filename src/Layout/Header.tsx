import '../css/Header.css'

import Avatar from 'react-avatar';
import Dropdown from '../components/Dropdown';
import { useSelector } from 'react-redux';
import { useUser } from '../redux/sliceUser';

interface HeaderProps {
  toggleOpen: () => void;
  isOpen: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { toggleOpen, isOpen } = props;
  const user = useSelector(useUser)

  return (
    <div className="flex px-5 justify-between items-center shadow-lg h-20">
      <div className="flex gap-2">
        {!isOpen && (
          <button  onClick={toggleOpen}>
            <i className="fa-solid fa-bars"></i>
          </button>
        )}
        {isOpen && (
          <button  onClick={toggleOpen}>
            <i className="fa-solid fa-times"></i>
          </button>
        )}
        <div className="flex gap-1">
          <span className="text-stone-400">LUIZ</span>
          <span className="text-stone-600">KNOWLEDGE</span>
        </div>
      </div>
      <div className="flex items-center  gap-2">
        <Avatar
        size='30'
        round
        name={user.name}

        />
        <Dropdown/>
      </div>
    </div>
  );
};

export default Header;
