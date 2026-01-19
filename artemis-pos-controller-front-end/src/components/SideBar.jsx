import { GiPocketBow } from 'react-icons/gi';
import { FaChartArea } from 'react-icons/fa';
import { FaCashRegister } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { Link, useLocation } from 'react-router';

export function SideBar() {
  const { pathname } = useLocation();

  return (
    <aside className='flex flex-col justify-between items-center h-full pt-5 pr-6 pb-5'>
      <GiPocketBow className='w-15 fill-silver-950 bg-silver-50 p-3 rounded-2xl shadow-md' />

      <nav className='flex flex-col gap-10'>
        <Link to='/'>
          <FaCashRegister
            className={`size-10 w-full ${
              pathname === '/' ? 'fill-silver-50' : 'fill-silver-500'
            }`}
          />
        </Link>

        <Link to={`/sales-stats`}>
          <FaChartArea
            className={`size-10 w-full ${
              pathname === '/sales-stats' ? 'fill-silver-50' : 'fill-silver-500'
            }`}
          />
        </Link>
      </nav>

      <Link to='https://github.com/luccas-sales' target='_blank'>
        <FaGithub className='size-7 fill-silver-800' />
      </Link>
    </aside>
  );
}
