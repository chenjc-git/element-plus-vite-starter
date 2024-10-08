import { useTags } from '~/stores/modules/tags'
import {reactive, toRefs, getCurrentInstance, nextTick} from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 关闭当前标签
export default () => {
  const instance = getCurrentInstance()
  const router = useRouter()
  const route = useRoute()
  const { delTag } = useTags()
  const tagsStore = useTags()
  const state = reactive({
    /**
     * @param {String} fullPath 要跳转到那个页面的地址
     * @param {Boolean} reload 是否在跳转后重新渲染页面组件
     * @param {Boolean} f5 是否在跳转后刷新页面
     * @return {*}
     */
    closeTag({ fullPath, reload, f5 } = {}) {
      delTag(route)
      fullPath ? router.push(fullPath) : router.back()
      reload &&
        setTimeout(() => {
          router.push(fullPath)
          /*tagsStore.deCacheList(route)
          const { fullPath } = route
          nextTick(() => {
            router.replace({
              path: fullPath,
            })
          })*/

        }, 500)

      f5 && setTimeout(() => window.location.reload(), 500)
    },
  })

  return toRefs(state)
}
