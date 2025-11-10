import React from "react";

import FooterIcons from "../data/FooterIcons";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="mt-12 bg-gray-900 text-white">
      <div className="mx-auto max-w-8xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">Linh Kiện Điện Tử</h3>
            <p className="mt-4 text-sm text-gray-300">
              Cung cấp các linh kiện điện tử chất lượng cao cho nhu cầu build PC, sửa chữa và phát triển sản phẩm.
            </p>
            <div className="mt-4 flex space-x-4">
              {FooterIcons.map((obj, i) => (
                <a
                  key={`Footer${i}`}
                  href="#!"
                  className="h-10 w-10 rounded-full bg-gray-800 p-2 transition hover:bg-gray-700"
                >
                  <obj.icon className="mx-auto h-full w-full" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Danh mục</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="/mainboard" className="text-sm text-gray-300 hover:text-white transition">Mainboard</a></li>
              <li><a href="/charging-components" className="text-sm text-gray-300 hover:text-white transition">Linh kiện sạc</a></li>
              <li><a href="/hubs" className="text-sm text-gray-300 hover:text-white transition">Hub chuyển đổi</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Hỗ trợ</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="/contact" className="text-sm text-gray-300 hover:text-white transition">Liên hệ</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Chính sách bảo hành</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Liên hệ</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>Email: info@linhkien.vn</li>
              <li>Điện thoại: +84 123 456 789</li>
              <li>Địa chỉ: 123 Đường ABC, Quận XYZ, TP. HCM</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 Linh Kiện Điện Tử. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
