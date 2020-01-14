
export default [
  {
    path: '/login',
    view: 'Login',
    name: '',
    hidden: true
  },
  {
    path: '',
    view: 'roomManage',
    name: '房源管理'
  },
  {
    path: '/user-profile',
    name: '设施管理',
    view: 'deviceManage'
  },
  {
    path: '/table-list',
    name: '租赁管理',
    view: 'rendManage'
  },
  {
    path: '/typography',
    view: 'financialManage',
    name: '财务管理'
  },
  {
    path: '/icons',
    view: 'customManage',
    name: '客户管理'
  },
  {
    path: '/maps',
    view: 'sysManage',
    name: '系统管理'
  }
]
