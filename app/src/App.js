
import Layout from './components/Layout';
import UpdateProduct from './pages/UpdateProduct';
import { Route, Routes } from "react-router-dom";
import AllProduct from './pages/AllProduct';
import AddProduct from './pages/AddProduct';
 
function App() {
  return (
    <Layout>
      <Routes>
      <Route path="/" element={<AllProduct />} />
      </Routes>
      <Routes>
        <Route path="/product-create" element={<AddProduct />} />
      </Routes>
      <Routes>
        <Route
          path="/product-update"
          element={<UpdateProduct />}
        />
      </Routes>
    </Layout>
  );
}
export default App;