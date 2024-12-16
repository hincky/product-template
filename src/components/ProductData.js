import * as XLSX from 'xlsx';

export default {
  data() {
    return {
      series: '',
      model: '',
      dimensions: '',
      chaise: '',
      price: '',
      currentIndex: 0,
      totalRows: 0,
    };
  },
  
  async created() {
    console.log('ProductData created');
    await this.loadInitialData();
  },
  
  methods: {
    async loadInitialData() {
      console.log('开始加载初始数据');
      try {
        const allDataResponse = await fetch('/backend/api/products');
        const allData = await allDataResponse.json();
        this.totalRows = allData.length;
        console.log('总数据条数:', this.totalRows);

        await this.loadProductData(0);
      } catch (error) {
        console.error('加载初始数据失败:', error);
      }
    },

    async loadProductData(index) {
      console.log(`开始加载第 ${index + 1} 条数据`);
      try {
        const response = await fetch(`/backend/api/products/${index}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('获取到的数据:', data);

        this.series = data['系列'] || '';
        this.model = data['型号'] || '';
        this.dimensions = `${data['长度'] || ''}×${data['宽度'] || ''}×${data['高度'] || ''}×${data['坐深'] || ''}`;
        this.chaise = data['妃位'] || '';
        this.price = data['进价'] || '';

        console.log('数据更新完成:', {
          series: this.series,
          model: this.model,
          dimensions: this.dimensions,
          chaise: this.chaise,
          price: this.price
        });
      } catch (error) {
        console.error('加载数据失败:', error);
      }
    },

    async nextItem() {
      console.log('点击下一条按钮');
      if (this.currentIndex < this.totalRows - 1) {
        this.currentIndex++;
        await this.loadProductData(this.currentIndex);
      }
    },

    async previousItem() {
      console.log('点击上一条按钮');
      if (this.currentIndex > 0) {
        this.currentIndex--;
        await this.loadProductData(this.currentIndex);
      }
    },

    printCanvas() {
      window.print();
    }
  }
};
