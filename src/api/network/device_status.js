import request from '../../utils/request'
export function getDeviceStatusList(params){
  return request({
    url: 'django/api/device/get_device_status_list',
    method: 'post',
    data: {...params}
  })
}

export function getLatestDeviceStatus(params){
  return request({
    url: 'django/api/device/get_latest_device_status',
    method: 'post',
    data: {...params}
  })
}