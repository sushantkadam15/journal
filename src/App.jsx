import UserAuthenticationForm from "./components/UserAuthenticationForm";
import {ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider>
      <section>
        <UserAuthenticationForm />
      </section>
    </ConfigProvider>
  );
}

export default App;
