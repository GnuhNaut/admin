import React from "react";

import { Layout, Menu, Breadcrumb } from "antd";

import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const {
            isLoading,
            isDirty,
            userMenuOpen,
            showMobileNavigation,
            name,
            email
        } = this.state;

        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={this.props.keymenu}
                    >
                        <div
                          style={{
                            color: '#fff',
                            backgroundColor: '#1890ff',
                            paddingRight: 15,
                            paddingLeft: 15,
                            fontWeight: 600
                          }}
                        >
                          Quản Lý
                        </div>
                    </Menu>
                </Header>
                <Content style={{ padding: "0 50px" }}>
                    <div className="site-layout-content" >
                        {this.props.children}
                    </div>
                </Content>
                {/* <Footer style={{ textAlign: "center" }}>
                    Ant Design ©2020 Created by Ant UED - Developer mawta
                </Footer> */}
            </Layout>
        );
    }
}

export default App;
