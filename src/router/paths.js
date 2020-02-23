
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
    path: '/deviceManage',
    name: '设施管理',
    view: 'deviceManage'
  },
  {
    path: '/rendManage',
    name: '租赁管理',
    view: 'rendManage'
  },
  {
    path: '/financialManage',
    view: 'financialManage',
    name: '财务管理'
  },
  {
    path: '/customManage',
    view: 'customManage',
    name: '客户管理'
  },
  {
    path: '/sysManage',
    view: 'sysManage',
    name: '系统管理'
  }
]
