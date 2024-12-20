import axios from 'axios'; // 导入 axios ，用于 HTTP 请求
import html2canvas from 'html2canvas'; // 引入 html2canvas

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
      currentIndex: 0, // 当前产品索引
      searchQuery: '', // 搜索查询
      suggestions: [], // 添加用于存储建议的数组
      selectedSuggestionIndex: -1, // 添加用于跟踪选中建议的索引
      temporaryPrice: '', // 添加用于存储临时价格的变量
    };
  },
  mounted() {
    // 组件挂载时调用
    this.fetchData(); // 获取数据
    window.addEventListener('keydown', this.handleKeyDown); // 添加键盘事件监听
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown); // 移除键盘事件监听
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
    },
    generateImage() {
      // 生成图片的方法
      const element = document.querySelector('.a4-container'); // 选择要生成图片的元素
      html2canvas(element, { useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png'); // 将 canvas 转换为图片 URL
        link.download = `${this.model}.png`; // 设置下载文件名
        link.click(); // 触发下载
      }).catch(error => {
        console.error("Error generating image:", error); // 捕获并打印错误
      });
    },
    searchProducts() {
      // 搜索产品的方法
      const index = this.products.findIndex(product => product.model.includes(this.searchQuery));
      if (index !== -1) {
        this.currentIndex = index;
        this.updateProductInfo();
      } else {
        console.log("未找到匹配的产品");
      }
    },
    updateSuggestions() {
      // 更新建议列表的方法
      if (this.searchQuery) {
        this.suggestions = this.products
          .filter(product => product.model.includes(this.searchQuery))
          .map(product => product.model);
        this.selectedSuggestionIndex = -1; // 重置选中索引
      } else {
        this.suggestions = [];
      }
    },
    handleKeyDown(event) {
      if (this.suggestions.length > 0) {
        if (event.key === 'ArrowDown') {
          // 向下箭头
          this.selectedSuggestionIndex = (this.selectedSuggestionIndex + 1) % this.suggestions.length;
        } else if (event.key === 'ArrowUp') {
          // 向上箭头
          this.selectedSuggestionIndex = (this.selectedSuggestionIndex - 1 + this.suggestions.length) % this.suggestions.length;
        } else if (event.key === 'Enter' && this.selectedSuggestionIndex !== -1) {
          // 回车键
          this.selectSuggestion(this.suggestions[this.selectedSuggestionIndex]);
        }
      }
    },
    selectSuggestion(suggestion) {
      // 选择建议的方法
      this.searchQuery = suggestion;
      this.suggestions = [];
      this.selectedSuggestionIndex = -1; // 重置选中索引
      this.searchProducts();
    },
    applyTemporaryPrice() {
      // 应用临时价格的方法
      if (this.temporaryPrice) {
        this.price = this.temporaryPrice; // 将临时价格赋值给显示的价格
      }
    },
  }
};
