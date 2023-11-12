import backgroundVideo from "../assets/authentication/authentication_page.mp4";
import logo from "../assets/logo.svg";
import googleIcon from "../assets/authentication/devicon_google.png";
import appleIcon from "../assets/authentication/bi_apple.png";
import { Col, Row, Typography, Input, Button, Tabs, Divider } from "antd";
const { Title, Paragraph } = Typography;

const SignUp = () => {
  return (
    <form className="font-JetBrains">
      <label htmlFor="name" className="mb-1 block">
        Name
      </label>
      <Input
        id="name"
        className=" placeholder:font-JetBrains"
        size="middle"
        placeholder="Name"
      />

      <label htmlFor="email" className="mb-1 mt-4 block">
        Email
      </label>
      <Input
        id="email"
        className=" placeholder:font-JetBrains"
        size="middle"
        placeholder="Email"
      />

      <label htmlFor="password" className="mb-1 mt-4 block">
        Password
      </label>
      <Input
        id="password"
        className=" placeholder:font-JetBrains"
        size="middle"
        placeholder="Password"
      />

      <Button htmlType="submit" type="primary" className="mt-8">
        Sign Up
      </Button>
      <Divider style={{ fontSize: 10, paddingTop: 20, paddingBottom: 20 }}>
        Or continue with
      </Divider>
      <div className=" flex  gap-10">
        <img src={googleIcon} alt="google logo" className="h-6 w-auto" />
        <img src={appleIcon} alt="apple logo" className="h-6 w-auto" />
      </div>
    </form>
  );
};

const SignIn = () => {
  return (
    <form className="font-JetBrains">
      <label htmlFor="email" className="mb-1 mt-4 block">
        Email
      </label>
      <Input
        id="email"
        className=" placeholder:font-JetBrains"
        size="middle"
        placeholder="Email"
      />

      <label htmlFor="password" className="mb-1 mt-4 block">
        Password
      </label>
      <Input
        id="password"
        className=" placeholder:font-JetBrains"
        size="middle"
        placeholder="Password"
      />

      <Button htmlType="submit" type="primary" className="mt-8">
        Sign In
      </Button>
      <Divider
        style={{
          fontSize: 12,
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <span className=" font-JetBrains"> 0r continue with </span>
      </Divider>
      <div className=" flex gap-10">
        <img src={googleIcon} alt="google logo" className="h-6 w-auto" />
        <img src={appleIcon} alt="apple logo" className="h-6 w-auto" />
      </div>
    </form>
  );
};

const UserAuthenticationForm = () => {
  return (
    <Row className="h-screen">
      <Col xs={24} md={14}>
        <Row className=" mx-5 flex h-4/5 flex-col justify-center gap-20 md:mx-auto">
          <div className=" mx-auto mt-12 flex items-center justify-start gap-5 md:mt-0 md:w-96">
            <img src={logo} alt="Logo" className=" h-12 md:h-20" />{" "}
            <h1 className="text-2xl md:text-4xl">Journiyfy</h1>
          </div>

          <div className="mx-auto md:h-96 md:w-96">
            <Tabs
              className=" font-JetBrains"
              type="card"
              items={new Array(2).fill(null).map((_, i) => {
                const id = String(i + 1);
                return {
                  label: i === 0 ? "Sign In" : "Sign Up", // Update the label based on the index
                  key: id,
                  children: i === 0 ? <SignIn /> : <SignUp />,
                };
              })}
            />
          </div>
        </Row>
        <Row className=" mt-10  h-[15%]  md:h-[16%] bg-[#F9B3B30D]">
          <p className=" m-5 mx-auto mt-auto text-xs font-light text-[#7c7065cf] ">
            {" "}
            Created with 🧡 by Candice & Sushant{" "}
          </p>
          {/* New content pending  */}
        </Row>
      </Col>
      <Col xs={0} md={10} className=" relative">
        <video
          src={backgroundVideo}
          autoPlay="{true}"
          loop
          muted
          className=" absolute h-full w-full object-cover"
        ></video>
        <p className=" tracking-wides absolute mt-[30%] w-full text-center font-JetBrains text-black">
          A place to zen your thoughts.
        </p>
      </Col>
    </Row>
  );
};

export default UserAuthenticationForm;
