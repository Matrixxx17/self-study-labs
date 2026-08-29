import { set } from "react-hook-form"

// drills/es6.js
const results = []
function check(name, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected)
  results.push(pass)
  console.log(pass ? `PASS  ${name}` : `FAIL  ${name}\n      got      ${JSON.stringify(actual)}\n      expected ${JSON.stringify(expected)}`)
}

// ---------- sample data ----------
const products = [
  { id: 1, title: 'Phone',  price: 500, rating: 4.5, category: 'tech',  tags: ['new', 'sale'] },
  { id: 2, title: 'Laptop', price: 900, rating: 4.8, category: 'tech',  tags: ['sale'] },
  { id: 3, title: 'Chair',  price: 150, rating: 4.5, category: 'home',  tags: [] },
  { id: 4, title: 'Lamp',   price: 150, rating: 3.9, category: 'home',  tags: ['new'] },
]

// ---------- fill these in ----------

// 1. return the title of the product with the given id, or 'Not found'
const titleById = (list, id) => {
    const product = list.find((p)=>p.id===id)
    return product? product.title : 'Not found'
}

// 2. return an array of titles only
const titles = (list) => {
    const product = list.map((ele)=>ele.title)
    return product
}

// 3. total value of all products
const totalValue = (list) => {
    const value = list.reduce((sum,item)=> sum+item.price, 0)
    // console.log(value)
    return value
}

// 4. { tech: 2, home: 2 } — count per category
const countByCategory = (list) => {
    return list.reduce((acc,p)=>{
        acc[p.category] =(acc[p.category] ?? 0) + 1
        return acc
    }, {})
}

// 5. { tech: 1400, home: 300 } — summed price per category
const priceByCategory = (list) => {
    return list.reduce((acc,p)=>{
        acc[p.category] =(acc[p.category] ?? 0) + p.price
        return acc

    }, {})
}

// 6. every unique tag across all products, no duplicates
const allTags = (list) => {
    const all = list.flatMap((p)=>p.tags)
    return [...new Set(all)]
}

// 7. true if any product is under the given price
const hasCheaperThan = (list, limit) => {
    return list.some((p)=>p.price<limit)
}

// 8. destructure in the parameter list. return `${title} costs ${price}`
const describe = ({ title, price }) => {
    return `${title} costs ${price}`
}

// 9. return a NEW product with price increased by percent, original untouched
const withMarkup = (product, percent) => {
     return {...product, price:product.price + ( product.price * percent) /100,}
}

// 10. return the product without its tags key
const stripTags = (product) => {
    const {tags,...rest} = product
    return rest
}

// 11. safely read user?.address?.city, fallback 'Unknown'
const cityOf = (user) => {
    return user?.address?.city ?? 'Unknown'
}

// 12. return stock if it is a real number (0 counts), else 'Out of stock'
//     careful: this is the ?? vs || question
const stockLabel = (product) => {
    return product.stock ?? 'Out of stock'
}

// 13. [{ category, total }] from priceByCategory, sorted by total descending
const categoryTotals = (list) => {
    const total = priceByCategory(list)
    return Object.entries(total).map(([category,total])=>({category,total})).sort((a,b)=>b.total-a.total)


}

// 14. titles of products rated above the given value, joined by ', '
const topRatedTitles = (list, min) => {
    return list.filter((p)=>p.rating>min).map((p)=>p.title).join(', ')
}

// 15. average price, rounded to 2 decimals
const averagePrice = (list) => {
    const total = list.reduce((sum,p)=> sum+p.price,0)
    return Math.round((total/list.length)*100)/100
}


// ---------- tests ----------
check('titleById',       titleById(products, 2),        'Laptop')
check('titleById miss',  titleById(products, 99),       'Not found')
check('titles',          titles(products),              ['Phone', 'Laptop', 'Chair', 'Lamp'])
check('totalValue',      totalValue(products),          1700)
check('countByCategory', countByCategory(products),     { tech: 2, home: 2 })
check('priceByCategory', priceByCategory(products),     { tech: 1400, home: 300 })
check('allTags',         allTags(products).sort(),      ['new', 'sale'])
check('hasCheaperThan',  hasCheaperThan(products, 200), true)
check('describe',        describe(products[0]),         'Phone costs 500')
check('withMarkup',      withMarkup(products[0], 10).price, 550)
check('no mutation',     products[0].price,             500)
check('stripTags',       'tags' in stripTags(products[0]), false)
check('cityOf',          cityOf({ address: { city: 'Pune' } }), 'Pune')
check('cityOf empty',    cityOf({}),                    'Unknown')
check('stockLabel zero', stockLabel({ stock: 0 }),      0)
check('stockLabel none', stockLabel({}),                'Out of stock')
check('categoryTotals',  categoryTotals(products),      [{ category: 'tech', total: 1400 }, { category: 'home', total: 300 }])
check('topRatedTitles',  topRatedTitles(products, 4.4), 'Phone, Laptop, Chair')
check('averagePrice',    averagePrice(products),        425)

console.log(`\n${results.filter(Boolean).length}/${results.length} passing`)