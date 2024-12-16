<template>
  <div class="page-container">
    <div class="container">
      <header class="header">
        <img src="@/components/title.png" alt="标题" class="header-image">
      </header>
      <div class="content-wrapper">
        <!-- 产品信息 -->
        <section class="info-section">
          <div class="info-row">
            <span>系列: {{ series }}</span>
            <span>型号: {{ model }}</span>
          </div>
          <div class="info-row">
            <span>长宽高坐深: {{ dimensions }}</span>
            <span>妃位: {{ chaise }}</span>
          </div>
        </section>

        <!-- 价格 -->
        <section class="price-section">
          <div class="price-value">{{ price }}</div>
        </section>

        <!-- 产品介绍 -->
        <section class="feature-section">
          <div class="feature-item">
            <span class="feature-title">触感：</span>
            <span class="feature-content">{ 柔软 舒适 温暖 }</span>
          </div>
          <div class="feature-item">
            <span class="feature-title">坐感：</span>
            <span class="feature-content">{ 适中 偏软 }</span>
          </div>
        </section>

        <!-- 相关推荐 -->
        <section class="recommend-section">
          <div class="recommend-title">相关推荐</div>
          <div class="recommend-content">
            <span>xxx</span>
            <span>xxx</span>
            <span>xxx</span>
          </div>
        </section>
      </div>
    </div>
    <div class="control-buttons">
      <button @click="previousItem">上一条</button>
      <button @click="nextItem">下一条</button>
      <button @click="printCanvas">打印</button>
    </div>
  </div>
</template>

<script>
import ProductData from './ProductData.js';

export default {
  name: 'ProductTemplate',
  mixins: [ProductData],
  mounted() {
    console.log('ProductTemplate mounted');
  }
};
</script>

<style>
.feature-section {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 15px;
}

.feature-item {
  margin: 10px 0;
}

.feature-title {
  font-size: 21pt;
  color: #333;
}

.feature-content {
  font-size: 21pt;
  color: #666;
}

/* 其他样式保持不变 */
</style>
  