<template>
  <div id="app">
    <!-- 主容器，包含整个应用 -->
    <div class="a4-container">
      <!-- 背景图片 -->
      <img src="https://hincky.oss-cn-guangzhou.aliyuncs.com/xiangjiang/background.png" alt="Background" class="background-image">
      <div class="section theme">
        <!-- 主题部分，包含标题图片 -->
        <img src="https://hincky.oss-cn-guangzhou.aliyuncs.com/xiangjiang/logo.png" alt="title" class="title-image">
      </div>
      <div class="section product-info">
        <!-- 产品信息部分 -->
        <div class="rounded-box">
          <!-- 显示系列、型号和颜色 -->
          <p>系列: {{ series }}, 型号: {{ model }}, 颜色: {{ color }}</p>
          <!-- 显示尺寸和妃位信息 -->
          <p>长: {{ length }} * 宽: {{ width }} * 高: {{ height }}, 坐深: {{ seatDepth }}{{ chaise ? ', 妃位: ' + chaise : '' }}</p>
        </div>
      </div>
      <div class="section price">
        <!-- 价格部分 -->
        <div class="rounded-box">
          <!-- 显示价格 -->
          <p class="price-text">{{ price }}</p>
        </div>
      </div>
      <div class="section product-description">
        <!-- 产品描述部分 -->
        <div class="rounded-box">
          <!-- 显示框架和辅料 -->
          <p>框架: {{ frame }}, 辅料: {{ auxiliary }}</p>
          <!-- 显示面料、触感和坐感 -->
          <p>面料: {{ fabric }}, 触感: {{ touch }}, 坐感: {{ seatingFeel }}</p>
        </div>
      </div>
      <div class="section recommendations">
        <!-- 推荐部分 -->
        <div class="rounded-box">
          <!-- 显示面料相似的型号 -->
          <p>面料相似的型号: {{ similarFabricModels }}</p>
          <!-- 显示坐感相似的型号 -->
          <p>坐感相似的型号: {{ similarSeatingModels }}</p>
        </div>
      </div>
    </div>
    <div class="button-container">
      <!-- 按钮容器 -->
      <button @click="previousItem">Previous</button> <!-- 上一个产品按钮 -->
      <button @click="nextItem">Next</button> <!-- 下一个产品按钮 -->
      <button @click="printPage">Print</button> <!-- 打印页面按钮 -->
    </div>
  </div>
</template>

<style scoped>
body, html {
  /* 设置页面和 HTML 的基本样式 */
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}

.a4-container {
  /* A4 纸张大小的容器样式 */
  width: 210mm; /* A4 宽度 */
  height: 297mm; /* A4 高度 */
  position: relative; /* 为了定位背景图片 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-right: 100px; /* 为按钮容器留出空间 */
}

.background-image {
  /* 背景图片样式 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* 确保背景图片在最底层 */
  object-fit: cover; /* 确保图片填充整个区域 */
}

.section {
  /* 各个部分的通用样式 */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1; /* 确保内容在背景图片之上 */
}

.theme {
  /* 主题部分的样式 */
  height: 10%;
  background-size: cover; /* 确保图片填充整个区域 */
  background-position: center;
}

.product-info, .price, .product-description, .recommendations {
  /* 各个信息部分的样式 */
  padding: 10px;
}

.product-info {
  height: 15%;
}

.price {
  height: 25%;
}

.product-description {
  height: 35%;
}

.recommendations {
  height: 15%;
}

.rounded-box {
  /* 圆角盒子的样式 */
  width: 90%;
  height: 100%;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  box-sizing: border-box;
}

.price-text {
  /* 价格文本的样式 */
  color: red;
  font-size: 2em;
  line-height: 2.5em;
  text-align: center;
}

p {
  /* 段落文本的样式 */
  margin: 5px 0;
  color: #333;
}

.product-info p span {
  /* 产品信息中特定文本的样式 */
  color: lightblue;
}

.button-container {
  /* 按钮容器的样式 */
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.button-container button {
  /* 按钮的样式 */
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

@media print {
  .button-container {
    /* 打印时隐藏按钮容器 */
    display: none;
  }
}
</style>

<script>
import axios from 'axios'; // 导入 axios 库，用于 HTTP 请求

export default {
  data() {
    // 定义组件的数据
    return {
      series: '', // 系列
      model: '', // 型号
      color: '', // 颜色
      length: '', // 长度
      width: '', // 宽度
      height: '', // 高度
      seatDepth: '', // 坐深
      chaise: '', // 妃位
      price: '', // 价格
      frame: '', // 框架
      auxiliary: '', // 辅料
      fabric: '', // 面料
      touch: '', // 触感
      seatingFeel: '', // 坐感
      similarFabricModels: '', // 面料相似的型号
      similarSeatingModels: '', // 坐感相似的型号
      currentIndex: 0, // 当前产品索引
      products: [] // 产品列表
    };
  },
  mounted() {
    // 组件挂载时调用
    this.fetchData(); // 获取数据
  },
  methods: {
    fetchData() {
      // 获取产品数据的方法
      axios.get('/api/products_on_sale') // 假设你的 API 路径是这样
        .then(response => {
          this.products = response.data; // 将响应数据赋值给产品列表
          this.updateProductInfo(); // 更新产品信息
        })
        .catch(error => {
          console.error("Error fetching data:", error); // 捕获并打印错误
        });
    },
    updateProductInfo() {
      // 更新当前产品信息的方法
      if (this.products.length > 0) {
        const product = this.products[this.currentIndex]; // 获取当前索引的产品
        this.series = product.series; // 更新系列
        this.model = product.model; // 更新型号
        this.color = product.color; // 更新颜色
        this.length = product.length; // 更新长度
        this.width = product.width; // 更新宽度
        this.height = product.height; // 更新高度
        this.seatDepth = product.seatDepth; // 更新坐深
        this.chaise = product.chaise; // 更新妃位
        this.price = product.price; // 更新价格
        this.frame = product.frame; // 更新框架
        this.auxiliary = product.auxiliary; // 更新辅料
        this.fabric = product.fabric; // 更新面料
        this.touch = product.touch; // 更新触感
        this.seatingFeel = product.seatingFeel; // 更新坐感
        this.similarFabricModels = product.similarFabricModels; // 更新面料相似的型号
        this.similarSeatingModels = product.similarSeatingModels; // 更新坐感相似的型号
      }
    },
    previousItem() {
      // 切换到上一个产品的方法
      if (this.currentIndex > 0) {
        this.currentIndex--; // 减少当前索引
        this.updateProductInfo(); // 更新产品信息
      }
    },
    nextItem() {
      // 切换到下一个产品的方法
      if (this.currentIndex < this.products.length - 1) {
        this.currentIndex++; // 增加当前索引
        this.updateProductInfo(); // 更新产品信息
      }
    },
    printPage() {
      // 打印页面的方法
      window.print(); // 调用浏览器的打印功能
    }
  }
};
</script>