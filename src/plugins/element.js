import Vue from 'vue';

import {
    Button,
    Form,
    FormItem,
    Input,
    Container,
    Aside,
    Header,
    Main,
    Menu,
    Submenu,
    MenuItemGroup,
    MenuItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Pagination,
    Breadcrumb,
    BreadcrumbItem,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    MessageBox,
    Message,
    Notification
} from 'element-ui';


Vue.use(Form);
Vue.use(Input);
Vue.use(Button);
Vue.use(FormItem);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

const notificationInfo = { // 封装element提示通知
    success(title, message) {
        Notification({
            title,
            message,
            type:'success',
        })
    },

    warning(title, message) {
        Notification({
            title,
            message,
            type:'warning',
        })
    },

    info(title, message) {
        Notification({
            title,
            message,
            type:'info',
        })
    },

    error(title, message) {
        Notification({
            title,
            message,
            type:'error',
        })
    },
}

Vue.prototype.$notify = notificationInfo;
