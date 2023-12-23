import backgroundVideo from '../../assets/authentication/authentication_page.mp4';
import logo from '../../assets/logo.svg';
import googleIcon from '../../assets/authentication/devicon_google.png';
import appleIcon from '../../assets/authentication/bi_apple.png';
import { Col, Row, Input, Button, Divider } from 'antd';
import { useState } from 'react';

const AuthenticationForm = () => {
    const [isSignInDisplayed, setIsSignInDisplayed] = useState(true);

    return (
        <Row className="h-screen">
            <Col xs={24} md={14}>
                <Row className=" mx-5 flex h-4/5 flex-col justify-center gap-20 font-JetBrains md:mx-auto">
                    <div className=" mx-auto mt-12 flex items-center justify-start gap-5 md:mt-0 md:w-96">
                        <img src={logo} alt="Logo" className=" h-12 md:h-20" />{' '}
                        <h1 className="text-2xl md:text-4xl">Journiyfy</h1>
                    </div>

                    <div className="mx-auto h-[28rem]  w-72 md:h-96 md:w-96">
                        <h2 className=" mb-5 font-Numans text-xl">
                            {isSignInDisplayed
                                ? 'Sign In'
                                : 'Create an Account'}
                        </h2>

                        <form>
                            {!isSignInDisplayed && (
                                <>
                                    <label
                                        htmlFor="name"
                                        className="mb-1 block"
                                    >
                                        Name
                                    </label>
                                    <Input
                                        id="name"
                                        className=" placeholder:font-JetBrains"
                                        size="middle"
                                        placeholder="Name"
                                    />
                                </>
                            )}

                            <label htmlFor="email" className="mb-1 mt-4 block">
                                Email
                            </label>
                            <Input
                                id="email"
                                className=" placeholder:font-JetBrains"
                                size="middle"
                                placeholder="Email"
                            />

                            <label
                                htmlFor="password"
                                className="mb-1 mt-4 block"
                            >
                                Password
                            </label>
                            <Input.Password
                                id="password"
                                className=" placeholder:font-JetBrains"
                                size="middle"
                                placeholder="Password"
                            />
                            {isSignInDisplayed && (
                                <Button
                                    size="small"
                                    type="link"
                                    style={{
                                        textAlign: 'left',
                                        paddingLeft: '0px',
                                        marginTop: 15,
                                        marginBottom: 5
                                    }}
                                    block
                                >
                                    Forgot password?
                                </Button>
                            )}

                            <div className=" mt-8  flex items-center gap-5">
                                {isSignInDisplayed ? (
                                    <>
                                        <Button
                                            htmlType="submit"
                                            type="primary"
                                            className=""
                                        >
                                            Sign In
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                setIsSignInDisplayed(false)
                                            }
                                        >
                                            Create an Account
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            htmlType="submit"
                                            type="primary"
                                            className=""
                                        >
                                            Sign Up
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                setIsSignInDisplayed(true)
                                            }
                                        >
                                            Sign In
                                        </Button>
                                    </>
                                )}
                            </div>

                            <Divider
                                style={{
                                    fontSize: 10,
                                    paddingTop: 20,
                                    paddingBottom: 20
                                }}
                            >
                                <span className=" font-JetBrains">
                                    Or continue with{' '}
                                </span>
                            </Divider>
                            <div className=" flex  gap-10">
                                <img
                                    src={googleIcon}
                                    alt="google logo"
                                    className="h-6 w-auto"
                                />
                                <img
                                    src={appleIcon}
                                    alt="apple logo"
                                    className="h-6 w-auto"
                                />
                            </div>
                        </form>
                    </div>
                </Row>
                <Row className=" mt-10  h-[15%]  bg-[#F9B3B30D] md:h-[16%]">
                    <p className=" m-5 mx-auto mt-auto text-xs font-light text-[#7c7065cf] dark:text-text-dark-primary ">
                        {' '}
                        Created with 🧡 by Candice & Sushant{' '}
                    </p>
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
                <p className=" absolute mt-[30%] w-full text-center font-JetBrains tracking-wider text-[#303030]">
                    A place to zen your thoughts.
                </p>
            </Col>
        </Row>
    );
};

export default AuthenticationForm;
