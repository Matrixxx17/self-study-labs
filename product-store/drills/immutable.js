// drills/immutable.js
const results = []
function check(name, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected)
  results.push(pass)
  console.log(pass ? `PASS  ${name}` : `FAIL  ${name}\n      got      ${JSON.stringify(actual)}\n      expected ${JSON.stringify(expected)}`)
}

const state = {
  user: { name: 'Asha', address: { city: 'Pune', pin: '411001' } },
  cart: {
    items: [
      { id: 1, title: 'Phone', price: 500, qty: 1 },
      { id: 2, title: 'Chair', price: 150, qty: 3 },
    ],
  },
  selectedTags: ['new'],
}

// 1. add an item to cart.items
const addItem = (state, item) => {
    return {...state, cart: {...state.cart, items: [...state.cart.items,item]}}
}

// 2. remove a cart item by id
const removeItem = (state, id) => {
    return {
        ...state,
        cart: {
        items: state.cart.items.filter((item)=> item.id !== id)}
    }
}

// 3. increment qty of one item, others untouched
const incrementQty = (state, id) => {
    return {
        ...state,
        cart: {
            items: state.cart.items.map((item)=> item.id ===id? {...item, qty: item.qty+1}: item)
        }
    }
}

// 4. decrement qty but never below 1
const decrementQty = (state, id) => {
    return {
        ...state,
        cart: {
            items: state.cart.items.map((item)=> item.id ===id? {...item, qty: item.qty-1}: item)
        }
    }
}

// 5. change the city, two levels deep
const setCity = (state, city) => {
    return {
        ...state,
        user: {
            ...state.user,
            address: {
                ...state.user.address,
                city
            }
        }
    }
}

// 6. toggle a tag in selectedTags
const toggleTag = (state, tag) => {
    const tags = state.selectedTags.includes(tag) ? state.selectedTags.filter((t)=> t != tag): [...state.selectedTags, tag]
    return {...state,selectedTags: tags}
}   

// 7. apply a discount percent to EVERY item's price
const discountAll = (state, percent) => {
    return {
        ...state,
        cart : {
            ...state.cart, 
            items: state.cart.items.map((item)=>({
                ...item,
                price: item.price - (item.price * percent)/100
            }))
        }
    }
}

// 8. move the item at index `from` to index `to` — without splice on the original
const moveItem = (state, from, to) => {
    const items = [...state.cart.items]
    const [moved] = items.splice(from,1)
    items.splice(to,0,moved)
    return {
        ...state,
        cart: {
            ...state.cart,
            items
        }
    }
}

// ---------- write your own tests below ----------
const newItem = { id: 3, title: 'Lamp', price: 100, qty: 1 }
const next = addItem(state, newItem)

check('addItem adds the item', next.cart.items.length, 3)
check('addItem does not mutate original', state.cart.items.length, 2)

const new_next = removeItem(state, 1)

check('removeItem removes the item', new_next.cart.items.length, 1)
check('removeItem does not mutate original', state.cart.items.length, 2)

const incremented = incrementQty(state, 1)

check('incrementQty increments the item', incremented.cart.items[0].qty, 2)
check('incrementQty does not mutate original', state.cart.items[0].qty, 1)


const decremented = incrementQty(state, 1)

check('decrements the item', decremented.cart.items[0].qty, 2)
check('decrementQty does not mutate original', state.cart.items[0].qty, 1)


const moved = setCity(state, 'Mumbai')

check('setCity changes the city', moved.user.address.city, 'Mumbai')
check('setCity does not mutate original', state.user.address.city, 'Pune')



const toggled1 = toggleTag(state, 'sale') 
check('toggleTag adds a new tag', toggled1.selectedTags, ['new', 'sale'])
check('toggleTag add does not mutate original', state.selectedTags, ['new'])

const toggled2 = toggleTag(state, 'new')  // removing a tag that IS present
check('toggleTag removes an existing tag', toggled2.selectedTags, [])
check('toggleTag remove does not mutate original', state.selectedTags, ['new'])

const discounted = discountAll(state, 10)

check('discountAll reduces every price', discounted.cart.items[0].price, 450)  // 500 - 10%
check('discountAll does not mutate original', state.cart.items[0].price, 500)
check('discountAll reduces all items, not just one', discounted.cart.items[1].price, 135)  // 150 - 10%

const move = moveItem(state, 0, 1)

check('moveItem moves the item', move.cart.items.map((i) => i.id), [2, 1])
check('moveItem does not mutate original', state.cart.items.map((i) => i.id), [1, 2])