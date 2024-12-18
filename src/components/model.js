import axios from 'axios'; // 导入 axios ，用于 HTTP 请求

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

        // 调用获取相似面料和坐感的API
        this.fetchSimilarFabricModels();
        this.fetchSimilarSeatingModels();
      }
    },
    fetchSimilarFabricModels() {
      // 获取面料相似的型号
      axios.get(`http://127.0.0.1:5000/backend/api/similar-material-fuzzy/${this.currentIndex}`)
        .then(response => {
          this.similarFabricModels = response.data.join(', '); // 更新面料相似的型号
        })
        .catch(error => {
          console.error("Error fetching similar fabric models:", error);
        });
    },
    fetchSimilarSeatingModels() {
      // 获取坐感相似的型号
      axios.get(`http://127.0.0.1:5000/backend/api/similar-seating-feel-fuzzy/${this.currentIndex}`)
        .then(response => {
          this.similarSeatingModels = response.data.join(', '); // 更新坐感相似的型号
        })
        .catch(error => {
          console.error("Error fetching similar seating models:", error);
        });
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
