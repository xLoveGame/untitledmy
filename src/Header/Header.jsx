import {Layout, Menu, Breadcrumb, Dropdown, Space, message} from 'antd';
import {UserOutlined, LaptopOutlined, NotificationOutlined, DownOutlined, SmileOutlined} from '@ant-design/icons';
import {createElement} from "react";
import {connect} from "react-redux";
import "./style.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";

const {Header,Sider} = Layout;


function Headers(props) {
    const navigate = useNavigate()


    let codeAre = null
    if (props.email === "test") {
        console.log(props.email + "123")
        codeAre = <Menu.Item style={{
            left: "1700%"
        }}>
            <a href="../Login"> login</a>
        </Menu.Item>
    } else {
        console.log(props.email + "11213124")
        codeAre = <Menu.Item style={{}}>


            <a onClick={e => e.preventDefault()}>
                <Space>
                    {props.email}
                    <DownOutlined/>
                </Space>
            </a>
    </Menu.Item>
    }

    return (
        <Layout>
            <Header className="header">
                <div className="logo"/>
                <Menu theme="dark" mode="horizontal">

                    <Menu.Item><a >Basket</a></Menu.Item>

                </Menu>
            </Header>
        </Layout>)
}


export default Headers