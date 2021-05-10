import React, {Component} from "react";
import ReactDOM from 'react-dom';
import cookie from "react-cookies";
import "./demo.scss"
import {TableComponent} from "./asset";
import {TitleTableComponent} from "./title";
import {connect} from "react-redux";


export class LinkComponent extends Component {
    constructor(props) {
        super(props);
        this.prefix = 'link'
        this.content = props.content
        this.href = props.href
    }

    render() {
        return (
            <div className={this.prefix}>
                <span className={this.prefix+"-a"}>{this.content}</span>
            </div>
        )
    }
}

class NavComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'asset'
        };
        this.prefix = props.prefix || "nav"
        // this.changeComponent = this.changeComponent.bind(this)
    }

    changeComponent = (event)=> {
        const app_value = event.target.dataset.v
        this.setState({active: app_value})
        this.props.changeApp(app_value)
    }

    render() {
        return (
            <nav className={this.prefix}>
                <div key="forum" className="link">
                    <span className="link-a" data-v='forum' onClick={this.changeComponent }>Forum</span>
                </div>
                <div key="asset" className="link">
                    <span className="link-a" data-v='asset' onClick={this.changeComponent}>Asset</span>
                </div>
                <div key="tool" className="link">
                    <span className="link-a" data-v='tool' onClick={this.changeComponent}>Tool</span>
                </div>
            </nav>
       );
    }
}

const dispatchAppState = (dispatch, ownProps) => {

    return {
        changeApp: (app_value) => dispatch({type: 'app', payload: app_value})
    }
}

NavComponent = connect(null, dispatchAppState)(NavComponent)

class IndexLinkComponent extends LinkComponent {
    constructor(props) {
        super(props);
        this.prefix = 'index-link'
        this.content = 'index'
        this.href = '/'
    }
}

class LoggingComponent extends React.Component {
    constructor(props) {
        super(props);
        this.cancel = props.cancel || null
        this.state = {
            visible: false
        };
    }

    render() {
        const mask =
            <div className="mm">
                <div className="login">
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password (5 characters minimum(forget about it)):</label><input
                        id="password" type="password" name="password"/>
                    </div>
                    <input id="log_in_submit" type="submit" value="Sign in"/>
                    <button className="cancel" onClick={this.cancel}>Cancel</button>
                </div>
            </div>
        return ReactDOM.createPortal(mask, document.getElementById('root'))
    }
}

class HeaderUserComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_log: false,
            success: null,
            logging: false,
            user_info: {}
        };
        this.prefix = props.prefix || "header-user"
        this.logging = this.logging.bind(this)
        this.cancel_logging = this.cancel_logging.bind(this)
    }
    componentDidMount() {
        const primary_id = cookie.load("primary_id")
        const user = cookie.load("user")
        if (primary_id && user){
            this.setState({
                is_log: true,
                success: true,
                user_info: {
                    primary_id: primary_id,
                    user: user
                }
            })
        }
        fetch("http://192.168.77.120:8888/books", {method: 'GET',
            headers: {'Content-Type': 'application/json'}})
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
    logging(){
        this.setState({logging: true})
    }
    cancel_logging(){
        this.setState({logging: false})
    }

    render() {
        if (this.state.is_log && this.state.success){
            return (
                <div className={this.prefix + "-log-in"}>
                    <p>{this.state.user_info.user}</p>
                </div>
            )
        } else {
            return (
                <div className={this.prefix + "-log"}>
                    <button onClick={this.logging}>log in</button>
                    {this.state.logging ? <LoggingComponent cancel={this.cancel_logging}/>: null}
                </div>
            )
        }
    }
}

export class HeaderComponent extends Component {
    constructor(props) {
        // ES6规定必须调用 super
        super(props);
        this.prefix = props.prefix || 'header'
    }

    render() {
        return (
            <header className={this.prefix}>
                <div className={this.prefix+'-index'}>
                    <IndexLinkComponent/>
                </div>
                <div className={this.prefix+'-nav'}>
                    <NavComponent/>
                </div>
                <div className={this.prefix+'-user'}>
                    <HeaderUserComponent/>
                </div>
            </header>
        )
    }
}

export class CSSTableItemComponent extends Component {
    /**
     * 可复用的类
     *
     * **/
    constructor(props) {
        super(props);
        this.prefix = 'css-table-item'
        this.key = ''
        this.content = null
    }
    render() {
        return <div className={this.key? this.prefix+ "-" +this.key: this.prefix}>
            {this.content}
        </div>
    }
}

export class CSSTableComponent extends Component {
    constructor(props) {
        super(props);
        this.prefix = 'css-table'
        this.tableArray = props.tableArray
    }
    static defaultProps = {}
    render() {
        return <div className={this.prefix}>
            {this.tableArray? this.tableArray : null}
        </div>
    }
}

export class CSSTableLeftSideComponent extends CSSTableItemComponent {
    constructor(props) {
        super(props);
        this.key = 'left'
        this.content = props.content
    }
}

export class CSSTableMainComponent extends CSSTableItemComponent {
    constructor(props) {
        super(props);
        this.key = 'main'
        this.state = {
            app: 'asset'
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({app: nextProps.app});
    }

    render() {
        return <div className={this.key? this.prefix+ "-" +this.key: this.prefix}>
            {
                (() => {
                    switch (this.state.app) {
                        case "asset": return <TableComponent />
                        case "forum": return <TitleTableComponent/>
                        case "tool": return <p>tool</p>
                        default: return <p>none</p>
                    }
                })()
            }
        </div>
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        app: state.app
    }
}

CSSTableMainComponent = connect(mapStateToProps)(CSSTableMainComponent)


export class CSSTableRightSideComponent extends CSSTableItemComponent {
    constructor(props) {
        super(props);
        this.key = 'right'
        this.content = props.content
    }
}

export class SectionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            app: props.app
        }
        this.prefix = 'section'
    }

    render() {
        return (<section className={this.prefix}>
            <CSSTableComponent tableArray={
                [
                    <CSSTableLeftSideComponent key='left'/>,
                    <CSSTableMainComponent key='main'/>,
                    <CSSTableRightSideComponent key='right'/>
                ]
            } />
        </section>)
    }
}

export class FooterComponent extends Component {
    constructor(props) {
        super(props);
        this.prefix = props.prefix||"footer"
        this.content = props.content||"footer"
    }

    render() {
        return (
            <footer className={this.prefix}>
                {this.content}
            </footer>
        );
    }
}
