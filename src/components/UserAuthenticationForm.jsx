import backgroundVideo from "../assets/authentication/authentication_page.mp4";
import logo from "../assets/logo.svg";
import googleIcon from "../assets/authentication/devicon_google.png";
import appleIcon from "../assets/authentication/bi_apple.png";
import { Col, Row, Typography, Input, Button } from "antd";
const { Title, Paragraph } = Typography;

const UserAuthenticationForm = () => {
  return (
    <Row className="h-screen">
      <Col xs={24} lg={14}>
        <div className=" flex h-4/6 flex-col justify-center gap-20">
          <div className=" mx-auto flex w-96 items-center gap-5">
            <img src={logo} alt="Logo" /> <Title level={1}>Journiyfy</Title>
          </div>
          <div className=" mx-auto w-96">
            <label className=" mb-1 block">Name</label>
            <Input size="large" placeholder="Name" />
            <label className=" mb-1 mt-4 block">Email</label>
            <Input size="large" placeholder="Email" />
            <label className=" mb-1 mt-4 block">Passowrd</label>
            <Input size="large" placeholder="Password" />
            <Button className=" mt-8">Continue</Button>
          </div>
        </div>
        <Row className="ml-10 mt-10 md:ml-24 bg-[#F9B3B30D]">
          <Col>
            <Title level={4} className="">
              Login
            </Title>
            <Paragraph>Already have an account?</Paragraph>
          </Col>
        </Row>
      </Col>
      <Col xs={0} lg={10} className=" relative">
        <video
          src={backgroundVideo}
          autoplay="{true}"
          loop
          muted
          className=" absolute h-full w-full object-cover"
        ></video>
      </Col>
    </Row>
  );
};

export default UserAuthenticationForm;
