import React, { useState, useEffect } from "react";
import App from "../App";
import { saveAs } from 'file-saver';
import { 
    Tabs,
    Collapse,
    Col,
    Row,
    Input,
    Radio,
    Button,
    List,
    Modal
} from 'antd';
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { TextArea } = Input;

class Showoff extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            listItem: [],
            title: '',
            description: '',
            date: '',
            type: 'img',
            link: '',
            bgImg: '',
            modalEdit: false,
            editedKey: null,
        }
    }
   render(){
    return (
        <div>
           <Row>
                <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={12}
                    xl={12}
                    style={{
                        paddingRight: 30
                    }}
                >
                    <div>
                        <div className="padding-top">
                            Tiêu đề: 
                            <Input value={this.state.title} onChange={e => {
                                this.setState({
                                    title: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="padding-top">
                            Mô tả:
                            <TextArea rows={4} value={this.state.description} onChange={e => {
                                this.setState({
                                    description: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="padding-top">
                            Mốc thời gian: 
                            <Input style={{width: '30%', marginLeft: 12}} value={this.state.date} onChange={e => {
                                this.setState({
                                    date: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="padding-top">
                            Ảnh nền:
                            <Input value={this.state.bgImg} onChange={e => {
                                this.setState({
                                    bgImg: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="padding-top">
                            Minh hoạ bằng {" "}
                            <Radio.Group  value={this.state.type} onChange={e => {
                                this.setState({
                                    type: e.target.value
                                })
                            }}>
                                <Radio value={"img"}>Ảnh</Radio>
                                <Radio value={"vid"}>Video</Radio>
                            </Radio.Group>
                        </div>
                        <div className="padding-top">
                            Đường dấn: 
                            <Input value={this.state.link} onChange={e => {
                                this.setState({
                                    link: e.target.value
                                })
                            }}/>
                            {
                                this.state.type == 'img' ? (
                                    <span style={{fontSize: 12, marginTop: 5}}>
                                        Nhập Id của ảnh mà bạn đã thêm trên trealet.com <br />
                                        <font style={{fontSize: 12, fontStyle: 'italic'}}>Ví dụ: 12456</font> <br />
                                        <font style={{fontSize: 12, fontStyle: 'italic'}}>Hoặc: 123456 87998 6789</font> {" "} mỗi Id cách nhau bởi 1 dấu cách 
                                    </span>
                                ) : (
                                    <span style={{fontSize: 12, marginTop: 5}}>
                                        Nhập link của video bạn muốn thêm vào <br />
                                        <font style={{fontSize: 12, fontStyle: 'italic'}}>Ví dụ: https://www.youtube.com/embed/yDvTKeLojRE</font>
                                    </span>
                                )
                            }
                        </div>
                        <div style={{textAlign: "right"}} className="padding-top">
                            <Button
                                style={{
                                    minHeight: 36, 
                                    paddingRight: 25, 
                                    paddingLeft: 25
                                }}
                                type="primary"
                                onClick={e=> {
                                    let item = {
                                        'title': this.state.title,
                                        'description': this.state.description,
                                        'date': this.state.date,
                                        'backgroundImg': this.state.bgImg,
                                        'link':this.state.link,
                                        'type': this.state.type
                                    }
                                    let list = this.state.listItem
                                    list.push(item)
                                    this.setState({
                                        listItem: list
                                    })
                                }}
                            >
                                Thêm
                            </Button>
                        </div>
                    </div>
                </Col>   
                <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={12}
                    xl={12}
                    style={{paddingLeft: 20}}
                >
                    <div
                        style={{
                            marginTop: 8,
                            height: 480,
                            overflow: 'auto'
                        }}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.listItem}
                            locale={{emptyText: 'Không có dữ liệu '}}
                            renderItem={(item, index) => {
                                console.log(index)
                                return (
                                    <List.Item
                                        actions={[
                                            <a key="edit" onClick={e => {
                                                this.setState({
                                                    editedKey: index,
                                                    titleEdit: item.title,
                                                    descriptionEdit: item.description,
                                                    linkEdit: item.link,
                                                    bgImgEdit: item.backgroundImg,
                                                    typeEdit: item.type,
                                                    dateEdit: item.date,
                                                    modalEdit: true,
                                                })
                                            }}>
                                                Sửa
                                            </a>, 
                                            <a key="delete"
                                                onClick={e=> {
                                                    let list = this.state.listItem
                                                    list.splice(index, 1)
                                                    this.setState({
                                                        listItem: list
                                                    })
                                                }}
                                            >
                                                Xoá
                                            </a>
                                        ]}
                                    >
                                        <List.Item.Meta
                                            title={item.title}
                                            description={<div className="des-showoff">{item.description}</div>}
                                        />
                                    </List.Item>
                                )
                            }}
                        />
                    </div>
                    {
                        this.state.listItem.length > 0 && (
                            <div style={{textAlign: "right"}} className="padding-top">
                                <Button
                                    style={{
                                        minHeight: 36, 
                                        paddingRight: 25, 
                                        paddingLeft: 25
                                    }}
                                    type="primary"
                                    onClick={e=> {
                                        let data = JSON.stringify(this.state.listItem)
                                        console.log("data", data)
                                        var blob = new Blob([data],
                                            { type: "text/plain;charset=utf-8" });
                                        saveAs(blob, "showoff.trealet");
                                    }}
                                >
                                    Lưu
                                </Button>
                            </div>
                        )
                    }
                </Col>   
            </Row> 
            <Modal title={null} footer={null} visible={this.state.modalEdit} onCancel={e => {
                this.setState({
                    modalEdit: false
                })
            }}>
                <div>
                        <div className="padding-top">
                            Tiêu đề: 
                            <Input value={this.state.titleEdit} onChange={e => {
                                this.setState({
                                    titleEdit: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="padding-top">
                            Mô tả:
                            <TextArea rows={4} value={this.state.descriptionEdit} onChange={e => {
                                this.setState({
                                    descriptionEdit: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="padding-top">
                            Mốc thời gian: 
                            <Input style={{width: '30%', marginLeft: 12}} value={this.state.dateEdit} onChange={e => {
                                this.setState({
                                    dateEdit: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="padding-top">
                            Ảnh nền:
                            <Input value={this.state.bgImgEdit} onChange={e => {
                                this.setState({
                                    bgImgEdit: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="padding-top">
                            Minh hoạ bằng {" "}
                            <Radio.Group  value={this.state.typeEdit} onChange={e => {
                                this.setState({
                                    typeEdit: e.target.value
                                })
                            }}>
                                <Radio value={"img"}>Ảnh</Radio>
                                <Radio value={"vid"}>Video</Radio>
                            </Radio.Group>
                        </div>
                        <div className="padding-top">
                            Đường dấn: 
                            <Input value={this.state.linkEdit} onChange={e => {
                                this.setState({
                                    linkEdit: e.target.value
                                })
                            }}/>
                        </div>
                        <div style={{textAlign: "right"}} className="padding-top">
                            <Button
                                style={{
                                    minHeight: 36, 
                                    paddingRight: 25, 
                                    paddingLeft: 25
                                }}
                                type="primary"
                                onClick={e=> {
                                    let item = {
                                        'title': this.state.titleEdit,
                                        'description': this.state.descriptionEdit,
                                        'date': this.state.dateEdit,
                                        'backgroundImg': this.state.bgImgEdit,
                                        'link':this.state.linkEdit,
                                        'type': this.state.typeEdit
                                    }
                                    let list = this.state.listItem
                                    list[this.state.editedKey] = item
                                    this.setState({
                                        listItem: list,
                                        modalEdit: false
                                    })
                                }}
                            >
                                Lưu
                            </Button>
                        </div>
                    </div>
            </Modal>
        </div>
    )
   }
}
// {'title': '', 'descrtiption': '', 'backgroundImg': '', 'date': '', 'link': '', 'type': ''}
export default Showoff;