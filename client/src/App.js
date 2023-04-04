import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layouts/Navbar";
import Footer from "./components/Layouts/Footer";
import ProductsScreen from "./screens/ProductsScreen";
import CartScreen from "./screens/CartScreen";
import ProductScreen from "./screens/ProductScreen";
import LandingScreen from "./screens/LandingScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import OrderSuccessScreen from "./screens/OrderSuccessScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import AdminConsoleScreen from "./screens/AdminScreen";
import MTest1 from "./screens/mtest1";
import MTest2 from "./screens/mtest2";
import MTest3 from "./screens/mtest3";
import MTest4 from "./screens/mtest4";
import MTest5 from "./screens/mtest5";
import MTest6 from "./screens/mtest6";
import MTest7 from "./screens/mtest7";
import MTest8 from "./screens/mtest8";
import MTest9 from "./screens/mtest9";
import DTest1 from "./screens/dtest1";
import DTest2 from "./screens/dtest2";
import DTest3 from "./screens/dtest3";
import DTest4 from "./screens/dtest4";
import DTest5 from "./screens/dtest5";
import DTest6 from "./screens/dtest6";
import DTest7 from "./screens/dtest7";
import DTest8 from "./screens/dtest8";
import DTest9 from "./screens/dtest9";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingScreen />}></Route>
            <Route path="/products" element={<ProductsScreen />}></Route>
            <Route path="/product/:id" element={<ProductScreen />}></Route>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/checkout" element={<CheckoutScreen />}></Route>
            <Route
              path="/order-success"
              element={<OrderSuccessScreen />}
            ></Route>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/registration" element={<RegistrationScreen />} />
            <Route path="/admin-console" element={<AdminConsoleScreen />} />
            <Route path="/:slug"></Route>
            <Route path="/mtest1" element={<MTest1 />} />
            <Route path="/mtest2" element={<MTest2 />} />
            <Route path="/mtest3" element={<MTest3 />} />
            <Route path="/mtest4" element={<MTest4 />} />
            <Route path="/mtest5" element={<MTest5 />} />
            <Route path="/mtest6" element={<MTest6 />} />
            <Route path="/mtest7" element={<MTest7 />} />
            <Route path="/mtest8" element={<MTest8 />} />
            <Route path="/mtest9" element={<MTest9 />} />
            <Route path="/dtest1" element={<DTest1 />} />
            <Route path="/dtest2" element={<DTest2 />} />
            <Route path="/dtest3" element={<DTest3 />} />
            <Route path="/dtest4" element={<DTest4 />} />
            <Route path="/dtest5" element={<DTest5 />} />
            <Route path="/dtest6" element={<DTest6 />} />
            <Route path="/dtest7" element={<DTest7 />} />
            <Route path="/dtest8" element={<DTest8 />} />
            <Route path="/dtest9" element={<DTest9 />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
