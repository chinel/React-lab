import dynamic from "next/dynamic";
const App = dynamic(() => import("./components/app"));

const AdminPage = () => {
  return <App />;
};

export default AdminPage;
