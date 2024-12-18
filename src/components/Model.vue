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
  /* 设置页面和 HTML 的基本样式，去除默认的 margin 和 padding，确保页面充满整个视口 */
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex; /* 使用 flex 布局，使内容居中 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  background-color: #f0f0f0; /* 设置背景颜色为浅灰色 */
}

.a4-container {
  /* A4 纸张大小的容器样式 */
  width: 210mm; /* 设置宽度为 A4 纸的宽度 */
  height: 297mm; /* 设置高度为 A4 纸的高度 */
  position: relative; /* 设置为相对定位，以便子元素绝对定位 */
  display: flex; /* 使用 flex 布局 */
  flex-direction: column; /* 垂直排列子元素 */
  justify-content: space-between; /* 在子元素之间均匀分布空间 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  margin-right: 100px; /* 为按钮容器留出空间 */
}

.background-image {
  /* 背景图片样式 */
  position: absolute; /* 绝对定位，使其覆盖整个容器 */
  top: 0;
  left: 0;
  width: 100%; /* 填满容器宽度 */
  height: 100%; /* 填满容器高度 */
  z-index: -1; /* 确保背景图片在最底层 */
  object-fit: cover; /* 确保图片按比例填充整个区域 */
}

.section {
  /* 各个部分的通用样式 */
  display: flex; /* 使用 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  text-align: center; /* 文本居中 */
  z-index: 1; /* 确保内容在背景图片之上 */
}

.theme {
  /* 主题部分的样式 */
  height: 10%; /* 设置高度为容器的 10% */
  background-size: cover; /* 确保背景图片填充整个区域 */
  background-position: center; /* 背景图片居中显示 */
}

.product-info, .price, .product-description, .recommendations {
  /* 各个信息部分的样式 */
  padding: 10px; /* 内边距，确保内容不紧贴边框 */
}

.product-info {
  height: 15%; /* 设置高度为容器的 15% */
}

.price {
  height: 25%; /* 设置高度为容器的 25% */
}

.product-description {
  height: 35%; /* 设置高度为容器的 35% */
}

.recommendations {
  height: 15%; /* 设置高度为容器的 15% */
}

.rounded-box {
  /* 圆角盒子的样式 */
  width: 90%; /* 宽度为容器的 90% */
  height: 100%; /* 高度为容器的 100% */
  border-radius: 15px; /* 圆角半径为 15px */
  background-color: rgba(255, 255, 255, 0.8); /* 半透明白色背景 */
  padding: 10px; /* 内边距，确保内容不紧贴边框 */
  box-sizing: border-box; /* 包括内边距和边框在内的总宽度和高度 */
}

.price-text {
  /* 价格文本的样式 */
  color: red; /* 文本颜色为红色 */
  font-size: 2em; /* 字体大小为 2 倍的默认大小 */
  line-height: 2.5em; /* 行高为 2.5 倍的默认大小，确保文本垂直居中 */
  text-align: center; /* 文本居中 */
}

p {
  /* 段落文本的样式 */
  margin: 5px 0; /* 上下外边距为 5px，左右为 0 */
  color: #333; /* 文本颜色为深灰色 */
}

.product-info p span {
  /* 产品信息中特定文本的样式 */
  color: lightblue; /* 文本颜色为浅蓝色 */
}

.button-container {
  /* 按钮容器的样式 */
  position: fixed; /* 固定定位，使其在页面滚动时保持位置不变 */
  right: 20px; /* 距离右边 20px */
  top: 50%; /* 垂直居中 */
  transform: translateY(-50%); /* 使用 transform 进行精确的垂直居中 */
  display: flex; /* 使用 flex 布局 */
  flex-direction: column; /* 垂直排列按钮 */
  gap: 10px; /* 按钮之间的间距为 10px */
}

.button-container button {
  /* 按钮的样式 */
  padding: 10px 20px; /* 内边距，确保按钮大小合适 */
  font-size: 16px; /* 字体大小为 16px */
  cursor: pointer; /* 鼠标悬停时显示手型光标 */
}

@media print {
  .button-container {
    /* 打印时隐藏按钮容器 */
    display: none; /* 不显示按钮容器 */
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
      electric: '', // 电动
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
      products: [], // 产品列表
      currentIndex: 0 // 当前产品索引
    };
  },
  mounted() {
    // 组件挂载时调用
    this.fetchData(); // 获取数据
  },
  methods: {
    fetchData() {
      // 获取产品数据的方法
      axios.get('http://127.0.0.1:5000/backend/api/products') // 确保路径正确
        .then(response => {
          this.products = response.data; // 将响应数据赋值给产品列表
          this.updateProductInfo(); // 更新产品信息
          console.log(this.products); // 打印产品列表
        })
        .catch(error => {
          console.error("Error fetching data:", error); // 捕获并打印错误
        });
    },
    updateProductInfo() {
      // 更新当前产品信息的方法
      if (this.products && this.products.length > 0) {
        const product = this.products[this.currentIndex]; // 获取当前索引的产品
        this.series = product.series || ''; // 更新系列
        this.model = product.model || ''; // 更新型号
        this.color = product.color || ''; // 更新颜色
        this.electric = product.electric || ''; // 更新电动
        this.length = product.length || ''; // 更新长度
        this.width = product.width || ''; // 更新宽度
        this.height = product.height || ''; // 更新高度
        this.seatDepth = product.seatDepth || ''; // 更新坐深
        this.chaise = product.chaise || ''; // 更新妃位
        this.price = product.price || ''; // 更新价格
        this.frame = product.frame || ''; // 更新框架
        this.auxiliary = product.auxiliary || ''; // 更新辅料
        this.fabric = product.fabric || ''; // 更新面料
        this.touch = product.touch || ''; // 更新触感
        this.seatingFeel = product.seatingFeel || ''; // 更新坐感
        this.similarFabricModels = product.similarFabricModels || ''; // 更新面料相似的型号
        this.similarSeatingModels = product.similarSeatingModels || ''; // 更新坐感相似的型号
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