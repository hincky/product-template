<template>
  <div id="app">
    <!-- 主容器，包含整个应用 -->
    <div class="a4-container">
      <!-- 背景图片 -->
      <!-- <img src="https://hincky.oss-cn-guangzhou.aliyuncs.com/xiangjiang/background.png" alt="Background" class="background-image">  -->
      <img src="@/static/imgs/background.png" alt="Background" class="background-image">
      <div class="section theme">
        <!-- 主题部分，包含标题图片 -->
        <!-- <img src="https://hincky.oss-cn-guangzhou.aliyuncs.com/xiangjiang/logo.png" alt="title" class="title-image"> -->
        <img src="@/static/imgs/logo.png" alt="title" class="title-image">
      </div>
      <div class="section product-info">
        <!-- 产品信息部分 -->
        <div class="rounded-box">
          <!-- 显示系列、型号和颜色 -->
          <div class="info-row">
            <div class="info-item" style="text-align: left;">
              <div class="info-series">
                <p><span class="data-text">{{ series }}</span>系列</p>
              </div>
            </div>
            <div class="info-item" style="text-align: center;">
              <div class="info-model">
                <p>
                  <span class="model-text">{{ model }}</span>
                  <span v-if="electric" class="electric-text">{{' ' + electric + '电动沙发'}}</span>
                </p>
              </div>
            </div>
            <div class="info-item" style="text-align: right;">
              <div class="info-color">
                <p><span class="data-text">{{ color }}</span></p>
              </div>
            </div>
          </div>
          <!-- 修改后的第二行布局 -->
          <div class="second-row">
            <div class="row-item">
              <div class="info-dimension">
                <p>长宽高：<span class="data-text">{{ length }}</span> * <span class="data-text">{{ width }}</span> * <span class="data-text">{{ height }}</span></p>
              </div>
            </div>
            <div class="row-item">
                <div class="info-seat-chaise" >
                    <div class="info-seat">
                        <p>坐深: <span class="data-text">{{ seatDepth }}</span></p>
                    </div>
                    <div class="info-chaise">
                        <p v-if="chaise">妃位: <span class="data-text">{{ chaise }}</span></p>
                    </div>
                </div>
            </div>
            
          </div>
        </div>
      </div>
      <div class="section price">
        <!-- 价格部分 -->
        <div class="rounded-box">
          <!-- 显示价格，去掉小数部分并加上单位"元" -->
          <p class="price-text">{{ Math.floor(price) }} </p>
        </div>
      </div>
      <div class="section product-description">
        <!-- 产品描述部分 -->
        <div class="rounded-box">
            <div class="des-first-row">
                <!-- 显示框架和辅料 -->
                 <div class="frame-box">
                    <p>框架:</p>
                    <ul>
                        <li v-for="item in frame.split(',')" :key="item"><span>{{ item }}</span></li>
                    </ul>
                 </div>
                 <div class="auxiliary-box">
                    <p>辅料:</p>
                    <ul>
                        <li v-for="item in auxiliary.split(',')" :key="item"><span>{{ item }}</span></li>
                    </ul>
                 </div>
            </div>
            <div class="des-second-row">
                <!-- 显示面料、触感和坐感 -->
                 <div class="fabric-box">
                    <p>面料:</p>
                    <ul>
                        <li v-for="item in fabric.split(',')" :key="item"><span>{{ item }}</span></li>
                    </ul>
                 </div>
                 <div class="touch-seatingFeel-box">
                    <p>触感:</p>
                    <ul>
                        <li v-for="item in touch.split(',')" :key="item"><span>{{ item }}</span></li>
                    </ul>
                    <p>坐感:</p>
                    <ul>
                        <li v-for="item in seatingFeel.split(',')" :key="item"><span>{{ item }}</span></li>
                    </ul>
                 </div>
            </div>
        </div>
      </div>
      <div class="section recommendations">
        <!-- 推荐部分 -->
        <div class="rounded-box">
            <div class="re-first-row">
                <!-- 显示面料相似的型号 -->
                <p>面料相似的型号: <span>{{ similarFabricModels }}</span></p>
            </div>
            <div class="re-second-row">
                <!-- 显示坐感相似的型号 -->
                <p>坐感相似的型号: <span>{{ similarSeatingModels }}</span></p>
            </div>
        </div>
      </div>
    </div>
    <div class="function-container">
        <div class="search-container">
            <div class="search-box">
                <input type="text" v-model="searchQuery" placeholder="搜索产品" @input="updateSuggestions">
                <button @click="searchProducts">搜索</button>
                <!-- 添加建议列表 -->
                <ul v-if="suggestions.length" class="suggestions-list">
                  <li v-for="suggestion in suggestions" :key="suggestion" @click="selectSuggestion(suggestion)">
                    {{ suggestion }}
                  </li>
                </ul>
            </div>
        </div>
        <div class="button-container">
            <!-- 按钮容器 -->
            <div class="button-row">
                <button @click="previousItem">上一条</button> <!-- 上一个产品按钮 -->
                <button @click="nextItem">下一条</button> <!-- 下一个产品按钮 -->
            </div>
            <div class="button-row">
                <button @click="printPage">打印</button> <!-- 打印页面按钮 -->
                <button @click="generateImage">生成图片</button> <!-- 新增生成图片按钮 -->
            </div>
        </div>
    </div>
    
  </div>
</template>

<script src="./model.js"></script>
<style scoped src="../styles/model.css"></style>