import Mock from 'mockjs'

// 产品列表
const Random = Mock.Random
const getProducts = function () {
    let products = []
    for (let i = 0; i < 10; i++) {
        let product = {
            id: Random.increment(),
            name: Random.cname(),
            barcode: Random.natural(10000)
        }
        products.push(product)
    }
    return { products }
}
Mock.mock('/products', 'get', getProducts)