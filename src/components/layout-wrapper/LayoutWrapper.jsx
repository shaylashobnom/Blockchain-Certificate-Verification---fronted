import { Link, Outlet } from "react-router-dom";
import "./LayoutWrapper.css";
import useGetMenuKey from "../../hooks/useGetMenuKey";
import { TransactionContext } from "../../context/TransactionContext";
import { shortenAddress } from "../../utils/constrants";

// import { Header } from "antd/es/layout/layout";
import { Drawer, Image, Menu } from "antd";
import { GithubOutlined, MenuFoldOutlined , LoginOutlined } from "@ant-design/icons";
import logo from "./images/Logo.png";
import { useState,useContext } from "react";
import Footer from "../footer/Footer";

const LayoutWrapper = () => {
  const { connectWallet, currentAccount} = useContext(TransactionContext);


  function getItem(label, key, icon, children, type) {
    return {
      key: key,
      icon: icon,
      children: children,
      label: label,
      type: type,
    };
  }

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const items = [
    getItem(<Link to="/">HOME</Link>, ""),
    getItem(<Link to="/guide"> GUIDE</Link>, "guide"),
    getItem(<Link to="/about">ABOUT</Link>, "about"),
    getItem(
      <a
        href="https://github.com/ruhulamin1398/SecureDoc__Blockchain-Based-Document-Authentication"
        target="_blank"
      >
        <GithubOutlined /> GITHUB
      </a>,
      "github"
    ),    
 
  ];

  const menuKey = useGetMenuKey();

  return (
    <>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo-wrapper">
            <div className="logo-inner-wrapper">
              <Image
                src={logo}
                preview={false}
                className="secureDoc-logo-image"
              />
               
            </div>
          </Link> 

          <Menu
            className="layout-menu"
            // theme="dark"
            // color="#ffffff"
            mode="horizontal"
            items={items}
            selectedKeys={menuKey}
          />


          {!currentAccount && ( <div onClick={connectWallet}  style={{color:"white"}}  > <LoginOutlined />  Connect Wallet </div> )}

          {currentAccount && ( <div style={{color:"white"}}  > {shortenAddress(currentAccount)}</div> )}
          


    


 
          <MenuFoldOutlined className="drawer-button" onClick={showDrawer} />

          <Drawer
            title="Navigations"
            placement={"right"}
            closable={true}
            onClose={onClose}
            open={open}
            key={"right"}
            className="drawer-wrapper"
          >
            <Menu
              className="drawer-layout-menu"
              theme="light"
              color="#000000"
              mode="vertical"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              items={items}
            />
          </Drawer>
        </div>
      </header>
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutWrapper;
