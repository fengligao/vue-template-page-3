export const formProps = {
  // 页面初始化筛选条件初始数据
  form: {
    type: Array,
    default: () => []
  },
  isAsync: {
    type: Boolean,
    default: () => false
  },
  // 请求参数自定义处理函数
  beforeRequest: Function,
  // 返回参数自定义处理函数
  afterResponse: Function,
}

// table表格配置
export const tableProps = {
  columns: {
    type: Array,
    default: () => []
  },
  dataSource: {
    type: Array,
    default: () => []
  }
}

// 页面组件配置字段
export const pageProps = {
  ...formProps,
  ...tableProps,
  // 请求后端的接口地址
  url: {
    type: String,
    default: () => ''
  },
  // 请求方法 不传默认走get
  method: {
    type: String,
    default: () => 'get'
  },
  showPagination: {
    type: Boolean,
    default: () => true
  }
}

export const paginationProps = {
  pageNo: {
    type: Number,
    default: () => 1
  },
  pageSize: {
    type: Number,
    default: () => 20
  },
  total: {
    type: Number,
    default: () => 0
  }
}
