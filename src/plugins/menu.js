const menuList = [
    {
        id: '1', label: '菜单一',  path: '/mathematics', icon: 'el-icon-mycaidan'
    },
    {
        id: '2', label: '菜单二', path: '/literature', icon: 'el-icon-mycaidan1', children: [
            { label: '语文', path: '/literature',},
            { label: '历史', path: '/history',},
            { label: '政治', path: '/politics',},
        ]
    },
    {
        id: '3', label: '菜单三', path: '/english', icon: 'el-icon-mycaidan2'
    },
];

export default menuList;
