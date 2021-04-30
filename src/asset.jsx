import React from "react";
import {server} from "./config";

export class TableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.prefix = props.prefix || "table"
        this.content = props.content || ""
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {
        fetch(`${server}/books`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
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
                            const book_id = item['book_id']
                            const alia = item['alia']
                            const book = item['book']
                            const group = item['group']
                            const create_time = item['create_time']
                            const last_modify_time = item['last_modify_time']
                            const link = `${server}/books/${book}`
                            console.log('book', book)
                            return (
                                <tr key={book_id}>
                                    <td>
                                        <div>
                                            <a href={link}>{alia}</a>
                                            <br/>
                                            <small>
                                                <span className="small-group">{group}</span>
                                                <span className="small-time">{"最后修改自" + last_modify_time}</span>
                                                <span className="small-time">{"创建自" + create_time}</span>
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