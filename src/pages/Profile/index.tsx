import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Profile = (props: Props) => {
  const navigator = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userData = localStorage.getItem("user");

    if (loggedIn && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      // Redirect to login if not logged in
      navigator("/signin");
    }
  }, [navigator]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigator("/signin");
  };

  if (!isLoggedIn || !user) {
    return null; // or a loading spinner
  }

  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Profile header */}
            <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-purple-600">
              <div className="absolute -bottom-16 left-8">
                <div className="bg-gray-200 border-2 border-white rounded-full h-32 w-32 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-600">
                    {user.name.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-6 right-8">
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-gray-50"
                >
                  Đăng xuất
                </button>
              </div>
            </div>

            {/* Profile content */}
            <div className="pt-20 pb-12 px-8">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin tài khoản</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500">Họ và tên</h3>
                    <p className="mt-1 text-gray-900">{user.name}</p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-gray-900">{user.email}</p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500">Số điện thoại</h3>
                    <p className="mt-1 text-gray-900">+84 123 456 789</p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500">Ngày tham gia</h3>
                    <p className="mt-1 text-gray-900">01/01/2023</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
                  Chỉnh sửa hồ sơ
                </button>
                <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Đổi mật khẩu
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Đây là bản demo frontend. Không có chức năng xác thực người dùng thực tế.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
