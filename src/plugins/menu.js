const menuList = [
    {
        id: '1', label: 'tabel',  path: '/tabel', icon: 'el-icon-mycaidan'
    },
    {
        id: '2', label: 'menu', path: '/importData', icon: 'el-icon-mycaidan1', children: [
            { label: 'importData', path: '/importData' },
        ]
    },
];

export default menuList;
