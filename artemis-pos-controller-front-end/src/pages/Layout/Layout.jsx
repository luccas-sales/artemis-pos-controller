import { SideBar } from '../../components/SideBar';
import { Outlet } from 'react-router';

export function Layout() {
  return (
    <div className='flex h-screen p-6'>
      <SideBar />
      <Outlet />
    </div>
  );
}
