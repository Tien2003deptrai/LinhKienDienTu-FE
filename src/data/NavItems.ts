export type NavItemType = {
  name: string;
  path: string;
};

const NavItems: NavItemType[] = [
  {
    name: "Trang chủ",
    path: "/",
  },
  {
    name: "Mainboard",
    path: "/mainboard",
  },
  {
    name: "Linh kiện sạc",
    path: "/charging-components",
  },
  {
    name: "Hub chuyển đổi",
    path: "/hubs",
  },
  {
    name: "Liên hệ",
    path: "/contact",
  },
];

export default NavItems;
