import React from "react";
import { Outlet} from "react-router-dom";
import Header from "./Header/Header";
const Layout = () => {


  return (
    <div className=" position-relative h-100 ">
      <Header />
      {/* <Sidebar /> */}
      <div
        // className={`${
        //   screenWidth >= 875 && isSidebar ? "main-Container" : "full-container"
        // }  `}
      >
        <div
        //   className={`Screens-Container position-relative hideScroll ${
        //     screenWidth <= 875 && "mx-2"
        //   } "screen-container-0 `}  style={{
        //     height: "84vh",
        //     overflowX: "hidden",
        //     overflowY: "scroll",
        //   }}
        >

          <Outlet />
        </div>
         {/* <Footer className="position-absolute" />   */}

      </div>
    </div>
  );
};

export default Layout;
