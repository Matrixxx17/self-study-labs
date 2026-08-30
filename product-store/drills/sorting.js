// drills/sorting.js
const results = []
function check(name, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected)
  results.push(pass)
  console.log(pass ? `PASS  ${name}` : `FAIL  ${name}\n      got      ${JSON.stringify(actual)}\n      expected ${JSON.stringify(expected)}`)
}

const products = [
  { id: 1, title: 'Phone',  price: 500, rating: 4.5, category: 'tech',  tags: ['new', 'sale'], discountedPercentage: 10 },
  { id: 2, title: 'Laptop', price: 900, rating: 4.8, category: 'tech',  tags: ['sale'], discountedPercentage: 20 },
  { id: 3, title: 'Chair',  price: 150, rating: 4.5, category: 'home',  tags: [], discountedPercentage: 0 },
  { id: 4, title: 'Lamp',   price: 150, rating: 3.9, category: 'home',  tags: ['new'], discountedPercentage: 50 },
]

// ---------- fill these in ----------

// 1. prove the default-sort surprise
// (write the assertion directly, no function needed)
check('default sort surprise', [10, 9, 100, 1].sort(), [1, 10, 100, 9])

// 2. byPriceAsc / byPriceDesc — both leave the input unsorted
const byPriceAsc = (list) => {
    return [...list].sort((a,b)=>a.price - b.price)
}
const byPriceDesc = (list) => {
    return [...list].sort((a,b)=>b.price-a.price)
}

// 3. byTitle using localeCompare
const byTitle = (list) => {
    return [...list].sort((a,b)=>a.title.localeCompare(b.title))
}

// 4. byRatingThenPrice — rating desc, cheapest first on ties
const byRatingThenPrice = (list) => {
    return [...list].sort((a,b)=>b.rating-a.rating || a.price - b.price)
}

// 5. byDiscountedPrice — sorting on a computed value

const getDiscountedPrice = (p) => p.price- (p.price * p.discountedPercentage) / 100
const byDiscountedPrice = (list) => {
    return  [...list].sort((a,b)=> getDiscountedPrice(a)-getDiscountedPrice(b))
}

// 6. makeComparator(key, direction) — reusable factory
const makeComparator = (key, direction = 'asc') => (a, b) => {
  const multiplier = direction === 'asc' ? 1 : -1
  const left = a[key]
  const right = b[key]

  if (typeof left === 'string') return left.localeCompare(right) * multiplier
  return (left - right) * multiplier
}
// 7. prove a boolean comparator breaks — find an input where it visibly fails

// ---------- your tests go here ----------
const sorted = byPriceAsc(products)
check('byPriceAsc sorts ascending', sorted.map(p => p.price), [150, 150, 500, 900])
check('byPriceAsc does not mutate original', products[0].price, 500)

const downSorted = byPriceDesc(products)
check('byPriceAsc sorts ascending', downSorted.map(p => p.price), [900,500,150,150])
check('byPriceAsc does not mutate original', products[0].price, 500)

const sortedByTitle = byTitle(products)
check('byTitle sorts alphabetically', sortedByTitle.map(p => p.title), ['Chair', 'Lamp', 'Laptop', 'Phone'])
check('byTitle does not mutate original', products[0].title, 'Phone')


const sortedByRating = byRatingThenPrice(products)
check('byRatingThenPrice sorts correctly', sortedByRating.map(p => p.title), ['Laptop', 'Chair', 'Phone', 'Lamp'])
check('byRatingThenPrice does not mutate original', products[0].title, 'Phone')

const sortedByDiscount = byDiscountedPrice(products)
check('byDiscountedPrice sorts by computed value', sortedByDiscount.map(p => p.title), ['Lamp', 'Chair', 'Phone', 'Laptop'])
check('byDiscountedPrice does not mutate original', products[0].title, 'Phone')

// string key, ascending
const sortedTitleAsc = [...products].sort(makeComparator('title', 'asc'))
check('makeComparator string asc', sortedTitleAsc.map(p => p.title), ['Chair', 'Lamp', 'Laptop', 'Phone'])

// string key, descending
const sortedTitleDesc = [...products].sort(makeComparator('title', 'desc'))
check('makeComparator string desc', sortedTitleDesc.map(p => p.title), ['Phone', 'Laptop', 'Lamp', 'Chair'])

// number key, ascending
const sortedPriceAsc = [...products].sort(makeComparator('price', 'asc'))
check('makeComparator number asc', sortedPriceAsc.map(p => p.price), [150, 150, 500, 900])

// number key, descending
const sortedPriceDesc = [...products].sort(makeComparator('price', 'desc'))
check('makeComparator number desc', sortedPriceDesc.map(p => p.price), [900, 500, 150, 150])
console.log(`\n${results.filter(Boolean).length}/${results.length} passing`)

const brokenSort = (list) => [...list].sort((a, b) => a.price > b.price)
console.log(brokenSort(products).map(p => p.price))

const testPrices = [5, 3, 8, 1, 9, 2, 7, 4, 6, 0]
console.log([...testPrices].sort((a, b) => a > b))       // broken
console.log([...testPrices].sort((a, b) => a - b))       // correct