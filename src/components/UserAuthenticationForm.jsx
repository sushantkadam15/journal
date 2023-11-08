import background from "../assets/background/authentication_bg.jpg";
import logo from "../assets/logo.svg";
import googleIcon from "../assets/authentication/devicon_google.png";
import appleIcon from "../assets/authentication/bi_apple.png";

const UserAuthenticationForm = () => {
  return (
    <>
      <div className="mt-5 flex h-screen flex-col md:mt-0 md:flex-row">
        <div className=" h-screen md:w-1/2">
          <div className="flex h-4/6 flex-col items-center justify-around">
            <div className=" flex items-center gap-5 ">
              <img
                src={logo}
                alt="Logo"
                className=" inline-block h-12 w-12 md:h-20 md:w-20"
              />
              <h1 className=" inline-block text-4xl font-[400] md:text-6xl ">
                Journify
              </h1>
            </div>
            <div>form</div>
          </div>

          <div className=" flex h-2/6 items-center gap-8 bg-[#F9B3B30D]">
            <div className="ml-12 md:ml-24">
              <h2 className=" mb-2 text-xl">Log in</h2>
              <p className=" text-xs">Already have an account?</p>
              <div className=" mt-8 flex gap-10">
                <img
                  src={googleIcon}
                  alt="Google Icon"
                  className="h-5 md:h-6 md:w-6"
                />
                <img
                  src={appleIcon}
                  alt="Apple Icon"
                  className="h-5 md:h-6 md:w-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url(${background})` }}
          className=" hidden bg-cover bg-center bg-no-repeat md:flex md:w-1/2 md:justify-center"
        >
          <p className=" font-JetBrains mt-60 text-xl text-[#a6a6c9]">
            A place to zen your thoughts.
          </p>
        </div>
      </div>
    </>
  );
};

export default UserAuthenticationForm;
