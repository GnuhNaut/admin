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
    Modal,
    Select,
    notification
} from 'antd';
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { TextArea } = Input;
const { Option } = Select;

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            listItem: [],
            trueAnswer: 'answer_1'
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
                        <div
                            style={{textAlign: 'center', fontWeight: 700}}
                        >
                            Thêm câu hỏi
                        </div>
                        <div className="padding-top">
                            Câu hỏi: 
                            <Input value={this.state.question} onChange={e => {
                                this.setState({
                                    question: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="padding-top">
                            Đáp án 1: 
                            <Input  value={this.state.answer1} onChange={e => {
                                this.setState({
                                    answer1: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="padding-top">
                            Đáp án 2: 
                            <Input  value={this.state.answer2} onChange={e => {
                                this.setState({
                                    answer2: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="padding-top">
                            Đáp án 3: 
                            <Input  value={this.state.answer3} onChange={e => {
                                this.setState({
                                    answer3: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="padding-top">
                            Đáp án 4: 
                            <Input  value={this.state.answer4} onChange={e => {
                                this.setState({
                                    answer4: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="padding-top">
                            Ảnh minh hoạ:
                            <Input value={this.state.bgImg} style={{width: "30%", marginLeft: 8}} onChange={e => {
                                this.setState({
                                    bgImg: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="padding-top">
                            Đáp án đúng: {" "}
                            <Select
                                showSearch
                                style={{ width: "40%" }}
                                placeholder="Chọn 1 đáp án"
                                onChange={e => {
                                    this.setState({
                                        trueAnswer: e
                                    })
                                }}
                                value={this.state.trueAnswer}
                            >
                                <Option value="answer_1">Đáp án 1</Option>
                                <Option value="answer_2">Đáp án 2</Option>
                                <Option value="answer_3">Đáp án 3</Option>
                                <Option value="answer_4">Đáp án 4</Option>
                            </Select>
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
                                        question: this.state.question,
                                        image: this.state.bgImg,
                                        answers: [
                                            { text: this.state.answer1, correct: this.state.trueAnswer == "answer_1"},
                                            { text: this.state.answer2, correct: this.state.trueAnswer == "answer_2" },
                                            { text: this.state.answer3, correct: this.state.trueAnswer == "answer_3" },
                                            { text: this.state.answer4, correct: this.state.trueAnswer == "answer_4" }
                                          ]
                                    }
                                    let list = this.state.listItem
                                    list.push(item)
                                    this.setState({
                                        listItem: list
                                    })
                                    notification.success({
                                        message: `Đã thêm 1 câu hỏi`,
                                      });
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
                            maxHeight: 435,
                            overflow: 'auto'
                        }}
                    >
                        <div
                            style={{textAlign: 'center', fontWeight: 700}}
                        >
                            Danh sách câu hỏi
                        </div>
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
                                                    questionEdit: item.question,
                                                    answer1Edit: item.answers[0].text,
                                                    answer2Edit: item.answers[1].text,
                                                    answer3Edit: item.answers[2].text,
                                                    answer4Edit: item.answers[3].text,
                                                    bgImgEdit: item.image,
                                                    trueAnswerEdit: item.answers[0].correct ? "answer_1" : item.answers[1].correct ? "answer_2" : item.answers[2].correct ? "answer_3" : "answer_4", 
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
                                            title={item.question}
                                            description={
                                                <div>
                                                    <p className="answer-game" style={{color: item.answers[0].correct && "#58ca8c"}}>
                                                        <b>A:</b> {" " + item.answers[0].text}
                                                    </p>
                                                    <p className="answer-game" style={{color: item.answers[1].correct && "#58ca8c"}}>
                                                        <b>B:</b> {" " + item.answers[1].text}
                                                    </p>
                                                    <p className="answer-game" style={{color: item.answers[2].correct && "#58ca8c"}}>
                                                        <b>C:</b> {" " + item.answers[2].text}
                                                    </p>
                                                    <p className="answer-game" style={{color: item.answers[3].correct && "#58ca8c"}}>
                                                        <b>D:</b> {" " + item.answers[3].text}
                                                    </p>
                                                </div>
                                            }
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
                                        saveAs(blob, "game.trealet");
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
                            Câu hỏi: 
                            <Input value={this.state.questionEdit} onChange={e => {
                                this.setState({
                                    questionEdit: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="padding-top">
                            Đáp án 1: 
                            <Input  value={this.state.answer1Edit} onChange={e => {
                                this.setState({
                                    answer1Edit: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="padding-top">
                            Đáp án 2: 
                            <Input  value={this.state.answer2Edit} onChange={e => {
                                this.setState({
                                    answer2Edit: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="padding-top">
                            Đáp án 3: 
                            <Input  value={this.state.answer3Edit} onChange={e => {
                                this.setState({
                                    answer3Edit: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="padding-top">
                            Đáp án 4: 
                            <Input  value={this.state.answer4Edit} onChange={e => {
                                this.setState({
                                    answer4Edit: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="padding-top">
                            Ảnh minh hoạ:
                            <Input value={this.state.bgImgEdit} style={{width: "30%", marginLeft: 8}} onChange={e => {
                                this.setState({
                                    bgImgEdit: e.target.value
                                })
                            }}/>
                        </div>
                        <div className="padding-top">
                            Đáp án đúng: {" "}
                            <Select
                                showSearch
                                style={{ width: "40%" }}
                                placeholder="Chọn 1 đáp án"
                                onChange={e => {
                                    this.setState({
                                        trueAnswerEdit: e
                                    })
                                }}
                                value={this.state.trueAnswerEdit}
                            >
                                <Option value="answer_1">Đáp án 1</Option>
                                <Option value="answer_2">Đáp án 2</Option>
                                <Option value="answer_3">Đáp án 3</Option>
                                <Option value="answer_4">Đáp án 4</Option>
                            </Select>
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
                                        question: this.state.questionEdit,
                                        image: this.state.bgImgEdit,
                                        answers: [
                                            { text: this.state.answer1Edit, correct: this.state.trueAnswerEdit == "answer_1"},
                                            { text: this.state.answer2Edit, correct: this.state.trueAnswerEdit == "answer_2" },
                                            { text: this.state.answer3Edit, correct: this.state.trueAnswerEdit == "answer_3" },
                                            { text: this.state.answer4Edit, correct: this.state.trueAnswerEdit == "answer_4" }
                                          ]
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
export default Game;