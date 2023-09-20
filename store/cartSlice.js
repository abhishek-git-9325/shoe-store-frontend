import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: []
  },
  reducers: {
    addToCart: (state, action) => {
    const item = state.cartItems.find((product) => product.id === action.payload.id)
    if(item){
        item.quantity++
        item.attributes.price = item.singleQuantityPrice * item.quantity
    }
    else{
        state.cartItems.push({...action.payload, quantity: 1})
    }
    },
    updateCart: (state, action) => {
      state.cartItems = state.cartItems.map((cartItem)=>{
        if(cartItem.id === action.payload.id){
          if(action.payload.key === 'quantity'){
            cartItem.attributes.price = cartItem.singleQuantityPrice * action.payload.val
          }
          return {...cartItem, [action.payload.key]: action.payload.val}
        }
        return cartItem;
      })
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((cartItem)=>{
        return cartItem.id !== action.payload.id
      })
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer