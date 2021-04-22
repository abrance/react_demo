import React, {Component} from "react";
import "./title.css"
import assert from "assert";


// 组件数组
class _APP {
    constructor() {
        this.app_item_ls = [];
    }
    toString(){
        let _str = "";
        this.app_item_ls.forEach(v=>{_str+=v});
        return _str;
    }
    new_app_item(name){
        const item = {
            PREFIX: name,
            CLASS: `${name}-cls`,
        };
        this.app_item_ls.push(item);
        return item;
    }
    add_cls_name(item, cls_name){
        assert(this.app_item_ls.includes(item), 'not a app item');
        item.CLASS += ` ${cls_name}`;
    }
}


const _app = new _APP();


export class LinkComponent extends Component {
    constructor(props) {
        super(props);
        this.PREFIX = '_link'
        this.content = props.content
        this.href = props.href
    }

    static defaultProps = {
        text_decoration: false
    }

    render() {
        return <a href={this.href? this.href: "#"} className={this.PREFIX}>{this.content}</a>
    }
}

export class HeaderComponent extends Component {
    constructor(props) {
        // ES6规定必须调用 super
        super(props);
        this._header = _app.new_app_item('header');
    }

    static defaultProps = {};

    render() {
        return <header className={this._header.CLASS}>
            <div className={this._header.CLASS + "_left"}>
                <p>
                    <LinkComponent content="&lt;&lt;&lt;"/>
                </p>
            </div>
            <div className={this._header.CLASS + "_right"}>
            </div>
        </header>
    }
}


export class CSSTableItemComponent extends Component {
    /**
     * 可复用的类
     *
     * **/
    constructor(props) {
        super(props);
        this.PREFIX = 'css-table-item'
        this.key = ''
        this.content = null
    }
    render() {
        return <div className={this.key? this.PREFIX+ "-" +this.key: this.PREFIX}>
            {this.content}
        </div>
    }
}

export class CSSTableComponent extends Component {
    constructor(props) {
        super(props);
        this.PREFIX = 'css-table'
        this.tableArray = props.tableArray
    }
    static defaultProps = {}
    render() {
        console.log(this.tableArray);
        return <div className={this.PREFIX}>
            {this.tableArray? this.tableArray: null}
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
        this.content = props.content
    }
}

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
        this.PREFIX = 'section'
    }
    static defaultProps = {}
    render() {
        return <section className={this.PREFIX}>
            <CSSTableComponent tableArray={
                [<CSSTableLeftSideComponent/>, <CSSTableMainComponent/>, <CSSTableRightSideComponent/>]
            } />
        </section>
    }
}






