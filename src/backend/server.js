const express = require('express');
const app = express();
const port = 3000;

// 模拟产品数据
let products = [
  { series: 'A', model: 'Model1', color: 'Red', ... },
  { series: 'B', model: 'Model2', color: 'Blue', ... },
  // 更多产品数据
];

let currentIndex = 0;

// 加载页面时默认读取的第一行数据
app.get('/api/products_on_sale', (req, res) => {
  currentIndex = 0;
  res.json(products[currentIndex]);
});

// 点击next按钮获取下一条数据
app.get('/api/next_product', (req, res) => {
  if (currentIndex < products.length - 1) {
    currentIndex++;
  }
  res.json(products[currentIndex]);
});

// 点击上一条按钮获取上一条数据
app.get('/api/previous_product', (req, res) => {
  if (currentIndex > 0) {
    currentIndex--;
  }
  res.json(products[currentIndex]);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
