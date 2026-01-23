import { GiPocketBow } from 'react-icons/gi';
import { FaChartArea } from 'react-icons/fa';
import { FaCashRegister } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { Link, useLocation } from 'react-router';

export function SideBar() {
  const { pathname } = useLocation();

  return (
    <aside className='flex flex-col justify-between items-center h-full pt-5 pr-6 pb-5 max-md:pr-3 max-sm:flex-row max-sm:h-15 max-sm:pt-0 max-sm:pr-0 max-sm:pb-3'>
      <Link
        to='https://github.com/luccas-sales/artemis-pos-controller'
        target='_blank'
      >
        <GiPocketBow className='w-15 fill-silver-950 bg-silver-50 p-3 rounded-2xl shadow-md max-sm:w-10 max-sm:p-2 max-sm:rounded-xl transition-all duration-300 ease-out text-shadow-md active:scale-100 lg:active:scale-100 lg:hover:scale-105 lg:hover:-rotate-5' />
      </Link>

      <nav className='flex flex-col gap-10 max-sm:flex-row'>
        <Link to='/'>
          <FaCashRegister
            className={`size-10 w-full ${
              pathname === '/' ? 'fill-silver-50' : 'fill-silver-500'
            } transition-all duration-300 ease-out text-shadow-md active:scale-95 lg:active:scale-95 lg:hover:-translate-y-0.5 lg:hover:text-shadow-lg max-sm:size-7`}
          />
        </Link>

        <Link to={`/sales-stats`}>
          <FaChartArea
            className={`size-10 w-full ${
              pathname === '/sales-stats' ? 'fill-silver-50' : 'fill-silver-500'
            } transition-all duration-300 ease-out text-shadow-md active:scale-95 lg:active:scale-95 lg:hover:-translate-y-0.5 lg:hover:text-shadow-lg max-sm:size-7`}
          />
        </Link>
      </nav>

      <Link to='https://github.com/luccas-sales' target='_blank'>
        <FaGithub className='size-7 fill-silver-800 transition-all duration-300 ease-out text-shadow-md active:scale-95 lg:active:scale-95 lg:hover:-translate-y-0.5 lg:hover:text-shadow-lg max-sm:size-6' />
      </Link>
    </aside>
  );
}
