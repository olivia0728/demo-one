import { defineStore } from 'pinia' //引入
// 导入数据
import { usersData } from '@/web_data/users_data'
import { problemsData } from '@/web_data/problems_data'
import { todoData } from '@/web_data/todo_data'
const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      counter: 0,
      name: 'Eduardo',
      isAdmin: true,
      // 用户列表
      tableData:usersData,
      // 问题列表
      problemsData:problemsData,
      // 待办事项列表
      todoData:todoData
    }
  },
  // 相当于 vue 中的 computed 计算属性
  getters: {
	
	},
   // 相当于 vue 中的 methods 方法
  actions:{
    increment(){
        this.counter++
    },
    // 更新用户数据
    updateTableData(newData){
      this.tableData = newData
    },
    // 更新问题列表
    updateProblemsData(newData){
      this.problemsData = newData
    },
    // 更新待办列表
    updateTodoData(newData){
      this.todoData = newData
    }
  }
})
export default useStore //导出