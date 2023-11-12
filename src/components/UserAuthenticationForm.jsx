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
      <Divider style={{ fontSize: 12, paddingTop: 20, paddingBottom: 20 }}>
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
      <div className=" flex  gap-10">
        <img src={googleIcon} alt="google logo" className="h-6 w-auto" />
        <img src={appleIcon} alt="apple logo" className="h-6 w-auto" />
      </div>
    </form>
  );
};

const UserAuthenticationForm = () => {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Row className="h-screen">
      <Col xs={24} lg={14}>
        <Row className=" flex h-4/6 flex-col justify-center gap-20">
          <div className=" mx-auto flex w-96 items-center justify-start gap-5">
            <img src={logo} alt="Logo" />{" "}
            <h1 className=" text-4xl">Journiyfy</h1>
          </div>

          <div className="mx-auto h-96 w-96">
            <Tabs
              className=" font-JetBrains"
              onChange={onChange}
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
        <Row className=" mt-10 h-[29%] bg-[#F9B3B30D]">
          {/* <div className="ml-10 mt-10 w-96 md:mx-auto">
            <h2 className=" text-xl">Login</h2>
            <p className=" mt-4 text-xs">Already have an account?</p>
            <div className=" mt-5 flex gap-10">
              <img src={googleIcon} alt="google logo" className="h-6 w-auto" />
              <img src={appleIcon} alt="apple logo" className="h-6 w-auto" />
            </div>
          </div> */}
        </Row>
      </Col>
      <Col xs={0} lg={10} className=" relative">
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
