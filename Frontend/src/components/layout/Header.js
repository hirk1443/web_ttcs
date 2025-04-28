import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";

import { PiUserCircle } from "react-icons/pi";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../store/userSlice";
import Cookies from "js-cookie";
import { message } from "antd";
import { clearCart } from "../../store/cartSlice";
import { clearFavorites } from "../../store/favoritesSlice ";
import CartTab from "../cart/CartTab";
import { clearAddress } from "../../store/shippingAddressSlice ";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const carts = useSelector((store) => store.cart.items);

  const loading = useSelector((state) => state.user.loading);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [showCartTab, setShowCartTab] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    Cookies.remove("cart-item-list");
    localStorage.removeItem("shipping-address");
    dispatch(clearUser());
    dispatch(clearCart());
    dispatch(clearFavorites());
    dispatch(clearAddress());
    navigate("/");
    message.success("Đăng xuất thành công!");
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm) {
      const query = encodeURIComponent(searchTerm);
      navigate(`/search?q=${query}`);
      setSearchTerm("");
    } else {
      navigate("/search");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const total = carts.length;
    setTotalQuantity(total);
  }, [carts, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <header className="bg-white dark:bg-gray-900 px-6 py-6 shadow-md fixed top-0 w-full z-50 border-b">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <Logo />
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center w-full max-w-md ml-10">
          <div className="flex w-full rounded-full border border-gray-300 overflow-hidden focus-within:shadow-md">
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              className="w-full px-4 py-2 outline-none text-gray-700"
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSearch}
              className="flex items-center justify-center px-4 bg-gradient-to-r from-teal-500 to-teal-400 text-white hover:brightness-110 transition"
            >
              <GrSearch size={20} />
            </button>
          </div>
        </div>

        {/* User + Cart */}
        <div className="flex items-center space-x-4">
          {/* Cart tab placeholder */}
          {showCartTab && (
            <div className="absolute top-12 -right-4 z-50 hidden md:block">
              <CartTab items={carts} />
            </div>
          )}

          {/* User avatar or login */}
          {user?.id ? (
            <>
              <Link to="/profile">
                <div className="relative flex items-center justify-center text-3xl text-gray-600 hover:text-teal-500 transition">
                  {user?.profile_img ? (
                    <img
                      src={user.profile_img}
                      alt="Avatar User"
                      className="w-10 h-10 object-cover rounded-full border"
                    />
                  ) : (
                    <PiUserCircle />
                  )}
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="px-5 py-2 text-sm font-medium text-white rounded-full bg-gradient-to-r from-teal-500 to-teal-400 hover:brightness-110 transition"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="px-5 py-2 text-sm font-medium text-white rounded-full bg-gradient-to-r from-teal-500 to-teal-400 hover:brightness-110 transition">
                Đăng nhập
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
