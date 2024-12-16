<template>
  <div id="app">
    <div class="canvas">
      <div class="section theme">
        <img src="title.png" alt="Title" class="title-image">
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

<script>
export default {
  data() {
    return {
      series: '系列名称',
      model: '型号名称',
      color: '颜色名称',
      length: '200cm',
      width: '100cm',
      height: '50cm',
      seatDepth: '40cm',
      chaise: '左',
      price: '¥9999',
      frame: '木框架',
      auxiliary: '海绵',
      fabric: '棉布',
      touch: '柔软',
      seatingFeel: '舒适',
      similarFabricModels: '型号A, 型号B',
      similarSeatingModels: '型号C, 型号D'
    };
  }
};
</script>

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

.canvas {
  width: 210mm; /* A4 width */
  height: 297mm; /* A4 height */
  background-image: url('test.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.section {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.theme {
  height: 10%;
}

.title-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info, .price, .product-description, .recommendations {
  height: 15%;
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
}

p {
  margin: 5px 0;
  color: #333;
}

.product-info p span {
  color: lightblue;
}
</style>