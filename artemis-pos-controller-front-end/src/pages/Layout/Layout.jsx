import { SideBar } from '../../components/SideBar';
import { Outlet } from 'react-router';

export function Layout() {
  return (
    <div className='flex h-screen p-6 max-md:p-3 max-sm:flex-col'>
      <SideBar />
      <Outlet />
    </div>
  );
}
