import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

    // Validation
    if (!name || !email || !password) {
      setIsErrorOpen(true);
      return;
    }

    // If password is less than 6 characters,
    // show error modal
    if (password.length < 6) {
      setIsPasswordShortOpen(true);
      return;
    }

    // Simulate registration - in a real app, this would be an API call
    // For frontend demo, we'll simulate a successful registration and login
    const userData = {
      name: name,
      email: email
    };

    // Store login state in localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(userData));

    setIsSuccessOpen(true);
    setTimeout(() => {
      navigator("/profile"); // navigate to profile page after registration
    }, 2000);
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center py-12">
      <ErrorModal
        isOpen={isErrorOpen}
        text="Vui lòng điền đầy đủ thông tin đăng ký"
        onClose={() => setIsErrorOpen(false)}
      />
      <SuccessModal
        isOpen={isSuccessOpen}
        text="Đăng ký thành công! Đang chuyển hướng đến trang hồ sơ..."
        onClose={() => setIsSuccessOpen(false)}
      />
      <ErrorModal
        isOpen={isPasswordShortOpen}
        text="Mật khẩu phải có ít nhất 6 ký tự"
        onClose={() => setIsPasswordShortOpen(false)}
      />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <div className="hidden lg:block lg:w-1/2">
            <img src={signup} className="rounded-2xl shadow-lg" alt="Sample image" />
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Đăng ký</h2>

              <form onSubmit={submitHandler}>
                <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <p className="text-lg font-semibold">Đăng ký với</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full bg-blue-600 p-3 text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700"
                    >
                      <FaFacebookF className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full bg-blue-400 p-3 text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-500"
                    >
                      <FaTwitter className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="my-6 flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="mx-4 text-gray-500">hoặc</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Nhập họ và tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Nhập địa chỉ email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Đăng ký
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Đã có tài khoản?{" "}
                    <Link
                      to="/signin"
                      className="font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      Đăng nhập ngay
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
