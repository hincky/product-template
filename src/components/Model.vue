<template>
  <div id="app">
    <div class="a4-container">
      <img src="https://hincky.oss-cn-guangzhou.aliyuncs.com/xiangjiang/background.png" alt="Background" class="background-image">
      <div class="section theme">
        <!-- 使用 CSS 背景图片 -->
        <img src="https://hincky.oss-cn-guangzhou.aliyuncs.com/xiangjiang/logo.png" alt="title" class="title-image">
      </div>
      <div class="section product-info">
        <div class="rounded-box">
          <p>系列: {{ series }}, 型号: {{ model }}, 颜色: {{ color }}</p>
          <p>长: {{ length }} * 宽: {{ width }} * 高: {{ height }}, 坐深: {{ seatDepth }}{{ chaise ? ', 妃位: ' + chaise : '' }}</p>
        </div>
      </div>
      <div class="section price">
        <div class="rounded-box">
          <p class="price-text">{{ price }}</p>
        </div>
      </div>
      <div class="section product-description">
        <div class="rounded-box">
          <p>框架: {{ frame }}, 辅料: {{ auxiliary }}</p>
          <p>面料: {{ fabric }}, 触感: {{ touch }}, 坐感: {{ seatingFeel }}</p>
        </div>
      </div>
      <div class="section recommendations">
        <div class="rounded-box">
          <p>面料相似的型号: {{ similarFabricModels }}</p>
          <p>坐感相似的型号: {{ similarSeatingModels }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}

.a4-container {
  width: 210mm; /* A4 width */
  height: 297mm; /* A4 height */
  position: relative; /* 为了定位背景图片 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* 确保背景图片在最底层 */
  object-fit: cover; /* 确保图片填充整个区域 */
}

.section {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1; /* 确保内容在背景图片之上 */
}

.theme {
  height: 10%;
  /* background-image: url('title.png'); */ /* 设置 title.png 作为背景 */
  background-size: cover; /* 确保图片填充整个区域 */
  background-position: center;
}

.product-info, .price, .product-description, .recommendations {
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
  width: 90%;
  height: 100%;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  box-sizing: border-box;
}

.price-text {
  color: red;
  font-size: 2em;
  line-height: 2.5em;
  text-align: center;
}

p {
  margin: 5px 0;
  color: #333;
}

.product-info p span {
  color: lightblue;
}
</style>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      series: '',
      model: '',
      color: '',
      length: '',
      width: '',
      height: '',
      seatDepth: '',
      chaise: '',
      price: '',
      frame: '',
      auxiliary: '',
      fabric: '',
      touch: '',
      seatingFeel: '',
      similarFabricModels: '',
      similarSeatingModels: '',
      currentIndex: 0,
      products: []
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get('/api/products_on_sale') // 假设你的 API 路径是这样
        .then(response => {
          this.products = response.data;
          this.updateProductInfo();
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    },
    updateProductInfo() {
      if (this.products.length > 0) {
        const product = this.products[this.currentIndex];
        this.series = product.series;
        this.model = product.model;
        this.color = product.color;
        this.length = product.length;
        this.width = product.width;
        this.height = product.height;
        this.seatDepth = product.seatDepth;
        this.chaise = product.chaise;
        this.price = product.price;
        this.frame = product.frame;
        this.auxiliary = product.auxiliary;
        this.fabric = product.fabric;
        this.touch = product.touch;
        this.seatingFeel = product.seatingFeel;
        this.similarFabricModels = product.similarFabricModels;
        this.similarSeatingModels = product.similarSeatingModels;
      }
    },
    previousItem() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.updateProductInfo();
      }
    },
    nextItem() {
      if (this.currentIndex < this.products.length - 1) {
        this.currentIndex++;
        this.updateProductInfo();
      }
    },
    printPage() {
      window.print();
    }
  }
};
</script>