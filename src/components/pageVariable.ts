import { ref } from 'vue';

import { IFormObj } from '../utils/pageType';
import { ElNotification } from 'element-plus';

export const formObj = ref<IFormObj>({
  name: '李高峰',
  age: 28
})

export const useCount = () => {

  let count = ref<number>(0)

  const plusCount = () => {
    if(count.value > 5) return ElNotification({
      title: 'Title',
      message: '太大了',
    })
    count.value += 1
  }

  const reduceCount = () => {
    if(count.value < -5) return ElNotification({
      title: 'Title',
      message: '太小了',
    })
    count.value -= 1
  }
  return {
    count,
    plusCount,
    reduceCount
  }
}
