import request from '../../utils/request'
export function getUserList(params){
  return request({
    url: 'django/api/base/user/get_user_list',
    method: 'post',
    data: {...params}
  })
}

export function edit(params){
  return request({
    url: 'django/api/base/user/edit',
    method: 'post',
    data: {...params}
  })
}

export function save(params){
  return request({
    url: 'django/api/base/user/save',
    method: 'post',
    data: {...params}
  })
}
