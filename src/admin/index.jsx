import React, { useState, useEffect } from "react";
import App from "../App";
import { Tabs } from 'antd';
import Game from "./Game";
import Showoff from "./Showoff";
const { TabPane } = Tabs;
const Admin = (props) => {

    return (
        <App>
            <div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Trưng bày" key="1">
                        <Showoff />
                    </TabPane>
                    <TabPane tab="Trò chơi" key="2">
                        <Game />
                    </TabPane>
                </Tabs>
            </div>
        </App>
    )
}

export default Admin;