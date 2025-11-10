import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter } from "react-icons/fa";

import signup from "../../assets/signup.svg";
import { ErrorModal, SuccessModal } from "../../components/Modals/";

type Props = {};

const SignUp = (props: Props) => {
  const navigator = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isPasswordShortOpen, setIsPasswordShortOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // If password is less than 6 characters,
    // show error modal
    if (password.length < 6) {
      setIsPasswordShortOpen(true);
      return;
    }
    // For frontend demo, we'll just show a success message
    setIsSuccessOpen(true);
    setTimeout(() => {
      navigator("/"); // navigate to home page
    }, 2000);
  };

  return (
    <section className="h-screen">
      <ErrorModal
        isOpen={isErrorOpen}
        text="Something went wrong. Please try again."
        onClose={() => setIsErrorOpen(false)}
      />
      <SuccessModal
        isOpen={isSuccessOpen}
        text="Registration successful! Redirecting to home page..."
        onClose={() => setIsSuccessOpen(false)}
      />
      <ErrorModal
        isOpen={isPasswordShortOpen}
        text="Password should be at least 6 characters long"
        onClose={() => setIsPasswordShortOpen(false)}
      />
      <div className="container mx-auto h-full px-6 py-12">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-gray-800">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-5/12">
            <img src={signup} className="w-full" alt="Sample image" />
          </div>

          <div className="mb-12 md:mb-0 md:w-7/12 lg:w-6/12 xl:w-5/12">
            <form onSubmit={submitHandler}>
              <div className="mb-6 flex flex-row items-center justify-center lg:justify-start">
                <p className="mb-0 mr-4 text-2xl font-bold">Sign up with</p>
                <button
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  className="mx-1 inline-block rounded-full bg-blue-600 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                >
                  <FaFacebookF className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  className="mx-1 inline-block rounded-full bg-blue-400 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg"
                >
                  <FaTwitter className="h-4 w-4" />
                </button>
              </div>

              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
                <p className="mx-4 mb-0 text-center font-semibold">Or</p>
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  className="peer block w-full rounded border border-gray-300 bg-transparent py-4 px-3 text-gray-700 placeholder-black placeholder-opacity-40 focus:border-blue-600 focus:outline-none"
                  id="exampleName"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  className="peer block w-full rounded border border-gray-300 bg-transparent py-4 px-3 text-gray-700 placeholder-black placeholder-opacity-40 focus:border-blue-600 focus:outline-none"
                  id="exampleEmail01"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  className="peer block w-full rounded border border-gray-300 bg-transparent py-4 px-3 text-gray-700 placeholder-black placeholder-opacity-40 focus:border-blue-600 focus:outline-none"
                  id="examplePassword01"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-6 text-center">
                <button
                  type="submit"
                  className="focus:shadow-outline mr-3 inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none active:bg-blue-800 active:shadow-lg"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Sign up
                </button>
              </div>

              <div className="mt-2 mb-0 pt-1 text-center">
                <p className="mb-0 text-sm font-semibold">
                  Have an account?
                  <a
                    href="/signin"
                    className="ml-2 text-red-600 transition duration-200 ease-in-out hover:text-red-700 focus:text-red-700"
                  >
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
