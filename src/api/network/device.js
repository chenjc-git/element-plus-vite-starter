import request from '../../utils/request'
export function getDeviceList(params){
  return request({
    url: 'django/api/device/get_device_list',
    method: 'post',
    data: {...params}
  })
}

export function edit(params){
  return request({
    url: 'django/api/device/edit',
    method: 'post',
    data: {...params}
  })
}

export function save(params){
  return request({
    url: 'django/api/device/save',
    method: 'post',
    data: {...params}
  })
}

export function del(params){
  return request({
    url: 'django/api/device/delete',
    method: 'post',
    data: {...params}
  })
}
