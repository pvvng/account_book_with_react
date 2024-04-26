import { configureStore, createSlice } from '@reduxjs/toolkit'

let userData = createSlice({
  name: 'userData',
  initialState: {1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[]},
  
  reducers: {
    appendData(state, action){
      let temp = action.payload
      let month = temp[0]
      let date = temp[1]
      let value = temp[2]
      let exist = false

      if(state[month.toString()].length == 0){
        state[month.toString()].push(value)
      }else{
        state[month.toString()].map(a=>{
          if(a[date] != undefined){
            exist=true
            a[date].push(value[date][0])
          }
        })
        if(!exist){
          state[month.toString()].push(value)
        }
      }
    },removeData(state, action){
      let month = action.payload[0]
      let value = action.payload[1]
      let date = action.payload[2]

      if(value == 0){
        state[month.toString()] = state[month.toString()].filter(x => x[date] == undefined)
      }else{
        state[month.toString()].map(a => {
          if(a[date] != undefined){
            a[date] = value
          }
        })
      }
    }
  }
})

export let { appendData, removeData } = userData.actions


let editData = createSlice({
  name: ' editData',
  initialState: [],

  reducers: {
    appendEditData(state, action){
      if(state.length == 0){state.push(action.payload)}
      else{state.length = 0; state.push(action.payload)}
    }
  }
})

export let { appendEditData } = editData.actions

let optionsData = createSlice({
  name:'optionsData',
  initialState: [],

  reducers: {
    editOptionsData(state, action){
      if (state.length == 0){
        state.push(action.payload)
      }else if(state.length != 0){
        let status = false
        state.map( b => {
          let key = Object.keys(action.payload)
          if( b[key] != undefined ){
            status = true
            b[key] = action.payload[key]
          }
        })
        if (!status) {
          state.push(action.payload)
        }
      }
    },initialOptionsData(state){
      return state = []
    }

  }
})

export let { editOptionsData, initialOptionsData } = optionsData.actions

export default configureStore({
  reducer: {
    userData : userData.reducer,
    editData : editData.reducer,
    optionsData : optionsData.reducer
  }
}) 