import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] ">
      {isLoading && <Loader />}
      <Header />

      <div className=" overflow-auto">
        <main className=" mx-auto max-w-3xl">
          {
            //we made all the other routes
            //child routes of the app layout.
            //So they are all nested routes now.
            //And so then inside the parent route,
            //we can use the outlet component
            //to render whatever is the current nested route.
          }
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
