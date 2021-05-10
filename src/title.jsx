import React from "react";
import {server} from "./config";

export class TitleTableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.prefix = props.prefix || "title-table"
        this.content = props.content || ""
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {
        fetch(`${server}/lichen/list/title`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({page: 1})
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result, 'result')
                    this.setState({
                        isLoaded: true,
                        items: result['res'],
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>ERROR MES</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            console.log(items)
            return (
                <table className={this.prefix}>
                    <tbody>
                    {
                        items.map(item => {
                            const title = item['title']
                            const nickname = item['nickname']
                            const label_ls = item['label_ls']
                            const title_id = item['title_id']
                            const create_time = item['create_time']
                            const last_modify_time = item['last_modify_time']
                            const label_spans = label_ls.map(item=>(
                                <span key={item} className={this.prefix+"-title-label-span"}>{item}</span>
                            ))

                            return (
                                <tr>
                                    <td className={this.prefix+'-user'}>{nickname}:</td>
                                    <td className={this.prefix+'-title'}>
                                        <div>
                                            <a className={this.prefix+'-title-link'} href={`${server}/lichen/title_page/${title_id}`}>
                                                {title}
                                            </a>
                                            <br/>
                                            <small>
                                                <span className={this.prefix+'-title-small'}>
                                                    {label_spans}
                                                    <a className={this.prefix+'-title-small-nickname'}>{nickname}</a>
                                                    <span className={this.prefix+'-title-small-time'}>最后修改自{last_modify_time}</span>
                                                    <span className={this.prefix+'-title-small-time'}>创建自{create_time}</span>
                                                </span>
                                            </small>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            )
        }
    }
}